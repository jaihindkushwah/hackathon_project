// app/api/hackathon/[id]/route.ts

import { authOptions } from "@/authOptions";
import connectDB from "@/lib/db";
import { HackathonModel } from "@/models/hackathon";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";

export async function GET(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    // console.log(session);
    const { id } = await params;
    const user = session?.user;
    // console.log(user);
    if (!user) throw new Error("User not found!");
    await connectDB();
    const data = await HackathonModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          location: 1,
          // total participants: ,
          totalParticipants: { $size: "$participants" },
          isRegistered: { $in: [user.id, "$participants"] },
          tags: 1,
          createdBy: 1,
          createdAt: 1,
          isEventEnd: { $gte: [new Date().toISOString(), "$endDate"] },
        },
      },
    ]);

    const newData = data.length > 0 ? { ...data[0] } : null;
    return Response.json(
      { message: "got Hackathon data", data: newData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Failed to get Hackathon data", error: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { message: "Failed to get Hackathon data", error },
      { status: 500 }
    );
  }
}

// register for hackathon
export async function PUT(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const user = session?.user;
    if (!user) throw new Error("User not found!");
    console.log({ id });
    await connectDB();
    const data = await HackathonModel.updateOne(
      { _id: id },
      { $push: { participants: user.id } }
    );
    return Response.json(
      { message: "Successfully registered for hackathon", data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Failed to get Hackathon data", error: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { message: "Failed to register for hackathon" },
      { status: 500 }
    );
  }
}
