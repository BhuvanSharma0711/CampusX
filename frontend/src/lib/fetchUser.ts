export const fetchUser = async () => {
    const response = await fetch("/api/user", { cache: "no-store" });
    return response.json();
  };
  