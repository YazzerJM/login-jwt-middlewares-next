
import axios from "axios";
import { useState } from "react";

export default function DashboardPage() {

    const [user, setUser] = useState({
        username: '',
        email: ''
    });

    const getProfile = async () => {
        const response = await axios.get('/api/profile');
        setUser(response.data);
    }


    return (
        <>
            <h1>Dashboard</h1>

            <pre>
                {JSON.stringify(user, null,2)}
            </pre>

            <button onClick={getProfile}>
                Get profile
            </button>
        </>
    );
}