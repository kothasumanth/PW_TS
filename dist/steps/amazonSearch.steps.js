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
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const AmazonSearchPage_1 = require("../pages/AmazonSearchPage");
(0, cucumber_1.setDefaultTimeout)(20000); // Increase default step timeout to 20 seconds
let amazonPage;
(0, cucumber_1.Given)('I am on the Amazon home page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield this.initPage();
        amazonPage = new AmazonSearchPage_1.AmazonSearchPage(page);
        yield amazonPage.goto();
        // Handle Amazon popups if present (e.g., location, cookies)
        try {
            const dismissBtn = yield page.$('input[name="glowDoneButton"]');
            if (dismissBtn)
                yield dismissBtn.click();
        }
        catch (_a) { }
    });
});
(0, cucumber_1.When)('I enter {string} in the Amazon search box', function (searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        yield amazonPage.search(searchTerm);
    });
});
(0, cucumber_1.When)('I click the Amazon search button', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield amazonPage.clickSearch();
    });
});
(0, cucumber_1.Then)('I should see Amazon search results page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(yield amazonPage.isResultsPage()).toBeTruthy();
    });
});
