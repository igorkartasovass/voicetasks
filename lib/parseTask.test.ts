import { parseTask } from "./parseTask";

describe("parseTask", () => {
  it("returns the text unchanged when there's no date or priority", () => {
    const result = parseTask("buy milk");
    expect(result.text).toBe("buy milk");
    expect(result.dueDate).toBeNull();
    expect(result.priority).toBe("medium");
  });

  it("detects high priority and strips the keyword", () => {
    const result = parseTask("urgent finish report");
    expect(result.priority).toBe("high");
    expect(result.text).toBe("finish report");
  });

  it("detects low priority from 'someday'", () => {
    const result = parseTask("water plants someday");
    expect(result.priority).toBe("low");
    expect(result.text).toBe("water plants");
  });

  it("extracts a date and removes it from the text", () => {
    const result = parseTask("call mom friday");
    expect(result.dueDate).not.toBeNull();
    expect(result.text).toBe("call mom");
  });

  it("handles priority and date together", () => {
    const result = parseTask("urgent submit taxes tomorrow");
    expect(result.priority).toBe("high");
    expect(result.dueDate).not.toBeNull();
    expect(result.text).toBe("submit taxes");
  });

  it("never returns empty text", () => {
    const result = parseTask("tomorrow");
    expect(result.text.length).toBeGreaterThan(0);
  });
});
