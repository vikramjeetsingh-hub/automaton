/// <reference types="google-apps-script" />

import { testRunCore } from "./core/testCore";

// 1) Flags and logger globals for GAS
; (globalThis as any).DEBUG = true;
; (globalThis as any).DRY_RUN = false;

; (globalThis as any).log = {
    debug: (...a: any[]) => Logger.log(["DEBUG", ...a].map(String).join(" ")),
    info: (...a: any[]) => Logger.log(["INFO ", ...a].map(String).join(" ")),
    warn: (...a: any[]) => Logger.log(["WARN ", ...a].map(String).join(" ")),
    error: (...a: any[]) => Logger.log(["ERROR", ...a].map(String).join(" ")),
};

// 2) GAS-exposed handler attached to globalThis
; (globalThis as any).testRun = function (): string {
    return testRunCore();
};
