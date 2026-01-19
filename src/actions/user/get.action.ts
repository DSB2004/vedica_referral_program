"use server";

import { db } from "@/lib/prisma";
import { getUserId, validateUser } from "../auth/get.action";
import { User } from "@/types";

const getUser = async () => {
  const id = await getUserId();
  if (!id) {
    return {
      success: false,
      message: "User not logged in",
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        avatar: true,
        publicId: true,
        referralCode: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const registrationCount = await db.referralRegistered.count({
      where: {
        referralCode: user.referralCode,
      },
    });

    return {
      user: {
        registrationCount,
        ...user,
      } as User,
      success: true,
      message: "User info found",
    };
  } catch (err) {
    return {
      success: false,
      message: "Error occured while getting user info",
    };
  }
};

export { getUser };
