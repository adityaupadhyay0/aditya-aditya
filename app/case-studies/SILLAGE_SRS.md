SILLAGE — System Requirements Specification
A HexaDON × DTC Fragrance Experience
Prepared by: Aditya & Aditya
Status: Build-Ready
Version: 1.0
Date: February 2026
Vertical: Fine Fragrance / DTC
Demo Brand: Sillage, Paris

"The customer who lands on a HexaDON-built experience does not feel sold to. They feel found."

Table of Contents
#	Section	What It Covers
00	The Wound	Problem statement. Why this system exists.
01	Authority	Scent DNA · Note Pyramid · Sensory Language · Art vs Craft
02	Persona	Archetypes · Detection Logic · Discovery Engine · Decision Tree
03	Presence	Entry Context · Emotional Temperature · Arrival Variants
04	Layering Tool	Stack Builder · Mood Configurations · Upsell Logic · Spray Guide
05	Branding Language	Copy System · Tone Rules · Language Audit · Visual Grammar
06	Sound & Motion	Ambient Audio · Micro-interactions · Animation Spec
07	Full User Journey	All 5 Stages · States · Edge Cases · Post-Purchase
08	Data & Insights Layer	Schema · Signals · Intelligence · Blind Spots
09	Component Index	All 23 UI Components — Priority, Spec, Behaviour
10	Design Tokens	Colour · Typography · Spacing · Motion
00 The Wound
Before a single component is built, the developer must understand what this system is healing.

The Problem
The average DTC fragrance brand loses 68% of customers at cart. Not because the product is wrong. Because the experience gave them nothing to hold onto.

A note pyramid is a grocery receipt. It describes chemistry without ever creating sensation. The customer reads "Top: Bergamot, Heart: Iris, Base: Vetiver" — understands nothing — and closes the tab. Not because the fragrance was wrong for them. Because the page gave them no reason to stay.

The person who used to stand behind the counter at Harrods read the customer, narrated the product, and converted hesitation into desire. She sold a version of yourself you didn't know you wanted to be yet. She asked where you were going tonight. She described a scent the way a novelist describes a room. She made the price feel like the smallest part of the decision.

You replaced her with a product page.

The Opportunity
Fragrance is the hardest product to sell online. It is invisible. It is subjective. It cannot be sampled through a screen. The customer is being asked to spend £165 on a sensation they can only imagine.

This is not a disadvantage. This is the entire opportunity.

When you cannot rely on the product to sell itself, you must build an experience so authoritative, so atmospherically complete, so precisely calibrated to the person in front of it, that the imagination does the work the nose cannot.

The customer should not need to smell it. They should feel it as though they already own it.

Root Cause Metrics
Signal	Number	Meaning
Cart abandonment	68%	No emotional anchor before checkout
ROAS plateau	2 consecutive quarters	Acquisition works. Conversion is broken.
Repeat purchase rate	Below industry average	No relationship was built at point of sale
Average time on PDP	Under 90 seconds	Nothing held them long enough
01 Authority
Pillar: Making the customer experience both the art and the craft of the product.

"Authority makes comparison shopping irrelevant. Once you have shown a customer the full depth of what they are about to buy, no other product page can compete. They cannot unsee it."

Authority has two sides:

The Craft — the technical story. Sourcing, process, precision. Ingredient provenance. Concentration. Iteration count. This answers the rational objection before the customer can form it. It transforms the price from a barrier into evidence.
The Art — the sensory and emotional narrative. Not what the fragrance is made of, but what it does to the world. The feeling. The occasion. The identity it confers.
The product page must deliver both, simultaneously, without overwhelming the customer.

1.1 The Fragrance DNA Object
Every product in the Sillage catalogue must have a structured DNA Object. Every surface of the UI reads from this object. The developer must never hardcode copy — it must all be pulled from this schema.

