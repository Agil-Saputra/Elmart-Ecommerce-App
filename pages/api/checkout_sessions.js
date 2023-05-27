
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const body = req.body

  const line_items = await body?.items?.map(item => {
    return {
      price_data : {
        currency : 'usd',
        product_data : {
          name : item.title,
          images : ['https:' + item.productImages[0].fields.file.url],
          metadata : {
            productId : item.slug,
          }
        },
        unit_amount : item.price * 100
      },
      quantity : item.quantity
    }
  })

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}`,
      });


      res.status(200).json({
        url : session.url,
        items : body.items
      })
}