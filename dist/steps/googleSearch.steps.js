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
const GoogleSearchPage_1 = require("../pages/GoogleSearchPage");
(0, cucumber_1.setDefaultTimeout)(20000); // Increase default step timeout to 20 seconds
let googlePage;
(0, cucumber_1.Given)('I am on the Google search page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield this.initPage();
        googlePage = new GoogleSearchPage_1.GoogleSearchPage(page);
        yield googlePage.goto();
        // Accept cookies or handle popups if present
        try {
            const acceptBtn = yield page.$('button[aria-label="Accept all"]');
            if (acceptBtn)
                yield acceptBtn.click();
        }
        catch (_a) { }
    });
});
(0, cucumber_1.When)('I enter {string} in the Google search box', function (searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        yield googlePage.search(searchTerm);
        // Attach screenshot after entering search term
        if (this.page && this.attach) {
            const screenshot = yield this.page.screenshot({ type: 'png' });
            yield this.attach(screenshot, 'image/png');
        }
    });
});
(0, cucumber_1.When)('I click the Google search button', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Google auto-searches on Enter, so this can be a no-op or click 'Google Search' if visible
    });
});
(0, cucumber_1.Then)('I should see Google results page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(yield googlePage.isResultsPage()).toBeTruthy();
    });
});
