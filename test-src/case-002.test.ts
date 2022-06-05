import { setupLibrary } from "./tools";

const absolutePath = "x";

test("linux separator", () => {
    const { absolutePath: abs } = setupLibrary({
        absolutePath,
        separator: "/",
    });

    const actual = abs`a/b`;

    expect(actual).toBe("/x/a/b");
});

test("windows separator", () => {
    const { absolutePath: abs } = setupLibrary({
        absolutePath,
        separator: "\\",
    });

    const actual = abs`a/b`;

    expect(actual).toBe("\\x\\a\\b");
});
