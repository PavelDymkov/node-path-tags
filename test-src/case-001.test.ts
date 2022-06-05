import { setupLibrary } from "./tools";

test("linux separator", () => {
    const { path } = setupLibrary({ separator: "/" });

    const actual = path`a/b`;

    expect(actual).toBe("a/b");
});

test("windows separator", () => {
    const { path } = setupLibrary({ separator: "\\" });

    const actual = path`a/b`;

    expect(actual).toBe("a\\b");
});
