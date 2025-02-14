import axios from "axios";
import dayjs from "dayjs";

import { parseJwtPayload } from "./utils";

const server = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

server.interceptors.request.use(async (config) => {
  try {
    const { token } = JSON.parse(sessionStorage.getItem("session"));

    if (token) {
      const payload = parseJwtPayload(token);
      const expirationTime = dayjs.unix(payload.exp);
      const currentTime = dayjs();
      const diffMinutes = expirationTime.diff(currentTime, "minute");

      if (diffMinutes <= 0) {
        const i = JSON.parse(localStorage.getItem("i"));

        if (i) {
          const iPayload = parseJwtPayload(i);
          const iExpirationTime = dayjs.unix(iPayload.exp);
          const iDiffMinutes = iExpirationTime.diff(currentTime, "minute");

          if (iDiffMinutes <= 0) {
            localStorage.removeItem("i");
            window.location.href = "/";
            return;
          }
        }

        sessionStorage.removeItem("session");
        window.location.href = "/";
        return;
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    /* empty */
  }

  return config;
});

export default server;
