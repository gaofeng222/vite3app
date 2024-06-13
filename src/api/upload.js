import request from "../utils/request";

export const uploadFileApi = (data) => {
  return request({
    url: "/upload",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
