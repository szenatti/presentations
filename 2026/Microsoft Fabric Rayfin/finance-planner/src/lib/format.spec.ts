//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import { formatAUD, formatInteger, formatSignedPercent } from "@/lib/format";

const EM_DASH = "\u2014";

describe("formatAUD", () => {
    it("formats values as Australian dollars with cents", () => {
        expect(formatAUD(1234.5)).toBe("$1,234.50");
    });

    it("renders an em dash for null / blank values", () => {
        expect(formatAUD(null)).toBe(EM_DASH);
        expect(formatAUD(undefined)).toBe(EM_DASH);
    });
});

describe("formatInteger", () => {
    it("groups thousands", () => {
        expect(formatInteger(6000)).toBe("6,000");
    });
});

describe("formatSignedPercent", () => {
    it("prefixes a plus sign for positive month-over-month change", () => {
        expect(formatSignedPercent(0.1248)).toBe("+12.5%");
    });

    it("keeps the minus sign for negative change", () => {
        expect(formatSignedPercent(-0.032)).toBe("-3.2%");
    });

    it("renders an em dash for missing values", () => {
        expect(formatSignedPercent(null)).toBe(EM_DASH);
    });
});
