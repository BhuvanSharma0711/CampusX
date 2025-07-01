"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, Radio, Button } from "@heroui/react";
import { EditIcon } from "../icons";
import { useUserStore } from "@/store/userStore";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

export const GeneralInfo = () => {
  const { user } = useUserStore();
  const email = user?.email;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [gender, setGender] = useState("");
  const [foodPreference, setFoodPreference] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasUserDetails, setHasUserDetails] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!email) return;

      try {
        const res = await fetch(`${apiBaseUrl}/user/details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setHasUserDetails(!!data);
        if (data) {
          setGender(data.Gender?.toLowerCase() || "");
          setFoodPreference(
            data.isVegetarian === true
              ? "vegetarian"
              : data.isVegetarian === false
              ? "non-vegetarian"
              : ""
          );
        }
      } catch (err) {
        console.error("Failed to load general info:", err);
        setHasUserDetails(false);
      }
    };

    fetchDetails();
  }, [email, apiBaseUrl]);

  const handleSubmit = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/user/add-general-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          Gender: gender,
          isVegetarian: foodPreference === "vegetarian" || foodPreference === "eggetarian",
        }),
      });

      const result = await response.json();
      console.log("Submitted general info:", result);
      setIsEditing(false);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="ml-8 md:ml-20 md:w-72">
        <h1 className="font-bold text-[#F0F0F0]">General Info</h1>
        <p className="text-neutral-400">Add or change your general information</p>
      </div>

      <div className="bg-white border relative rounded-lg border-gray-400 p-10 md:ml-12 ml-7 w-full max-w-[1000px] flex flex-col dark:bg-[#004D61]">
        <div className="absolute top-2 right-2">
          <Button isIconOnly aria-label="Edit" color="danger" onClick={() => setIsEditing(true)} isDisabled={!hasUserDetails}>
            <EditIcon />
          </Button>
        </div>

        <div>
          <RadioGroup
            label="Select your gender"
            color="primary"
            orientation="horizontal"
            isRequired
            value={gender}
            onValueChange={setGender}
            isDisabled={!isEditing}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </RadioGroup>

          <div className="mt-3">
            <RadioGroup
              label="Food Preference"
              color="secondary"
              orientation="horizontal"
              isRequired
              value={foodPreference}
              onValueChange={setFoodPreference}
              isDisabled={!isEditing}
            >
              <Radio value="vegetarian">Vegetarian</Radio>
              <Radio value="non-vegetarian">Non-Vegetarian</Radio>
            </RadioGroup>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6">
            <Button
              isLoading={loading}
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              radius="full"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
