import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get categories

  const getCategory = async () => {
    try {
      const response = await axios.get("/api/v1/category/get-category");
      setCategories(response.data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return categories;
}
