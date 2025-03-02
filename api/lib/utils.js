export const getUserIdFromContext = (c) => {
  const payload = c.get("jwtPayload");
  return payload.userId;
};
