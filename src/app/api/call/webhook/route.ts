import { NextResponse } from "next/server";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export async function POST() {
  try {
    const twimlResponse = new VoiceResponse();

    const twimlConnect = twimlResponse.connect();
    twimlConnect.stream({ url: process.env.WS_SERVER_URL });

    const xmlString = twimlResponse.toString();

    return new NextResponse(xmlString, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error in /call/webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
