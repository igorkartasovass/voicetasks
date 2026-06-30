import * as chrono from "chrono-node";

export type Priority = "high" | "medium" | "low";

export interface ParsedTask {
  text: string;
  dueDate: Date | null;
  priority: Priority;
}

export function parseTask(input: string): ParsedTask {
  let working = input.trim();

  //detect priority from keywords then strip it again
  let priority: Priority = "medium";

  if (/\b(urgent|asap|important|high priority)\b/i.test(working)) {
    priority = "high";
    working = working
      .replace(/\b(urgent|asap|important|high priority)\b/i, "")
      .trim();
  } else if (/\b(low priority|whenever|someday)\b/i.test(working)) {
    priority = "low";
    working = working
      .replace(/\b(low priority|whenever|someday)\b/i, "")
      .trim();
  }

  //extract date, then strip it from text
  let dueDate: Date | null = null;

  const results = chrono.parse(working, new Date(), { forwardDate: true });
  if (results.length > 0) {
    dueDate = results[0].start.date();
    const match = results[0];
    working = (
      working.slice(0, match.index) +
      working.slice(match.index + match.text.length)
    ).trim();
  }

  //tidy whitespace leftover
  const text = working.replace(/\s+/g, " ").trim() || input.trim();

  return { text, dueDate, priority };
}
