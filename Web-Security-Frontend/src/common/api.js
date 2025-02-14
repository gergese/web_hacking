import server from "./server";

const get = async (url) => {
  const res = await server.get(url);
  return res?.data?.data;
};

export const getMyAccount = async () => {
  return await get("users/account");
};

export const getMyBalance = async () => {
  return await get("users/balance");
};

export const getAllEvents = async () => {
  return get("/events");
};

export const getEventInfo = async ({ queryKey }) => {
  const id = queryKey[1];
  return get(`/events/${id}`);
};
