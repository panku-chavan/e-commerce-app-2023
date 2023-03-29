import axios from "axios";
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Spinner from "../Spinner";


export const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const response = await axios.get('/api/v1/auth/user-auth')
            if (response.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])


    return ok ? <Outlet /> : <Spinner />
}