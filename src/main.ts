import { normalize, resolve, sep as separator } from "path";
import { createTag } from "tags-factory";

export type PathInterpolationTypes = string | number | string[] | number[];

const stringify = (source: PathInterpolationTypes): string => {
    if (typeof source === "string") return source;

    if (typeof source === "number") {
        if (isNaN(source)) throw `the value is NaN`;

        return String(source);
    }

    if (Array.isArray(source)) return source.map(stringify).join("");

    throw `invalid value: ${source}`;
};

const process = (items: string[]): string => {
    const path = items.join("").split("/").join(separator);

    return normalize(path);
};

export const path = createTag({
    process,
    mapper: stringify,
});

export const absolutePath = createTag({
    process(items): string {
        return resolve(process(items));
    },
    mapper: stringify,
});
