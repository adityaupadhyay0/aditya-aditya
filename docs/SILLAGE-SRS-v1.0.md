# SILLAGE — System Requirements Specification

**A HexaDON × DTC Fragrance Experience**  
Prepared by: Aditya & Aditya  
Status: Build-Ready  
Version: 1.0  
Date: February 2026  
Vertical: Fine Fragrance / DTC  
Demo Brand: Sillage, Paris

> "The customer who lands on a HexaDON-built experience does not feel sold to. They feel found."

## Table of Contents
00. The Wound  
01. Authority  
02. Persona  
03. Presence  
04. Layering Tool  
05. Branding Language  
06. Sound & Motion  
07. Full User Journey  
08. Data & Insights Layer  
09. Component Index  
10. Design Tokens

---

## 00 — The Wound

### The Problem
The average DTC fragrance brand loses 68% of customers at cart. Not because the product is wrong. Because the experience gave them nothing to hold onto.

A note pyramid is a grocery receipt. It describes chemistry without ever creating sensation. The person who used to stand behind the counter read the customer, narrated the product, and converted hesitation into desire. The page must now do that job.

### The Opportunity
Fragrance is invisible, subjective, and unsampleable through a screen. This is not a disadvantage. It is the opportunity: build an experience authoritative and atmospheric enough that imagination does the work.

### Root Cause Metrics
- Cart abandonment: **68%**
- ROAS plateau: **2 consecutive quarters**
- Repeat purchase rate: **Below industry average**
- Average PDP time: **Under 90 seconds**

---

## 01 — Authority

Authority = **Craft + Art**.

### 1.1 Fragrance DNA Object
All surfaces read from a structured object. Never hardcode copy.

```json
{
  "id": "no3-before-rain",
  "name": "No. 3",
  "title": "Before Rain",
  "tagline": "The scent of a sky about to open.",
  "story_arc": {
    "opening": { "headline": "A stillness in the air.", "body": "..." },
    "evolution": { "headline": "The cool resolves into warmth.", "body": "..." },
    "signature": { "headline": "This is what it feels like to be the calm before the storm.", "body": "..." }
  },
  "notes": {
    "top": [
      { "name": "Petrichor Accord", "energy": "electric", "duration_label": "0–30 minutes", "color": "#e8d5a3" },
      { "name": "Aldehydes", "energy": "cool", "duration_label": "0–20 minutes", "color": "#d4e8f0" }
    ],
    "heart": [
      { "name": "Iris Root Absolute", "energy": "refined", "duration_label": "30 min – 5 hours", "color": "#c4956a" },
      { "name": "Violet Leaf", "energy": "verdant", "duration_label": "1 – 4 hours", "color": "#9ea87a" }
    ],
    "base": [
      { "name": "Vetiver Bourbon", "energy": "grounded", "duration_label": "5 hours → forever", "color": "#5c3d2e" },
      { "name": "Ambrette Seed", "energy": "intimate", "duration_label": "6 hours → forever", "color": "#7a4f35" }
    ]
  },
  "craft": {
    "concentration": "23%",
    "concentration_label": "Eau de Parfum Intense",
    "iterations": 47,
    "perfumer": "Maison Leroux, Grasse",
    "batch_size": 400,
    "batch_label": "Limited — 400 bottles per run"
  }
}
```

### 1.2 Interactive Note Pyramid
Must teach, show, and feel.
- Hover note pill → tooltip with feeling/occasion/energy.
- Click note pill → synesthesia mode (tint + giant energy watermark, fade in/out).
- Hover tier → brightness up + timeline indicator.
- Toggle Art/Craft with equal accessibility.

### 1.3 Story Arc
Three scroll chapters:
1. Opening
2. Evolution
3. Signature

### 1.4 Craft Section
Required lines:
- `23% concentration — Eau de Parfum Intense`
- `47 iterations before this formula was approved.`
- `Composed by Maison Leroux, Grasse — the home of modern perfumery.`
- `One batch. 400 bottles. When it is gone, it is gone.`

---

## 02 — Persona

Archetypes:
- the_collector
- the_romantic
- the_gifter
- the_explorer
- the_returner

Detection uses passive signals: referral, dwell, scroll, search intent, session history.

Discovery Question engine appears when confidence is low or dwell > 3 minutes with no action.

---

## 03 — Presence

Hero adapts by source:
- Social: atmosphere first.
- Search: proof first.
- Email: relationship first.
- Direct: speed and depth.
- Referral: trust first.

---

## 04 — Layering Tool

Not recommendations. Stack expertise.

### Mood Configurations
- Evening Authority
- Sunday Morning
- Office Invisible
- The Gift of Depth

### Required behavior
- Maintain stack state.
- Add-to-stack updates cart with both products.
- Spray guide from mood config data.

---

## 05 — Branding Language

Replace generic DTC copy.
- “Add to Cart” → “Begin Your Bottle”
- “Shop Now” → “Find Your Frequency”
- “Loading…” → “A moment.”

Tone rules:
- No exclamation marks.
- Short present-tense sentences.
- No “product” language when “bottle” or “fragrance” works.

---

## 06 — Sound & Motion

Sound is opt-in with top-right toggle.

Sound map:
- Top note hover: high shimmer
- Heart note hover: warm mid tone
- Base note hover: low felt resonance
- Add to stack: two-tone harmonics
- CTA click: sustained decision tone

Motion map includes:
- staggered page load sequence
- story chapter enter animations
- fluid scroll gradient transitions
- micro-interactions on CTA/tabs/note pills/tooltips

---

## 07 — Full User Journey

1. Discovery  
2. Single Question  
3. Product Page  
4. Cart  
5. Post-Purchase (The Ghost)

Confirmation must include:
- “It is on its way to you.”
- wear note
- terminal-style intelligence panel

---

## 08 — Data & Insights Layer

Track events like:
- `pdp_view`
- `note_hover`
- `note_click`
- `tab_toggle`
- `story_arc_progress`
- `discovery_question_*`
- `layer_added`
- `cta_click`
- `order_complete`
- `sound_toggle`

Insights:
- note resonance
- art vs craft preference
- question conversion lift
- layering attach rate
- archetype LTV variance
- unisex blind spot

---

## 09 — Component Index

23 components across P0/P1/P2, including:
- PresenceHero
- NotePyramid
- StoryArcScroll
- ArtCraftToggle
- DiscoveryQuestion
- LayeringBuilder
- CartPanel
- ConfirmationPage
- IntelligencePanel
- SoundToggle
- PersonaDetector
- AnalyticsEmitter

---

## 10 — Design Tokens

### Color
- `--color-ink: #0a0908`
- `--color-cream: #f0ebe0`
- `--color-gold: #c9a96e`
- plus per-note overrides

### Typography
- Display: Cormorant Garamond
- System/data: DM Mono

### Motion
- `--duration-fast: 200ms`
- `--duration-base: 300ms`
- `--duration-scene: 800ms`

Respect `prefers-reduced-motion`.

---

## Closing

> "The customer does not leave because checkout was slow. They leave because they reached the end of the page and still felt uncertain."

Prepared by: Aditya & Aditya  
Contact: hello@adityaandaditya.tech  
Site: adityaandaditya.tech  
Document: SILLAGE SRS v1.0 — Build-Ready
