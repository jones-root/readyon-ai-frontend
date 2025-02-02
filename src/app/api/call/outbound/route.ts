import { NextResponse } from "next/server";

import { twilio } from "../../../integrations/twilio";

export async function POST() {
  try {
    const call = await twilio.calls.create({
      url: process.env.TWILIO_PHONE_WEBHOOK_URL,
      to: process.env.TWILIO_TARGET_PHONE!,
      from: process.env.TWILIO_PHONE!,
    });

    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error("Error in /call/outbound:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
