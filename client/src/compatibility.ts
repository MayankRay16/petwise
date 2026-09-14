// Multi-pet compatibility model.
//
// Scores are driven by real species dynamics — predator–prey relationships, social
// needs, and husbandry guidance — rather than generic energy math. Sources for each
// rule are named with the rule so the site can cite them honestly:
//   RSPCA — hamsters are solitary, rabbits/rodents need same-species company, parrot housing
//   Lafeber (avian vets) — hookbills must never be caged with finches/canaries
//   The Open Sanctuary Project — horses/donkeys/camelids as companions
//   Animal Humane Society — dog–cat introductions and prey drive
//   House Rabbit Network — ferrets are rabbit/rodent hunters
//   Merck Veterinary Manual — poultry disease (blackhead), species husbandry
// No source publishes a percentage formula; the numbers are a transparent heuristic.

type PairRule = { score: number; note?: string; source?: string };

const rodents = new Set(["mouse", "rat", "gerbil", "chinchilla", "hamster"]);
const smallPrey = new Set([
  "mouse",
  "rat",
  "gerbil",
  "chinchilla",
  "hamster",
  "rabbit",
]);
const smallBirds = new Set(["canary", "finch", "pigeon", "quail", "parrot"]);
const farmBirds = new Set(["chicken", "duck", "goose", "turkey"]);
const birds = new Set(["canary", "finch", "pigeon", "quail", "parrot", "chicken", "duck", "goose", "turkey"]);
const bigHerbivores = new Set([
  "horse",
  "mule",
  "donkey",
  "llama",
  "alpaca",
  "camel",
  "yak",
  "goat",
  "sheep",
  "cow",
]);
const reptiles = new Set(["turtle", "lizard", "snake"]);
const hunters = new Set(["cat", "ferret", "dog"]);

// Specific named pairs — exact "a|b" keys, sorted alphabetically within the key.
const SPECIFIC_PAIRS: Record<string, PairRule> = {
  "cat|canary": {
    score: 15,
    note: "Cats are instinctive predators of birds — even a scratch or a lick can be fatal, because gram-negative bacteria in cat saliva are toxic to birds. Keep them in fully separated areas.",
    source: "RSPCA / avian vets",
  },
  "cat|finch": {
    score: 15,
    note: "Cats are instinctive predators of birds — even a scratch or a lick can be fatal. Keep them in fully separated areas.",
    source: "RSPCA / avian vets",
  },
  "cat|parrot": {
    score: 15,
    note: "Cats are instinctive predators of birds, and a parrot's noise and movement triggers hunting instincts. Never allow contact.",
    source: "RSPCA / avian vets",
  },
  "cat|pigeon": {
    score: 18,
    note: "Cats are instinctive predators of birds; pigeons need housing a cat can never reach.",
    source: "RSPCA",
  },
  "cat|rabbit": {
    score: 18,
    note: "Rabbits are natural prey for cats. Some calm indoor pairs coexist under close supervision, but a hunting instinct can surface at any time.",
    source: "RSPCA",
  },
  "cat|quail": {
    score: 15,
    note: "Cats are instinctive predators of birds — quail are small and vulnerable. Keep them in fully separated areas.",
    source: "RSPCA",
  },
  "chicken|duck": {
    score: 62,
    note: "Commonly kept together, but ducks soak bedding and water, which raises respiratory and disease risk for chickens — keep duck water outside the coop.",
    source: "Poultry husbandry guidance",
  },
  "chicken|turkey": {
    score: 55,
    note: "Chickens can carry the blackhead parasite without symptoms while turkeys are highly susceptible to it — many keepers house them apart.",
    source: "Merck Veterinary Manual",
  },
  "dog|cat": {
    score: 68,
    note: "One of the most common multi-pet households — workable with slow, controlled introductions, but some dogs have a prey drive that never fully extinguishes.",
    source: "Animal Humane Society",
  },
  "donkey|alpaca": {
    score: 55,
    note: "Donkeys can bully and seriously injure camelids — this pairing needs very careful management and space.",
    source: "The Open Sanctuary Project",
  },
  "donkey|llama": {
    score: 55,
    note: "Donkeys can bully and seriously injure camelids — this pairing needs very careful management and space.",
    source: "The Open Sanctuary Project",
  },
  "dog|llama": {
    score: 55,
    note: "Llamas are used as livestock guardians specifically against canids — they may chase, strike, or injure dogs. Introductions need expert handling.",
    source: "The Open Sanctuary Project",
  },
  "ferret|rabbit": {
    score: 10,
    note: "Ferrets were bred to hunt rabbits and rodents and are still used for it. Contact is never safe, and rabbits find ferret scent stressful even from another room.",
    source: "House Rabbit Network",
  },
  "horse|donkey": {
    score: 80,
    note: "Horses and donkeys generally make fine companions given enough space and separate mineral access.",
    source: "The Open Sanctuary Project",
  },
  "horse|mule": {
    score: 82,
    note: "Mules are routinely kept as horse companions — one of the most natural large-animal pairings.",
    source: "The Open Sanctuary Project",
  },
  "parrot|canary": {
    score: 30,
    note: "Parrots and other hookbills can and do kill small birds like canaries and finches — never cage or house them together.",
    source: "Lafeber (avian vets)",
  },
  "parrot|finch": {
    score: 30,
    note: "Parrots and other hookbills can and do kill small birds like canaries and finches — never cage or house them together.",
    source: "Lafeber (avian vets)",
  },
  "parrot|pigeon": {
    score: 40,
    note: "Keep in separate cages and supervised areas — parrots can injure pigeons, and their housing needs differ.",
    source: "RSPCA",
  },
  "parrot|quail": {
    score: 35,
    note: "Quail are small ground birds — parrots can seriously injure them. Never house them together.",
    source: "Lafeber (avian vets)",
  },
  "rat|mouse": {
    score: 25,
    note: "Rats hunt and kill mice — they cannot be housed or allowed to interact.",
    source: "RSPCA",
  },
  "llama|alpaca": {
    score: 76,
    note: "Llamas and alpacas are closely related and can graze together, though llamas are larger and can bully.",
    source: "The Open Sanctuary Project",
  },
};

function specific(a: string, b: string): PairRule | undefined {
  return SPECIFIC_PAIRS[a + "|" + b] ?? SPECIFIC_PAIRS[b + "|" + a];
}

function categoryScore(a: string, b: string): PairRule {
  // Ferret is the strictest hunter: bred to hunt rabbits and rodents.
  if (a === "ferret" || b === "ferret") {
    const other = a === "ferret" ? b : a;
    if (smallPrey.has(other) || birds.has(other))
      return {
        score: 10,
        note: "Ferrets were bred to hunt rabbits, rodents, and small prey — contact is never safe, and prey animals find ferret scent stressful even from another room.",
        source: "House Rabbit Network",
      };
    if (other === "cat")
      return {
        score: 65,
        note: "Some ferret–cat households work with strict supervision, but size and play-style mismatches cause injuries.",
        source: "RSPCA",
      };
    if (other === "dog")
      return {
        score: 60,
        note: "Some ferret–dog households work with strict supervision, but dogs can play too roughly and injure a ferret.",
        source: "RSPCA",
      };
    return {
      score: 60,
      note: "Keep habitats fully separate — ferrets are curious, determined escape artists.",
      source: "RSPCA",
    };
  }
  // Cats: mammal hunters of small prey and birds.
  if (a === "cat" || b === "cat") {
    const other = a === "cat" ? b : a;
    if (smallPrey.has(other))
      return {
        score: 18,
        note: "Rodents and rabbits are natural prey for cats — these pets must live in separate rooms with secure, cat-proof enclosures.",
        source: "RSPCA",
      };
    if (farmBirds.has(other))
      return {
        score: 55,
        note: "Barn cats and adult fowl often coexist, but chicks and young birds are extremely vulnerable to cats.",
        source: "Merck Veterinary Manual",
      };
    if (other === "fish")
      return {
        score: 62,
        note: "Workable — keep the tank securely covered, as cats hunt at the water surface.",
        source: "ASPCA",
      };
    if (reptiles.has(other))
      return {
        score: 58,
        note: "Keep reptile enclosures escape-proof and locked — cats hunt small reptiles.",
        source: "Merck Veterinary Manual",
      };
    if (bigHerbivores.has(other))
      return {
        score: 78,
        note: "Barn cats and large animals are a classic farm pairing — generally calm coexistence.",
        source: "Merck Veterinary Manual",
      };
    if (other === "dog")
      return {
        score: 68,
        note: "One of the most common multi-pet households — workable with slow, controlled introductions, but some dogs have a prey drive that never fully extinguishes.",
        source: "Animal Humane Society",
      };
  }
  // Dogs: prey drive varies by breed and training.
  if (a === "dog" || b === "dog") {
    const other = a === "dog" ? b : a;
    if (smallPrey.has(other))
      return {
        score: 35,
        note: "Depends heavily on the dog: some live peacefully with rabbits or rodents, but many have a prey drive that is hard to extinguish. Strict separation and supervision are required.",
        source: "Animal Humane Society",
      };
    if (smallBirds.has(other))
      return {
        score: 30,
        note: "Birds are fragile — dog saliva carries bacteria that can kill them, and even friendly play can be fatal. Keep cages in dog-free rooms.",
        source: "ASPCA",
      };
    if (farmBirds.has(other))
      return {
        score: 55,
        note: "Livestock-guardian breeds live with flocks; many other breeds will kill birds. Breed, training, and supervision decide the outcome.",
        source: "Merck Veterinary Manual",
      };
    if (bigHerbivores.has(other))
      return {
        score: 72,
        note: "Common on farms — train the dog for calm behavior around large animals and give the other animal an escape route.",
        source: "Merck Veterinary Manual",
      };
    if (other === "fish") return { score: 65 };
    if (reptiles.has(other))
      return {
        score: 58,
        note: "Keep reptile enclosures secure — dogs can injure small reptiles and overturn tanks.",
        source: "Merck Veterinary Manual",
      };
    if (other === "pig")
      return {
        score: 60,
        note: "Needs supervision — pigs and dogs can seriously injure each other, though many farm households manage it.",
        source: "The Open Sanctuary Project",
      };
  }
  // Snakes: rodents and birds are literally their food.
  if (a === "snake" || b === "snake") {
    const other = a === "snake" ? b : a;
    if (rodents.has(other) || other === "rabbit")
      return {
        score: 8,
        note: "Rodents and rabbits are natural prey for snakes — they must never share a space or be handled near each other.",
        source: "Merck Veterinary Manual",
      };
    if (birds.has(other))
      return {
        score: 10,
        note: "Birds are natural prey for snakes — enclosures must be fully sealed and in separate rooms.",
        source: "Merck Veterinary Manual",
      };
    if (reptiles.has(other))
      return {
        score: 45,
        note: "House reptiles in separate, sealed enclosures — cross-species cohabitation causes stress and disease risk.",
        source: "Merck Veterinary Manual",
      };
    return {
      score: 58,
      note: "No natural interaction — keep the enclosure sealed and never allow loose contact.",
      source: "Merck Veterinary Manual",
    };
  }
  if (a === "turtle" || b === "turtle") {
    const other = a === "turtle" ? b : a;
    if (other === "fish")
      return {
        score: 18,
        note: "Many pet turtles actively hunt and eat fish — they cannot share a tank.",
        source: "Merck Veterinary Manual",
      };
    if (reptiles.has(other))
      return {
        score: 45,
        note: "House reptiles separately — cross-species cohabitation causes stress, bites, and disease risk.",
        source: "Merck Veterinary Manual",
      };
    return {
      score: 58,
      note: "Keep enclosures separate and sealed — turtles bite when they feel like it.",
      source: "Merck Veterinary Manual",
    };
  }
  if (a === "lizard" || b === "lizard") {
    const other = a === "lizard" ? b : a;
    if (reptiles.has(other))
      return {
        score: 45,
        note: "House reptiles separately — cross-species cohabitation causes stress and disease risk.",
        source: "Merck Veterinary Manual",
      };
    if (smallPrey.has(other) || birds.has(other))
      return {
        score: 50,
        note: "Some lizards eat small animals — keep enclosures sealed and in separate rooms.",
        source: "Merck Veterinary Manual",
      };
    return {
      score: 58,
      note: "Keep enclosures separate and sealed — most lizards stress easily around other species.",
      source: "Merck Veterinary Manual",
    };
  }
  // Pigs: strong, food-driven, opportunistic.
  if (a === "pig" || b === "pig") {
    const other = a === "pig" ? b : a;
    if (smallPrey.has(other))
      return {
        score: 45,
        note: "Pigs are strong, fast, and food-driven — a rodent or rabbit loose in a pig area is at serious risk.",
        source: "The Open Sanctuary Project",
      };
    if (birds.has(other))
      return {
        score: 50,
        note: "Pigs will eat small birds and eggs if they can reach them — secure separation required.",
        source: "The Open Sanctuary Project",
      };
    if (bigHerbivores.has(other))
      return {
        score: 68,
        note: "Commonly pastured together, but pigs can bully herd animals over food — separate feeding areas help.",
        source: "The Open Sanctuary Project",
      };
    if (other === "cat") return { score: 62 };
    return { score: 60 };
  }
  // Rodents among themselves: different species cannot share housing.
  if (rodents.has(a) && rodents.has(b))
    return {
      score: 50,
      note: "Different rodent species have different signals and needs — house them in separate cages; same-species companionship is what each actually needs.",
      source: "RSPCA",
    };
  // Rabbit with any non-rodent small pet.
  if (smallPrey.has(a) && smallPrey.has(b))
    return {
      score: 50,
      note: "Different small-animal species don't safely share housing — each needs same-species companions and a separate enclosure.",
      source: "RSPCA",
    };
  if (smallBirds.has(a) && farmBirds.has(b))
    return {
      score: 55,
      note: "Pet birds and poultry carry different disease risks and need separate housing.",
      source: "Merck Veterinary Manual",
    };
  if (farmBirds.has(a) && smallBirds.has(b))
    return {
      score: 55,
      note: "Pet birds and poultry carry different disease risks and need separate housing.",
      source: "Merck Veterinary Manual",
    };
  // Farm bird mixes.
  if (farmBirds.has(a) && farmBirds.has(b))
    return {
      score: 68,
      note: "Mixed flocks are common but need space, separate feed, and disease vigilance.",
      source: "Merck Veterinary Manual",
    };
  // Pet bird mixes.
  if (smallBirds.has(a) && smallBirds.has(b))
    return {
      score: 62,
      note: "Different pet-bird species can share a room in separate cages; a shared aviary risks bullying and breeding problems.",
      source: "RSPCA",
    };
  // Big herbivore mixes.
  if (bigHerbivores.has(a) && bigHerbivores.has(b))
    return {
      score: 72,
      note: "Large grazing species commonly share pasture — give enough space and separate mineral/supplement stations so no one gets bullied away from the feed.",
      source: "The Open Sanctuary Project",
    };
  if (
    (bigHerbivores.has(a) && farmBirds.has(b)) ||
    (farmBirds.has(a) && bigHerbivores.has(b))
  )
    return {
      score: 70,
      note: "Poultry and grazing animals commonly share barns and pasture — watch feed contamination and keep waterfowl water contained.",
      source: "Merck Veterinary Manual",
    };
  // Fish with anything non-predatory: separate worlds.
  if (a === "fish" || b === "fish")
    return {
      score: 78,
      note: "An aquarium is a sealed, separate world — no direct interaction with other pets; keep other animals away from the tank.",
      source: "ASPCA",
    };
  // Reptile with mammals/birds by default.
  if (reptiles.has(a) || reptiles.has(b))
    return {
      score: 58,
      note: "Reptiles and mammals live in sealed, separate habitats — never allow loose contact, and wash hands between handling.",
      source: "Merck Veterinary Manual",
    };
  // Small pets with big herbivores.
  if (bigHerbivores.has(a) || bigHerbivores.has(b))
    return {
      score: 64,
      note: "A small pet in a secure cage can share a home with large animals — keep the enclosure out of reach and inaccessible.",
      source: "Merck Veterinary Manual",
    };
  // Default: different small pets in separate cages.
  return {
    score: 60,
    note: "Different species in separate, secure enclosures — most small pets never need to meet each other.",
    source: "RSPCA",
  };
}

