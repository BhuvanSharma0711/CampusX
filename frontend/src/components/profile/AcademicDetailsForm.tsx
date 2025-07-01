"use client";

import { Label } from "@/components/ui/label";
import {
  Button,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  years,
  courses,
  courseBranches,
  courseDepartments,
} from "@/constants/courseData";
import { useEffect, useState } from "react";
import { EditIcon } from "../icons";
import { useUserStore } from "@/store/userStore";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex w-full flex-col space-y-2 ${className}`}>
    {children}
  </div>
);

export const AcademicDetailsForm = () => {
  const { user } = useUserStore();
  const email = user?.email;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [selectedCourse, setSelectedCourse] = useState<keyof typeof courseBranches | "">("");
  const [form, setForm] = useState({
    roll: 0,
    year: "",
    course: "",
    branch: "",
    department: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch existing details
  useEffect(() => {
    const fetchDetails = async () => {
      if (!email) return;
      try {
        const response = await fetch(`${apiBaseUrl}/user/details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        if (data) {
          setForm({
            roll: data.Rollno || 0,
            year: data.Year?.toString() || "",
            course: data.Course || "",
            branch: data.Branch || "",
            department: data.Department || "",
          });
          setSelectedCourse((data.Course || "") as keyof typeof courseBranches | "");
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchDetails();
  }, [email, apiBaseUrl]);

  const handleCourseSelectionChange = (e: any) => {
    const course = e.target.value;
    setSelectedCourse(course);
    setForm((prev) => ({ ...prev, course }));
  };

  const handleSubmit = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/user/add-academic-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          Rollno: Number(form.roll),
          Year: Number(form.year),
          Course: form.course,
          Branch: form.branch,
          Department: form.department,
        }),
      });

      const result = await response.json();
      console.log("Submitted successfully:", result);
      setIsEditing(false);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="ml-8 md:ml-20 md:w-72">
        <h1 className="font-bold">Basic Details</h1>
        <p className="text-neutral-400">Change your basic details here</p>
      </div>

      <div className="bg-white border relative rounded-lg border-gray-400 p-10 md:ml-12 ml-7 w-full max-w-[1000px] flex flex-col dark:bg-[#004D61]">
        <div className="absolute top-2 right-2">
          <Button
            isIconOnly
            aria-label="Edit"
            color="danger"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </Button>
        </div>

        <div className="flex md:flex-row md:gap-40 flex-col">
          <LabelInputContainer>
            <Label htmlFor="roll">Roll number</Label>
            <NumberInput
              className="max-w-xs"
              value={form.roll}
              onValueChange={(val) => {
                setForm({ ...form, roll: val });
              }}
              isDisabled={!isEditing}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="year">Academic Year</Label>
            <Select
              className="max-w-xs"
              label="Select your year"
              isDisabled={!isEditing}
              selectedKeys={[form.year]}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              isRequired
            >
              {years.map((year) => (
                <SelectItem key={year.key}>{year.label}</SelectItem>
              ))}
            </Select>
          </LabelInputContainer>
        </div>

        <div className="flex md:flex-row flex-col md:gap-20 mt-4">
          <LabelInputContainer>
            <Label htmlFor="course">Course</Label>
            <Select
              className="max-w-xs"
              label="Select your course"
              isDisabled={!isEditing}
              selectedKeys={[selectedCourse]}
              onChange={handleCourseSelectionChange}
              isRequired
            >
              {courses.map((course) => (
                <SelectItem key={course.key}>{course.label}</SelectItem>
              ))}
            </Select>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="branch">Branch</Label>
            <Select
              className="max-w-xs"
              label={selectedCourse ? "Select your branch" : "Select course first"}
              isDisabled={!selectedCourse || !isEditing}
              selectedKeys={[form.branch]}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              isRequired
            >
              {(courseBranches[selectedCourse as keyof typeof courseBranches] ?? []).map(
                (branch) => (
                  <SelectItem key={branch.key}>{branch.label}</SelectItem>
                )
              )}
            </Select>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="department">Department</Label>
            <Select
              className="max-w-xs"
              label={selectedCourse ? "Select your Department" : "Select course first"}
              isDisabled={!selectedCourse || !isEditing}
              selectedKeys={[form.department]}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              isRequired
            >
              {(courseDepartments[selectedCourse as keyof typeof courseDepartments] ?? []).map(
                (dept) => (
                  <SelectItem key={dept.key}>{dept.label}</SelectItem>
                )
              )}
            </Select>
          </LabelInputContainer>
        </div>

        {isEditing && (
          <div className="md:mt-10 mt-4">
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