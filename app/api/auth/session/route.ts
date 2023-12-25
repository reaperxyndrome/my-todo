import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    console.log("GET SESSION API", session)
    return NextResponse.json({authenticated: session})
}