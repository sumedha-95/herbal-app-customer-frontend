import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getFeedbacks = async (productId) => {
  const response = await getApi()
    .get(`/feedback/${productId}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const createFeedback = async (data, productId) => {
  const response = await getApi()
    .post(`/feedback/${productId}`, data)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const deleteFeedback = async (productId, feedbackId) => {
  const response = await getApi()
    .delete(`/feedback/${productId}/${feedbackId}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
