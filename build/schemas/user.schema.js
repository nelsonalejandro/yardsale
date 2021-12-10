"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer();
const email = joi_1.default.string().email();
const password = joi_1.default.string().min(8);
const role = joi_1.default.string().min(5);
const createUserSchema = joi_1.default.object({
    email: email.required(),
    password: password.required(),
    role: role.required()
});
const updateUserSchema = joi_1.default.object({
    email: email,
    role: role,
});
const getUserSchema = joi_1.default.object({
    id: id.required(),
});
module.exports = { createUserSchema, updateUserSchema, getUserSchema };
