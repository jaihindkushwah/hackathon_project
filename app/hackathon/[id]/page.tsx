// import RegisterButton from "@/components/hackathon/RegisterButton";
// import { IHackathonResponseData } from "@/interface/hackthon";
// import Image from "next/image";
// import React from "react";

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// const getData = async (id: string): Promise<IHackathonResponseData> => {
//   const response = await fetch(`http://localhost:3000/api/hackathon/${id}`);
//   return await response.json();
// };

// async function Page({ params }: PageProps) {
//   const { id } = await params;
//   let data;
//   try {
//     const newData = await getData(id);
//     console.log(newData);
//     data = newData.data;
//   } catch (error) {
//     console.log(error);
//   }
//   if (data) {
//     return (
//       <div className="container mx-auto max-w-2xl mt-5 pb-10">
//         <div className="flex flex-col text-black border shadow-md rounded-b-lg border-x-2 px-5 py-6 space-y-2">
//           <h1 className="font-semibold text-lg ">{data.title}</h1>
//           {/* Dummy image for it */}
//           <Image
//             src={
//               "https://cse.noticebard.com/wp-content/uploads/sites/23/2024/09/MSME-Idea-Hackathon-4.0-for-Young-Innovators-.jpg"
//             }
//             width={1920}
//             height={1080}
//             alt="hackathon_dummy"
//           />
//           <div className="flex gap-2 text-sm items-center">
//             <span className="font-bold">Location</span>
//             <p className="px-3 py-.5 rounded-full bg-slate-200 ">
//               {data.location}
//             </p>
//           </div>
//           <div className="flex flex-col text-sm">
//             <span className="font-semibold">Description</span>
//             <div className="text-gray-800 max-[540px]:text-xs">
//               {data?.description?.split("\n").map((item, index) => {
//                 if (item == "") {
//                   return <br key={item + index} />;
//                 }
//                 return <p key={index + index}>{item}</p>;
//               })}
//             </div>
//           </div>
//           <div className="flex flex-col text-sm">
//             <span className="font-semibold">About</span>
//             <div className="text-gray-800 max-[540px]:text-xs">
//               {dummyData.about.split("\n").map((item, index) => {
//                 if (item == "") {
//                   return <br key={item + index + "bg"} />;
//                 }
//                 return <p key={index}>{item}</p>;
//               })}
//             </div>
//           </div>
//           <div className="space-y-3 pt-4">
//             <div className="flex gap-2 text-sm items-center">
//               <span className="font-semibold">Tags</span>
//               <p className="flex gap-2 font-light flex-wrap max-[540px]:text-xs">
//                 {data?.tags?.map((text) => {
//                   return (
//                     <span
//                       className="bg-gray-200 rounded-lg px-3 py-.5"
//                       key={text + 1}
//                     >
//                       {text}
//                     </span>
//                   );
//                 })}
//               </p>
//             </div>
//             <div className="flex gap-2 text-sm items-center">
//               <span className="font-semibold">Created Date:</span>
//               <p className=" font-light max-[540px]:text-xs">
//                 {getDateTimeString(data.createdAt)}
//               </p>
//             </div>
//             <div className="flex gap-2 text-sm items-center">
//               <span className="font-semibold">Start Date:</span>
//               <p className=" font-light max-[540px]:text-xs">
//                 {getDateTimeString(data.startDate)}
//               </p>
//             </div>
//             <div className="flex gap-2 text-sm items-center">
//               <span className="font-semibold">End Date:</span>
//               <p className=" font-light max-[540px]:text-xs">
//                 {getDateTimeString(data.endDate)}
//               </p>
//             </div>
//             <div className="flex gap-2 text-sm items-center">
//               <span className="font-semibold">Total Registered:</span>
//               <p className=" font-light max-[540px]:text-xs">
//                 {data.totalParticipants}
//               </p>
//             </div>
//           </div>
//           <div className="flex justify-center items-center pt-10">
//             <RegisterButton data={data} />
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="container mx-auto max-w-2xl mt-5 pb-10">
//       <div className="flex flex-col text-black border shadow-md rounded-b-lg border-x-2 px-5 py-6 space-y-2">
//         <h1 className="font-semibold text-lg ">Hackathon not found</h1>
//       </div>
//     </div>
//   );

//   // const newData = { about: dummyData?.about, ...data?.data };
// }

// export default Page;

// const getDateTimeString = (date?: string) => {
//   return (
//     new Date(date || "").toLocaleDateString() +
//     " " +
//     new Date(date || "").toLocaleTimeString()
//   );
// };

// const dummyData = {
//   _id: "6784b22e10e7ddb741f52f67",
//   title: "AI Revolution Hackathon",
//   startDate: "2024-12-01T09:00:00Z",
//   endDate: "2024-12-03T17:00:00Z",
//   createdAt: "2024-12-01T09:00:00Z",
//   location: "Online",
//   createdBy: "67840fbfe84a2f41836cfeb2",
//   tags: ["React", "Next Js", "AI", "Machine Learning", "Innovation"],
//   totalParticipants: 1,
//   isRegistered: true,
//   description:
//     "Join us for a 48-hour challenge to develop cutting-edge AI solutions to real-world problems.",
//   about:
//     "Join us for an exhilarating 48-hour challenge to craft innovative AI solutions addressing real-world problems.\nThis event brings together AI enthusiasts, developers, and data scientists of all levels to collaborate and create impactful applications. Over the course of two days, participants will form teams, brainstorm ideas, and develop AI-powered solutions to tackle pressing issues in areas such as healthcare, education, sustainability, and finance.\n\nGain practical experience with mentorship from industry experts, attend hands-on workshops, and enhance your skills in AI technologies. Engage with like-minded individuals, share knowledge, and learn from others in a dynamic and supportive environment.\n\nThe challenge offers exciting rewards, recognition, and the chance to present your innovative solutions to a panel of esteemed judges. Whether you're looking to push your boundaries, network with professionals, or simply explore the potential of AI, this challenge is your opportunity to shine.\n\nBe part of a transformative experience where technology meets impact. Take on challenges that matter, contribute to solving real-world problems, and shape the future of artificial intelligence. We can’t wait to see what you create!",
// };

