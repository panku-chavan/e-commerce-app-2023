import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Homepage = () => {
    const [auth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // get products

    const getProducts = async () => {
        try {
            const respons = await axios.get("/api/v1/products/get-product");
            setProducts(respons.data.products);
            // console.log(respons.data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="row mt-3">
                <div className="col-md-3 ">
                    <h4 className="text-center">Filter By Category</h4>
                </div>
                <div className="col-md-9">
                    <h2 className="text-center">All Products</h2>
                    <div className="d-flex flex-wrap">
                        {products.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`/api/v1/products/product-image/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    height={'300px'}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;
