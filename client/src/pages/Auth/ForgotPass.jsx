import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyles.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {

                email,
                newPassword,
                answer

            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.messege);

                navigate("/login");
            } else {
                toast.error(res.data.messege);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        setEmail('');
        setNewPassword('');
        setAnswer('');
    };
    return (
        <Layout title={"Login"}>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Reset Password</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="answer"
                            placeholder="Enter Your Favourite Sport "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                    <div>
                        <span type="button" className="link" onClick={() => navigate('/login')}>
                            Back to Login
                        </span>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPass