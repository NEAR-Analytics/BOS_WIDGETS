const substance = {
  properties: [
    { name: "substance", type: "string" },
    { name: "description", type: "string", isMulti: true },
    {
      name: "consumptionMethod",
      type: "every.near/type/markdown",
      isMulti: false,
    },
    { name: "physicalEffects", type: "string", isMulti: true },
    { name: "visualEffects", type: "string", isMulti: true },
    { name: "auditoryEffects", type: "string", isMulti: true },
    { name: "cognitiveEffects", type: "string", isMulti: true },
    { name: "multisensoryEffects", type: "string", isMulti: true },
    { name: "category", type: "string", isMulti: "false" },
    { name: "logo", type: "every.near/type/image" },
    { name: "background", type: "every.near/type/image", isMulti: false },
    { name: "hashtags", type: "string", isMulti: "true" },
  ],
  widgets: {},
};
