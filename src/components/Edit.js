import React, {useEffect, useState} from "react"
import EditUI from "./EditUI";
import send from "../js/send";
import authHelper from "../js/authHelper";
import getBase64 from "../js/getBase64";
import store from "../store";


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
        getBase64(file).then(r => setState({
            ...state, product: {...state.product, image: r}
        }))
            .catch(()=>setState({
                ...state, product: {...state.product, image: ""}
            }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description && price_cost && price_vent && category) {
            send({...state.product, token: authHelper()}, '/api/product/' + ID+'/', "put")
                .then(r => {
                    store.dispatch({
                        type:"ADD_NEW_PRODUCT",
                        ...r
                    })
                    console.log(r)
                })
        } else console.error("You must fill up all input fields.")
        console.log(state)
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