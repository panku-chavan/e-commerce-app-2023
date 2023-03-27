import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: name,
            email: email,
            password: pass,
            phone: phone,
            adress: adress
        }
        console.log(data);

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
                            type="text"
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
