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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
let globalBrowser = null;
class CustomWorld extends cucumber_1.World {
    constructor(options) {
        super(options);
        this.browser = null;
        this.page = null;
        this.petId = null;
        if (!globalBrowser) {
            // Will be initialized in initPage
        }
        this.browser = globalBrowser;
    }
    initPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!globalBrowser) {
                globalBrowser = yield test_1.chromium.launch({ channel: 'msedge', headless: false });
            }
            this.browser = globalBrowser;
            this.page = yield this.browser.newPage();
            return this.page;
        });
    }
    closePage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page)
                yield this.page.close();
        });
    }
}
exports.CustomWorld = CustomWorld;
(0, cucumber_1.setWorldConstructor)(CustomWorld);
(0, cucumber_1.AfterAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (globalBrowser) {
            yield globalBrowser.close();
            globalBrowser = null;
        }
    });
});
