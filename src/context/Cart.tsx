import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { Cart } from "../types/Cart";
import { Product } from "../types/Product";


interface CartContextType {
    cart: Cart;
    addToCart: (item: Product) => void;
    subtractFromCard: (id: string) => void;
    removeFromCard: (id: string) => void;
    handleButInCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);


const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<Cart>({
        items: []
    });

    const addToCart = (item: Product) => {

        const itemIndex = cart.items.findIndex((itemCart) => itemCart.id === item.id);
        // Vou adcionar mais uma quantidade
        if (itemIndex > -1) {
            const newCart = { ...cart }

            newCart.items[itemIndex].quantity += 1;

            setCart(newCart)
            addCartToLocalStorage(newCart)
            return;
        }

        const newItem = {
            ...item,
            quantity: 1
        }

        const newCart: Cart = {
            ...cart,
            items: [...cart.items, newItem]
        }
        setCart(newCart)
        addCartToLocalStorage(newCart)
    }

    const subtractFromCard = (id: string) => {
        const itemIndex = cart.items.findIndex((itemCart) => itemCart.id === id);

        let newCart = { ...cart }
        // Vou adcionar mais uma quantidade
        if (itemIndex > -1) {
            newCart = { ...cart }

            newCart.items[itemIndex].quantity -= 1;

            setCart(newCart)
        }

        const item = cart.items[itemIndex];

        if (item.quantity <= 0) {
            console.log(cart.items.filter((itemCart) => itemCart.id != item.id))
            newCart = { items: cart.items.filter((itemCart) => itemCart.id != item.id) }

            setCart(newCart)
        }

        addCartToLocalStorage(newCart)
    }

    const removeFromCard = (id: string) => {
        const newCart: Cart = { items: cart.items.filter((itemCart) => itemCart.id != id) }

        setCart(newCart)
        addCartToLocalStorage(newCart)
    };

    const addCartToLocalStorage = (cart: Cart) => {
        localStorage.setItem('paulo_shop', JSON.stringify(cart))
    }

    const getCarFromLocalStorage = () => {
        return localStorage.getItem('paulo_shop');
    };

    const handleButInCart = async () => {
        try {
            // setIsCreatingCheckoutSession(true)
            const response = await axios.post(`/api/checkout`, {
                items: cart.items.map((item) => ({ price: item.defaultPriceId, quantity: item.quantity })),
            });

            const { checkoutUrl } = response.data;
            addCartToLocalStorage({ items: [] })
            window.location.href = checkoutUrl;
        } catch (error) {

            // setIsCreatingCheckoutSession(false)
            alert("Falha ao comprar o produto");
        }
    };

    useEffect(() => {
        const localCart = getCarFromLocalStorage();

        if (localCart) {
            setCart(JSON.parse(localCart))
        }
    }, [])


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCard, subtractFromCard, handleButInCart }}>
            {children}
        </CartContext.Provider>
    )
};


export { CartContext, CartProvider };
