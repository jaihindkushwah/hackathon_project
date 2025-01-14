"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createHackathonSchema } from "@/lib/validate-schema";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

function Create() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await createHackathonSchema.validate(formData);
      // console.log(result);
      const response = await fetch("/api/hackathon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...result,
          createdBy: session?.user.id,
        }),
      });
      const data = await response.json();
      // if(data.ok) return
      console.log(data);
      toast.success("Hackathon created successfully");
      handleResetForm();
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
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
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
            Create Hackathon
          </span>
          <span className="text-center text-sm text-gray-700 font-light font-sans">
            Fill in the details to create a new hackathon event
          </span>
        </CardHeader>
        <CardBody>
          <form ref={formRef} onSubmit={formSubmit} className="space-y-4">
            <div className="space-y-2 flex flex-col ">
              <label htmlFor="title" className="text-sm font-medium">
                Hackathon Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Enter hackathon title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                placeholder="Enter hackathon location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  name="startDate"
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter hackathon description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="border border-gray-200 rounded-md sm:p-2 p-1 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <Button
              isLoading={isLoading}
              className="w-full h-9 text-sm"
              type="submit"
            >
              Create Hackathon
            </Button>
          </form>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default Create;
