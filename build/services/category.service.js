"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = require('./../libs/sequelize');
class CategoryService {
    constructor() {
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield models.Category.create(data);
            return newCategory;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.Category.findAll();
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Category = yield models.Category.findByPk(id);
            if (!Category) {
                throw boom_1.default.notFound('Category not found');
            }
            return Category;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const Category = yield this.findOne(id);
            const rta = yield Category.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Category = yield this.findOne(id);
            yield Category.destroy();
            return "ok";
        });
    }
}
module.exports = CategoryService;
