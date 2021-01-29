import React, { useState, useEffect } from "react"
import CategoryListUI from "./CategoryListUI"
import send from "../../js/send"
import authHelper from "../../js/authHelper"

import { Redirect } from "react-router-dom/cjs/react-router-dom.min"

const CategoryList = () => {
  const [categories, setCategories] = useState("");

  useEffect(() => {
    send({token: authHelper()}, "/api/category/", "get")
        .then(r => setCategories({...r}))
}, [])

const handleClick = (id) => {
    send({token: authHelper()}, `/api/category/${id}`, "delete")
        .then(() => {
           console.log("deleted")
           return <Redirect to='/home/my_products/'/>
        })
}

 
  return <CategoryListUI 
  categories={categories} 
  handleClick={handleClick}
  />;
};

export default CategoryList;
