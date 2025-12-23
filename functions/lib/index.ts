type ShippingService = {
  id: string;
  name: string;
  price: number;
};

type ShippingAppConfigSettings = {
  services: ShippingService[];
};

export async function getAppConfigSettings(
  req: SwellRequest,
  query?: Record<string, any>
): Promise<ShippingAppConfigSettings> {
  return req.swell.get(`/settings/${req.appId}/config`, query);
}
