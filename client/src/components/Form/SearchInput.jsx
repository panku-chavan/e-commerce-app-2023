import React from "react";
import { useSearch } from "../../Context/SearchContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [value, setValue] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `/api/v1/products/search-product/${value.keyword}`
            );
            setValue({ ...value, result: response.data });
            navigate("/search")

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };
    console.log(value)
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={value.keyword}
                    onChange={(e) =>
                        setValue({
                            ...value,
                            keyword: e.target.value,
                        })
                    }
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
