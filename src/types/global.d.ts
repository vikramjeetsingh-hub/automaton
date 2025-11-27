// src/types/global.d.ts

import type {
  GetPageResponse,
  GetDatabaseResponse,
  UpdatePageResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Make this a module so the imports are allowed
export {};

declare global {
  // ───────── Notion SDK response aliases ─────────
  type NotionGetPageResponse = GetPageResponse;
  type NotionQueryDbResponse = GetDatabaseResponse;
  type NotionUpdatePageResponse = UpdatePageResponse;
  type NotionPageResponse = PageObjectResponse;

  // ───────── Logger ─────────
  type LogFn = (...args: any[]) => void;

  interface LoggerLike {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
  }

  /** Global logger instance (GAS + Node) */
  var log: LoggerLike;
}
