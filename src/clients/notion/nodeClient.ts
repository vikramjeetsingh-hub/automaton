// src/clients/notion/nodeClient.ts

import { Client } from "@notionhq/client";
import { INotionClientAsync } from "./base";
import { NotionApiParams, NotionApiResult, HttpMethodUpper } from "../../types/notion-api.types";

export interface NotionClientNodeOptions {
  token?: string;
  version?: string;
}

export class NotionClientNode implements INotionClientAsync {
  private client: Client;

  constructor(opts: NotionClientNodeOptions = {}) {
    const auth = opts.token || process.env.NOTION_TOKEN;
    if (!auth) throw new Error("NotionClientNode: NOTION_TOKEN missing");
    this.client = new Client({ auth, notionVersion: opts.version });
  }

  async request<T = unknown>(params: NotionApiParams): Promise<NotionApiResult<T>> {
    const method = (params.method || "get").toString().toUpperCase() as HttpMethodUpper;
    const path = params.path.startsWith("/") ? params.path : `/${params.path}`;

    const data = await this.client.request({
      path,
      method: method as any,
      query: params.query as any,
      body: params.body as any,
    });

    // SDK doesn't give you raw headers/status easily, so we fake some bits:
    return {
      ok: true,
      status: 200,
      data: data as T,
      headers: {},
      url: `https://api.notion.com/v1${path}`,
      method: method as any,
    };
  }

  async get<T = unknown>(
    path: string,
    query?: NotionApiParams["query"]
  ): Promise<NotionApiResult<T>> {
    return this.request<T>({ method: "get", path, query });
  }

  async post<T = unknown>(
    path: string,
    body?: NotionApiParams["body"],
    query?: NotionApiParams["query"]
  ): Promise<NotionApiResult<T>> {
    return this.request<T>({ method: "post", path, body, query });
  }

  async patch<T = unknown>(
    path: string,
    body?: NotionApiParams["body"],
    query?: NotionApiParams["query"]
  ): Promise<NotionApiResult<T>> {
    return this.request<T>({ method: "patch", path, body, query });
  }
}
