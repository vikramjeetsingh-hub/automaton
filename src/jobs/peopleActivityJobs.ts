// src/jobs/peopleActivityJob.ts

import type { INotionClientSync } from "../clients/notion/base";

export function runPeopleActivityJob(
  client: INotionClientSync,
  pageIds: string[]
) {
  for (const id of pageIds) {
    const res = client.get<NotionPageResponse>(`/pages/${id}`);

    if (!res.ok) {
      log.error("Failed page", id, res.status);
      continue;
    }

    // Pure logic from src/core
    // mapNotionPageToRow(res.data)
  }
}
