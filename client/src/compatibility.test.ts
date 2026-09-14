import { describe, expect, it } from "vitest";
import { householdScore, pairScore } from "./compatibility";

describe("realistic pair dynamics", () => {
  it("flags ferrets with their natural prey", () => {
    expect(pairScore("ferret", "rabbit").score).toBe(10);
    expect(pairScore("ferret", "rabbit").note).toContain("hunt");
  });

  it("knows cats are bird predators", () => {
    expect(pairScore("cat", "canary").score).toBe(15);
  });

  it("knows rats kill mice and parrots kill small birds", () => {
    expect(pairScore("rat", "mouse").score).toBe(25);
    expect(pairScore("parrot", "finch").score).toBe(30);
  });

  it("keeps snake prey pairs at the bottom", () => {
    expect(pairScore("snake", "mouse").score).toBeLessThanOrEqual(10);
    expect(pairScore("turtle", "fish").score).toBeLessThanOrEqual(20);
  });

  it("recognizes classic companion pairings", () => {
    expect(pairScore("horse", "donkey").score).toBe(80);
    expect(pairScore("dog", "cat").score).toBe(68);
  });
});

describe("same-species social reality", () => {
  it("knows Syrian hamsters are strictly solitary", () => {
    const pair = householdScore(["hamster", "hamster"], true);
    expect(pair.score).toBe(25);
    expect(pair.notes[0].source).toBe("RSPCA");
  });

  it("gets worse the more solitary animals are grouped", () => {
    const two = householdScore(["hamster", "hamster"], true).score;
    const three = householdScore(["hamster", "hamster", "hamster"], true).score;
    expect(three).toBeLessThan(two);
  });

  it("rewards species that genuinely need company", () => {
    expect(householdScore(["rabbit", "rabbit"], true).score).toBeGreaterThan(
      80
    );
    expect(householdScore(["horse", "horse"], true).score).toBeGreaterThan(80);
  });
});

describe("household scoring", () => {
  it("anchors on the most at-risk pair", () => {
    const result = householdScore(["cat", "dog", "canary"], false);
    expect(result.score).toBeLessThan(40);
    expect(result.notes.length).toBeGreaterThan(0);
    expect(result.notes[0].text).toContain("predators of birds");
  });

  it("scores a calm mixed household reasonably", () => {
    const result = householdScore(["cat", "dog"], false);
    expect(result.score).toBe(68);
    expect(householdScore(["horse", "donkey"], false).score).toBe(80);
  });

  it("deduplicates guidance notes", () => {
    const result = householdScore(["cat", "canary", "finch", "quail"], false);
    const unique = new Set(result.notes.map(n => n.text));
    expect(unique.size).toBe(result.notes.length);
  });
});
