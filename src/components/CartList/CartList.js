import React, {useState} from "react";
import store from "../../store";
import msgNotification from "../../js/msgNotification";
import toastr from "toastr";
import CartListUI from "./CartListUI";

const CartList = () => {
    const [products, setProducts] = useState({...store.getState().cart})

    const handleChange = (e, product) => {
        if (e.target.value === "0") {
            e.target.value = 1
            toastr.warning("If you dont want this product here please 'Remove item' but 0 is not valid here", "WARNING !")
        }

        store.dispatch({
            type: "SET_PRODUCT_QUANTITY",
            product: {
                category: product.category,
                description: product.description,
                id: product.id,
                image: product.image,
                inStock: +e.target.value,
                name: product.name,
                price_cost: product.price_cost,
                price_vent: 0,
                _public: product._public

            }
        })


    }

    const handleClick = (id) => {
        msgNotification("Confirm", "Are you sure of delete this item ?", "question", "OK", true, "CANCEL")
            .then((r) => {
                if (r.value) {
                    store.dispatch({
                        type: "DELETE_FROM_CART",
                        id
                    })
                }
            })
    }

    store.subscribe(() => {
        setProducts({...store.getState().cart})
    })


    return <CartListUI
        products={products}
        handleClick={(e)=>handleClick(e)}
        handleChange={(e,p)=>handleChange(e,p)}
    />
}
export default CartList