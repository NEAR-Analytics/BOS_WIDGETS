function jsonToType(obj) {
  function getType(value, key) {
    if (typeof value === "string") {
      return { type: "string" };
    }

    if (typeof value === "number") {
      return { type: "number" };
    }

    if (typeof value === "boolean") {
      return { type: "boolean" };
    }

    if (Array.isArray(value)) {
      return {
        type: "array",
        required: true,
        array: {
          validation: { min: 1 },
          type: value.length ? getType(value[0]).type : "object", // Unwrap the type here
        },
      };
    }

    if (typeof value === "object") {
      const properties = Object.keys(value).map((innerKey) => ({
        name: innerKey,
        ...getType(value[innerKey], innerKey),
      }));
      return { type: { properties } }; // Keep the type wrapping here
    }

    return { type: "object" };
  }

  const properties = Object.keys(obj).map((key) => ({
    name: key,
    required: obj[key] !== null,
    ...getType(obj[key], key),
  }));

  return { properties };
}
const inputJSON = {
  src: {
    contractId: "caoeunoeanstu",
    tokenId: "213",
  },
  alt: "This is a description of the image",
  fallbackSrc: "https://www.example.com/image.png",
};
return jsonToType(props.input ?? inputJSON);
