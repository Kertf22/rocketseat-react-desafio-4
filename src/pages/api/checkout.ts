import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { items }: { items: { priceId: string, quantity: number }[] } = req.body;

    if (req.method !== 'POST') {
        return res.setHeader('Allow', 'POST').status(405).end('Method not allowed');
    };

    if (!items || !items.length) {
        return res.status(400).json({
            error: 'Missing priceId'
        })
    };

    const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = `${process.env.NEXT_URL}/cancel`
    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [...items],
        success_url,
        cancel_url
    });

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
};