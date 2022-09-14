
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function DashboardPage() {

    const [user, setUser] = useState({
        username: '',
        email: ''
    });

    const router = useRouter();

    const getProfile = async () => {
        const response = await axios.get('/api/profile');
        setUser(response.data);
    }

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push("/login");
        } catch (error) {
            console.log(error);
            router.push("/login");
        }
    }


    return (
        <>
            <h1>Dashboard</h1>

            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>

            <button onClick={getProfile}>
                Get profile
            </button>

            <button onClick={logout}>
                Logout
            </button>
        </>
    );
}