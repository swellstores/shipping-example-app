export const config: SwellConfig = {
  extension: "example",
  description: "Provide shipping rates from Example Shipping",
  model: {
    events: ["order.shipping"],
    conditions: {},
  },
};

export default async function (req: SwellRequest) {
  // const { swell, store, data } = req;

  return {
    shipment_rating: {
      services: [
        {
          id: "example-standard",
          price: 10,
        },
      ],
    },
  };
}
