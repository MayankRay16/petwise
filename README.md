# Petwise

## Find the pet that fits your real life

Petwise is a welfare-first pet discovery experience for people who are considering an animal companion but want to think through the decision responsibly. It helps visitors compare the practical demands of different domesticated animals, explore breed and variety options, understand multi-pet trade-offs, and find trustworthy care guidance before they commit.

> Petwise is an educational starting point, not a veterinary diagnosis, adoption service, legal opinion, or substitute for advice from a qualified veterinarian or animal-welfare professional.

## Why Petwise exists

Choosing an animal should be based on more than appearance or impulse. A good match depends on a household’s available space, daily routine, time away from home, activity level, budget, experience, support network, tolerance for noise, and willingness to provide long-term care.

Petwise turns those considerations into a structured conversation. Its purpose is to make the first step more thoughtful and accessible while avoiding inflated claims, fake reviews, unnecessary account creation, and unsupported certainty about animal care.

## What the website does

| Experience | What it provides | Why it is useful |
| --- | --- | --- |
| **Find your fit quiz** | A 15-question, browser-based questionnaire about routine, space, time, activity, noise, budget, experience, household needs, commitment, care preferences, and support. | Helps a visitor identify which animals may fit their circumstances before they research adoption or purchase options. |
| **Compatibility results** | A ranked list of the full Petwise animal catalog, from highest to lowest compatibility, with percentage scores and explanatory factors. | Makes trade-offs visible instead of presenting one animal as universally “best.” |
| **Breed explorer** | Breed and variety lists for the animal type returned by the quiz, including examples such as Siberian Husky, Pug, Bernese Mountain Dog, cat breeds, rabbit breeds, and poultry varieties where applicable. | Gives visitors a practical next research step after choosing an animal category. |
| **Multi-Pet Guide** | A household builder where visitors choose how many animals they plan to keep, select same- or mixed-animal households, choose the animals, and receive a transparent compatibility heuristic. | Encourages visitors to consider space, social needs, care complexity, and the added responsibility of a multi-animal home. |
| **Care Library** | A curated set of veterinary, welfare, public-health, parasite-prevention, shelter-care, and breed-registry sources. | Directs visitors to organizations that can provide deeper, species-specific guidance. |
| **Source Assistant** | A deterministic question-to-source helper that maps common questions to a concise, cited answer template and the relevant organization’s website. | Provides an immediate research direction without pretending to browse live, diagnose illness, or replace professional care. |
| **Transparency and policy pages** | Terms, privacy, cookies, refunds, and a custom 404 experience. | Makes the site’s data practices, limitations, and navigation clearer. |

## Animal coverage

Petwise is intentionally broader than a dog-and-cat matcher. Its catalog includes domesticated companion, small-mammal, bird, fish, reptile, farm, working, and aviary categories represented in the implementation. Examples include dogs, cats, rabbits, guinea pigs, ferrets, hamsters, gerbils, rats, mice, chinchillas, horses, ponies, donkeys, goats, sheep, pigs, cattle, waterfowl, poultry, pigeons, finches, canaries, parrots, fish, and selected domestic reptiles.

The catalog is a research-oriented product feature rather than a claim that every listed animal is suitable for every household or jurisdiction. Local laws, housing rules, climate, veterinary availability, welfare standards, and responsible sourcing must be checked before acquiring any animal.

## How compatibility works

The quiz and Multi-Pet Guide use deterministic, client-side scoring. They compare answers against care-relevant characteristics encoded in the frontend, such as social needs, activity, space, noise, time alone, handling, budget, and care complexity.

The percentages are **decision-support heuristics**, not scientifically validated probabilities. A higher score means that the recorded answers are more aligned with the product’s encoded assumptions; it does not guarantee a successful relationship, health outcome, behavior, or welfare outcome. Animal welfare remains the priority, and visitors should validate a result with species-specific research and a qualified professional.

## Evidence and source policy

Petwise cross-references authoritative organizations before presenting care-related guidance. The Care Library includes sources from veterinary associations, animal-welfare organizations, public-health agencies, parasite-prevention groups, shelter-veterinary organizations, and breed registries [1] [3] [5] [6] [9] [10] [12] [13].

The current research set includes the American Veterinary Medical Association, American Animal Hospital Association, ASPCA, Merck Veterinary Manual, RSPCA, Humane Society of the United States, Centers for Disease Control and Prevention, Companion Animal Parasite Council, American Heartworm Society, World Small Animal Veterinary Association, Association of Shelter Veterinarians, American Kennel Club, The Cat Fanciers’ Association, American Rabbit Breeders Association, and The Livestock Conservancy [1] [3] [5] [6] [7] [8] [9] [10] [11] [12] [13] [14] [15] [16] [17].

The site uses these sources to point visitors toward responsible next steps. It does not reproduce them as a substitute for reading the original guidance. External links open the named organization’s website, where that organization’s own policies and updates apply.

## Privacy and responsible data collection

