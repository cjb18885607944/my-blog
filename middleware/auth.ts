import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function withAuth(handler: Function) {
  return async function (req: NextRequest) {
    const password = req.headers.get("x-password");
    if (password !== "123456") {
      return new NextResponse(JSON.stringify({ error: "密码错误" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    return handler(req);
  };
}
