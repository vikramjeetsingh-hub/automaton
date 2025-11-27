// src/clients/notion/gasClient.ts

/// <reference types="google-apps-script" />
import { NotionApiParams, NotionApiResult } from "../../types/notion-api.types";
import { INotionClientSync } from "./base";

const NOTION_BASE_URL = "https://api.notion.com/v1";
const DEFAULT_NOTION_VERSION = "2022-06-28";

export interface NotionClientGasOptions {
  token?: string;
  version?: string;
  defaultHeaders?: Record<string, string>;
  debug?: boolean;
}

export class NotionClientGas implements INotionClientSync {
  request<T = unknown>(params: NotionApiParams): NotionApiResult<T> {
    throw new Error("Method not implemented.");
  }
  get<T = unknown>(path: string, query?: NotionApiParams["query"]): NotionApiResult<T> {
    throw new Error("Method not implemented.");
  }
  post<T = unknown>(path: string, body?: NotionApiParams["body"], query?: NotionApiParams["query"]): NotionApiResult<T> {
    throw new Error("Method not implemented.");
  }
  patch<T = unknown>(path: string, body?: NotionApiParams["body"], query?: NotionApiParams["query"]): NotionApiResult<T> {
    throw new Error("Method not implemented.");
  }
  // ... same as before ...
}
