import { getApi} from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getPaginatedProducts = async (page,limit,orderBy) => {
    const response = await getApi()
      .get("/products", {
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

