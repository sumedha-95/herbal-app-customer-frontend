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

export const getPaginatedSelfOrders = async (page, limit, orderBy) => {
  const response = await getApi()
    .get("/orders/self/all", {
      params: {
        page,
        limit,
        orderBy,
      },
    })
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getOrderById = async (orderId) => {
  const response = await getApi()
    .get(`/orders/${orderId}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
