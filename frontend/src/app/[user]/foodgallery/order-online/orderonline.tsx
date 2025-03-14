"use client";
import Shopcards from "@/components/shopcards";
import React, { useEffect, useState } from "react";

function OrderOnline() {
  const [deliveringNow, setDeliveringNow] = useState<{ name: string,image:string,location:string }[]>([]);
  const [deliveringShops, setDeliveringShops] = useState<{ name: string,image:string,location:string }[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchopenShops() {
      try {
        const response = await fetch(`${apiBaseUrl}/foodshops/getopendeliveryshops`);
        const data = await response.json();
        setDeliveringNow(data);
      } catch (error) {
        console.error("Error fetching open dining shops:", error);
      }
    }
    async function fetchdiningShops() {
      try {
        const response = await fetch(`${apiBaseUrl}/foodshops/getdeliveryshops`);
        const data = await response.json();
        setDeliveringShops(data);
      } catch (error) {
        console.error("Error fetching dining shops:", error);
      }
    }
    fetchopenShops();
    fetchdiningShops();
  }, [apiBaseUrl]);
  
  return (
    <div className="relative w-screen overflow-hidden">
      <h1 className="text-3xl font-bold relative ml-36 mt-10">Delivering Now</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-10 py-10 max-w-7xl mx-auto">
        {deliveringNow.map((shop, index) => (
          <Shopcards shopname={shop.name} img={shop.image} location={shop.location} key={index}/>
        ))}
      </div>
      <h1 className="text-3xl font-bold relative ml-36 mt-10">Delivery available</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-10 py-10 max-w-7xl mx-auto">
        {deliveringShops.map((shop, index) => (
          <Shopcards shopname={shop.name} img={shop.image} location={shop.location} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default OrderOnline