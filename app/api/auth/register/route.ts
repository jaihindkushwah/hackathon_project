import connectDB from "@/lib/db";
import { registerSchema } from "@/lib/validate-schema";
import { UserModel } from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await registerSchema.validate(body);
    await connectDB();
    const existingUser = await UserModel.findOne({ email: body.email });
    if (existingUser) {
      return Response.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = new UserModel({
      email: body.email,
      password: hashPassword,
      firstName: body.firstName,
      lastName: body.lastName,
    });
    await user.save();
    const newUser = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: undefined,
    };
    return Response.json(
      { message: "Successfully registered", data: newUser },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          message: "Registration failed",
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      { message: "Registration failed", error: error },
      {
        status: 400,
      }
    );
  }
}

export function GET() {
  return new Response("Hello, Next.js!");
}
