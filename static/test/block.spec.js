import { expect } from "chai";
import { merge } from "../utils/merge.js";
describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
        expect(merge({ 'a': 1 }, { 'b': 2 }), "Hello mocha");
    });
});
//# sourceMappingURL=block.spec.js.map