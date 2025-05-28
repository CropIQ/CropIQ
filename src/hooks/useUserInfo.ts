import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const USER_INFO_KEY = "userInfo";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function useUserInfo() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      console.log("Loading user info...");
      setLoading(true);
      let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      console.debug("Access Token:", accessToken);
      if (!accessToken) {
        setLoading(false);
        setUser(null);
        router.replace("/login");
        return;
      }

      const splitedToken = accessToken.split(".");
      console.debug("Splitted Token:", splitedToken);
      if (splitedToken.length !== 3) {
        setLoading(false);
        setUser(null);
        router.replace("/login");
        return;
      }
      
      const payload = JSON.parse(atob(splitedToken[1]));
      console.debug("Payload:", payload);
      const exp = payload.exp * 1000;
      const now = Date.now();// + 10800000; // 3 hours in milliseconds
      console.debug("Current Time:", new Date(now).toISOString());
      console.debug("Expiration Time:", new Date(exp).toISOString());
      if (now < exp) {
        setUser(payload);
        setLoading(false);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(payload));
        console.debug("User info loaded:", payload);
        return;
      }
      if (now >= exp) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        console.debug("Refresh Token:", refreshToken);
        if (!refreshToken) {
          setLoading(false);
          setUser(null);
          router.replace("/login");
          return;
        }
        try {
          const res = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });
          const data = await res.json();

          if (!res.ok) {
            setUser(null);
            setLoading(false);
            router.replace("/login");
            return;
          } else {
            if (data.user) {
              console.debug("User refreshed:", data.user);
              localStorage.setItem("userInfo", data.user);
            }
            if (data.accessToken) {
              localStorage.setItem("accessToken", data.accessToken);
            }
            if (data.refreshToken) {
              localStorage.setItem("refreshToken", data.refreshToken);
            }
          }
        } catch {
          setUser(null);
          setLoading(false);
          router.replace("/login");
          return;
        }
      }
      setUser(null);

    };

    loadUser();
  }, []);

  return { user, loading };
}