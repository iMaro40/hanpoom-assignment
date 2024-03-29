import { init } from "../src/init";

describe("init()", () => {
  it("Should resolve", async () => {
    await expect(init()).resolves;
  });
});
