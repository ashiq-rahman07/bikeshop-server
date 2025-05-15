import { stripe } from "./payment.utils";


const createPayment  = async (amount:number) => {
try {


    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

   return ({ clientSecret: paymentIntent.client_secret });

} catch (error: any) {
     console.error(error);
   
}

 
};


export const PaymentService = {
 createPayment
};