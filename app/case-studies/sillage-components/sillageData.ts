export interface Note {
  name: string;
  feeling: string;
  occasion: string;
  color: string;
  energy: string;
  duration_label: string;
}

export interface StoryChapter {
  headline: string;
  body: string;
}

export interface FragranceDNA {
  id: string;
  name: string;
  title: string;
  tagline: string;
  story_arc: {
    opening: StoryChapter;
    evolution: StoryChapter;
    signature: StoryChapter;
  };
  notes: {
    top: Note[];
    heart: Note[];
    base: Note[];
  };
  craft: {
    concentration: string;
    concentration_label: string;
    iterations: number;
    perfumer: string;
    sourcing: {
      [key: string]: string;
    };
    batch_size: number;
    batch_label: string;
  };
  mood_tags: string[];
  persona_match: string[];
  layering_affinity: { id: string; mood: string }[];
  wear_guide: {
    application_points: string[];
    spray_count: {
      daytime: number;
      evening: number;
      special_occasion: number;
    };
    tip: string;
  };
}

export const SILLAGE_PRODUCTS: Record<string, FragranceDNA> = {
  "no3-before-rain": {
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
  },
  "no1-cedar-smoke": {
    "id": "no1-cedar-smoke",
    "name": "No. 1",
    "title": "Cedar & Smoke",
    "tagline": "The quiet weight of ancient wood.",
    "story_arc": {
        "opening": { "headline": "Ignition.", "body": "A brief flash of spice, quickly consumed by something deeper." },
        "evolution": { "headline": "The wood begins to burn.", "body": "Cedarwood provides the structure, dry and uncompromising." },
        "signature": { "headline": "The embers remain.", "body": "A smoky trail that stays long after the light has faded." }
    },
    "notes": {
        "top": [{ "name": "Black Pepper", "feeling": "Sharp, energetic.", "occasion": "Immediate attention.", "color": "#2a2a2a", "energy": "sharp", "duration_label": "0-15 min" }],
        "heart": [{ "name": "Atlas Cedarwood", "feeling": "Dry, structural.", "occasion": "Quiet confidence.", "color": "#8b5e3c", "energy": "grounded", "duration_label": "30 min - 4 hr" }],
        "base": [{ "name": "Birch Tar", "feeling": "Smoky, leather-like.", "occasion": "The end of the evening.", "color": "#1a1a1a", "energy": "primal", "duration_label": "5 hr +" }]
    },
    "craft": {
        "concentration": "20%",
        "concentration_label": "Eau de Parfum",
        "iterations": 32,
        "perfumer": "Maison Leroux, Grasse",
        "sourcing": { "cedar": "Atlas Mountains, Morocco. Sustainably harvested." },
        "batch_size": 500,
        "batch_label": "Seasonal Batch"
    },
    "mood_tags": ["authoritative", "dry", "winter", "evening"],
    "persona_match": ["the_collector"],
    "layering_affinity": [],
    "wear_guide": {
        "application_points": ["Pulse points"],
        "spray_count": { "daytime": 1, "evening": 2, "special_occasion": 3 },
        "tip": "Wear it when you need to be heard without speaking."
    }
  },
  "no7-white-suede": {
    "id": "no7-white-suede",
    "name": "No. 7",
    "title": "White Suede",
    "tagline": "The softness of a second skin.",
    "story_arc": {
        "opening": { "headline": "A pale morning.", "body": "Clean, light, and almost transparent." },
        "evolution": { "headline": "Tactile warmth.", "body": "The feeling of soft suede against bare skin." },
        "signature": { "headline": "An intimate whisper.", "body": "Close to you. Barely there, but essential." }
    },
    "notes": {
        "top": [{ "name": "White Musk", "feeling": "Clean, airy.", "occasion": "Daily ritual.", "color": "#f8f8f8", "energy": "ethereal", "duration_label": "0-30 min" }],
        "heart": [{ "name": "Suede Accord", "feeling": "Soft, velvety.", "occasion": "Intimate moments.", "color": "#d2b48c", "energy": "tactile", "duration_label": "30 min - 3 hr" }],
        "base": [{ "name": "Sandalwood", "feeling": "Creamy, warm.", "occasion": "Sunday morning.", "color": "#c19a6b", "energy": "comforting", "duration_label": "4 hr +" }]
    },
    "craft": {
        "concentration": "18%",
        "concentration_label": "Eau de Parfum",
        "iterations": 54,
        "perfumer": "Maison Leroux, Grasse",
        "sourcing": { "musk": "Synthetic blend. Cruelty-free." },
        "batch_size": 600,
        "batch_label": "Continuous Batch"
    },
    "mood_tags": ["soft", "intimate", "weekend", "morning"],
    "persona_match": ["the_romantic", "the_explorer"],
    "layering_affinity": [],
    "wear_guide": {
        "application_points": ["Chest", "Neck"],
        "spray_count": { "daytime": 2, "evening": 1, "special_occasion": 2 },
        "tip": "Apply after a warm shower for maximum intimacy."
    }
  }
};

