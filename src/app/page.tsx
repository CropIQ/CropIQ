"use client";
import HelloUser from "@/components/HelloUser/HelloUser";
import { useUserInfo } from "@/hooks/useUserInfo"; // import the hook

export default function Home() {
    const { user, loading } = useUserInfo();

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <HelloUser user={user} />
        </>
    );
}