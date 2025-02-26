"use client";
import Shopcards from "@/components/shopcards";
import React, { useEffect, useState } from "react";

function Dining() {
  const [openShops, setOpenShops] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchShops() {
      try {
        const response = await fetch(`${apiBaseUrl}/foodshops/getopendiningshops`);
        const data = await response.json();
        setOpenShops(data);
      } catch (error) {
        console.error("Error fetching dining shops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, [apiBaseUrl]);

  return (
    <div className="relative w-screen overflow-hidden">
      <div>
        <h1>Open Shops</h1>
        <div className="flex">
          {loading ? (
            <p>Loading...</p>
          ) : openShops.length > 0 ? (
            openShops.map((shop, index) => (
              <div key={index} className="flex-1">
                <Shopcards shopname={shop.name} />
              </div>
            ))
          ) : (
            <p>No open shops available</p>
          )}
        </div>
      </div>
      <div>
        <h1>Closed Shops</h1>
      </div>
    </div>
  );
}

export default Dining;
