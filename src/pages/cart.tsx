import { CartContext } from "../context/Cart";
import { useContext } from "react";
import Router from "next/router";
import {
    CartContainer, CartItems,
    CartItem, CartItemInfo, CartItemQuantity, CartDetails, CartPrice, CartImageContainer
} from "../styles/pages/cart";
import Image from "next/image";

export default function CartPage() {

    const { cart: { items }, handleButInCart, subtractFromCard, addToCart } = useContext(CartContext);

    const sumPriceItems = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const entrega = 5.00;

    const finalPrice = sumPriceItems + entrega;

    const formatPrice = (price: number) => {
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <CartContainer>
            <h2>Produtos selecionados</h2>


            {(items.length === 0) ?
                <>
                    <CartDetails>
                        <h4>The cart is empty</h4>
                    </CartDetails>
                    <button color="secondary" onClick={() => Router.push("/")}>
                        Voltar para a loja
                    </button>
                </>

                :
                <>
                    <CartItems>
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                            >
                                <CartImageContainer>
                                    <Image
                                        src={item.imageUrl}
                                        width={75}
                                        height={70}
                                        alt={item.title}
                                    />
                                </CartImageContainer>


                                <CartItemInfo>
                                    <h4>{item.title}</h4>
                                    <CartItemQuantity>
                                        <span onClick={() => subtractFromCard(item.id)}>-</span>
                                        <span>{item.quantity}</span>
                                        <span onClick={() => addToCart(item)}>+</span>
                                    </CartItemQuantity>
                                </CartItemInfo>
                            </CartItem>
                        ))}
                    </CartItems>

                    <CartDetails>
                        <CartPrice>
                            <span>Total de itens</span>
                            <span><strong>{formatPrice(sumPriceItems)}</strong></span>

                        </CartPrice>
                        <CartPrice>
                            <span>Entrega</span>
                            <span><strong>{formatPrice(entrega)}</strong></span>
                        </CartPrice>
                        <CartPrice>
                            <span>Total</span>
                            <span><strong>{formatPrice(finalPrice)}</strong></span>
                        </CartPrice>
                    </CartDetails>

                    <button color="secondary" onClick={handleButInCart}>
                        CONFIRMAR PEDIDO
                    </button>
                </>
            }
        </CartContainer>
    );
}