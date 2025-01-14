import { authOptions } from "@/authOptions";
import connectDB from "@/lib/db";
import { createHackathonSchema } from "@/lib/validate-schema";
import { HackathonModel } from "@/models/hackathon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const result = await createHackathonSchema.validate(reqBody);
    const startDate = new Date(result.startDate).toISOString();
    const endDate = new Date(result.endDate).toISOString();
    await connectDB();
    const newHackathon = await HackathonModel.create({
      ...result,
      startDate,
      endDate,
    });
    return NextResponse.json({
      message: "Hackathon created successfully",
      data: newHackathon,
    });
  } catch (error) {
    return Response.json(
      { message: "Failed to get Hackathon data", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    // await connectDB();
    // console.log(req);
    // const data = await HackathonModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ session });
  } catch (error) {
    return Response.json(
      { message: "Failed to get Hackathon data", error },
      { status: 500 }
    );
  }
}