{
  "id": "no3-before-rain",
  "name": "No. 3",
  "title": "Before Rain",
  "tagline": "The scent of a sky about to open.",

  "story_arc": {
    "opening": {
      "headline": "A stillness in the air.",
      "body": "Something electric and clean arrives before you understand what it is. This is the moment before the storm — that specific quality of charged silence."
    },
    "evolution": {
      "headline": "The cool resolves into warmth.",
      "body": "Root and earth rise slowly, as if the ground itself is responding. The sharp gives way to the considered. This is the scent settling into your skin."
    },
    "signature": {
      "headline": "This is what it feels like to be the calm before the storm.",
      "body": "What remains is not dramatic. It is assured. Worn by the person who doesn't need to enter a room loudly."
    }
  },

  "notes": {
    "top": [
      {
        "name": "Petrichor Accord",
        "feeling": "Rain on dry earth. A breath held.",
        "occasion": "The moment before everything changes.",
        "color": "#e8d5a3",
        "energy": "electric",
        "duration_label": "0–30 minutes"
      },
      {
        "name": "Aldehydes",
        "feeling": "Cool. Metallic light through cloud cover.",
        "occasion": "First impressions. Sharp clarity.",
        "color": "#d4e8f0",
        "energy": "cool",
        "duration_label": "0–20 minutes"
      }
    ],
    "heart": [
      {
        "name": "Iris Root Absolute",
        "feeling": "Powdered stone. Quiet, unreachable elegance.",
        "occasion": "The second hour of a dinner you didn't want to leave.",
        "color": "#c4956a",
        "energy": "refined",
        "duration_label": "30 min – 5 hours"
      },
      {
        "name": "Violet Leaf",
        "feeling": "Green-edged. A garden after a storm has moved through.",
        "occasion": "Afternoons. Considered solitude.",
        "color": "#9ea87a",
        "energy": "verdant",
        "duration_label": "1 – 4 hours"
      }
    ],
    "base": [
      {
        "name": "Vetiver Bourbon",
        "feeling": "Smoke and soil. The ground after rain has passed.",
        "occasion": "Evening. Whatever comes after.",
        "color": "#5c3d2e",
        "energy": "grounded",
        "duration_label": "5 hours → forever"
      },
      {
        "name": "Ambrette Seed",
        "feeling": "Skin-warm. Something intimate and barely there.",
        "occasion": "The end of the day. What stays.",
        "color": "#7a4f35",
        "energy": "intimate",
        "duration_label": "6 hours → forever"
      }
    ]
  },

  "craft": {
    "concentration": "23%",
    "concentration_label": "Eau de Parfum Intense",
    "iterations": 47,
    "perfumer": "Maison Leroux, Grasse",
    "sourcing": {
      "iris": "Florence, Italy. Harvested after 3-year root maturation.",
      "vetiver": "Réunion Island. Distilled slowly for maximum depth.",
      "aldehydes": "Synthesised in-house. Batch-controlled."
    },
    "batch_size": 400,
    "batch_label": "Limited — 400 bottles per run"
  },

  "mood_tags": ["contemplative", "elegant", "autumn", "London", "Sunday morning"],

  "persona_match": ["the_collector", "the_romantic"],

  "layering_affinity": [
    { "id": "no1-cedar-smoke", "mood": "Evening authority" },
    { "id": "no7-white-suede", "mood": "Weekend softness" }
  ],

  "wear_guide": {
    "application_points": ["Inner wrists", "Base of throat", "Behind the knee"],
    "spray_count": {
      "daytime": 2,
      "evening": 3,
      "special_occasion": 4
    },
    "tip": "Apply to bare skin before dressing. The warmth of your body is the final ingredient."
  }
}
1.2 Interactive Note Pyramid — Specification
The note pyramid is the centrepiece of the Authority pillar. It must do three things simultaneously:

Teach — explain what notes are without condescension
Show — represent the time relationship visually
Feel — make each note emotionally real through interaction
Visual Structure
The pyramid is rendered as three horizontal tiers, widening from top to base. Each tier's width is proportional to its longevity on skin.

       ┌──────────────┐          ← TOP NOTES     (narrowest)
       │  Petrichor   │            0–30 min
       └──────────────┘
     ┌──────────────────────┐    ← HEART NOTES
     │   Iris · Violet Leaf │      30 min–5 hr
     └──────────────────────┘
  ┌──────────────────────────────┐← BASE NOTES   (widest)
  │  Vetiver Bourbon · Ambrette  │   5hr → forever
  └──────────────────────────────┘
Each tier has a colour identity drawn from notes[tier][n].color. The tier background is a gradient blending the colors of all notes within that tier, at low opacity (max 8% on dark background).

Interactions Required
Trigger	Behaviour
Hover: Note Pill	Tooltip panel appears adjacent. Shows: note name, feeling text (italic), occasion text, energy tag. Animate: opacity 0→1, translateY 8px→0, 200ms ease-out.
Click: Note Pill	Full viewport background shifts to a gradient tinted with note.color at 4% opacity. The note's energy word appears as a large typographic watermark (font-size: 20vw, opacity 0.04) that fades after 2500ms. This is scent synesthesia — the visual communicating the olfactory.
Hover: Tier	The tier brightens (opacity of background gradient increases to 16%). A timeline indicator appears on the right: "Lasts X hours on skin."
Toggle: Art / Craft	Two tab states on the Authority block. Art shows story arc, emotional language, occasion imagery, colour mood. Craft shows concentration, sourcing, perfumer, iterations, batch size. Cross-fade 300ms. Neither is the default — both are equally accessible.
Scroll: Story Arc	As the user scrolls, the scent story arc plays out in chapters. Opening chapter at load. Heart chapter pins at 40% scroll. Base chapter at 70% scroll. Use IntersectionObserver. Background gradient transitions across note-tier colours across the scroll range.
Hover: Craft Fact	Each sourcing fact has a one-sentence expansion on hover. E.g. "Florence, Italy." expands to "The iris root requires three years in the ground before it can be harvested. This is the root, not the flower."
Colour-to-Scent Grammar
The following is a system rule, not a suggestion. All visual colour choices on the product page must derive from the DNA object.

Note Tier	Colour Role	Usage
Top notes	Accent, highlights, first-impression UI	Button borders, hover states, hero gradient top
Heart notes	Mid-tone, body text highlight	Section dividers, active states
Base notes	Dark fills, shadow, anchor colours	Backgrounds, weight, footer
This means every product page looks and feels different because every fragrance has a different DNA. The system is not restyled — it is reprogrammed by the scent itself.

