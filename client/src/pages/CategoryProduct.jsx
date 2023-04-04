import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([])
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params?.slug) getProductByCategory();
    }, [params.slug])


    const getProductByCategory = async (req, res) => {
        try {
            const response = await axios.get(`/api/v1/products/product-category/${params.slug}`);
            setProducts(response.data?.products);
            setCategory(response.data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={"Category- Products"}>
            <div className="container mt-4">
                <h4 className='text-center'> {category?.name}</h4>
                <h6 className='text-center'> {products?.length} result found</h6>


                <div className="d-flex flex-wrap">
                    {products?.map((p) => (
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
        </Layout>
    )
}

export default CategoryProduct