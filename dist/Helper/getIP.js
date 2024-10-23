"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPFromReq = void 0;
function getIPFromReq(req) {
    const forwarded = req.headers["x-forwarded-for"];
    const clientIp = Array.isArray(forwarded)
        ? forwarded[0]
        : forwarded || req.socket.remoteAddress;
    const ip = clientIp && clientIp.includes("::ffff:")
        ? clientIp.split("::ffff:")[1]
        : clientIp;
    return ip;
}
exports.getIPFromReq = getIPFromReq;