1.3 The Story Arc — Copy Template
The developer must implement a three-chapter scroll section driven by story_arc in the DNA object. Each chapter has:

A chapter number (typographic, large, low-opacity)
A headline (display typeface, ~3rem)
A body paragraph (serif, italic, ~1.1rem)
A background gradient shift tied to the corresponding note tier
Chapter 1 — The Opening

Headline: story_arc.opening.headline
Body: story_arc.opening.body
Background tint: blend of top[0].color and top[1].color at 5% opacity

Chapter 2 — The Evolution

Headline: story_arc.evolution.headline
Body: story_arc.evolution.body
Background tint: blend of heart[0].color and heart[1].color at 5% opacity

Chapter 3 — The Signature

Headline: story_arc.signature.headline
Body: story_arc.signature.body
Background tint: blend of base[0].color and base[1].color at 5% opacity

1.4 Craft Section — Rational Authority
Displayed in Craft tab mode. This is the rational side of authority. It makes the price feel earned.

Required fields and copy format:

Field	Display Copy Format
craft.concentration	"23% concentration — Eau de Parfum Intense"
craft.iterations	"47 iterations before this formula was approved."
craft.perfumer	"Composed by Maison Leroux, Grasse — the home of modern perfumery."
craft.sourcing.iris	"Florence, Italy." + hover expansion
craft.sourcing.vetiver	"Réunion Island." + hover expansion
craft.batch_size	"One batch. 400 bottles. When it is gone, it is gone."
Each fact must be a single line with the optional hover expansion available. Do not dump all of this at once — this is Hick's Law applied to credential building. The customer absorbs at their own pace.

02 Persona
Pillar: Removing cluelessness from intelligent systems.

"Personalisation gives you more of what you already clicked on. Persona gives you the version of the experience that makes you feel understood."

Persona is not a segment. It is a real-time context engine — a living model of who is in front of the experience, built from the signals they give unconsciously through behaviour.

2.1 The Five Archetypes
Archetype ID	Who They Are	What They Need	How the Experience Adapts
the_collector	Serious wearer. Knows notes. 12+ bottles. Direct nav or brand search.	Depth. Craft. Novelty. First access.	Lead with Craft tab. Show iteration count and batch number immediately. Skip the education layer entirely. CTA: "Reserve Your Batch."
the_romantic	Buying as an emotional act. Arrived via social. Drawn to story.	Feeling. Identity. Narrative.	Lead with Art tab. Story arc is the primary experience. Pyramid is secondary. CTA: "Begin Your Bottle."
the_gifter	Buying for someone else. Uncertain. Needs to feel safe.	Confidence. Simplicity. Reassurance.	Single question in hero: "Who are you giving this to?" Route to curated gift view. Show gift packaging callout alongside price. CTA: "Find Their Frequency."
the_explorer	First time in fragrance. No vocabulary. No frame of reference.	Education without condescension. Trust.	Education mode active. Every note has plain-language feeling. Story arc IS the product page. Price and concentration are secondary. CTA: "Discover Your Scent."
the_returner	Has bought before. Knows their bottle. Came back.	Recognition. Reward. Expansion.	Personalised hero: "Welcome back. No. 3 is still here." Layering Tool is primary surface. Cross-sell using layering_affinity.
2.2 Archetype Detection Logic
Persona is never a form. The system must read the customer through passive behavioural signals before they have typed a single word.

SIGNAL                          → INFERRED ARCHETYPE      → EXPERIENCE CONFIG

Referral: direct navigation     → collector / returner     → craft-first, no intro layer
Referral: instagram.com         → romantic / explorer      → art-first, full narrative
Referral: google ("best iris…") → collector with intent    → note-specific entry, proof-led
Referral: google ("gift idea")  → gifter                   → gifting hero, guided path
Referral: email campaign        → returner                 → personalised hero + layering
Session token: prev. purchase   → returner                 → confirmed, load purchase history
Dwell > 3min, no CTA click      → explorer / undecided     → trigger discovery question
Scroll > 80% with no intent     → romantic                 → ambient narrative mode
Filter applied: "unisex"        → collector or explorer    → note detail expanded by default
Search: "something like rain"   → romantic / explorer      → semantic match to DNA mood_tags
The developer must implement a session context object that is built and updated in real-time:

{
  "session_id": "sx_29fhw8",
  "referral_source": "instagram",
  "inferred_archetype": "the_romantic",
  "confidence": 0.82,
  "signals_observed": ["social_referral", "dwell_2m_40s", "no_filter_applied"],
  "experience_config": {
    "lead_with": "art",
    "education_mode": false,
    "gifting_mode": false,
    "layering_prominent": false,
    "cta_copy": "Begin Your Bottle"
  }
}
2.3 The Discovery Question Engine
When archetype confidence is below 0.65, or when the customer has dwelled >3 minutes without acting, the system surfaces one question. Never more than one at a time. This is Hick's Law enforced at the persona level.

Question Set (pick ONE based on session context):

Q1 — Memory (use for: explorer, romantic)

"Tell us one thing you remember and we'll find your scent."

Options:

"Something from childhood that made everything feel safe"
"A city in the rain"
"The morning before something important"
"A room I haven't been in for years"
Q2 — Occasion (use for: gifter, undecided)

"Where does a scent live for you?"

Options:

