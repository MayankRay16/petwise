export type AssistantAnswer = { title: string; source: string; text: string; href: string };

const S = {
  avmaCare: "https://www.avma.org/resources-tools/pet-owners/petcare",
  avmaVaccines: "https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations",
  aaha: "https://www.aaha.org/resources/pet-health-resources/preventive-care/",
  aspcaEmergency: "https://www.aspca.org/pet-care/general-pet-care/emergency-care-your-pet",
  aspcaDogs: "https://www.aspca.org/pet-care/dog-care",
  aspcaCats: "https://www.aspca.org/pet-care/cat-care",
  aspcaHamsters: "https://www.aspca.org/pet-care/small-pet-care/hamster-care",
  aspcaGuineaPigs: "https://www.aspca.org/pet-care/small-pet-care/guinea-pig-care",
  aspcaGerbils: "https://www.aspca.org/pet-care/small-pet-care/gerbil-care",
  aspcaSpayNeuter: "https://www.aspca.org/pet-care/general-pet-care/spayneuter-your-pet",
  rspcaPets: "https://www.rspca.org.uk/adviceandwelfare/pets",
  rspcaRabbits: "https://www.rspca.org.uk/adviceandwelfare/pets/rabbits",
  rspcaRabbitDiet: "https://www.rspca.org.uk/adviceandwelfare/pets/rabbits/diet",
  rspcaDogsDiet: "https://www.rspca.org.uk/adviceandwelfare/pets/dogs/diet",
  rspcaCatsDiet: "https://www.rspca.org.uk/adviceandwelfare/pets/cats/diet",
  rspcaFish: "https://www.rspca.org.uk/adviceandwelfare/pets/fish",
  rspcaChickens: "https://www.rspca.org.uk/adviceandwelfare/pets/chickens",
  rspcaHorses: "https://www.rspca.org.uk/adviceandwelfare/pets/horses",
  rspcaFerrets: "https://www.rspca.org.uk/adviceandwelfare/pets/ferrets",
  capc: "https://capcvet.org/",
  cdc: "https://www.cdc.gov/healthy-pets/about/index.html",
  humaneSociety: "https://www.humanesociety.org/animals",
  merck: "https://www.merckvetmanual.com/",
};

type SpeciesRule = {
  match: RegExp;
  name: string;
  general: AssistantAnswer;
  diet?: AssistantAnswer;
  lifespan?: AssistantAnswer;
};

/**
 * Species-specific care rules. Order matters: more specific species
 * (e.g. guinea pig) must be listed before generic ones (e.g. pig).
 * All guidance is general and welfare-first; every rule cites a public source.
 */
