import { authOptions } from "@/authOptions";
import { HackathonModel } from "@/models/hackathon";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) throw new Error("User not found!");
    const data = await HackathonModel.aggregate([
      {
        $match: {
          // participants includes user.id
          // participants: { $in: user.id },
          $or: [
            { participants: { $in: [user.id] } }, // Match user.id as a string
            { participants: { $in: [new Types.ObjectId(user.id)] } }, // Match user.id as ObjectId
          ],

          // { $eq: new mongoose.Types.ObjectId(user.id) },
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
    ]).sort({
      createdAt: -1,
    });
    // const data = await HackathonModel.find({
    //   participants: { $in: user?.id },
    // }).sort({
    //   createdAt: -1,
    // });

    return Response.json({
      message: "Successfully fetched user data",
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Failed to get user data", error: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { message: "Failed to get user data", error },
      { status: 500 }
    );
  }
}
