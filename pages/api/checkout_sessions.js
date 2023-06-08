const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const body = req.body;
  const { countryName, stateName, streetAddress, zipCode, cityName, recipientName, recipientEmail } =
    body?.address;

  const line_items = await body?.items?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: ["https:" + item.productImages[0].fields.file.url],
          description: item.choosedVariant,
          metadata: {
            productId: item.slug,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_intent_data: {
      shipping: {
        name: recipientName,
        address: {
          line1: streetAddress,
          city: cityName,
          postal_code: zipCode,
          state: stateName,
          country: countryName,
        },
      },
    },
    customer_email : recipientEmail,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 500,
            currency: "usd",
          },
          display_name: "Ground shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    custom_text : {
     submit : {
      message : `Your Shipping Address : ${countryName}, ${stateName}, ${cityName}, ${streetAddress} ${zipCode}`
     }
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/mycart`,
    payment_method_types: ["card"],
  });

  res.status(200).json({
    url: session.url,
    items: body.items,
  });
}
