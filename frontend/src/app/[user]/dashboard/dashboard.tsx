"use client";
import { ExpandableCardDemo } from '@/components/expandablecards';
import { useUserStore } from '@/store/userStore';
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const { user } = useUserStore();
  const email = user?.email;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    async function fetchevents(email:string) {
      try {
        const response = await fetch(`${apiBaseUrl}/events/relevant` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        });
        const data = await response.json();
        setEvents(data);
      }catch (error) {
         console.error("Error fetching relevant events:", error);
      }
    }

    async function fetchtasksinhand(email:string) {
      try {
        const response = await fetch(`${apiBaseUrl}/user/tasks-in-hand` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        });
        const data = await response.json();
        const formateddata = data.map((task: any) => ({
          ...task,
          Deadline: task.Deadline
            ? new Date(task.Deadline).toLocaleDateString('en-IN', { dateStyle: 'medium' })
            : "Everyday"
        }));
        setTasks(formateddata);
      }catch (error) {
         console.error("Error fetching in hand tasks:", error);
      }
    }

    if (email) {
      fetchevents(email);
      fetchtasksinhand(email);
    }
    }, [email, apiBaseUrl]);

  return (
    <div className="relative w-screen overflow-hidden">
      {user ? (
        <div>
          <h1 className="text-3xl font-bold relative ml-36 mt-10">Welcome, {user.username} 😇</h1>
          <div className="flex flex-row items-center">
            <div>
              <h1 className="text-3xl font-bold relative ml-36 mt-10">Relevant Events</h1>
              <div className="ml-36 mt-10">
                {events.map((event: any, index: number) => (
                  <ExpandableCardDemo
                    key={index}
                    title={event.name}
                    description={event.description}
                    content={`📍 ${event.location} | 🗓️ ${new Date(event.date).toLocaleDateString()}`}
                    src={event.image}
                    ctaText="View Details"
                    ctaLink={`/events/${event.id}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold relative ml-36 mt-10">Your Tasks</h1>
              <div className="ml-36 mt-10">
                {tasks.map((task: any, index: number) => (
                  <ExpandableCardDemo
                    key={index}
                    title={task.title}
                    description={`🗓️${task.Deadline}`}
                    content={task.description}
                    src="https://res.cloudinary.com/dvpjaaqfe/image/upload/v1750456650/task_zdadow.avif"
                    ctaText="View Details"
                    ctaLink={`/tasks/${task.id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
export default Dashboard;