import * as pathModule from "path";

interface SetupLibraryParams {
    separator: "/" | "\\";
    absolutePath: string;
}

export function setupLibrary(
    params: Partial<SetupLibraryParams>,
): typeof import("../package/main") {
    jest.resetModules();

    jest.doMock("path", () => {
        const pathModuleMock: PathModule = Object.create(pathModule);

        const { absolutePath, separator } = params;

        if (absolutePath)
            pathModuleMock.resolve = (...items) => {
                const sep = separator || pathModule.sep;

                return sep + [absolutePath].concat(items).join(sep);
            };

        if (separator) pathModuleMock.sep = separator;

        return pathModuleMock;
    });

    return require("../package/main");
}

type PathModule = PreparePathModule<typeof import("path")>;

type PreparePathModule<T> = {
    -readonly [Key in keyof T]: T[Key];
};
