"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateJWT } from "@/util/jwt.util";
import { cookies } from "next/headers";
const registerUser = async ({
  name,
  email,
  password,
  avatar,
  instituteName,
  dob,
}: {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  instituteName?: string;
  dob?: string;
}) => {
  try {
    const found = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (found) {
      return {
        user: null,
        success: false,
        message: "User already registered",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
        dob: dob ? new Date(dob).toISOString() : null,
        avatar,
        instituteName,
      },
    });
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
      message: "User registered successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      user: null,
      success: false,
      message: "User failed to registered",
    };
  }
};

export { registerUser };
