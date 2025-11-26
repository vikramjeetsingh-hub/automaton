// src/core/testRunCore.ts
export function testRunCore(): string {
    const now = new Date().toISOString();
    const message = `TS → GAS is running correctly — ${now}`;

    // Use your logger if available, otherwise fallback to Logger
    const g: any = globalThis as any;
    if (g.log?.info) {
        g.log.info(message);
    } else {
        Logger.log(message);
    }

    return message;
}
