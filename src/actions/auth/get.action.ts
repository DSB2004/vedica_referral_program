"use server";

import { cookies } from "next/headers";
import { verifyJWT, generateJWT } from "@/util/jwt.util";
import { redirect } from "next/navigation";
import { JWTPayload } from "@/types";

const validateToken = async (token?: string): Promise<JWTPayload | null> => {
  if (!token) return null;

  const result = await verifyJWT(token);
  if (!result.valid) return null;

  return result.payload as JWTPayload;
};

export const validateUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    redirect("/");
  }

  if (!accessPayload && refreshPayload) {
    const newAccessToken = await generateJWT({
      id: refreshPayload.id,
      email: refreshPayload.email,
    });

    cookieStore.set("access-token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 15,
      path: "/",
    });
  }

  return {
    id: accessPayload!.id,
    email: accessPayload!.email,
  };
};

export const isValidateUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  if (!accessPayload && !refreshPayload) {
    return false;
  }

  return true;
};

export const getUserId = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const accessPayload = await validateToken(accessToken);
  const refreshPayload = await validateToken(refreshToken);

  return accessPayload?.id || refreshPayload?.id || null;
};
