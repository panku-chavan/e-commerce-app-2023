import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
const { Option } = Select;
const CreateProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategoreis] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [shipping, setShipping] = useState("");

    // get all category
    const getAllCategory = async () => {
        try {
            const response = await axios.get("/api/v1/category/get-category");
            if (response.data?.success) {
                setCategoreis(response.data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wron in getting category");
        }
    };
    console.log(categories);
    useEffect(() => {
        getAllCategory();
    }, []);
    return (
        <Layout title={"Dashboard-Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => setCategory(value)}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c.name}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
