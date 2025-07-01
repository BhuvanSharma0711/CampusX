"use client";
import React from "react";
import { PersonalInfoForm } from "@/components/profile/PersonalInfoForm";
import { AcademicDetailsForm } from "@/components/profile/AcademicDetailsForm";
import { GeneralInfo } from "@/components/profile/GeneralInfo";
import HeaderSection from "@/components/profile/Header";

function Profile() {
  return (
    <div className="relative w-screen overflow-hidden bg-slate-100 dark:bg-[#1A1A1A]">
      <HeaderSection />
      <div className="flex flex-col gap-8">
        <PersonalInfoForm />
        <AcademicDetailsForm />
        <GeneralInfo />
      </div>
    </div>
  );
}

export default Profile;
