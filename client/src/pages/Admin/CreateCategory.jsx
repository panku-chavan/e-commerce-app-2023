import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateCategory = () => {
    const [category, setCategory] = useState([]);

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
                                                <td><button className='btn'>Edit</button></td>
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