export function pairScore(a: string, b: string): PairRule {
  if (a === b) return sameSpeciesPair(a);
  return specific(a, b) ?? categoryScore(a, b);
}

// How a species does with its OWN kind — this is where "same animal" gets real.
type SocialStyle = "group" | "flexible" | "solitary" | "reptile-solitary";

const SOCIAL: Record<
  string,
  { style: SocialStyle; score: number; note: string; source: string }
> = {
  rabbit: {
    style: "group",
    score: 86,
    note: "Rabbits need same-species companionship — a neutered pair is the single best welfare win for a house rabbit.",
    source: "RSPCA",
  },
  rat: {
    style: "group",
    score: 86,
    note: "Rats are highly social and should live in same-sex pairs or small groups, ideally siblings introduced young.",
    source: "RSPCA",
  },
  mouse: {
    style: "group",
    score: 82,
    note: "Female mice live well in groups; male mice often fight — plan the combination carefully.",
    source: "RSPCA",
  },
  gerbil: {
    style: "group",
    score: 84,
    note: "Gerbils need same-species companions in a deep burrowing setup — split or unfamiliar adults can fight.",
    source: "RSPCA",
  },
  chinchilla: {
    style: "group",
    score: 74,
    note: "Chinchillas can pair well, especially same-sex pairs introduced carefully — but watch for bullying.",
    source: "RSPCA",
  },
  hamster: {
    style: "solitary",
    score: 25,
    note: "Syrian hamsters are strictly solitary — housed together they will fight, sometimes fatally. Keep them alone, not lonely: solitary is normal for this species.",
    source: "RSPCA",
  },
  ferret: {
    style: "group",
    score: 84,
    note: "Ferrets are social and thrive with ferret companions — other species are never a safe substitute.",
    source: "RSPCA",
  },
  dog: {
    style: "flexible",
    score: 80,
    note: "Most dogs are social with their own kind, but introductions and neutering matter — same-sex pairs of some breeds need extra care.",
    source: "Animal Humane Society",
  },
  cat: {
    style: "flexible",
    score: 72,
    note: "Many adult cats prefer to be the only cat; multi-cat households need separate food, litter, and resting resources plus slow introductions.",
    source: "ASPCA",
  },
  parrot: {
    style: "flexible",
    score: 68,
    note: "Parrots can bond strongly with their own kind — but large parrots are usually best caged one per cage, and mismatched pairs can injure each other.",
    source: "RSPCA",
  },
  horse: {
    style: "group",
    score: 88,
    note: "Horses are herd animals — a companion of their own kind is close to a care requirement, not a luxury.",
    source: "The Open Sanctuary Project",
  },
  donkey: {
    style: "group",
    score: 86,
    note: "Donkeys bond deeply with companions — ideally another donkey rather than a horse.",
    source: "The Open Sanctuary Project",
  },
  mule: {
    style: "flexible",
    score: 76,
    note: "Mules often bond strongly with a horse or donkey companion rather than needing a mule specifically.",
    source: "The Open Sanctuary Project",
  },
  llama: {
    style: "group",
    score: 84,
    note: "Llamas are herd animals and should live with camelid or compatible companions.",
    source: "The Open Sanctuary Project",
  },
  alpaca: {
    style: "group",
    score: 84,
    note: "Alpacas must live with herd companions — keeping a single alpaca is a welfare problem.",
    source: "The Open Sanctuary Project",
  },
  camel: {
    style: "group",
    score: 82,
    note: "Camels live in herds and need same-species companionship.",
    source: "Merck Veterinary Manual",
  },
  yak: {
    style: "group",
    score: 82,
    note: "Yaks are herd animals and need companions.",
    source: "Merck Veterinary Manual",
  },
  goat: {
    style: "group",
    score: 86,
    note: "Goats are herd animals — a lone goat bonds anxiously to people or other animals; they need their own kind.",
    source: "The Open Sanctuary Project",
  },
  sheep: {
    style: "group",
    score: 86,
    note: "Sheep flock by nature and need same-species companions.",
    source: "The Open Sanctuary Project",
  },
  pig: {
    style: "group",
    score: 82,
    note: "Pigs are social herd animals and do best with pig companions.",
    source: "The Open Sanctuary Project",
  },
  cow: {
    style: "group",
    score: 86,
    note: "Cattle are herd animals — companionship of their own kind is a welfare need.",
    source: "The Open Sanctuary Project",
  },
  chicken: {
    style: "group",
    score: 84,
    note: "Chickens live naturally in flocks — plan pecking-order space and enough feeders.",
    source: "Merck Veterinary Manual",
  },
  duck: {
    style: "group",
    score: 84,
    note: "Ducks live in flocks and need water access — never keep a single duck.",
    source: "Merck Veterinary Manual",
  },
  goose: {
    style: "group",
    score: 82,
    note: "Geese pair-bond and flock — a lone goose is a stressed goose.",
    source: "Merck Veterinary Manual",
  },
  turkey: {
    style: "group",
    score: 80,
    note: "Turkeys flock but can be aggressive in mixed-sex groups — watch the social mix.",
    source: "Merck Veterinary Manual",
  },
  quail: {
    style: "group",
    score: 80,
    note: "Quail live in coveys — keep a proper male-to-female ratio to stop bullying.",
    source: "Merck Veterinary Manual",
  },
  canary: {
    style: "group",
    score: 76,
    note: "Canaries can live in single-sex groups or pairs, especially outside breeding season.",
    source: "RSPCA",
  },
  finch: {
    style: "group",
    score: 80,
    note: "Finches are colony birds — they need finch companions, not just humans.",
    source: "RSPCA",
  },
  pigeon: {
    style: "group",
    score: 80,
    note: "Pigeons pair-bond for life and flock — they need their own kind.",
    source: "RSPCA",
  },
  fish: {
    style: "group",
    score: 78,
    note: "Depends entirely on species — many fish school, while some (like bettas) must be kept alone. Research the species.",
    source: "Merck Veterinary Manual",
  },
  snake: {
    style: "reptile-solitary",
    score: 45,
    note: "Snakes are housed alone — cohabiting snakes stress each other, compete for hides, and can eat each other.",
    source: "Merck Veterinary Manual",
  },
  lizard: {
    style: "reptile-solitary",
    score: 45,
    note: "Most lizards are best housed alone — cohabitation causes stress, bites, and competition for basking spots.",
    source: "Merck Veterinary Manual",
  },
  turtle: {
    style: "reptile-solitary",
    score: 45,
    note: "Turtles are usually housed alone — together they bite, compete, and spread disease.",
    source: "Merck Veterinary Manual",
  },
};

