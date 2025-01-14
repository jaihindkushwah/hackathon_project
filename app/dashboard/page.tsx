// import Header from "@/components/header";
"use client";
import Events from "@/components/Events";
import Profile from "@/components/Profile";
import TrackHackathon from "@/components/hackathon/TrackHackathons";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronRightCircleIcon } from "lucide-react";
import React from "react";

/*
User Dashboard
 ○ Track ongoing and past hackathons
 ○ Manage personal profile
 ○ View created and participated in events
*/

const Dashboard = () => {
  const [currentTab, setCurrentTab] = React.useState("track-hackathons");
  const [isOpen, setIsOpen] = React.useState(false);

  const renderComponent = () => {
    switch (currentTab) {
      case "profile":
        return <Profile />;
      case "track-hackathons":
        return <TrackHackathon />;
      case "events":
        return <Events />;
      default:
        return <TrackHackathon />;
    }
  };
  return (
    <div className="flex gap-0 h-full">
      <SideBarDashboard
        currentTab={currentTab}
        isOpen={isOpen}
        setCurrentTab={setCurrentTab}
      />
      <div className="h-full relative flex-1 shadow-lg my-1 mx-1 rounded-lg min-h-[89vh] ">
        <span
          className={`sticky z-50 top-[90%] ${
            isOpen ? "left-0" : "-ml-5"
          } transform -translate-y-1/2`}
        >
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <ChevronRightCircleIcon
              className={`w-7  h-7 text-black   ${isOpen ? " " : "rotate-180"}`}
            />
          </button>
        </span>
        {renderComponent()}
      </div>
    </div>
  );
};

function Page() {
  return <Dashboard />;
}

export default Page;

interface ISideBarDashboard {
  isOpen?: boolean;
  currentTab: string;

  setCurrentTab: (tab: string) => void;
}

const LinkBtn = ({
  isActive,
  ...props
}: React.HtmlHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) => {
  return (
    <button
      {...props}
      className={`px-2 py-1  text-sm text-ellipsis truncate  ${
        isActive ? "bg-green-500 text-white" : "bg-slate-200 text-black"
      }`}
    >
      {props.children}
    </button>
  );
};
const SideBarDashboard = ({
  currentTab,
  isOpen,
  setCurrentTab,
}: ISideBarDashboard) => {
  const handleTabChange = (tab: string) => setCurrentTab(tab);
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "-100%",
      width: "0px",
      display: "none", // Corrected 'display' value
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      width: "240px",
      display: "flex", // Set to a visible display value
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // if (!isOpen) return null;
  return (
    <>
      {!isOpen && (
        <AnimatePresence>
          <motion.div
            initial="closed"
            animate={"open"}
            exit="closed"
            variants={menuVariants}
            className={` flex flex-col gap-2 rounded-lg  border shadow-lg mx-1 my-.5 py-5 px-2`}
          >
            {/* sidebar */}
            <LinkBtn
              isActive={currentTab === "track-hackathons"}
              onClick={() => {
                handleTabChange("track-hackathons");
              }}
            >
              Track hackathons
            </LinkBtn>
            <LinkBtn
              isActive={currentTab === "events"}
              onClick={() => {
                handleTabChange("events");
              }}
            >
              View events
            </LinkBtn>
            <LinkBtn
              isActive={currentTab === "profile"}
              onClick={() => {
                handleTabChange("profile");
              }}
            >
              Manage profile
            </LinkBtn>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
