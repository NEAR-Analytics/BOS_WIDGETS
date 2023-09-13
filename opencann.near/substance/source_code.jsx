const substance = props.substance || "cannabis";
const method = props.{substance}.method;
const effects = props.effects;
const physicalEffects = props.{substance}.physicalEffects;
const visualEffects = props.{substance}.visualEffects;
const auditoryEffects = props.{substance}.auditoryEffects;
const cognitiveEffects = props.{substance}.cognitiveEffects;
const multisensoryEffects = props.{substance}.multisensoryEffects;

{"properties":
    [
        {"name":"substance","type":"string"},
        {"name":"description","type":"string","isMulti":true},
        {"name":"consumptionMethod","type":"every.near/type/markdown","isMulti":false},
        {"name":"physicalEffects","type":"string","isMulti":true},
        {"name":"visualEffects","type":"string","isMulti":true},
        {"name":"auditoryEffects","type":"string","isMulti":true},
        {"name":"cognitiveEffects","type":"string","isMulti":true},
        {"name":"multisensoryEffects","type":"string","isMulti":true},
        {"name":"","type":"date","isMulti":false},
        {"name":"startTime","type":"time","isMulti":false},
        {"name":"end","type":"date","isMulti":false},
        {"name":"endTime","type":"time","isMulti":false},
        {"name":"location","type":"string","isMulti":false},
        {"name":"link","type":"string","isMulti":false},
        {"name":"organizer","type":"string","isMulti":false},
        {"name":"isAllDay","type":"boolean","isMulti":false},
        {"name":"category","type":"string","isMulti":"false"},
        {"name":"logo","type":"every.near/type/image"},
        {"name":"background","type":"every.near/type/image","isMulti":false},
        {"name":"hashtags","type":"string","isMulti":"true"}
    ],
        "widgets":{}
}

{"method": [
                "Smoke",
                "Vapor (dry herb)",
                "Vapor (concentrate)",
                "Edible",
                "Drink",
                "Tincture",
                "Topical",
                "Sublingual/buccal",
              ]}

{"physicalEffects": [
                "None",
                "Appetite enhancement",
                "Appetite suppression",
                "Bodily pressures (e.g. eye)",
                "Changes felt in gravity",
                "Decreased blood pressure",
                "Dizziness",
                "Dehydration",
                "Dry mount",
                "Gustatory (taste) enhancement",
                "Increased heart rate",
                "Increased perspiration",
                "Insomnia",
                "Loss of motor control",
                "Muscle relaxation",
                "Muscle spasms",
                "Nausea",
                "Nausea suppression",
                "Pain relief",
                "Physical euphoria",
                "Red eye",
                "Sedation",
                "Seizure suppression",
                "Spontaneous bodily sensations",
                "Tactile enhancement",
              ]}

{"visualEffects": [
                "None",
                "Color enhancement",
                "Blurry vision",
                "Brightness alteration",
                "Pattern recognition enhancement",
                "Tracers",
                "Geometry (visuals)",
                "Internal hallucination",
              ]}

{"auditoryEffects": [
                "None",
                "Enhancements",
                "Distortions",
                "Hallucinations",
              ]}

{"cognitiveEffects": [
                "None",
                "Anxiety",
                "Anxiety suppression",
                "Analysis enhancement",
                "Analysis suppression",
                "Conceptual thinking",
                "Cognitive euphoria",
                "Creativity enhancement",
                "Delusion",
                "Depersonalization",
                "Dream suppression",
                "Decreased libido",
                "Increased libido",
                "Emotion enhancement",
                "Feelings of impending doom",
                "Focus suppression",
                "Focus enhancement",
                "Immersion enhancement",
                "Increased music appreciation",
                "Increased sense of humor",
                "Laughter fits",
                "Memory suppression",
                "Mindfulness",
                "Motivation suppression",
                "Novelty enhancement",
                "Paranoia",
                "Personal meaning enhancement",
                "Psychosis",
                "Sleepiness",
                "Suggestibility enhancement",
                "Thought connectivity",
                "Thought deceleration",
                "Time distortion",
              ]}

{"multisensoryEffects": [
                "None",
                "Synaesthesia",
              ]}