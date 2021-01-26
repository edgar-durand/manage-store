import React, {useState, useEffect} from "react";
import NewProductFormUI from "./NewProductFormUI";
import send from "../js/send";
import authHelper from "../js/authHelper";
import store from "../store";

const NewProductForm = () => {
    const [state, setState] = useState({
        token: authHelper(),
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
        }
    });
    const {name, description, price_cost, price_vent, inStock, category, _public} = state.product;
    useEffect(() => {
        send(state, "/api/category", "get")
            .then(r => setState({...state, category: [r]}))
    }, [])



    const handleFile = (file) => {
        // let form = new FormData
        // form.append("image",file)
        setState({
            ...state, product: {...state.product, image: file}
        })
        // getBase64(file).then(r => setState({
        //     ...state, product: {...state.product, image: r}
        // }))
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description && price_cost && price_vent && category) {
            send({...state.product, token: authHelper()}, '/api/product/', "post")
                .then(() => {
                    store.dispatch({
                        type:"ADD_NEW_PRODUCT"
                    })

                })
        }else console.error("You must fill up all input fields.")
    }


    return <NewProductFormUI
        handlePublic={(e) => handlePublic(e)}
        handleFile={(file) => handleFile(file)}
        handleChange={(e) => handleChange(e)}
        category={state.category}
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
export default NewProductForm