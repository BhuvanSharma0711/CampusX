"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Label } from "@/components/ui/label";
import { Input, Select, SelectItem } from "@heroui/react";
import { cn } from "@/lib/utils";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

export const PersonalInfoForm = () => {
  const { user } = useUserStore();
  const email = user?.email;
  const username = user?.username;

  const [userExists, setUserExists] = useState<boolean | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const checkUser = async () => {
      if (!email) return;

      try {
        const response = await fetch(`${apiBaseUrl}/user/exists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setUserExists(data.exists);
      } catch (err) {
        console.error("Error checking user existence:", err);
      }
    };

    checkUser();
  }, [email, apiBaseUrl]);

  return (
    <div className="flex md:flex-row flex-col">
      <div className="ml-8 md:ml-20 md:w-72">
        <h1 className="font-bold">Personal info</h1>
        <p className="text-neutral-400">
          You can change your personal information settings here
        </p>
      </div>
      <div className="bg-white border rounded-lg border-gray-400 p-10 md:ml-12 ml-7 w-full max-w-[1000px] flex flex-col dark:bg-[#004D61]">
        <div className="flex md:flex-row md:gap-40 flex-col">
          <LabelInputContainer>
            <Label htmlFor="text">Full Name</Label>
            <Input
              id="name"
              placeholder="john"
              type="text"
              value={username ?? ""}
              className="max-w-xs"
              isDisabled
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email ?? ""}
              className="max-w-xs"
              isDisabled
            />
          </LabelInputContainer>
        </div>

        <div className="flex md:flex-row flex-col md:gap-40 mt-4">
          <LabelInputContainer>
            <Label htmlFor="number">Contact number</Label>
            <Input
              id="number"
              placeholder="+91**********"
              type="number"
              className="max-w-xs"
              isDisabled
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="type">Account Type</Label>
            <Select
              label="Select Account Type"
              className="max-w-xs"
              color="secondary"
              isRequired
              isDisabled
            >
              <SelectItem key="club">Club</SelectItem>
              <SelectItem key="student">Student</SelectItem>
              <SelectItem key="foodshop-vendor">Foodshop Vendor</SelectItem>
              <SelectItem key="admin">Admin</SelectItem>
            </Select>
          </LabelInputContainer>
        </div>

        {userExists === false && (
  <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md max-w-md">
    <p className="font-semibold">We couldn't find your account in our database.</p>
    <p className="text-sm mt-1">
      Please complete your registration or contact support if you believe this is a mistake.
    </p>
    {/* Optional: Add a button to redirect to registration */}
    <button
      onClick={() => window.location.href = "/register"}
      className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
    >
      Register Now
    </button>
  </div>
)}
      </div>
    </div>
  );
};
