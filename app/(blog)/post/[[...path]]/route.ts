import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
export async function GET(request: NextRequest) {
    const pathname = decodeURIComponent(request.nextUrl.pathname).split("/").slice(2).join("/")
    const blob = fs.readFileSync(`posts/${pathname}`)
    const headers = new Headers();
    headers.set("Content-Type", "image/*");
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}