import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../Context/SearchContext";

const SearchPage = () => {
    const [value] = useSearch();
    return (
        <Layout title={"Search Result"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Result</h1>
                    <h6>
                        {value?.result.length < 1
                            ? "No Products Found"
                            : `Found ${value?.result.length} Product`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {value.result?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`/api/v1/products/product-image/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    height={"300px"}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">$ {p.price} </p>
                                    <button className="btn btn-primary ms-2">See Details</button>
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

export default SearchPage;
