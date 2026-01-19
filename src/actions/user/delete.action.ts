"use server";

import { db } from "@/lib/prisma";
import { validateAdmin } from "../auth/get-admin.action";

type UpdateUserInput = {
  userId: string;
};

export const deleteUser = async ({ userId }: UpdateUserInput) => {
  try {
    await validateAdmin();
    const user = await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { publicId: userId },
      });
      if (!user) return null;
      await tx.referralRegistered.deleteMany({
        where: {
          referralCode: user.referralCode,
        },
      });
      await tx.user.delete({
        where: { publicId: userId },
      });

      return user;
    });
    return { success: true, message: "User deleted successfully", user };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete user" };
  }
};
