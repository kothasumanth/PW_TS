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
exports.GoogleSearchPage = void 0;
class GoogleSearchPage {
    constructor(page) {
        this.page = page;
    }
    goto() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('https://www.google.com');
        });
    }
    search(term) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector('textarea[name="q"]', { timeout: 20000 });
            yield this.page.fill('textarea[name="q"]', term);
            // Wait for suggestions to load and press Enter
            yield this.page.waitForTimeout(1000);
            yield this.page.keyboard.press('Enter');
            // Wait for results page to load
            yield this.page.waitForSelector('#search', { timeout: 20000 });
        });
    }
    isResultsPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector('#search');
            return this.page.locator('#search').isVisible();
        });
    }
}
exports.GoogleSearchPage = GoogleSearchPage;
