# Swell Shipping Service Example

An example Swell app that provides shipping rates through a **shipping extension**. Use it as a reference for integrating any shipping carrier or custom rate logic with Swell checkout.

## What it demonstrates

- Declaring a **shipping extension** in `swell.json` so the app can provide shipment rating for a store
- Handling the `order.shipping` event with an app function that returns rates when Swell calculates shipping options
- **App settings** for carrier API credentials

## How it works

When Swell calculates shipping options for a cart or order — for example, when a customer enters their address at checkout — it triggers the `order.shipping` event hook. The app's function responds with a `shipment_rating` object containing the services and prices to offer:

```ts
export default async function (req: SwellRequest) {
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
```

The returned services appear as shipping options the customer can select. A real integration would use the order data on `req.data` (items, shipping address) and the carrier credentials from app settings to request live rates from the carrier's API.

## Project structure

```
swell.json               App config with the shipping extension declaration
settings/config.json     Carrier credential settings (api_key)
functions/
  calculate.ts           order.shipping handler returning shipment rates
```

## Setup

Requires the [Swell CLI](https://developers.swell.is/apps/cli) and a Swell account.

```bash
npm install -g @swell/cli
swell login

git clone git@github.com:swellstores/shipping-example-app.git
cd shipping-example-app
npm install

swell app push
```

Then, in your test environment dashboard, open **Apps > Shipping Example > Settings** to configure the carrier API key (unused by the example handler, but shows where real credentials would live).

To see it in action, add an item to a cart in your test storefront and proceed to shipping at checkout — the example service appears as an option priced at $10.

## Notes

- The extension declaration is just `{ "id": "example", "type": "shipping" }`. A shipping extension may also specify a `carrier` id (defaults to the extension id) along with `carrier_logo_src` and `carrier_icon_src` assets.
- Return multiple entries in `shipment_rating.services` to offer several service levels (standard, express, etc.).
- This app is an example for learning and building from — review it carefully and test with your carrier's sandbox before using any of it in production.

## Documentation

- [Swell Apps overview](https://developers.swell.is/apps/overview)
- [Extensions](https://developers.swell.is/apps/extensions)
- [Functions](https://developers.swell.is/apps/functions)
- [Settings](https://developers.swell.is/apps/settings)
