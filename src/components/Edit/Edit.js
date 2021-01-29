import React, {useEffect, useState} from "react"
import {Redirect} from "react-router-dom"
import EditUI from "./EditUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";


const Edit = (props) => {
    const [state, setState] = useState({
        category: [],
        product: {
            name: "",
            description: "",
            price_cost: "",
            price_vent: "",
            inStock: 1,
            category: "",
            _public: false,
            image: null
        },
        load: true
    });
    const {name, description, price_cost, price_vent, inStock, category, _public, image} = state.product;
    const ID = props.match.params.id;
    const TOKEN = {token: authHelper()};
    useEffect(() => {
        send({...TOKEN}, "/api/product/" + ID, "get")
            .then(r => setState({
                ...state, product: {...r}, load: false
            }));
    }, [])

    const handlePublic = (e) => {
        setState({
            ...state,
            product: {
                ...state.product,
                [e.target.name]: e.target.checked
            }
        })
    }

    const handleChange = (e) => {
        setState({
            ...state,
            product: {
                ...state.product,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleFile = (file) => {
        setState({
            ...state,
            product: {
                ...state.product,
                image: file
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description && price_cost && price_vent && category) {
            let form = new FormData()
            form.append("image", image)
            form.append("name", name)
            form.append("description", description)
            form.append("_public", _public)
            form.append("price_cost", price_cost)
            form.append("price_vent", price_vent)
            form.append("inStock", inStock)
            form.append("category", category)
            send({form, token: authHelper()}, '/api/product/' + ID + '/', "putFile")
                .then(r => {
                    store.dispatch({
                        type: "ADD_NEW_PRODUCT"
                    })
                    console.log(r)
                    redirect();
                })

        } else console.error("You must fill up all input fields.")

        console.log(state)
    }

    function redirect() {
        return <Redirect to="/home/my_products"/>
    }

    return <EditUI
        image={image}
        handlePublic={(e) => handlePublic(e)}
        handleFile={(file) => handleFile(file)}
        handleChange={(e) => handleChange(e)}
        name={name}
        description={description}
        price_cost={price_cost}
        price_vent={price_vent}
        inStock={inStock}
        Product_category={category}
        _public={_public}
        handleSubmit={(e) => handleSubmit(e)}
    />
}
export default Edit