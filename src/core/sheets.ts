/**
 * Default Grey-Box SheetReader / SheetWriter
 * Fully compatible with Apps Script and TypeScript build pipeline
 */

export interface RowObject {
  [key: string]: any;
}

/**
 * Normalize header names into consistent object keys
 */
export function normalizeHeader(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");
}

/**
 * Convert rows + headers → list of objects
 */
export function mapRowsToObjects(headers: string[], rows: any[][]): RowObject[] {
  const normalized = headers.map(normalizeHeader);

  return rows.map((row) => {
    const obj: RowObject = {};
    normalized.forEach((key, i) => {
      obj[key] = row[i] ?? "";
    });
    return obj;
  });
}

/**
 * Ensures a sheet exists. Creates it if missing.
 */
export function ensureSheet(name: string): GoogleAppsScript.Spreadsheet.Sheet {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

/**
 * Read operations
 */
export class SheetReader {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(sheetName: string) {
    this.sheet = ensureSheet(sheetName);
  }

  /**
   * Reads a range into raw 2D array
   */
  readRange(a1: string): any[][] {
    return this.sheet.getRange(a1).getValues();
  }

  /**
   * Reads a table with headers (first row)
   */
  readTable(a1: string): RowObject[] {
    const [headerRow, ...rows] = this.readRange(a1);

    if (!headerRow) return [];

    return mapRowsToObjects(headerRow, rows);
  }

  /**
   * Returns the last row number that contains data
   */
  getLastRow(): number {
    return this.sheet.getLastRow();
  }
}

/**
 * Write operations
 */
export class SheetWriter {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(sheetName: string) {
    this.sheet = ensureSheet(sheetName);
  }

  /**
   * Overwrites a range with a 2D array
   */
  writeRange(a1: string, values: any[][]): void {
    this.sheet.getRange(a1).setValues(values);
  }

  /**
   * Appends a row (array)
   */
  appendRow(row: any[]): void {
    this.sheet.appendRow(row);
  }

  /**
   * Appends an object using header mapping
   */
  appendObject(obj: RowObject): void {
    const headers = this.sheet.getRange(1, 1, 1, this.sheet.getLastColumn()).getValues()[0];
    const normalized = headers.map(normalizeHeader);

    const row: any[] = normalized.map((h) => obj[h] ?? "");

    this.appendRow(row);
  }

  /**
   * Clears all data (but keeps headers)
   */
  clearData(): void {
    const lastRow = this.sheet.getLastRow();
    if (lastRow > 1) {
      this.sheet.getRange(2, 1, lastRow - 1, this.sheet.getLastColumn()).clearContent();
    }
  }
}