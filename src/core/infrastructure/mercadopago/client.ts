export const mercadoPagoConfig = {
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? '',
};

export function createMercadoPagoClient() {
  return {
    config: mercadoPagoConfig,
    note: 'Cliente Mercado Pago será implementado aqui quando a integração estiver pronta.',
  };
}
