import { describe, expect, it } from "vitest";
import { answerFor, suggestedQuestions } from "./assistant";

describe("answerFor", () => {
  it("always treats emergencies as emergencies", () => {
    expect(answerFor("my rabbit stopped eating").title).toBe("Possible emergency");
    expect(answerFor("dog is bleeding a lot").title).toBe("Possible emergency");
    expect(answerFor("my cat is having trouble breathing").title).toBe("Possible emergency");
    expect(answerFor("puppy swallowed chocolate").title).toBe("Possible emergency");
  });

  it("gives species-specific diet answers", () => {
    const a = answerFor("how often should I feed a rabbit");
    expect(a.title).toBe("Feeding rabbits");
    expect(a.href).toContain("rspca.org.uk/adviceandwelfare/pets/rabbits");
    expect(answerFor("what do guinea pigs eat").title).toBe("Feeding guinea pigs");
    expect(answerFor("best food for my dog").title).toBe("Feeding dogs");
    expect(answerFor("cat diet question").title).toBe("Feeding cats");
  });

  it("gives species-specific lifespan answers", () => {
    expect(answerFor("how long do dogs live").title).toBe("How long dogs live");
    expect(answerFor("rabbit lifespan").title).toBe("How long rabbits live");
  });

  it("distinguishes guinea pigs from pigs", () => {
    expect(answerFor("guinea pig care").source).toContain("Guinea pig");
    expect(answerFor("what do pigs need").source).toBe("Merck Veterinary Manual");
  });

  it("does not confuse cattle with cats", () => {
    expect(answerFor("cattle care").source).toBe("Merck Veterinary Manual");
    expect(answerFor("cat care").source).toContain("Cat care");
  });

  it("routes exotics to the Merck Veterinary Manual", () => {
    expect(answerFor("bearded dragon care").source).toBe("Merck Veterinary Manual");
    expect(answerFor("parrot food").title).toBe("Feeding pet birds");
    expect(answerFor("chinchilla").source).toBe("Merck Veterinary Manual");
  });

  it("matches topics without a species", () => {
    expect(answerFor("how do I introduce a second cat?").title).toBe("Introducing animals");
    expect(answerFor("adoption costs").title).toBe("Planning for cost");
    expect(answerFor("flea prevention").title).toBe("Parasite prevention");
    expect(answerFor("should I neuter my pet").title).toBe("Spay and neuter");
    expect(answerFor("where should I adopt from").title).toBe("Adoption and sourcing");
    expect(answerFor("are hamsters good for kids").title).toBe("Allergies, kids, and household fit");
  });

  it("falls back honestly", () => {
    expect(answerFor("hello").title).toBe("Start with a qualified care team");
    expect(answerFor("").title).toBe("Start with a qualified care team");
  });

  it("suggests questions that all produce real answers", () => {
    for (const q of suggestedQuestions) {
      expect(answerFor(q).href).toMatch(/^https:\/\//);
    }
  });
});
