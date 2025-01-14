import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "./models/user";
import connectDB from "./lib/db";
import bcrypt from "bcryptjs";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "./lib/db";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      name: string;
      email: string;
      address: string;
      image: string;
    };
  }
  interface Profile {
    id: string;
    address: string;
    given_name: string;
    picture: string;
    family_name: string;
    email_verified: boolean;
  }
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  // adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Please enter credentials!");
        }
        try {
          await connectDB();
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("User not found!");
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            console.log("Password is incorrect!");
            throw new Error("Password is incorrect!");
            // console.log(credentials);
          }
          const credentials = {
            id: user._id,
            email: user.email,
            name: user.firstName + " " + user.lastName,
          };
          return { ...credentials };
        } catch (error: any) {
          const err = error?.response?.data?.message || error.message;
          throw new Error(err);
          // throw new Error(error.response.data.message);
        }
      },
    }),
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        try {
          await connectDB();
          const existUser = await UserModel.findOne({ email: profile.email });

          if (existUser) {
            user.id = existUser._id;
            return true;
          }
          const newUser = new UserModel({
            email: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name || "N/A",
            img: profile.picture,
            password: bcrypt.hashSync(account.providerAccountId, 10),
          });
          await newUser.save();
          user.id = newUser._id;
          return true;
        } catch {
          return false;
        }
      } else {
        if (user) {
          user.image =
            "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg";
          return true;
        }
        return false;
      }
    },
    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/dashboard",

    // signOut: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
const handle = NextAuth(authOptions);

export { handle as GET, handle as POST, handle as Auth };
