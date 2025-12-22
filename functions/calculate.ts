import { getAppConfigSettings } from "./lib";

export const config: SwellConfig = {
  extension: "example",
  description: "Provide shipping rates from Example Shipping",
  model: {
    events: ["order.shipping"],
    conditions: {},
  },
};

export default async function (req: SwellRequest) {
  const { currency } = req.data;
  const settings = await getAppConfigSettings(req, { $currency: currency });

  return {
    shipment_rating: {
      services: settings.services.map((service) => ({
        id: service.id,
        name: service.name,
        price: service.price,
      })),
    },
  };
}