"On my skin — quiet, for me"
"In a room — I want to change the air"
"In memory — I chase a feeling"
"On someone else"
Q3 — Identity (use for: returner expanding their collection)

"What do you want to feel, not smell like?"

Options:

"Assured. Like the decision is already made."
"Warm. Like the end of a very good day."
"Interesting. Like there's more to know."
"Clean. Like everything has been cleared."
Each answer maps to archetype refinement and to specific mood_tags in the DNA object. The system must route accordingly.

2.4 Persona Decision Tree
START
│
├─ Is referral source known?
│   ├─ YES → Apply initial archetype from 2.2 signal table
│   └─ NO  → Default to explorer config (education mode on, art-first)
│
├─ Is session token present?
│   ├─ YES → Load purchase history → Set returner config
│   └─ NO  → Continue passive detection
│
├─ Dwell > 3 minutes AND no CTA click?
│   ├─ YES → Surface Discovery Question (Q1 or Q2 based on scroll depth)
│   └─ NO  → Continue
│
├─ Question answered?
│   ├─ YES → Re-score archetype, update experience_config
│   └─ NO  → Hold current config
│
└─ Output: experience_config object → drives all surface rendering
03 Presence
Pillar: How clienting tech meets the world.

"Presence turns your acquisition spend into relationship capital. You didn't get more customers. You stopped wasting the ones you already had."

Presence is the principle that the experience must know where the customer came from — and honour the emotional state they arrived in. They came with a temperature. Presence is the discipline of meeting them at it.

3.1 Entry State Variants
The hero section of the product page renders differently based on referral source. These are not gimmicks. They are atmospheric calibrations.

Variant A — Social Arrival (Instagram / TikTok)

The customer arrives seduced. They saw something. Give them atmosphere first. Proof comes later.

Full-screen narrative hero: just the tagline, centred, no product detail
Background: full-bleed gradient using top-note colours, slow animated pulse
Copy: "Some things you feel before you understand them."
Scroll CTA: "Discover No. 3" (not "Shop Now")
Product price: not visible until second scroll
Variant B — Search Arrival (High Intent)

The customer arrives decided. They searched for something specific. Give them proof.

Hero shows product immediately: name, note list, concentration, price
Story arc is available but not the primary surface
Craft tab is default-open
CTA: "Begin Your Bottle" — not buried
Variant C — Email Arrival (Returning Customer)

The customer was invited back. Honour the relationship.

Personalised first line: "Welcome back. No. 3 is still here for you."
If they have purchase history: show their bottle, time since purchase
Layering Tool is surfaced in the first scroll
New scent introduction uses layering_affinity from their owned bottle
Variant D — Direct Navigation

The customer knows where they are. Respect their time.

Minimal intro, maximum depth available immediately
All tabs (Art / Craft) equally accessible
Batch number visible
CTA for collectors: "Reserve Your Batch"
Variant E — Referral (A Friend)

The most trusted entry path. The highest-intent stranger.

Hero: "Someone wanted you to find this."
No aggressive conversion pressure
Discovery Question surfaces early — they don't know where to start
Social proof is most visible here
3.2 Presence Variables (Developer Implementation)
The developer must read the following variables on page load and pass them into the component rendering layer:

{
  "arrival": {
    "source": "instagram | google | email | direct | referral | unknown",
    "utm_campaign": "string | null",
    "is_returning": true,
    "last_visit_days_ago": 14
  },
  "rendering": {
    "variant": "A | B | C | D | E",
    "hero_copy": "derived from variant",
    "show_price_in_hero": true,
    "default_tab": "art | craft",
    "show_layering_tool": false,
    "cta_text": "Begin Your Bottle"
  }
}
04 Layering Tool
Pillar: Upsell through expertise, not pressure.

The Layering Tool is not a "you might also like" carousel. It is a fragrance stacking guide — a system that teaches the customer how to combine scents to create a specific effect. It is the most powerful upsell in fine fragrance because it converts a single-product customer into a collection customer without ever feeling like a sales move.

The customer doesn't think "I'm being upsold." They think "I didn't know I could do that."

4.1 Mood Configurations
Each mood configuration has: a name, a primary scent, one or two supporting scents, an application sequence, and a spray guide.

Mood 01 — Evening Authority

"The version of you that doesn't need to explain itself."

Role	Scent	Application
Foundation	No. 3 — Before Rain	2 sprays to inner wrists
Layer	No. 1 — Cedar & Smoke	1 spray to base of throat
Sequence	Foundation first, wait 60 seconds, apply layer
Mood 02 — Sunday Morning

"No agenda. No performance. Just the day."

Role	Scent	Application
Foundation	No. 7 — White Suede	1 spray to chest
Layer	No. 3 — Before Rain	1 spray to wrists
Sequence	Layer first (it evaporates fastest), foundation over the top
Mood 03 — Office Invisible

"Present without imposing. Noticed by the right people."

Role	Scent	Application
Foundation	No. 3 — Before Rain	1 spray, hair or collar
Sequence	Single scent. Restraint is the point.
Mood 04 — The Gift of Depth

"For when you want to give them something they won't find anywhere else."

