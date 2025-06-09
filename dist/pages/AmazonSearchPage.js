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
exports.AmazonSearchPage = void 0;
class AmazonSearchPage {
    constructor(page) {
        this.page = page;
    }
    goto() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('https://www.amazon.com');
            // Wait for the search box to be visible
            yield this.page.waitForSelector('input#twotabsearchtextbox', { timeout: 20000 });
            // Dismiss location/cookie popups if present
            try {
                const dismissBtn = yield this.page.$('input[name="glowDoneButton"]');
                if (dismissBtn)
                    yield dismissBtn.click();
            }
            catch (_a) { }
        });
    }
    search(term) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector('input#twotabsearchtextbox', { timeout: 10000 });
            yield this.page.fill('input#twotabsearchtextbox', term);
        });
    }
    clickSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.click('input#nav-search-submit-button');
            yield this.page.waitForSelector('div.s-main-slot', { timeout: 10000 });
        });
    }
    isResultsPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector('div.s-main-slot');
            return this.page.locator('div.s-main-slot').isVisible();
        });
    }
}
exports.AmazonSearchPage = AmazonSearchPage;
