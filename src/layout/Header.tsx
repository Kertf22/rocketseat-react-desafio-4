
import Image from "next/image";
import logoSVG from "../assets/logo.svg";
import { HeaderCart, HeaderContainer } from "../styles/pages/app";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/Cart";
import Router from "next/router";

export const Header = () => {


    const onCartClick = () => {
        Router.push("/cart")
     }

    const { cart } = useContext(CartContext)

    const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <HeaderContainer>
            <Image
                {...logoSVG}

                alt="logo" 
                onClick={() => { Router.push("/")}}
                style={{ cursor: "pointer" }}
                />


            <HeaderCart onClick={onCartClick}>
                <FaShoppingCart size={18} /><span>{quantity}</span >
            </HeaderCart>

        </HeaderContainer>
    )

}