const speciesRules: SpeciesRule[] = [
  {
    match: /guinea\s?pigs?/i,
    name: "Guinea pig",
    general: {
      title: "Guinea pig care",
      source: "ASPCA · Guinea pig care",
      href: S.aspcaGuineaPigs,
      text: "Guinea pigs need same-species companionship, a large flat enclosure (not tiers), unlimited grass hay, and daily vitamin C — they cannot produce their own. They are vocal, social, and sensitive to heat, so keep them cool and find an exotics-savvy vet before problems appear.",
    },
    diet: {
      title: "Feeding guinea pigs",
      source: "ASPCA · Guinea pig care",
      href: S.aspcaGuineaPigs,
      text: "Feed unlimited grass hay, a measured amount of quality pellets, and a daily portion of vitamin-C-rich vegetables such as bell peppers or leafy greens, with fresh water always. Vitamin C drops in water are not a reliable substitute; sudden appetite loss or diarrhea needs an exotics vet promptly.",
    },
    lifespan: {
      title: "How long guinea pigs live",
      source: "ASPCA · Guinea pig care",
      href: S.aspcaGuineaPigs,
      text: "Guinea pigs commonly live 5–8 years — longer than many first-time caretakers expect. Plan for daily feeding, cleaning, and interaction across that whole span.",
    },
  },
  {
    match: /\bhamster/i,
    name: "Hamster",
    general: {
      title: "Hamster care",
      source: "ASPCA · Hamster care",
      href: S.aspcaHamsters,
      text: "Hamsters need a large, secure enclosure with deep bedding for burrowing, a solid-surface wheel for exercise, and a quiet location — they are nocturnal. A quality hamster mix plus small amounts of fresh food works; sugary treats and exercise balls cause injuries. Most hamster species are solitary and should be housed alone.",
    },
    diet: {
      title: "Feeding hamsters",
      source: "ASPCA · Hamster care",
      href: S.aspcaHamsters,
      text: "Feed a complete hamster mix as the base, supplemented with small amounts of fresh vegetables; keep sugary treats and citrus out. Fresh water should always be available. Hoarding food is normal — do not over-refill based on an empty-looking bowl.",
    },
    lifespan: {
      title: "How long hamsters live",
      source: "ASPCA · Hamster care",
      href: S.aspcaHamsters,
      text: "Hamsters commonly live 1.5–3 years — one of the shorter commitments among small pets, though daily care is still essential.",
    },
  },
  {
    match: /\bgerbil/i,
    name: "Gerbil",
    general: {
      title: "Gerbil care",
      source: "ASPCA · Gerbil care",
      href: S.aspcaGerbils,
      text: "Gerbils are social burrowers: keep compatible same-sex pairs or small groups, provide deep substrate for digging, a secure glass or tank-style enclosure, and a species-appropriate mix. They are quick and active — handle gently, and supervise children.",
    },
    diet: {
      title: "Feeding gerbils",
      source: "ASPCA · Gerbil care",
      href: S.aspcaGerbils,
      text: "Feed a quality gerbil mix as the base with small amounts of fresh vegetables; seeds and nuts are treats, not a staple. Fresh water should always be available, and uneaten fresh food should be removed before it spoils.",
    },
  },
  {
    match: /\brabbits?\b|\bbunn(?:y|ies)\b/i,
    name: "Rabbit",
    general: {
      title: "Rabbit care",
      source: "RSPCA · Rabbit welfare",
      href: S.rspcaRabbits,
      text: "Rabbits need space to run, dig, and stretch daily (not a hutch), companionship — they are social animals and should usually live with a compatible rabbit — a hay-based diet, and a rabbit-savvy vet, which not all clinics are. They can live 8–12 years, so they are a long commitment, not a low-effort starter pet.",
    },
    diet: {
      title: "Feeding rabbits",
      source: "RSPCA · Rabbit diet",
      href: S.rspcaRabbitDiet,
      text: "Rabbits need constant access to fresh grass hay (the bulk of the diet), a measured amount of pellets, and appropriate leafy greens, with fresh water always. Muesli-style mixes and starchy treats cause dental and gut problems. A rabbit that stops eating or passing droppings is an emergency — gut stasis can become life-threatening within a day, so contact a rabbit-savvy vet immediately.",
    },
    lifespan: {
      title: "How long rabbits live",
      source: "RSPCA · Rabbit welfare",
      href: S.rspcaRabbits,
      text: "Rabbits commonly live 8–12 years — a commitment comparable to many dogs, with daily care and rabbit-savvy veterinary access throughout.",
    },
  },
  {
    match: /\bdogs?\b|\bpupp(?:y|ies)\b/i,
    name: "Dog",
    general: {
      title: "Dog care",
      source: "ASPCA · Dog care",
      href: S.aspcaDogs,
      text: "Dogs need daily exercise, companionship, training, and preventive veterinary care — the right amount depends on the individual dog's age, breed mix, and health. Before adopting, plan for walks in all weather, alone-time arrangements for work or classes, and a budget that includes an emergency fund.",
    },
    diet: {
      title: "Feeding dogs",
      source: "RSPCA · Dog diet",
      href: S.rspcaDogsDiet,
      text: "Feed a complete, life-stage-appropriate dog food with fresh water always available; portions depend on age, size, activity, and body condition. Keep treats a small fraction of daily calories, and avoid cooked bones, grapes, raisins, chocolate, and xylitol. Sudden appetite loss or unexplained weight change is worth a vet call.",
    },
    lifespan: {
      title: "How long dogs live",
      source: "ASPCA · Dog care",
      href: S.aspcaDogs,
      text: "Dogs commonly live 10–13 years, varying widely by size and breed — large breeds age faster, and some small breeds reach 15+. Ask a vet about breed-specific screening so senior care can be planned in advance.",
    },
  },
  {
    match: /\bcats?\b|\bkittens?\b/i,
    name: "Cat",
    general: {
      title: "Cat care",
      source: "ASPCA · Cat care",
      href: S.aspcaCats,
      text: "Cats need enrichment, daily play, scratching options, litter care, and preventive vet visits — they are often more independent than dogs but not low-effort. A safe indoor or enclosed environment prevents most road, predator, and disease risks, and a second compatible cat can meet social needs when you are away.",
    },
    diet: {
      title: "Feeding cats",
      source: "RSPCA · Cat diet",
      href: S.rspcaCatsDiet,
      text: "Feed a complete cat food appropriate to age and body condition, with fresh water always available. Cats are obligate carnivores — homemade diets and dog food do not meet their needs. Sudden appetite loss, especially in overweight cats, should be checked by a vet promptly, and lilies and onions are toxic to cats.",
    },
    lifespan: {
      title: "How long cats live",
      source: "ASPCA · Cat care",
      href: S.aspcaCats,
      text: "Cats commonly live 12–18 years, and many indoor cats reach their late teens — preventive care and weight management are the biggest factors.",
    },
  },
  {
    match: /\bferrets?\b/i,
    name: "Ferret",
    general: {
      title: "Ferret care",
      source: "RSPCA · Ferret welfare",
      href: S.rspcaFerrets,
      text: "Ferrets are curious, social, and escape-prone: they need a large secure enclosure, daily playtime under supervision, companionship from other ferrets, a species-appropriate diet, and an exotics-savvy vet. Check local rules first — ferrets are restricted or banned in some areas.",
    },
    diet: {
      title: "Feeding ferrets",
      source: "RSPCA · Ferret welfare",
      href: S.rspcaFerrets,
      text: "Ferrets are obligate carnivores: feed a high-protein, high-fat species-appropriate diet — quality ferret or meat-based cat food — with fresh water always. They cannot digest fiber or plant protein well; fruit and sugary treats are unsuitable.",
    },
    lifespan: {
      title: "How long ferrets live",
      source: "RSPCA · Ferret welfare",
      href: S.rspcaFerrets,
      text: "Ferrets commonly live 5–10 years and are prone to several age-related diseases, so annual checkups with an exotics-savvy vet matter from early on.",
    },
  },
  {
    match: /fish\b|aquarium|goldfish|betta/i,
    name: "Fish",
    general: {
      title: "Fish and aquarium care",
      source: "RSPCA · Fish welfare",
      href: S.rspcaFish,
      text: "An aquarium is a living system: cycle the tank before adding fish, test water regularly, avoid overcrowding, and match species to your setup rather than the other way around. Most goldfish need far more space and filtration than bowls provide — expect a large, filtered tank.",
    },
    diet: {
      title: "Feeding fish",
      source: "RSPCA · Fish welfare",
      href: S.rspcaFish,
      text: "Feed small amounts once or twice a day — only what fish finish in a couple of minutes. Overfeeding is the most common cause of poor water quality and disease; uneaten food should be removed. Species needs vary, so check requirements for the exact species you keep.",
    },
  },
  {
    match: /\bchick(?:ens?|s)?\b|\bhens?\b|\broosters?\b/i,
    name: "Chicken",
    general: {
      title: "Chicken care",
      source: "RSPCA · Chicken welfare",
      href: S.rspcaChickens,
      text: "Chickens need a secure, ventilated coop and run, protection from predators, flock companionship, clean water, and grit plus layer calcium when laying. Check local rules first — many apartments, cities, and housing associations prohibit or restrict backyard poultry.",
    },
    diet: {
      title: "Feeding chickens",
      source: "RSPCA · Chicken welfare",
      href: S.rspcaChickens,
      text: "Feed a complete layer feed as the base, with grit for digestion and calcium available for laying hens; kitchen scraps should be a small supplement, not the diet. Fresh water must be clean daily — contaminated water is a common source of illness.",
    },
    lifespan: {
      title: "How long chickens live",
      source: "RSPCA · Chicken welfare",
      href: S.rspcaChickens,
      text: "Chickens commonly live 5–10 years, while hens lay most of their eggs in the first 2–3 years — plan for years of care well beyond the productive period.",
    },
  },
  {
    match: /horses?|pon(?:y|ies)|equine/i,
    name: "Horse",
    general: {
      title: "Horse care",
      source: "RSPCA · Horse welfare",
      href: S.rspcaHorses,
      text: "Horses are a daily, land-intensive commitment: grazing or forage, companionship — horses need other horses — farrier care every 6–8 weeks, dentistry, and an equine vet on call. Cost and time are the biggest reasons horses are rehomed, so plan honestly before taking one on.",
    },
    diet: {
      title: "Feeding horses",
      source: "RSPCA · Horse welfare",
      href: S.rspcaHorses,
      text: "Forage — grass or hay — should be the foundation of the diet, with hard feed only as needed for work and condition. Fresh water and salt must always be available. Horses have sensitive digestive systems; sudden feed changes and restricted forage can cause colic, which is a veterinary emergency.",
    },
    lifespan: {
      title: "How long horses live",
      source: "RSPCA · Horse welfare",
      href: S.rspcaHorses,
      text: "Horses commonly live 25–30 years — one of the longest commitments in animal care, often spanning career and family changes.",
    },
  },
  {
    match: /parrots?|\bbirds?\b|budg(?:ie|ies)|canar(?:y|ies)|finch(?:es)?|macaw|cockat(?:oo|iel)/i,
    name: "Bird",
    general: {
      title: "Bird care",
      source: "Merck Veterinary Manual",
      href: S.merck,
      text: "Bird care is highly species-specific: parrots need daily out-of-cage time, chewing and foraging enrichment, and companionship — some species for decades. Smoke, fumes from non-stick cookware, and drafts are serious hazards. Line up an avian vet before adopting, since not all clinics see birds.",
    },
    diet: {
      title: "Feeding pet birds",
      source: "Merck Veterinary Manual",
      href: S.merck,
      text: "A seed-only diet is a common cause of malnutrition in pet birds. Most parrots do best on a formulated pellet base with vegetables and limited seed as treats; species needs vary significantly, so check the Merck Veterinary Manual's species sections and ask an avian vet. Avocado and chocolate are toxic to birds.",
    },
  },
  {
    match: /snakes?|lizards?|reptiles?|turtles?|tortoises?|gecko|bearded dragon|chameleons?/i,
    name: "Reptile",
    general: {
      title: "Reptile care",
      source: "Merck Veterinary Manual",
      href: S.merck,
      text: "Reptile care is highly species-specific: temperature gradients, UVB lighting, humidity, and enclosure size must match the species exactly, and many reptiles live 10–40+ years. Metabolic bone disease from poor lighting is one of the most common and preventable problems. Find a reptile-savvy vet before adopting.",
    },
    diet: {
      title: "Feeding reptiles",
      source: "Merck Veterinary Manual",
      href: S.merck,
      text: "Reptile diets range from live insects to whole prey to leafy greens depending on the species — there is no general rule. Check the Merck Veterinary Manual for your exact species, supplement with calcium and vitamin D3 as directed by a reptile vet, and never guess with whole prey size.",
    },
  },
  {
    match: /chinchillas?|\brats?\b|\bm(?:ouse|ice)\b|goats?|sheep|\bpigs?\b|cows?|cattle|donkeys?|mules?|camels?|llamas?|alpacas?|buffalo|yaks?|ducks?|geese|goose|quails?|turkeys?|pigeons?/i,
    name: "Other species",
    general: {
      title: "Species-specific care",
      source: "Merck Veterinary Manual",
      href: S.merck,
      text: "Care for less-common species — from chinchillas, rats, and mice to farm animals — is highly species-specific: habitat, temperature, diet, social needs, and even local legality vary widely. Start with the Merck Veterinary Manual's public species guides, and line up a vet experienced with the species before committing.",
    },
  },
];

