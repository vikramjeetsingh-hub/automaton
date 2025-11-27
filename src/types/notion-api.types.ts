// src/types/notion-api.ts

/// <reference types="google-apps-script" />

export type HttpMethodLower =
  | "get"
  | "post"
  | "patch"
  | "put"
  | "delete"
  | "head"
  | "options";

export type HttpMethodUpper = Uppercase<HttpMethodLower>;

export type AnyCaseHttpMethod =
  | HttpMethodUpper
  | HttpMethodLower
  | GoogleAppsScript.URL_Fetch.HttpMethod;

export interface NotionApiParams {
  method?: AnyCaseHttpMethod;
  path: string;
  query?: Record<
    string,
    | string
    | number
    | boolean
    | null
    | undefined
    | (string | number | boolean)[]
  >;
  body?: string | Record<string, unknown> | GoogleAppsScript.Base.Blob;
  headers?: Record<string, string>;
  token?: string;
  version?: string;
  throwOnHttpError?: boolean;
  debug?: boolean;
}

export interface NotionApiResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
  headers: Record<string, string | string[]>;
  url: string;
  method: GoogleAppsScript.URL_Fetch.HttpMethod;
}