export interface LayeringStack {
  id: string;
  mood_name: string;
  mood_tagline: string;
  products: {
    role: "foundation" | "layer";
    product_id: string;
    sprays: number;
    application_point: string;
    sequence_position: number;
    wait_after_seconds?: number;
  }[];
  combined_effect: string;
  best_occasion: string;
  total_duration_hours: number;
}

export const LAYERING_STACKS: LayeringStack[] = [
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
  },
  {
    "id": "stack_sunday_morning",
    "mood_name": "Sunday Morning",
    "mood_tagline": "No agenda. No performance. Just the day.",
    "products": [
      {
        "role": "layer",
        "product_id": "no3-before-rain",
        "sprays": 1,
        "application_point": "wrists",
        "sequence_position": 1
      },
      {
        "role": "foundation",
        "product_id": "no7-white-suede",
        "sprays": 1,
        "application_point": "chest",
        "sequence_position": 2
      }
    ],
    "combined_effect": "The crisp rain of No. 3 is softened by the skin-warmth of No. 7. It feels like clean sheets and open windows.",
    "best_occasion": "No agenda. No performance. Just the day.",
    "total_duration_hours": 6
  }
];

export type Archetype = "the_collector" | "the_romantic" | "the_gifter" | "the_explorer" | "the_returner";

export interface ExperienceConfig {
  lead_with: "art" | "craft";
  education_mode: boolean;
  gifting_mode: boolean;
  layering_prominent: boolean;
  cta_copy: string;
}

export const ARCHETYPE_CONFIGS: Record<Archetype, ExperienceConfig> = {
  the_collector: {
    lead_with: "craft",
    education_mode: false,
    gifting_mode: false,
    layering_prominent: false,
    cta_copy: "Reserve Your Batch"
  },
  the_romantic: {
    lead_with: "art",
    education_mode: false,
    gifting_mode: false,
    layering_prominent: false,
    cta_copy: "Begin Your Bottle"
  },
  the_gifter: {
    lead_with: "art",
    education_mode: true,
    gifting_mode: true,
    layering_prominent: false,
    cta_copy: "Find Their Frequency"
  },
  the_explorer: {
    lead_with: "art",
    education_mode: true,
    gifting_mode: false,
    layering_prominent: false,
    cta_copy: "Discover Your Scent"
  },
  the_returner: {
    lead_with: "art",
    education_mode: false,
    gifting_mode: false,
    layering_prominent: true,
    cta_copy: "Add to Your Collection"
  }
};

export const SILLAGE_LANGUAGE = {
  add_to_cart: "Begin Your Bottle",
  out_of_stock: "Currently in maturation.",
  shop_now: "Find Your Frequency",
  order_confirmed: "It is on its way to you.",
  subscribe_cta: "First access. Before anyone else.",
  product_description: "What it does to a room.",
  reviews_section: "From those who wear it.",
  returns: "If it is not right, we make it right.",
  recommendations: "Others who share your frequency.",
  urgency: "One batch. When it is gone, it is gone.",
  new_products: "What has changed since you were last here.",
  best_sellers: "What most people reach for first.",
  email_opt_in: "Stay close. We only write when it matters.",
  loading: "A moment.",
  search_placeholder: "Find your atmosphere.",
  error_404: "This room doesn't exist. But others do.",
  empty_cart: "Nothing yet. That is about to change."
};
