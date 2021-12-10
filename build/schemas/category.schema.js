"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer();
const name = joi_1.default.string().min(3).max(15);
const image = joi_1.default.string().uri();
const createCategorySchema = joi_1.default.object({
    name: name.required(),
    image: image.required()
});
const updateCategorySchema = joi_1.default.object({
    name: name,
    image: image
});
const getCategorySchema = joi_1.default.object({
    id: id.required(),
});
module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
