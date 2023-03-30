import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState('');

    // input form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name
            })
            if (data?.success) {
                toast.success(`${name} category is created successfully.`)
                getAllCategory();
                setName('');
            } else {
                toast.error(data.messege);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in input form")
        }
    }

    // get all category
    const getAllCategory = async () => {
        try {
            const response = await axios.get('/api/v1/category/get-category');
            if (response.data.success) {
                setCategory(response.data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wron in getting category");
        }
    };

    const handleDelete = async (id, name) => {
        try {
            await axios.delete(`/api/v1/category/delete-category/${id}`);
            toast.success(`${name} category deleted successfully.`)
            getAllCategory();
        } catch (error) {
            console.log(error);
            toast.error("Something wemt wrong.")
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])



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
                            <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        category?.map(c => (

                                            <tr key={c._id}>
                                                <td >{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2'>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(c._id, c.name)} >delete</button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default CreateCategory