"use client";
import { useUserStore } from '@/store/userStore';
import React from 'react'

function Dashboard() {
  const { user } = useUserStore();
  return (
    <div>
            {user ? (
                <div>
                    <h2>Username: {user.username}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
  )
}

export default Dashboard