type TopicRule = { match: RegExp; answer: AssistantAnswer };

/** Topic rules, checked when no species is mentioned. Emergencies are handled first in answerFor. */
const topicRules: TopicRule[] = [
  {
    match: /vaccin|\bshots?\b|immuniz/i,
    answer: {
      title: "Vaccination planning",
      source: "AVMA · Vaccinations",
      href: S.avmaVaccines,
      text: "Vaccination schedules are individualized by a veterinarian based on age, lifestyle, exposure, geography, and health history. Bring any records you have and ask your clinic for a written plan — generic online schedules can be outdated, and some shots are legally required in many areas.",
    },
  },
  {
    match: /parasite|fleas?|ticks?|worms?|heartworm|mites?/i,
    answer: {
      title: "Parasite prevention",
      source: "Companion Animal Parasite Council",
      href: S.capc,
      text: "Parasite risk depends on species, region, lifestyle, and exposure — prevention is usually easier and cheaper than treatment. Ask a vet which products fit your animal's species, weight, and local risk; never use dog products on cats, as some are toxic to them.",
    },
  },
  {
    match: /spay|neuter|steriliz|castrat/i,
    answer: {
      title: "Spay and neuter",
      source: "ASPCA · Spay/neuter",
      href: S.aspcaSpayNeuter,
      text: "Spaying or neutering is a routine preventive procedure whose timing and tradeoffs a veterinarian should tailor to the individual animal — species, breed, size, and age all matter. Ask your vet for an individualized recommendation rather than a fixed rule.",
    },
  },
  {
    match: /cost|price|budget|expensive|afford|money|fees?\b/i,
    answer: {
      title: "Planning for cost",
      source: "AVMA · Responsible ownership",
      href: S.avmaCare,
      text: "Budget beyond food: preventive vet care, parasite control, supplies, boarding or pet-sitting, grooming, and an emergency fund for illness or injury. Costs scale with size and species, and a single emergency can cost several multiples of an adoption fee. If the plan only works financially when nothing goes wrong, it isn't a plan yet.",
    },
  },
  {
    match: /adopt|shelter|rescue|breeder|\bbuy\b|where.*\b(?:get|from)\b|rehous/i,
    answer: {
      title: "Adoption and sourcing",
      source: "Humane Society of the US",
      href: S.humaneSociety,
      text: "Adopting from a shelter or rescue usually means the animal has had a health and behavior check, and staff can tell you about the individual's temperament — the single most useful predictor of fit. If you go to a breeder, visit in person, meet the mother, and walk away from anyone who won't show you where the animals are raised.",
    },
  },
  {
    match: /introduc|get along|together|second|another pet|multi[- ]?pet|\bpairs?\b/i,
    answer: {
      title: "Introducing animals",
      source: "RSPCA · Pet advice",
      href: S.rspcaPets,
      text: "Introductions should take days to weeks, not minutes: separate spaces first, swap scents, feed on opposite sides of a barrier, and keep first meetings short and supervised. Keeping separate resources — food, resting spots, litter — permanently reduces tension. For sustained fear or aggression, involve a qualified behavior professional early. Petwise's multi-pet guide can also model the pairing before you commit.",
    },
  },
  {
    match: /train|behavio(?:u)?r|bark|bite|scratch|aggress|obedien|whine|meow/i,
    answer: {
      title: "Behavior and training",
      source: "RSPCA · Pet advice",
      href: S.rspcaPets,
      text: "Positive, reward-based training is the welfare-recommended approach; aversive tools like shock or prong collars tend to worsen fear-based behavior. Rule out pain first — many 'behavior problems' are medical in origin. For serious issues such as aggression, involve a qualified behavior professional or your vet early.",
    },
  },
  {
    match: /allerg|hypoallergen|asthma|\bkids?\b|child(?:ren)?|famil|bab(?:y|ies)/i,
    answer: {
      title: "Allergies, kids, and household fit",
      source: "CDC · Healthy pets, healthy people",
      href: S.cdc,
      text: "Spend unhurried, repeated time with the exact species — and ideally the exact animal — before committing: allergies can take repeated exposure to appear, and no animal is truly hypoallergenic. With children, choose a tolerant individual, supervise all contact, and teach gentle handling; hand-washing after contact prevents most disease risk.",
    },
  },
  {
    match: /\bvets?\b|check[- ]?ups?|appointments?|first visit|find a (?:vet|clinic)/i,
    answer: {
      title: "Finding routine care",
      source: "AAHA · Preventive care",
      href: S.aaha,
      text: "Line up a veterinarian before you need one urgently: an initial wellness exam, a vaccine plan, and a parasite prevention schedule should happen within days of bringing an animal home. Ask local clinics about species experience (especially for exotics), emergency arrangements, and rough cost ranges.",
    },
  },
  {
    match: /lifespan|how long|live\b|years\b/i,
    answer: {
      title: "Lifespan and commitment",
      source: "Merck Veterinary Manual",
      href: S.merck,
      text: "Lifespans vary enormously — from 2–3 years for some small rodents to 15–80+ years for some parrots and tortoises. Check a species-specific reference for the animal you're considering, and commit only if you can responsibly plan for the whole expected lifespan, including moves, life changes, and travel.",
    },
  },
];

