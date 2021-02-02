import { assert } from "chai";
import { merge } from "../utils/merge.js";
describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
        assert.deepEqual(merge({ 'a': 1 }, { 'b': 2 }), { 'a': 1 });
    });
});
//# sourceMappingURL=router.spec.js.map