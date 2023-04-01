import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
    //console.log(categories);
    useEffect(() => {
        getAllCategory();
    }, []);

    // create product funtion

    const createProduct = async (e) => {
        e.preventDefault();
        try {

            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("image", image);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const response = await axios.post('/api/v1/products/create-product', productData)
            //console.log(response)
            if (response.data?.success) {
                toast.success("Product created successfully.")
                navigate('/dashboard/admin/products');
            } else {
                toast.error(response.data?.messege);
            }
        } catch (error) {
            console.log(error);
            toast("Something wend wrong.")
        }
    }

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
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label
                                    htmlFor="image"
                                    className="btn btn-outline-secondary col-md-12"
                                >
                                    {image ? image.name : "Upload Image"}
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {image && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="product_image"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter Product Name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    value={description}
                                    placeholder="Enter Product Description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Enter Product Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Enter Product Quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    size="large"
                                    placeholder="Select Shipping"
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb3">
                                <button className=" btn btn-primary" onClick={createProduct}>
                                    Create Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
