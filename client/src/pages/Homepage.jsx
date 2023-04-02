import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const Homepage = () => {
  // const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //get categories

  // get all category
  const getAllCategory = async () => {
    try {
      const response = await axios.get("/api/v1/category/get-category");
      if (response.data?.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
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

  const handleFilter = (value, id) => {
    // console.log(value, id)
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2 ">
          <h4 className="text-center mt-2">Filter By Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <div key={c._id} style={{ marginLeft: "20px" }}>
                <Checkbox
                  className="mt-2"

                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <h4 className="text-center mt-2">Filter By Price</h4>
          <div className="d-flex flex-column ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {
                Prices?.map((p) => (
                  <div key={p._id} className="" style={{ marginLeft: "20px" }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))
              }
            </Radio.Group>

          </div>

        </div>

        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <h2 className="text-center">All Products</h2>
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
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Rs. {p.price} </p>
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

export default Homepage;
