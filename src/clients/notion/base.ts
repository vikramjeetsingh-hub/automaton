// src/clients/notion/base.ts

import type {
  NotionApiParams,
  NotionApiResult
} from "../../types/notion-api.types";

export interface INotionClientSync {
  request<T = unknown>(params: NotionApiParams): NotionApiResult<T>;
  get<T = unknown>(
    path: string,
    query?: NotionApiParams["query"]
  ): NotionApiResult<T>;
  post<T = unknown>(
    path: string,
    body?: NotionApiParams["body"],
    query?: NotionApiParams["query"]
  ): NotionApiResult<T>;
  patch<T = unknown>(
    path: string,
    body?: NotionApiParams["body"],
    query?: NotionApiParams["query"]
  ): NotionApiResult<T>;
}

export interface INotionClientAsync {
  request<T = unknown>(
    params: NotionApiParams
  ): Promise<NotionApiResult<T>>;
  get<T = unknown>(
    path: string,
    query?: NotionApiParams["query"]
  ): Promise<NotionApiResult<T>>;
  post<T = unknown>(
    path: string,
    body?: NotionApiParams["body"],
    query?: NotionApiParams["query"]
  ): Promise<NotionApiResult<T>>;
  patch<T = unknown>(
    path: string,
    body?: NotionApiParams["body"],
    query?: NotionApiParams["query"]
  ): Promise<NotionApiResult<T>>;
}
