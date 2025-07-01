"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ColourfulTextDemo } from "@/components/colourfultext";
import Avatar from "@/components/avatar";
import { VerificationIcon, ShareIcon } from "@/components/icons";
import { useUserStore } from "@/store/userStore";

const HeaderSection = () => {
  const { user } = useUserStore();
  const email = user?.email;
  const name = user?.username || "User";

  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!email) return;
      try {
        const res = await fetch(`${apiBaseUrl}/user/is-verified`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        setIsVerified(data.verified);
      } catch (err) {
        console.error("Failed to fetch verification status", err);
      }
    };

    fetchVerificationStatus();
  }, [email, apiBaseUrl]);

  const handleVerify = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const token = prompt("Enter your verification token:");
      if (!token) return;

      const res = await fetch(`${apiBaseUrl}/user/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Successfully verified!");
        setIsVerified(true);
      } else {
        alert("Invalid token.");
      }
    } catch (err) {
      console.error("Verification failed", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-5xl text-blue-800"
        >
          <ColourfulTextDemo mainText="" colourfulWord={`Welcome! ${name}`} />
        </motion.h1>
      </LampContainer>

      <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
        <div className="md:ml-20 ml-8 -translate-y-6 md:-translate-y-16">
          <Avatar src="https://i.pravatar.cc/150?img=8" smSize={40} mdSize={120} />
          <h1 className="text-3xl font-bold">{name}</h1>
          <h1 className="text-sm text-zinc-500">{email}</h1>
        </div>

        <div className="hidden md:flex gap-5 md:-translate-y-32 md:-translate-x-28">
          <button
            onClick={handleVerify}
            disabled={isVerified || loading}
            className={`flex items-center gap-2 px-8 py-2 rounded-full transition duration-200 ${
              isVerified
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:shadow-xl"
            }`}
          >
            {isVerified ? (
              <>
                Verified <VerificationIcon />
              </>
            )  : loading ? "Verifying..." : "Verify"}
            {!isVerified && <VerificationIcon />}
          </button>

          <button className="relative inline-flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 text-xs font-semibold leading-6 text-white ring-1 ring-white/10 shadow-2xl shadow-zinc-900 cursor-pointer group overflow-hidden">
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">Share</span>
            <span className="relative z-10"><ShareIcon /></span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
