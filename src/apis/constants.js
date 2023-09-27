import { DOMAIN_DEVELOVPMENT } from "@/utils/constants";

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const HTTP_HEADER = {
  JSON: { "Content-Type": "application/json" },
};

export const BUSSINESS = {
  GET_DATA: {
    url: `${DOMAIN_DEVELOVPMENT}/pagination`,
    method: HTTP_METHOD.GET, 
  },
  ADD_DATA: {
    url: `${DOMAIN_DEVELOVPMENT}/add`,
    method: HTTP_METHOD.POST,
  },
  DELETE_DATA: {
    url: `${DOMAIN_DEVELOVPMENT}/delete`,
    method: HTTP_METHOD.DELETE,
  },
  UPDATE_DATA: {
    url: `${DOMAIN_DEVELOVPMENT}/update`,
    method: HTTP_METHOD.PUT,
  },
  SEARCH_DATA: {
    url: `${DOMAIN_DEVELOVPMENT}/search`,
    method: HTTP_METHOD.GET,
  },
};
