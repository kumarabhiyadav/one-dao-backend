import { Request } from "express";

export function getIPFromReq(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];
  const clientIp = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded || req.socket.remoteAddress;
  const ip =
    clientIp && clientIp.includes("::ffff:")
      ? clientIp.split("::ffff:")[1]
      : clientIp;

  return ip;
}
