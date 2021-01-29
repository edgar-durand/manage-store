import React, {useState, useEffect} from "react";
import NewProductFormUI from "./NewProductFormUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";

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
        send({token: authHelper()}, "/api/category", "get")
            .then(r => setState({...state, category: [r]}))
    }, [])


    const handleFile = (file) => {

        setState({
            ...state, product: {...state.product, image: file}
        })
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

        let form = new FormData()
        form.append("image", state.product.image)
        form.append("name", name)
        form.append("description", description)
        form.append("_public", _public)
        form.append("price_cost", price_cost)
        form.append("price_vent", price_vent)
        form.append("inStock", inStock)
        form.append("category", category)


        if (name && description && price_cost && price_vent && category) {
            send({form, token: authHelper()}, '/api/product/', "file")
                .then((r) => {
                    store.dispatch({
                        type: "ADD_NEW_PRODUCT"
                    })
                    console.log(r)
                })

        } else console.error("You must fill up all input fields.")

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