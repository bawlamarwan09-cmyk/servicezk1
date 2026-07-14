import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Contact workflow is not configured." },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("n8n error:", result);

      return NextResponse.json(
        { message: "The request could not be sent." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request received.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}