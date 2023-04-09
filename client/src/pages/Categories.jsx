import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
    const categories = useCategory();
    const navigate = useNavigate();
    return (
        <Layout title={"All Categories"}>
            <div className="container mt-4">
                <div className="row">
                    {categories?.map((c) => (
                        // <div className="col-md-6 shadow m-2" key={c._id}>
                        //     <Link
                        //         className="btn mt-4 mb-4 gx-2 gy-2"
                        //         to={`/category/${c.slug}`}>
                        //         {c.name}
                        //     </Link>
                        // </div>
                        <div className="col-md-4">
                            <div className=" shadow p-3 m-2 rounded" onClick={() => navigate(`/category/${c.slug}`)} role="button">{c.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
