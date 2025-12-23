"use client";
import { ExpandableCardDemo } from '@/components/expandablecards';
import { WobbleCard } from '@/components/ui/wobble-card';
import { useUserStore } from '@/store/userStore';
import React, { useEffect, useState } from 'react'
import { Calendar } from '@heroui/react';
import {today, getLocalTimeZone} from "@internationalized/date";
import { Timeline } from '@/components/ui/timeline'
import CampusMap from '@/components/campusMap';
import { useMapStore } from '@/store/mapStore';


function getTimeLeft(target: Date | null) {
  if (!target) return null;

  const diff = +target - +new Date();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getNextEvent(events: any[]) {
  const now = new Date();

  return events
    .map(e => ({ ...e, start: new Date(e.StartTime) }))
    .filter(e => e.start > now)
    .sort((a, b) => +a.start - +b.start)[0];
}

function Dashboard() {
  const { user } = useUserStore();
  const email = user?.email;
  const name = user?.username;
  console.log(email)
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [events, setEvents] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const { setTarget } = useMapStore();

  //demoData
  const data = [
    {
      title: "8:00 AM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Morning Yoga – Gym Hall
          </p>
        </div>
      ),
    },
    {
      title: "9:00 AM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Calculus – Room B-101
          </p>
        </div>
      ),
    },
    {
      title: "10:00 AM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Data Structures – Room C-204
          </p>
        </div>
      ),
    },
    {
      title: "11:00 AM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Physics Lab – Lab 1
          </p>
        </div>
      ),
    },
    {
      title: "12:30 PM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Lunch Break – Canteen
          </p>
        </div>
      ),
    },
    {
      title: "1:00 PM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            DBMS Lab – Lab 3
          </p>
        </div>
      ),
    },
    {
      title: "2:30 PM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            English Literature – Room A-202
          </p>
        </div>
      ),
    },
    {
      title: "3:30 PM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            AI Workshop – Lab 2
          </p>
        </div>
      ),
    },
    {
      title: "5:00 PM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Club Meeting – Auditorium
          </p>
        </div>
      ),
    },
    {
      title: "6:30 PM",
      content: (
        <div>
          <p className="mb-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Evening Debate – Room D-101
          </p>
        </div>
      ),
    },
  ];

  //demoTasks
  const tasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    Deadline: "2025-12-28",
    description: "Write and submit the project proposal for AI Campus Assistant.",
  },
  {
    id: 2,
    title: "Prepare Presentation Slides",
    Deadline: "2025-12-30",
    description: "Create slides for the upcoming team presentation on WebAR navigation.",
  },
  {
    id: 3,
    title: "Database Schema Review",
    Deadline: "2025-12-27",
    description: "Check and update PostgreSQL schema for student events and schedules.",
  },
  {
    id: 4,
    title: "Test Chatbot Flow",
    Deadline: "2025-12-29",
    description: "Verify all question-answer flows in the AI Campus Assistant chatbot.",
  },
  {
    id: 5,
    title: "Deploy Frontend Update",
    Deadline: "2025-12-31",
    description: "Push latest Next.js dashboard changes to staging environment.",
  },
  ];

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

    useEffect(() => {
      if (!events.length) return;

      const nextEvent = getNextEvent(events);
      if (!nextEvent) return;

      const interval = setInterval(() => {
        setTimeLeft(getTimeLeft(new Date(nextEvent.StartTime)));
      }, 1000);

      return () => clearInterval(interval);
    }, [events]);


  return (
    <div className="relative w-screen overflow-hidden">
      {user ? (
        <div>
          <div className='w-full flex justify-center'>
            <div className='ml-10 mt-5 max-w-7xl w-full -translate-x-16'>
              <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className='grid grid-cols-4'>
                  <div className="max-w-sm col-span-3">
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                      Welcome, {name} 😇
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                      Here’s what’s happening on campus today
                    </p>
                    <p className="mt-10 max-w-[26rem] text-left  text-base/6 text-neutral-200  font-semibold md:text-lg lg:text-2xl">
                      Time left for next Event : 
                    </p>
                    
                    
                    <div className="flex gap-4 text-center">
                      {timeLeft ? (
                        <div className="flex gap-4 text-center mt-6">
                          {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="bg-white/10 rounded-xl px-4 py-2">
                              <p className="text-2xl font-bold text-white">
                                {String(value).padStart(2, "0")}
                              </p>
                              <p className="text-xs uppercase text-neutral-300">{unit}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-6 text-green-300 font-semibold">
                          No upcoming events 🎉
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='col-span-1'>
                    <p className="max-w-[26rem] text-left  text-base/6 text-neutral-200  font-semibold md:text-lg lg:text-2xl">
                      Todays date : 
                    </p>
                    <Calendar isReadOnly aria-label="Date (Read Only)" value={today(getLocalTimeZone())} />
                  </div>

                </div>
              </WobbleCard>
            </div>
          </div>

          <div className='grid grid-cols-6 mt-10 ml-20 gap-4 '>

            <div className='col-span-3'>
              <div className="mx-auto mb-10 px-2 md:px-8 lg:px-10 flex justify-center">
                <h1 className="text-3xl font-bold relative ml-10">Today's Schedule</h1>
              </div>
              <Timeline data={data} />
            </div>
            
            <div className='col-span-2 '>
              <h1 className="text-3xl font-bold relative ml-10">Your Tasks</h1>
              <div className="ml-10 mt-10 w-full h-[500px] overflow-y-auto scrollbar-hide bg-white dark:bg-neutral-950 font-sans md:px-10  rounded-3xl shadow-[inset_0_4px_8px_rgba(0,0,0,0.1),inset_0_-10px_8px_rgba(0,0,0,0.2)]">
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

          <div className='mt-20 mb-20 w-3/4 mx-auto h-[80vh] bg-yellow-200'>
            <CampusMap />
          </div>

          
          
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
export default Dashboard;