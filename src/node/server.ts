// src/node/server.ts
import express from "express";
import { sum } from "../core/sum";

export const app = express();

app.use(express.json());

/**
 * Simple GET endpoint
 * GET http://localhost:3000/ping
 */
app.get("/ping", (_req, res): void => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

/**
 * Echo endpoint
 * POST http://localhost:3000/echo
 * Body (JSON): { "hello": "world" }
 */
app.post("/echo", (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Example using your core sum() function
 * GET http://localhost:3000/sum?a=5&b=7
 */
app.get("/sum", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  res.json({
    a,
    b,
    result: sum(a, b),
    timestamp: new Date().toISOString(),
  });
});