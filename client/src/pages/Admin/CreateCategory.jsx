import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Modal } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";


const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    // input form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} category is created successfully.`);
                getAllCategory();
                setName("");
            } else {
                toast.error(data.messege);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };

    // get all category
    const getAllCategory = async () => {
        try {
            const response = await axios.get("/api/v1/category/get-category");
            if (response.data.success) {
                setCategory(response.data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wron in getting category");
        }
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data) {
                toast.success("Category updated successfully.");
                setSelected(null);
                setUpdatedName("");
                setOpen(false);
                getAllCategory();
            } else {
                toast.success(data.messege);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    const handleDelete = async (id, name) => {
        try {
            await axios.delete(`/api/v1/category/delete-category/${id}`);
            toast.success(`${name} category deleted successfully.`);
            getAllCategory();
        } catch (error) {
            console.log(error);
            toast.error("Something wemt wrong.");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <Layout title={"Dashboard-Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p3 w-50">
                            <CategoryForm
                                value={name}
                                setValue={setName}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category?.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button
                                                    className="btn hover"
                                                    title="Edit Category"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    <FiEdit />
                                                </button>
                                                <button
                                                    title="Delete category"
                                                    className="btn hover "
                                                    onClick={() => handleDelete(c._id, c.name)}
                                                >
                                                    <BsTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
                            <h4>Edit Category</h4>
                            <div>
                                <CategoryForm
                                    value={updatedName}
                                    setValue={setUpdatedName}
                                    handleSubmit={handleEdit}
                                />
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
