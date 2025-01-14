"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validate-schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

function RegisterForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await registerSchema.validate(formData);
      if (result.password !== formData.confirmPassword) {
        toast.error("Password does not match");
        return;
      }
      // console.log(result);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        await signIn("credentials", { ...result, callbackUrl: "/" });
        handleResetForm();
        toast.success("Hackathon created successfully");
      } else {
        toast.warning(data.message);
      }
      // console.log(data);
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    formRef.current?.reset();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container py-10 mx-auto max-w-xl px-4">
      <Card className="w-full">
        <CardHeader className="flex flex-col">
          <span className="text-2xl font-bold text-center">
            Create new account
          </span>
          <span className="text-center text-sm text-gray-700 font-light font-sans">
            Fill in the details to be a new user of our platform
          </span>
        </CardHeader>
        <CardBody>
          <form ref={formRef} onSubmit={formSubmit} className="space-y-2">
            <div className="space-y-2 flex flex-col ">
              <label htmlFor="title" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="space-y-2 flex flex-col">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter your confirm password "
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div className="flex justify-between  items-center gap-2 max-[480px]:flex-col-reverse max-[480px]:items-start ">
              <Button
                isLoading={isLoading}
                className="sm:max-w-[180px] max-w-[120px] w-full h-9 text-sm"
                type="submit"
              >
                Register
              </Button>
              <span className="sm:text-sm text-xs text-gray-700 font-light font-sans max-[480px]:self-end ">
                Already have an account?&nbsp;
                <Link className="text-blue-600" href="/auth/login">
                  signin
                </Link>
              </span>
            </div>
          </form>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default RegisterForm;
