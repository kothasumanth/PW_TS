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
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const axios_1 = __importDefault(require("axios"));
let response;
(0, cucumber_1.Given)('I have a pet with ID {int}', function (petId) {
    return __awaiter(this, void 0, void 0, function* () {
        this.petId = petId;
    });
});
(0, cucumber_1.When)('I request the pet details', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield axios_1.default.get(`https://petstore.swagger.io/v2/pet/${this.petId}`);
        // Attach response to the report
        if (this.attach) {
            this.attach(JSON.stringify(response.data, null, 2), 'application/json');
        }
    });
});
(0, cucumber_1.Then)('the response should contain the pet information', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(response.status).toBe(200);
        (0, test_1.expect)(response.data.id).toBe(this.petId);
    });
});
