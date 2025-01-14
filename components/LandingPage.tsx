import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Rocket, Users } from "lucide-react";
import Link from "next/link";
import LandingPageHeader from "./LandingPageHeader";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingPageHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to HackathonHub
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                  Organize, participate, and innovate in hackathons like never
                  before. Join the community of creators and problem solvers.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href={"/auth/login"}
                  className="bg-green-500 text-white  px-4 sm:px-8 sm:py-2 py-1 rounded-full  max-w-[200px]   hover:bg-green-600"
                >
                  Get Started
                </Link>
                <Link
                  href={"/hackathon"}
                  className="text-green-500 bg-white border-green-500 hover:bg-green-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Code className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Code Collaboration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Real-time code sharing and version control integration for
                  seamless teamwork.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Team Formation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Find the perfect teammates based on skills, interests, and
                  project ideas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Rocket className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Project Showcase</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Present your hackathon projects to the world and get valuable
                  feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to hack?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our community of innovators and start building amazing
                  projects today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2 max-[480px]:flex-col gap-1 items-center">
                  <Input
                    className="max-w-sm sm:max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 HackathonHub. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
