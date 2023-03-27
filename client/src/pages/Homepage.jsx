import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../Context/AuthContext'


const Homepage = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout title={"Home"}>
            <h1>Homepage</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
}

export default Homepage