const emergency: AssistantAnswer = {
  title: "Possible emergency",
  source: "ASPCA · Emergency care",
  href: S.aspcaEmergency,
  text: "Signs such as difficulty breathing, collapse, seizures, excessive bleeding, suspected poisoning, or an animal that cannot or will not eat can require immediate veterinary care. Call your veterinarian or an emergency clinic now — do not wait for an online answer.",
};

const fallback: AssistantAnswer = {
  title: "Start with a qualified care team",
  source: "AVMA · Pet care",
  href: S.avmaCare,
  text: "Petwise can point you to reliable public sources, but it cannot inspect an animal, diagnose illness, or verify a local rule. Share your animal's species, age, location, and concern with a licensed veterinarian or reputable welfare organization. For a faster answer here, try naming a species (e.g. 'what do rabbits eat') or a topic (e.g. 'adoption costs').",
};

const dietPattern = /food|feed|diet|nutrition|\beat(?:s|ing)?\b|meal|hungry|treats?|pellets?|hay\b/i;
const lifespanPattern = /lifespan|how long|live\b|years\b/i;
const emergencyPattern = /emergency|breath|seizure|bleed|collapse|poison|chok|swallow(?:ed|ing)?|hit by (?:a )?car|not eating|won'?t eat|stop(?:s|ped)? eating|letharg|injur|trauma|dying|diarrh(?:ea|oea)|vomit/i;

/** Deterministic, offline answer matching. Emergency signs always win; species rules come before generic topics. */
export function answerFor(query: string): AssistantAnswer {
  const q = query.toLowerCase().trim();
  if (!q) return fallback;
  if (emergencyPattern.test(q)) return emergency;
  // Species-specific diet and lifespan intents are the most precise answers, so they win.
  const species = speciesRules.find(rule => rule.match.test(q));
  if (species) {
    if (dietPattern.test(q) && species.diet) return species.diet;
    if (lifespanPattern.test(q) && species.lifespan) return species.lifespan;
  }
  // Topic intents (introductions, adoption, costs...) are more useful than generic species care.
  const topic = topicRules.find(rule => rule.match.test(q));
  if (topic) return topic.answer;
  // Species general care still beats the generic fallback.
  if (species) return species.general;
  return fallback;
}

export const suggestedQuestions = [
  "My rabbit stopped eating",
  "How do I introduce a second cat?",
  "What do guinea pigs eat?",
  "How long do dogs live?",
  "What should adoption cost?",
  "What counts as an emergency?",
];
