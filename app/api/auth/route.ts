import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { authOptions } from "./[...nextauth]/route";
import { authOptions } from "@/app/auth";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(JSON.stringify({error: "unauthorized"}), {
            status: 401
        });
    }
    console.log("GET SESSION API", session)
    return NextResponse.json({authenticated: !!session})
}