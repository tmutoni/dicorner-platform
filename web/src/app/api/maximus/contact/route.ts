import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escape(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MAXIMUS_TO_EMAIL;
  const from = process.env.MAXIMUS_FROM_EMAIL ?? "Maximus Contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      "[maximus/contact] RESEND_API_KEY or MAXIMUS_TO_EMAIL not set; logging instead.",
    );
    console.log("[maximus/contact]", JSON.stringify(body));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `Maximus contact — ${body.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color:#065f46;">New contact message</h2>
          <p><strong>From:</strong> ${escape(body.name)} &lt;${escape(body.email)}&gt;</p>
          <p>${escape(body.message).replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[maximus/contact] send failed", e);
    return NextResponse.json(
      { error: "Could not send email" },
      { status: 502 },
    );
  }
}