Role	Scent	Application
Foundation	No. 3 — Before Rain	Full bottle
Add	Sillage Discovery Set	Three 10ml bottles to explore
CTA	"Build Their Set"	→ routes to gift builder
4.2 Layering Tool UI Specification
Component: LayeringBuilder

Display as a two-column panel: Primary Scent (left) + Layering Options (right)
Primary scent is pre-loaded from the current product page
Right column shows 2–4 affinity scents pulled from layering_affinity in DNA object
Each affinity scent shows: name, one-line feeling, the combined effect (new copy field required in DNA)
User can click to add to their stack
STACK BUILDER UI STATE

┌─────────────────────────┬────────────────────────────────┐
│  YOUR FOUNDATION         │  ADD A LAYER                   │
│                          │                                │
│  No. 3 — Before Rain     │  No. 1 — Cedar & Smoke         │
│  "The storm, settled."   │  + "Deepens the base.          │
│                          │     Adds weight for evening."  │
│  ● ● ○  2 sprays         │  [ Add to Stack ]              │
│  Inner wrists            │                                │
│                          │  No. 7 — White Suede           │
│                          │  + "Softens the top.           │
│                          │     Weekend, not boardroom."   │
│                          │  [ Add to Stack ]              │
└─────────────────────────┴────────────────────────────────┘

  [ View Your Stack ]     TOTAL: £165  →  £295 with No. 1
Spray Guide (required on every configuration):

HOW TO WEAR THIS STACK

1. Apply No. 3 first. Two sprays to inner wrists.
2. Wait 60 seconds. Let the top notes open.
3. Apply No. 1. One spray to the base of your throat.
4. Do not rub. The heat of your skin will blend them.
5. The stack evolves over 6 hours. Give it time.
Technical requirements:

Stack state must be maintained across page navigation
"Add to Stack" must update cart with both items
Combined stack name should be generated dynamically from mood config
The spray guide copy must come from the mood configuration object — not hardcoded
4.3 Layering Data Schema
{
  "layering_stacks": [
    {
      "id": "stack_evening_authority",
      "mood_name": "Evening Authority",
      "mood_tagline": "The version of you that doesn't need to explain itself.",
      "products": [
        {
          "role": "foundation",
          "product_id": "no3-before-rain",
          "sprays": 2,
          "application_point": "inner wrists",
          "sequence_position": 1,
          "wait_after_seconds": 60
        },
        {
          "role": "layer",
          "product_id": "no1-cedar-smoke",
          "sprays": 1,
          "application_point": "base of throat",
          "sequence_position": 2
        }
      ],
      "combined_effect": "The petrichor of No. 3 meets the smoke of No. 1. What results is a presence — dry, authoritative, and difficult to place.",
      "best_occasion": "Evening. A dinner you chose carefully.",
      "total_duration_hours": 8
    }
  ]
}
05 Branding Language
Pillar: Why an unbranded system is garbage.

"Branding is not the story you tell about your product. It is the philosophy your product enforces on the world."

Sillage's moral stance is this: fragrance is not an accessory. It is a practice. That stance must live in every sentence the system produces. Every word is downstream of the philosophy — and the customer feels the difference even when they cannot name it.

5.1 The Language Audit
Every default DTC word must be replaced. The developer must never use the generic column. Search the codebase before shipping.

Context	Generic DTC	Sillage
Add to cart	"Add to Cart"	"Begin Your Bottle"
Out of stock	"Out of Stock"	"Currently in maturation."
Shop now	"Shop Now"	"Find Your Frequency"
Order confirmed	"Your order is confirmed."	"It is on its way to you."
Subscribe CTA	"Subscribe for 10% off"	"First access. Before anyone else."
Product description	"Product Description"	"What it does to a room."
Reviews section	"Customer Reviews"	"From those who wear it."
Returns	"Free Returns"	"If it is not right, we make it right."
Recommendations	"You might also like"	"Others who share your frequency."
Urgency	"Limited Time Offer"	"One batch. When it is gone, it is gone."
New products	"New Arrivals"	"What has changed since you were last here."
Best sellers	"Best Sellers"	"What most people reach for first."
Email opt-in	"Sign up for our newsletter"	"Stay close. We only write when it matters."
Loading state	"Loading..."	"A moment."
Search placeholder	"Search products"	"Find your atmosphere."
404 page	"Page not found"	"This room doesn't exist. But others do."
Empty cart	"Your cart is empty"	"Nothing yet. That is about to change."
5.2 Tone Rules
The developer must ensure all system-generated copy (error messages, confirmations, empty states) follows these rules:

Never use exclamation marks. They are undignified.
Never start a sentence with "We". Start with "You" or the thing itself.
Short sentences over long ones. One idea per sentence.
Present tense is preferred. "It is on its way" not "Your order has been shipped."
Avoid the word "product". Say "bottle", "fragrance", or use the name.
Never use passive voice for craft facts. "We distilled this slowly" not "This was distilled slowly."
Numbers under 10 are written as words. Four sprays. Not 4 sprays.
Price never has context. £165 stands alone. Never write "only £165" or "just £165."
5.3 Post-Purchase Copy — The Ghost Protocol
The confirmation and post-purchase experience is where most DTC brands abandon their philosophy. Sillage must not.

Confirmation Page Copy:

"It is on its way to you."

