import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const processCart = async (cart) => {
  const response = await getApi()
    .post("/orders/cart", cart)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const createOrder = async (order) => {
  const response = await getApi()
    .post("/orders", order)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
