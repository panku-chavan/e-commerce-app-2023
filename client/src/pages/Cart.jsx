import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart.map((c) => {
                total = total + c.price;
            });
            return total.toLocaleString(
                // "en-US", {
                // style: "currency",
                // currency: "USD"
                "hi-IN",
                {
                    style: "currency",
                    currency: "INR",
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const removeCartItem = (id) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === id);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
            toast.success("Item removed into cart.");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Your Cart"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 1
                                ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"
                                }`
                                : "Your Cart is Empty."}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        {cart?.map((p) => (
                            <div className="row shadow mt-2 rounded mb-4">
                                <div className="col-md-4 mt-2">
                                    <img
                                        src={`/api/v1/products/product-image/${p._id}`}
                                        alt={p.name}
                                        className=" p-4 rounded mb-2"
                                        height={"200px"}
                                        width={"200px"}
                                    />
                                </div>
                                <div className="col-md-8 mt-4 mb-4">
                                    <h6>Name : {p?.name}</h6>
                                    <h6>Description : {p?.description}</h6>
                                    {/* <h6>Category : {p?.category?.name}</h6> */}
                                    <h6>Quantity : {p?.quantity}</h6>
                                    <h6>Shipping : {p?.shipping ? "Yes" : "No"}</h6>
                                    <h6>Price : ₹ {p?.price}</h6>
                                    <div>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-5 mb-2 text-center ">
                        {cart?.length ? (
                            <>
                                <div className="shadow mt-2 mb-3 p-2 rounded">
                                    <h3>Cart Summery</h3>
                                    <h6>Total | Checkout | Payment</h6>
                                    <hr />
                                    <h4>Total :{totalPrice()}</h4>
                                </div>
                                {auth?.user?.address ? (
                                    <div className=" shadow mt-3 mb-2 p-2 rounded">
                                        <h4>Current Adress</h4>
                                        <hr />
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update
                                        </button>
                                    </div>
                                ) : (
                                    <div className="shadow mt-3 mb-2 p-2 rounded">
                                        {auth?.token ? (
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => navigate("/dashboard/user/profile")}
                                            >
                                                Update Adress
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() =>
                                                    navigate("/login", {
                                                        state: "/cart",
                                                    })
                                                }
                                            >
                                                Please Login to Checkout
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
