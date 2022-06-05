# node-path-tags

![test: passing](https://raw.githubusercontent.com/PavelDymkov/node-path-tags/master/badges/test.svg)
![license: ISC](https://raw.githubusercontent.com/PavelDymkov/node-path-tags/master/badges/license.svg)

## Usage

```ts
import { path, absolutePath as abs } from "node-path-tags";

path`a/b`; // "a\b" if windows else "a/b"
abs`a/b`; // /<absolute path>/a/b
```
