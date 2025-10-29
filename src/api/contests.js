// src/api/contests.js
import { api } from "./client";

export function getContestBySlug(slug) {
  return api.get(`/api/contests/${encodeURIComponent(slug)}`);
}