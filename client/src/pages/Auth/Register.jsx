import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name: name,
            email: email,
            password: pass,
            phone: phone,
            address: adress
        }
        //console.log(data);

        try {
            const response = await axios.post('/api/v1/auth/register', data);
            if (response.data.success) {
                toast.success(response.data.messege);
                //toast.success("Resister Succesfully.")
                navigate('/login')
            } else {
                toast.error(response.data.messege);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");

        }

        //toast.success("Register Successfully.");

        setName('');
        setEmail('');
        setPass('');
        setPhone('');
        setAdress('');
    }

    return (
        <Layout title={"Registration"}>
            <div className="register">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>
                    <div className="mb-3">

                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />

                    </div>
                    <div className="mb-3">

                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required

                        />
                    </div>

                    <div className="mb-3">

                        <input
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="Mobile Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                            required
                        />

                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>

            </div>
        </Layout>
    );
};

export default Register;
