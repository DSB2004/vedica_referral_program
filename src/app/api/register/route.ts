"use server";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
export default async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { referralCode, identifier } = body;

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
