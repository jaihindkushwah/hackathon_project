import { authOptions } from "@/authOptions";
import connectDB from "@/lib/db";
import { HackathonModel } from "@/models/hackathon";
// import mongoose from "mongoose";
import { PipelineStage } from "mongoose";
import { getServerSession } from "next-auth";

// export default hackathons;
// status=upcoming|ongoing|completed
//api/hackathons?page=1&limit=10&sort=asc&status=upcoming&participant=user1

export async function GET(req: Request) {
  try {
    // const id = "67840fbfe84a2f41836cfeb2";

    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    const { searchParams } = new URL(req.url);
    console.log({ searchParams });
    const status = searchParams.get("status") || "upcoming";
    const aggregateQuery: PipelineStage[] | undefined = [
      {
        $match: (() => {
          if (status === "upcoming") {
            return { startDate: { $gt: new Date().toISOString() } };
          } else if (status === "ongoing") {
            return {
              startDate: { $lte: new Date().toISOString() },
              endDate: { $gte: new Date().toISOString() },
            };
          } else if (status === "completed") {
            return { endDate: { $lt: new Date().toISOString() } };
          }
          return {};
        })(),
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
          isRegistered: { $in: [id, "$participants"] },
          tags: 1,
          createdBy: 1,
          createdAt: 1,
          isEventEnd: { $gte: [new Date().toISOString(), "$endDate"] },
        },
      },
    ];

    const limit = 100,
      page = 1;
    await connectDB();
    const data = await HackathonModel.aggregate(aggregateQuery)
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip((page - 1) * limit);

    return Response.json(
      {
        message: "got all Hackathon data",
        data: data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Failed to get user data", error: error.message },
        { status: 500 }
      );
    }
    return Response.json({ message: "Failed to get Hackathon data", error });
  }
}

// register for a hackathon
// export async function POST(req: Request) {
//   try {
//     const reqBody = await req.json();
//     const result = await createHackathonSchema.validate(reqBody);
//     const startDate = new Date(result.startDate).toISOString();
//     const endDate = new Date(result.endDate).toISOString();
//     await connectDB();
//     const newHackathon = await HackathonModel.create({
//       ...result,
//       startDate,
//       endDate,
//     });
//     return NextResponse.json({
//       message: "Hackathon created successfully",
//       data: newHackathon,
//     });
//   } catch (error) {
//     return Response.json(
//       { message: "Failed to get Hackathon data", error },
//       { status: 500 }
//     );
//   }
// }