Petwise is designed to work without an account. The core quiz processes answers in the browser and does not require a name, email address, phone number, precise location, or pet medical record. Analytics is disabled by default in the current MVP. The site does not intentionally embed social feeds, advertising pixels, chat widgets, maps, or other optional trackers.

The site may use temporary browser state for functional interactions. Visitors can clear local browser data through their browser settings. If optional analytics, advertising, or other third-party services are introduced later, they should be blocked until appropriate consent is collected and the privacy and cookies policies are updated.

## Accessibility and trust principles

The interface is designed with a mobile-first layout, visible keyboard focus states, semantic controls, readable contrast, descriptive labels, alternative text for visual content, and reduced-motion support. The product avoids fake reviews and unsupported endorsements. It also keeps policy and limitation language visible instead of presenting a compatibility result as a guarantee.

Accessibility should still be verified with assistive technology, keyboard-only navigation, automated audits, and real users. The project’s accessibility work is an implementation goal, not a claim of formal compliance with every jurisdictional standard.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Petwise landing page |
| `/quiz` | 15-question pet-fit quiz |
| `/compatibility` | Ranked compatibility results |
| `/breeds/:animal` | Breed and variety explorer for an animal category |
| `/care` | Cited care library and source assistant |
| `/policies/terms` | Terms and conditions |
| `/policies/privacy` | Privacy policy |
| `/policies/cookies` | Cookies policy |
| `/policies/refunds` | Refund policy |
| `/404` | Custom not-found page |

## Technology

Petwise is a client-first React application built with:

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Wouter for lightweight client-side routing
- Radix UI and shadcn-style primitives for accessible interactions
- Lucide for interface icons
- Framer Motion for restrained interaction motion
- pnpm for dependency management
- Vercel for deployment

The core quiz, compatibility calculator, multi-pet heuristic, policy content, and source assistant do not require a backend API or database.

## Local development

### Requirements

- Node.js 22 or newer
- pnpm 10 or newer

### Install and run

```bash
pnpm install
pnpm dev
```

The development server runs on the Vite default port and is configured to accept network connections.

### Validate a change

```bash
pnpm check
pnpm build
```

`pnpm check` runs TypeScript validation. `pnpm build` creates the Vite frontend in `dist/public` and bundles the server entry used by the project template.

## Deployment

The repository is connected to Vercel through the `main` branch. The root `vercel.json` configures Vercel to run the build and serve `dist/public` as the static frontend while rewriting client-side routes to `index.html`.

Live site: [Petwise on Vercel](https://mayank-ray-portfolio-monk16.vercel.app)

Repository: [MayankRay16/petwise on GitHub](https://github.com/MayankRay16/petwise)

## Project status and limitations

Petwise is an MVP and should be treated as a responsible research aid rather than a completed animal-care authority. The source assistant uses curated deterministic responses and does not perform live web search. The compatibility percentages are product heuristics. Breed and variety coverage is broad but not guaranteed to be exhaustive for every registry, country, or species. The policy pages are general product disclosures and should be reviewed by the site owner and qualified legal counsel before use in a specific jurisdiction.

## Contributing

Contributions should preserve the project’s welfare-first approach. New claims should be supported by credible sources, species-specific advice should be clearly scoped, and changes should avoid collecting unnecessary personal data. Before opening a pull request, run `pnpm check` and `pnpm build`.

## References

[1]: https://www.avma.org/resources-tools/pet-owners/petcare "American Veterinary Medical Association pet care guidance"
[2]: https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations "American Veterinary Medical Association vaccination guidance"
[3]: https://www.aaha.org/resources/pet-health-resources/preventive-care/ "American Animal Hospital Association preventive care resources"
[4]: https://www.aspca.org/pet-care/general-pet-care/emergency-care-your-pet "ASPCA emergency care guidance"
[5]: https://www.aspca.org/about-us/aspca-policy-and-position-statements/species-suitable-be-companion-animals "ASPCA companion-animal species policy"
[6]: https://www.merckvetmanual.com/ "Merck Veterinary Manual"
[7]: https://www.rspca.org.uk/adviceandwelfare/pets "RSPCA pet advice and welfare resources"
[8]: https://www.humanesociety.org/resources/pet-care "Humane Society pet-care resources"
[9]: https://www.cdc.gov/healthy-pets/about/index.html "Centers for Disease Control and Prevention healthy pets guidance"
[10]: https://capcvet.org/ "Companion Animal Parasite Council"
[11]: https://www.heartwormsociety.org/ "American Heartworm Society"
[12]: https://wsava.org/global-guidelines/ "World Small Animal Veterinary Association global guidelines"
[13]: https://www.sheltervet.org/guidelines-for-standards-of-care-in-animal-shelters "Association of Shelter Veterinarians standards of care"
[14]: https://www.akc.org/dog-breeds/ "American Kennel Club dog breeds"
[15]: https://cfa.org/breeds/ "The Cat Fanciers’ Association cat breeds"
[16]: https://arba.net/recognized-breeds/ "American Rabbit Breeders Association recognized breeds"
[17]: https://livestockconservancy.org/heritage-breeds/poultry-breeds/ "The Livestock Conservancy poultry breeds"
