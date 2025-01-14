"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validate-schema";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { GoogleIcon } from "./google-icon";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await loginSchema.validate(formData);
      // console.log(result);
      await signIn("credentials", {
        ...result,
        callbackUrl: "/",
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          toast.warning(res.error);
          return;
        }
        toast.success("Login successful");
        handleResetForm();
        router.push("/");
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    formRef.current?.reset();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container py-10 mx-auto max-w-lg px-4">
      <Card className="w-full sm:space-y-4  py-5 shadow-md">
        <CardHeader className="flex flex-col">
          <span className="text-2xl font-bold text-center">
            Login to your account
          </span>
          <span className="text-center text-sm text-gray-700 font-light font-sans">
            Fill the form below to enjoy the hackathon
          </span>
        </CardHeader>
        <CardBody>
          <form ref={formRef} onSubmit={formSubmit} className="space-y-2">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div className="flex  justify-end  items-center gap-2 max-[480px]:flex-col-reverse max-[480px]:items-start ">
              <span className="sm:text-sm text-xs text-gray-700 font-light font-sans max-[480px]:self-end ">
                Don&apos;t have an account? &nbsp;
                <Link className="text-blue-600" href="/auth/register">
                  register
                </Link>
              </span>
            </div>
            <div className="flex justify-center">
              <Button
                className="flex-1 max-w-full self-center w-full h-9 text-sm"
                type="submit"
                isLoading={isLoading}
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex items-center flex-col gap-2 sm:space-y-4">
          {/* or continue with google */}
          <span className="text-sm text-gray-700 font-light font-sans">
            OR CONTINUE WITH
          </span>
          <div className="mt-1">
            <Button
              onClick={() =>
                signIn("google", { callbackUrl: "/", redirect: true })
              }
              className="w-full bg-transparent hover:bg-slate-200 p-1 rounded-full border shadow-sm"
            >
              <GoogleIcon className="w-8 h-8" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
