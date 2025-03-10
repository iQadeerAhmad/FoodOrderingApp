import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import products from "@/assets/data/products";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])
    const addItem = (product: Product, size: CartItem['size']) => {
        // if already in cart, increment quantity

        const newCartItem: CartItem = {

            id: '1', // generate random id
            product,
            product_id: product.id,
            size,
            quantity: 1,
        }
        setItems([newCartItem, ...items])

    }
    //update quantity
    return (
        <CartContext.Provider value={{ items, addItem }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => useContext(CartContext)