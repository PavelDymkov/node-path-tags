import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    git,
    npx,
    packageJSON,
    Pipeline,
    publish,
    test,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        git("commit", "node-path-tags"),

        npx("tsc"),

        test(),

        badge(BadgeType.Test),

        increaseVersion(),

        packageJSON((packageJson) => {
            delete packageJson.devDependencies;
            delete packageJson.scripts;

            packageJson.main = "lib.js";
        }),

        badge(BadgeType.License),

        assets("README.md"),

        git("commit", "node-path-tags"),
        git("push"),

        publish({
            login: { account: "paveldymkov", email: "dymkov86@gmail.com" },
        }),
    ],
});

function increaseVersion(): Pipeline {
    return () => {
        patch();
        patch();
    };
}

function patch(): void {
    version("patch", {
        commitHooks: false,
        gitTagVersion: false,
    });
}
