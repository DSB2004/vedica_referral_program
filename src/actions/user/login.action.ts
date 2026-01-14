"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateJWT } from "@/util/jwt.util";
import { cookies } from "next/headers";
const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Account not found",
      };
    }

    if (!bcrypt.compare(password, user.passwordHash)) {
      return {
        success: true,
        message: "Incorrect password provided",
      };
    }
    const accessToken = await generateJWT({ email: user.email, id: user.id });
    const refreshToken = await generateJWT(
      { email: user.email, id: user.id },
      "30d"
    );

    const cookieStore = await cookies();
    cookieStore.set("access-token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 15,
      path: "/",
    });
    cookieStore.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return {
      success: true,
      message: "User logged in successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "User failed to login",
    };
  }
};

export { loginUser };
