import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const createCheckoutSession = async (orderId) => {
  const response = await getApi()
    .post(`/payments/orders/${orderId}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
