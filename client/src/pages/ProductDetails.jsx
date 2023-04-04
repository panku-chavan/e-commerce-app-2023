import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const params = useParams();
    const [similarProduct, setSimilarProduct] = useState([]);
    const navigate = useNavigate();
    //get similar products



    useEffect(() => {
        if (params?.slug) getProducts();
    }, [params.slug]);

    const getProducts = async () => {
        try {
            const response = await axios.get(
                `/api/v1/products/get-single-product/${params.slug}`
            );
            setProduct(response.data?.product);
            getSimilarProduct(response.data?.product._id, response.data?.product.category._id)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            const response = await axios.get(`/api/v1/products/similar-products/${pid}/${cid}`);
            setSimilarProduct(response.data?.products);
        } catch (error) {
            console.log(error);
            toast.error("Cannot get similar products.")
        }
    }
    return (
        <Layout title={"Product Details"}>
            <div className="container mt-2">
                <div className="row ">
                    <div className="col-md-6 mt-4">
                        <img
                            src={`/api/v1/products/product-image/${product._id}`}
                            alt={product.name}
                            className="shadow p-4 rounded"
                            height={"350px"}
                            width={"350px"}
                        />
                    </div>
                    <div className="col-md-6 mt-4">
                        <h2 className="text-center">Product details</h2>
                        <h6>Name : {product.name}</h6>
                        <h6>Description : {product.description}</h6>
                        <h6>Category : {product.category?.name}</h6>
                        <h6>Quantity : {product.quantity}</h6>
                        <h6>Shipping : {product.shipping ? "Yes" : "No"}</h6>
                        <h6>Price : ${product.price}</h6>
                        <div className="text-center">
                            <button className="btn btn-secondary ms-2 "

                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <h2 className="text-center">Silmilar products</h2>
                    <div className="d-flex flex-wrap ">
                        {similarProduct?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`/api/v1/products/product-image/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    height={"300px"}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">$ {p.price} </p>
                                    <button className="btn btn-primary ms-2" onClick={() => navigate(`/product-details/${p.slug}`)}>See Details</button>
                                    <button className="btn btn-secondary ms-2">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
