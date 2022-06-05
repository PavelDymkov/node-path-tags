import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    git,
    npx,
    packageJSON,
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

        version("patch", {
            commitHooks: false,
            gitTagVersion: false,
        }),

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
