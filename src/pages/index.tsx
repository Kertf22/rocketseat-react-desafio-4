import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Head from "next/head";
import { Product as IProduct } from "../types/Product";

interface HomeProps {
  products: IProduct[]
}

export default function Home(props: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })


  return (<>
    <Head>
      <title>Paulo Shop</title>
    </Head>
    <HomeContainer ref={sliderRef} className='keen-slider'>

      {props.products.map(product => {
        return (

          <Product
            href={`/products/${product.id}`}
            className="keen-slider__slide"
            key={product.id}
            prefetch={false}
          >
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt="camisa1"

            />
            <footer>
              <strong>
                {product.title}
              </strong>
              <span>{product.price}</span>
            </footer>
          </Product>)
      })}

    </HomeContainer>
  </>

  )
}


export const getServerSideProps: GetServerSideProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {

    const default_price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      price: new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' })
        .format(default_price.unit_amount ? default_price.unit_amount / 100 : 0),
      title: product.name,
      description: product.description,
      imageUrl: product.images[0],
      url: product.url,
      defaultPriceId: default_price.id
    }
  });

  return {
    props: {
      products
    }
  }
};