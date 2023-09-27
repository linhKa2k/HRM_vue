import { HTTP_HEADER } from "./constants";

export const fetchApi = (domain = {}, params = {}, body) => {
  return new Promise((resolve, reject) => {
    let currentParams = "";

    if (params.textSearch) {
      currentParams = `?page=${params.page}&limit=${params.limit}&textSearch=${params.textSearch}`;
    } else if (params.page) {
      currentParams = `?page=${params.page}&limit=${params.limit}`;
    } else if (params.id) {
      currentParams = `/${params.id}`;
    } else {
      currentParams = "";
    }

    const URL = `${domain.url}${currentParams}`;

    return fetch(URL, {
      method: domain.method,
      headers: HTTP_HEADER.JSON,
      body: body && JSON.stringify(body),
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};
