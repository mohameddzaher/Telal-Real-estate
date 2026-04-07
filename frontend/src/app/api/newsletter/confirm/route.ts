import { NextRequest, NextResponse } from "next/server";

// Note: This shares the same in-memory store concept as the newsletter route.
// In production, both routes would query the same database.

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invalid Link — Telal Development</title>
  <style>
    body { background: #050505; color: #FAFAFA; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .container { text-align: center; max-width: 480px; padding: 2rem; }
    h1 { color: #C9A84C; font-size: 1.5rem; margin-bottom: 1rem; }
    p { color: #A0A0A0; line-height: 1.6; }
    a { color: #C9A84C; text-decoration: none; display: inline-block; margin-top: 1.5rem; padding: 0.75rem 2rem; border: 1px solid rgba(201,168,76,0.4); }
    a:hover { background: rgba(201,168,76,0.1); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Invalid Confirmation Link</h1>
    <p>The confirmation link is missing or invalid. Please try subscribing again.</p>
    <a href="/">Back to Home</a>
  </div>
</body>
</html>`,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    // Placeholder: In production, look up token in database and confirm subscription
    // For now, always return success for valid tokens

    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Confirmed — Telal Development</title>
  <style>
    body { background: #050505; color: #FAFAFA; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .container { text-align: center; max-width: 480px; padding: 2rem; }
    .check { width: 64px; height: 64px; border-radius: 50%; background: rgba(201,168,76,0.1); border: 2px solid #C9A84C; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; color: #C9A84C; }
    h1 { color: #C9A84C; font-size: 1.5rem; margin-bottom: 1rem; }
    p { color: #A0A0A0; line-height: 1.6; }
    a { color: #C9A84C; text-decoration: none; display: inline-block; margin-top: 1.5rem; padding: 0.75rem 2rem; border: 1px solid rgba(201,168,76,0.4); }
    a:hover { background: rgba(201,168,76,0.1); }
  </style>
</head>
<body>
  <div class="container">
    <div class="check">&#10003;</div>
    <h1>Subscription Confirmed!</h1>
    <p>Thank you for confirming your email. You will now receive the latest updates, exclusive property launches, and market insights from Telal Development.</p>
    <a href="/">Back to Home</a>
  </div>
</body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to confirm subscription" },
      { status: 500 }
    );
  }
}