No. 3 — Before Rain · Arriving within 3 days.

A note while you wait:

"Wear it first on a day with nothing else in it. Let it be the only interesting thing about the day."

Day 3 — Arrival Email:

Subject: "It has arrived."

No. 3 is with you now.

Give it a morning before you decide anything about it.

Fragrance takes time to show you what it is.

Day 14 — Relationship Email:

Subject: "Two weeks with No. 3."

You've worn it now. You know it in a way you couldn't before it arrived.

If it has become something to you — we'd like to know what.

[Write us something]

Day 30 — Early Access:

Subject: "No. 4 is nearly ready."

You were here before most people. So you should know first.

[Ozonics · 30ml preview · First batch]

06 Sound & Motion
Pillar: Sensory branding — where sound and sight prime expectation before copy lands.

Sound must be opt-in. A discreet ambient toggle in the top-right corner of the product page. Icon: a sound wave that is visually quiet when inactive, subtly animated when active.

6.1 Sound Specification
All audio must be royalty-free, custom-produced or licensed. No stock sounds.

Trigger	Sound Description	Technical Spec
Page load (with sound on)	A breath of air through an open window. 4 seconds, fades to ambient.	WAV, 48kHz, -18 LUFS
Hover: Top Note	A high, brief shimmer. Metallic, like a clean glass. 0.3s.	Triggered per hover, max 1x per 2s
Hover: Heart Note	A mid tone, slightly warm. Like a piano key held softly. 0.5s.
Hover: Base Note	A low resonance. Not a note — a felt frequency. 0.8s.
Add to Stack (Layering)	Two tones in sequence. Harmonious. Brief.	Played once per add action
Begin Your Bottle (CTA)	A soft, sustained tone that fades. Feels like a decision. 1.2s.
Story Arc transition	No sound. The silence between chapters is intentional.
Craft tab open	A single, dry keystroke sound. Precise. 0.1s.
Developer Note: All sounds must be loaded lazily. They must never play automatically on page load without user consent. The ambient toggle must persist via localStorage between sessions.

6.2 Motion Specification
Motion in this system is not decoration. Every animation must have a reason.

Page Load Sequence (with timing):

Element	Animation	Duration	Delay	Easing
Background gradient	Fade in from black	1200ms	0ms	ease-in
Eyebrow label	Fade up 20px	600ms	300ms	ease-out
Product name	Fade up 30px	800ms	500ms	ease-out
Tagline	Fade up 20px	700ms	700ms	ease-out
Note pyramid	Fade in (each tier staggered)	500ms each	900ms, 1100ms, 1300ms	ease-out
CTA button	Fade up, subtle border pulse	600ms	1200ms	ease-out
Scroll Animations:

Trigger	Animation
Story Arc chapter enters viewport	Fade up from 40px, opacity 0→1, 800ms
Craft facts	Each line fades in with 80ms stagger
Layering Tool enters viewport	Slides up from 60px, 600ms
Note pyramid hover (tier)	Background brightness increase, 150ms ease
Background Gradient Transitions (scroll-driven):

The page background gradient must shift as the user scrolls through the story arc. This is a core visual mechanic.

