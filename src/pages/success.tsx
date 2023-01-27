import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {

    customerName: string

    product: {
        name: string
        imageUrl: string
    }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Paulo Shop</title>

                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>

                <h1>Compra realizada com sucesso!</h1>

                <ImageContainer>
                    <Image src={product.imageUrl} alt={product.name} width={120} height={120} />
                </ImageContainer>

                <p>
                    Uhuul!  <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
                </p>

                <Link href={""}>
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
};


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { session_id: sessionId } = query;

    if (!sessionId) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    };




    const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
        expand: ['line_items', 'line_items.data.price.product']
    });


    const customerName = session.customer_details?.name;

    const product = session.line_items?.data[0].price?.product as Stripe.Product;

    return {
        props: {

            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0],
            }
        }
    }
}