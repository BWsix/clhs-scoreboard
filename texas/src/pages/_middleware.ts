import { NextRequest, NextResponse } from "next/server";

const WITH_AUTH = ["/exams", "/examOverall", "/timetable"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!WITH_AUTH.includes(path)) return;
  if (!!req.cookies["sb-sessionCookie"]) return;

  const url = req.nextUrl.clone();
  url.pathname = path;

  NextResponse.redirect(url);
}
