
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';


const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // get user data
    useEffect(() => {
        const { name, email, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address)
    }, [auth?.user])
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("/api/v1/auth/update-profile", {
                name,
                email,
                password,
                phone,
                address,

            });

            if (res.data?.error) {
                toast.error(res.data?.error)
            } else {
                setAuth({ ...auth, user: res.data?.updateUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = res.data?.updateUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Update SuccessFully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={"Dashboard-Profile"}>
            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container" style={{ minHeight: "90vh" }}>
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">User Profile</h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Your Name"

                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Your Email "

                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter Your Password"

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="phone"
                                        placeholder="Enter Your Phone"

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter Your Address"

                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update User
                                </button>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Profile