0% scroll    → ink (#0a0908) with trace of top-note color
30% scroll   → transition begins toward heart-note tint
50% scroll   → heart-note color at maximum (4% opacity)
70% scroll   → transition to base-note color
90% scroll   → base-note color at maximum (4% opacity)
100% scroll  → returns to near-black for CTA section
Implementation: use scroll event listener with lerp interpolation on CSS custom properties. Do not use scroll-snap for this — it must be fluid.

Micro-interactions:

Component	Behaviour
CTA Button	Border draws in (SVG stroke animation) on hover, 200ms. No transform.
Tab toggle (Art/Craft)	Underline slides between tabs, 200ms ease. Content cross-fades.
Note pill	Background fill expands from center, 150ms ease.
Stack Builder "Add"	Product card slides left, quantity indicator fades in.
Tooltip	Scale 0.95→1, opacity 0→1, 200ms ease-out.
07 Full User Journey
Five stages. Each has a state, a required outcome, and an edge case.

Stage 01 — Discovery
Where they are: Landing on the product page for the first time.

What must happen:

Presence variables are read (referral source, session token)
Archetype is inferred (confidence score built)
Hero renders in the correct Presence Variant (A–E)
Sound toggle is visible but inactive
Outcome: The customer understands what they are looking at and feels something. Not sold to — curious.

Edge case: Unknown referral source → default to Variant D (direct nav behaviour). Do not show nothing while detecting.

Stage 02 — The Single Question
When triggered: Dwell > 3 minutes, no CTA click OR archetype confidence < 0.65.

What must happen:

One question surfaces (from Section 2.3)
The question must feel like the brand is curious about them, not gathering data
The question replaces no other content — it appears as an overlay or focused panel
Answer updates the session context object and re-renders experience_config
Copy:

"Before we continue — can we ask you one thing?" [Question text]

Outcome: Archetype confidence increases. Experience adapts. Customer feels understood.

Edge case: Customer dismisses the question → log the dismissal, default to romantic archetype config, do not ask again in this session.

Stage 03 — The Product Page
Where they are: Fully engaged with the product experience.

What must happen:

Art / Craft toggle available and functional
Interactive note pyramid fully operational
Story arc visible and scroll-driven
Layering Tool available (prominence determined by archetype)
Wear guide accessible
Price visible, contextualised by craft
CTA State Machine:

archetype == collector     → CTA: "Reserve Your Batch"
archetype == romantic      → CTA: "Begin Your Bottle"
archetype == gifter        → CTA: "Find Their Frequency"
archetype == explorer      → CTA: "Discover No. 3"
archetype == returner      → CTA: "Add No. 3 to Your Collection"
default                    → CTA: "Begin Your Bottle"
Outcome: The customer does not feel uncertain. The decision is emotional and already made before the CTA is pressed.

Stage 04 — The Cart
The cart must not interrupt the emotional state the customer arrived at.

Required elements:

Product name and title (not SKU, not product ID)
A single confirming line: "Arrives in 2–3 days."
No cross-sells here. No urgency prompts. No discount offers.
One line of narrative below the product: pulled from story_arc.signature.headline
What is not in the cart:

Related products
"Limited time" messaging
Any copy that breaks the emotional register
CTA: "Complete Your Order" — not "Checkout", not "Pay Now."

Stage 05 — Post-Purchase (The Ghost)
This is what most DTC brands ignore. Sillage cannot.

Confirmation page must show:

"It is on its way to you." — large, centred
Product name
Estimated arrival
The "wear note" — a single line of instruction pulled from dna.wear_guide.tip
Intelligence log (visible, intentional): A designed panel showing the persona data collected — not as surveillance, but as proof of craft. This is a HexaDON signature.
┌─────────────────────────────────────────────┐
│ SILLAGE · SESSION INTELLIGENCE               │
│                                             │
│ ARRIVAL          Direct navigation          │
│ ARCHETYPE        The Collector              │
│ INTENT           Self — a serious purchase  │
│ LTV PROJECTION   £840 over 24 months        │
│                                             │
│ NEXT ENGAGEMENT                             │
│ T+14 days: A note on wearing No. 3 in winter│
│ T+30 days: Early access to No. 4            │
└─────────────────────────────────────────────┘
This panel must be styled exactly as a data terminal — monospace font, scan-line subtle animation, no decorative elements. It is not a gimmick. It is a demonstration that the system saw them precisely.

08 Data & Insights Layer
Pillar: The intelligence of the entire customer base.

"The market is always telegraphing where it is going. Insights is the infrastructure that lets you read the signal before it becomes a trend."

8.1 Events to Track
Every behavioural signal must be logged with timestamp, session ID, and product context.

Event	Trigger	Data Captured
pdp_view	Product page load	product_id, referral_source, archetype_inferred
note_hover	Hover on any note pill	note_name, tier, dwell_ms
note_click	Click on note pill	note_name, tier
tab_toggle	Art ↔ Craft toggle	from_tab, to_tab, dwell_on_prev_ms
pyramid_tier_hover	Hover on pyramid tier	tier (top/heart/base), dwell_ms
story_arc_progress	Scroll through story arc	chapter (1/2/3), completion_pct
discovery_question_shown	Q surfaces	question_id, archetype_at_time
discovery_question_answered	Q answered	question_id, answer_selected, archetype_after
discovery_question_dismissed	Q dismissed	question_id
layering_tool_open	Tool visible	mood_shown
layer_added	Product added to stack	product_id, stack_mood
cta_click	CTA pressed	cta_text, archetype, page_dwell_ms
cart_open	Cart opened	stack_total_value
order_complete	Purchase confirmed	order_id, products, total, archetype
sound_toggle	Sound enabled/disabled	direction (on/off)
8.2 Insight Patterns to Surface in Dashboard
The following are the KPIs that matter for this system. The developer must ensure the analytics layer captures the underlying data.

Insight	Signal	Why It Matters
Note resonance	Which notes are hovered longest per session	Tells you which notes are doing the selling
Art vs Craft preference	Tab toggle ratios by archetype	Tells you what your customer values — story or proof
Question conversion lift	Sessions with Q answered vs sessions without	Measures persona's direct revenue impact
Layering attach rate	% of single-bottle orders that become two-bottle	Primary upsell metric
Archetype LTV variance	Revenue per archetype over 24 months	Tells you which customer type to acquire
Blind spot: unisex filter	Sessions filtering "unisex" vs total conversion	Historically underserved, overperforming segment
Story arc completion	% of customers reaching signature chapter	Measures editorial engagement and its correlation to purchase
09 Component Index
All 23 UI components required for this system. Priority levels: P0 (required for launch), P1 (required for full experience), P2 (phase two).

#	Component Name	Description	Priority
01	PresenceHero	Dynamic hero that renders one of 5 variants based on arrival context. Reads from presence object. Full viewport.	P0
02	NotePyramid	Three-tier interactive pyramid. Hover tooltips, click effects, background synesthesia.	P0
03	NoteTooltip	Tooltip panel with feeling, occasion, energy tag. Positioned relative to hovered note.	P0
04	StoryArcScroll	Three-chapter scroll-driven narrative section. Scroll-bound background gradient transitions.	P0
05	ArtCraftToggle	Two-tab panel. Art: narrative. Craft: credentials. Cross-fade transition.	P0
06	CraftFact	Single line fact with hover-expand sub-copy. Used inside Craft tab.	P0
07	CTAButton	Archetype-driven CTA. Text pulled from experience_config.cta_text. Border draw-in animation on hover.	P0
08	DiscoveryQuestion	Overlay/panel with one question and four answer options. Triggers on dwell or low confidence.	P0
09	LayeringBuilder	Two-column layering tool. Foundation + affinity options. Stack builder. Spray guide.	P1
10	StackCard	Individual scent card within LayeringBuilder. Shows name, feeling, combined effect, add button.	P1
11	SprayGuide	Step-by-step application guide. Generated from stack mood configuration.	P1
12	WearGuide	Single-product application points and spray count guide. From dna.wear_guide.	P1
13	CartPanel	Minimal cart. Product name/title, arrival estimate, narrative line, complete order CTA. No cross-sells.	P0
14	ConfirmationPage	Post-purchase page. Headline, product, arrival, wear note, Intelligence Panel.	P0
15	IntelligencePanel	The Ghost — data terminal showing persona data. Monospace, styled as terminal output.	P1
16	SoundToggle	Ambient sound on/off. Subtle wave icon. State persisted to localStorage.	P1
17	ScrollGradient	Scroll-driven background gradient engine. Reads note tier colours. Lerp-interpolated.	P0
18	PersonaDetector	Client-side logic only. Reads referral, session token, dwell time. Builds and updates session_context.	P0
19	AnalyticsEmitter	Event logger. Fires on all tracked interactions from Section 8.1.	P0
20	GiftingView	Alternative product page layout for gifter archetype. Curated set view, gift packaging callout.	P1
21	ReturnerHero	Personalised hero variant for returning customers. Loads purchase history.	P1
22	PostPurchaseEmail	Email template series: Day 3, Day 14, Day 30. Driven by DNA copy.	P1
23	BlindSpotAlert	Admin-facing dashboard insight panel. Surfaces anomalies from Section 8.2.	P2
10 Design Tokens
All visual decisions must be implemented as CSS custom properties. Nothing is hardcoded.

10.1 Colour System
/* Foundation */
--color-ink:        #0a0908;   /* True background — not pure black */
--color-deep:       #100e0c;   /* Alternate section background */
--color-surface:    #161210;   /* Card / panel background */
--color-lift:       #1e1a16;   /* Hover state fill */

/* Text */
--color-cream:      #f0ebe0;   /* Primary text */
--color-smoke:      #7a7268;   /* Secondary / body text */
--color-mist:       #4a4540;   /* Tertiary / disabled */

/* Brand */
--color-gold:       #c9a96e;   /* Primary accent — use sparingly */
--color-gold-dim:   #8a6e44;   /* Secondary accent, labels */

/* Borders */
--color-border:     rgba(201,169,110,0.12);
--color-border-hi:  rgba(201,169,110,0.35);

/* Note DNA (overridden per product via JS) */
--note-top:         #e8d5a3;   /* No. 3 default */
--note-heart:       #c4956a;
--note-base:        #5c3d2e;
10.2 Typography
Two typefaces only. No exceptions.

Role	Typeface	Weight	Style
Display / Headlines	Cormorant Garamond	300, 400	Italic for emotional moments
Labels / Data / Code	DM Mono	300, 400	Uppercase for system labels
Body copy	Cormorant Garamond	300	Italic for sensory copy
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-mono:    'DM Mono', monospace;

/* Scale */
--text-xs:    0.58rem;   /* Labels, eyebrows, metadata */
--text-sm:    0.75rem;   /* Secondary body */
--text-base:  1rem;      /* Body copy */
--text-md:    1.2rem;    /* Subheadings */
--text-lg:    1.8rem;    /* Section titles */
--text-xl:    3rem;      /* Product names */
--text-2xl:   clamp(4rem, 10vw, 9rem);   /* Hero titles */

/* Letter spacing */
--tracking-wide:  0.3em;   /* All caps mono labels */
--tracking-tight: -0.02em; /* Display headlines */
10.3 Spacing
--space-xs:   0.5rem;
--space-sm:   1rem;
--space-md:   2rem;
--space-lg:   4rem;
--space-xl:   7rem;
--space-2xl:  clamp(5rem, 12vw, 10rem);  /* Section padding */
10.4 Motion Tokens
--duration-instant:  100ms;
--duration-fast:     200ms;
--duration-base:     300ms;
--duration-slow:     600ms;
--duration-scene:    800ms;

--ease-out:   cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in:    cubic-bezier(0.4, 0.0, 1, 1);
--ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1);
All animations must respect prefers-reduced-motion. When set, disable all transforms and gradient transitions. Fade-only alternatives are acceptable.

Closing
"The customer does not leave because the checkout was slow.
They leave because they reached the end of the page
and still felt uncertain — not about the product,
but about themselves.
Is this me? Am I the kind of person who wears this?
When Authority, Persona, Presence, Insights, and Branding are all working —
the UX resolves itself.
Not because you optimised the button.
Because there is no longer any friction between the customer
and a confident decision."

Prepared by: Aditya & Aditya
Contact: hello@adityaandaditya.tech
Site: adityaandaditya.tech
Document: SILLAGE SRS v1.0 — Build-Ready
