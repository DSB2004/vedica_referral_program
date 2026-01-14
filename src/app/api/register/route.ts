"use server";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { referralCode, identifier } = body;

    const check = await db.referralRegistered.findUnique({
      where: {
        referralCode_doneByIdentifier: {
          doneByIdentifier: identifier,
          referralCode: referralCode,
        },
      },
    });

    if (check)
      return NextResponse.json(
        {
          message: "User already registered with this referral code",
        },
        { status: 400 }
      );

    await db.referralRegistered.create({
      data: {
        doneByIdentifier: identifier,
        referralCode: referralCode,
      },
    });

    return NextResponse.json(
      { message: "Registration recorded successfully" },
      { status: 201 }
    );
  } catch (Err) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
