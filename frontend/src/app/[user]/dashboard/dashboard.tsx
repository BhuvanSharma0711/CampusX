"use client";
import { useUserStore } from '@/store/userStore';
import React from 'react'

function Dashboard() {
  const { user } = useUserStore();
  return (
    <div className="relative w-screen overflow-hidden">
            {user ? (
                <div>
                    <h1  className="text-3xl font-bold relative ml-36 mt-10">Welcome, {user.username} 😇</h1>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
  )
}

export default Dashboard
