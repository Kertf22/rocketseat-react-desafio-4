import { CartContext } from "@/src/context/Cart";
import { stripe } from "@/src/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/products";
import { Product } from "@/src/types/Product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import Stripe from "stripe";

interface ProductProps {
    product: Product
}


export default function ProductPage({ product }: ProductProps) {

    const { addToCart } = useContext(CartContext);

    function handleAddToCart() {
        addToCart(product);
    }

    return (
        <>
            <Head>
                <title>{product.title} | Paulo Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="camisa1" />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.title}</h1>
                    <span>{product.priceFormat}</span>

                    <p>{product.description}</p>

                    <button  onClick={handleAddToCart}>{'Adcionar ao carrinho'}</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
};


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_NBbwLtj08qZxGa' } }
        ],
        fallback: true
    }
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params?.id;

    if (!productId) {
        return {
            notFound: true
        }
    };

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const default_price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                price: default_price.unit_amount ? default_price.unit_amount / 100 : 0,
                priceFormat: new Intl.NumberFormat('pt-BR',
                    { style: 'currency', currency: 'BRL' })
                    .format(default_price.unit_amount ? default_price.unit_amount / 100 : 0),
                title: product.name,
                description: product.description,
                imageUrl: product.images[0],
                url: product.url,
                defaultPriceId: default_price.id
            }
        },
        revalidate: 60 * 60 * 24 // 24 hours
    };
};