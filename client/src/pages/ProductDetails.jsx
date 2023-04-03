import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        if (params?.slug) getProducts();
    }, [params.slug]);

    const getProducts = async () => {
        try {
            const response = await axios.get(
                `/api/v1/products/get-single-product/${params.slug}`
            );
            setProduct(response.data?.product);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };
    console.log(product)
    return (
        <Layout title={"Product Details"}>
            <div className="container mt-2">
                <div className="row ">
                    <div className="col-md-6 mt-4">
                        <img
                            src={`/api/v1/products/product-image/${product._id}`}
                            alt={product.name}
                            className="shadow p-4 rounded"
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
                    </div>
                </div>
                <div className="row mt-2">
                    <h6 className="text-center">Silmilar products</h6>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
