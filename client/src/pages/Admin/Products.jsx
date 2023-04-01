import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Products = () => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const response = await axios.get('/api/v1/products/get-product');
            // console.log(response.data.products);
            if (response.data?.success) {
                setProducts(response.data.products);
                toast.success(response.data.messege);
            } else {
                toast.error(response.data.messege);

            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Layout title={"Dashboard- Products"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products</h1>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