"use client";

import RegisterButton from "@/components/hackathon/RegisterButton";
import NotFound from "@/components/NotFound";
import PageLoader from "@/components/PageLoader";
import { HackathonData, IHackathonResponseData } from "@/interface/hackthon";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const getDateTimeString = (date?: string) => {
  return (
    new Date(date || "").toLocaleDateString() +
    " " +
    new Date(date || "").toLocaleTimeString()
  );
};

const dummyData = {
  _id: "6784b22e10e7ddb741f52f67",
  title: "AI Revolution Hackathon",
  startDate: "2024-12-01T09:00:00Z",
  endDate: "2024-12-03T17:00:00Z",
  createdAt: "2024-12-01T09:00:00Z",
  location: "Online",
  createdBy: "67840fbfe84a2f41836cfeb2",
  tags: ["React", "Next Js", "AI", "Machine Learning", "Innovation"],
  totalParticipants: 1,
  isRegistered: true,
  description:
    "Join us for a 48-hour challenge to develop cutting-edge AI solutions to real-world problems.",
  about:
    "Join us for an exhilarating 48-hour challenge to craft innovative AI solutions addressing real-world problems.\nThis event brings together AI enthusiasts, developers, and data scientists of all levels to collaborate and create impactful applications. Over the course of two days, participants will form teams, brainstorm ideas, and develop AI-powered solutions to tackle pressing issues in areas such as healthcare, education, sustainability, and finance.\n\nGain practical experience with mentorship from industry experts, attend hands-on workshops, and enhance your skills in AI technologies. Engage with like-minded individuals, share knowledge, and learn from others in a dynamic and supportive environment.\n\nThe challenge offers exciting rewards, recognition, and the chance to present your innovative solutions to a panel of esteemed judges. Whether you're looking to push your boundaries, network with professionals, or simply explore the potential of AI, this challenge is your opportunity to shine.\n\nBe part of a transformative experience where technology meets impact. Take on challenges that matter, contribute to solving real-world problems, and shape the future of artificial intelligence. We can’t wait to see what you create!",
};

function Page() {
  const { id } = useParams();
  const [data, setData] = useState<HackathonData | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/hackathon/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: IHackathonResponseData = await response.json();
        setData(result.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl mt-5 pb-10">
        <div className="flex flex-col text-black border shadow-md rounded-b-lg border-x-2 px-5 py-6 space-y-2">
          <h1 className="font-semibold text-lg">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl mt-5 pb-10">
        <div className="flex flex-col text-black border shadow-md rounded-b-lg border-x-2 px-5 py-6 space-y-2">
          <PageLoader />
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="container mx-auto max-w-2xl mt-5 pb-10">
        <div className="flex flex-col text-black border shadow-md rounded-b-lg border-x-2 px-5 py-6 space-y-2">
          <NotFound title="Hackathon not found" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl mt-5 pb-10">
      <div className="flex flex-col text-black border shadow-md rounded-b-lg border-x-2 px-5 py-6 space-y-2">
        <h1 className="font-semibold text-lg">{data.title}</h1>
        <Image
          src="https://cse.noticebard.com/wp-content/uploads/sites/23/2024/09/MSME-Idea-Hackathon-4.0-for-Young-Innovators-.jpg"
          width={1920}
          height={1080}
          alt="hackathon_dummy"
        />
        <div className="flex gap-2 text-sm items-center">
          <span className="font-bold">Location</span>
          <p className="px-3 py-0.5 rounded-full bg-slate-200">
            {data.location}
          </p>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold">Description</span>
          <div className="text-gray-800 max-[540px]:text-xs">
            {data?.description?.split("\n").map((item, index) => {
              if (item === "") {
                return <br key={index} />;
              }
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold">About</span>
          <div className="text-gray-800 max-[540px]:text-xs">
            {dummyData.about.split("\n").map((item, index) => {
              if (item === "") {
                return <br key={index} />;
              }
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
        <div className="space-y-3 pt-4">
          <div className="flex gap-2 text-sm items-center">
            <span className="font-semibold">Tags</span>
            <p className="flex gap-2 font-light flex-wrap max-[540px]:text-xs">
              {data?.tags?.map((text) => (
                <span className="bg-gray-200 rounded-lg px-3 py-0.5" key={text}>
                  {text}
                </span>
              ))}
            </p>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="font-semibold">Created Date:</span>
            <p className="font-light max-[540px]:text-xs">
              {getDateTimeString(data.createdAt)}
            </p>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="font-semibold">Start Date:</span>
            <p className="font-light max-[540px]:text-xs">
              {getDateTimeString(data.startDate)}
            </p>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="font-semibold">End Date:</span>
            <p className="font-light max-[540px]:text-xs">
              {getDateTimeString(data.endDate)}
            </p>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="font-semibold">Total Registered:</span>
            <p className="font-light max-[540px]:text-xs">
              {data.totalParticipants}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center pt-10">
          <RegisterButton data={data} />
        </div>
      </div>
    </div>
  );
}

export default Page;
