"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email) => emailRegex.test(email);
exports.isValidEmail = isValidEmail;
