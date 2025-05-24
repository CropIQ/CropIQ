import { useState, useEffect } from "react";

// Adjust these keys to match your app's localStorage usage
const USER_INFO_KEY = "userInfo";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

async function fetchUserInfo(accessToken: string): Promise<any> {
  const response = await fetch("/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("AccessTokenExpired");
  return response.json();
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch("/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) throw new Error("RefreshFailed");
  const data = await response.json();
  localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
  return data.accessToken;
}

export function useUserInfo() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const cached = localStorage.getItem(USER_INFO_KEY);
      if (cached) {
        setUser(JSON.parse(cached));
        setLoading(false);
        return;
      }

      let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!accessToken || !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        let userInfo;
        try {
          userInfo = await fetchUserInfo(accessToken);
        } catch (err) {
          if ((err as Error).message === "AccessTokenExpired") {
            accessToken = await refreshAccessToken(refreshToken);
            userInfo = await fetchUserInfo(accessToken);
          } else {
            throw err;
          }
        }
        setUser(userInfo);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
      } catch {
        setUser(null);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  return { user, loading };
}