export function sameSpeciesPair(id: string): PairRule {
  const s = SOCIAL[id] ?? {
    style: "flexible" as SocialStyle,
    score: 70,
    note: "Research this species' social needs before getting a second one.",
    source: "RSPCA",
  };
  return { score: s.score, note: s.note, source: s.source };
}

export interface CompatNote {
  text: string;
  source: string;
}
export interface HouseholdResult {
  score: number;
  notes: CompatNote[];
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

export function householdScore(ids: string[], same: boolean): HouseholdResult {
  const chosen = ids.filter(Boolean);
  if (chosen.length < 2) return { score: 0, notes: [] };

  if (same || chosen.every(id => id === chosen[0])) {
    const id = chosen[0];
    const base = SOCIAL[id];
    let score = base ? base.score : 70;
    const notes: CompatNote[] = [];
    if (base) notes.push({ text: base.note, source: base.source });
    if (
      base &&
      (base.style === "solitary" || base.style === "reptile-solitary")
    ) {
      // Each extra animal makes a solitary-species group worse.
      score = clamp(score - (chosen.length - 2) * 12, 5, 96);
      notes.push({
        text: `Adding more of them together makes it worse, not better — this species is meant to live alone.`,
        source: base.source,
      });
    }
    return { score: clamp(Math.round(score), 5, 96), notes: notes.slice(0, 2) };
  }

  // Mixed household: every pair gets scored; the worst pair sets the risk level.
  const pairs: PairRule[] = [];
  for (let i = 0; i < chosen.length; i++) {
    for (let j = i + 1; j < chosen.length; j++) {
      pairs.push(pairScore(chosen[i], chosen[j]));
    }
  }
  const min = Math.min(...pairs.map(p => p.score));
  const avg = pairs.reduce((sum, p) => sum + p.score, 0) / pairs.length;
  const score = clamp(
    Math.round(0.65 * min + 0.35 * avg - Math.max(0, chosen.length - 2) * 3),
    5,
    95
  );

  // Notes: the most at-risk pairs first, capped at 3 distinct messages.
  const seen = new Set<string>();
  const notes: CompatNote[] = [];
  [...pairs]
    .sort((a, b) => a.score - b.score)
    .forEach(p => {
      if (p.note && !seen.has(p.note) && notes.length < 3) {
        seen.add(p.note);
        notes.push({
          text: p.note,
          source: p.source || "Species husbandry guidance",
        });
      }
    });
  return { score, notes };
}
