import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Products = () => {

    const [products, setProducts] = useState([]);

    //getting all products
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


    //lifecycle method
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
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Products</h1>
                        <div className="d-flex">
                            {

                                products.map((p) => (
                                    <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link" >
                                        <div className="card m-2" style={{ width: '18rem' }} >
                                            <img src={`/api/v1/products/product-image/${p._id}`} classname="card-img-top" alt={p.name} />
                                            <div classname="card-body">
                                                <h5 classname="card-title">{p.name}</h5>
                                                <p classname="card-text">{p.description}</p>

                                            </div>
                                        </div>
                                    </Link>

                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
