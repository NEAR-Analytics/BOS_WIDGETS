// const { normalize } = VM.require("devs.near/widget/lib.stringUtils") || {
//   normalize: (str) => str,
// };
const normalize = (text, delimiter) => {
  // If no delimiter is provided, default to an underscore
  delimiter = delimiter || "-";
  return (
    text
      // Convert to lowercase
      .toLowerCase()
      // Replace spaces with dashes
      .replace(/\s+/g, delimiter)
      // Replace any non-alphanumeric characters (excluding dashes) with nothing
      .replace(`/[^a-z0-9${delimiter}]/g`, "")
      // Replace multiple consecutive dashes with a single dash
      .replace(`/${delimiter}+/g`, "-")
      // Trim dashes from the start and end of the string
      .replace(`/^${delimiter}+|${delimiter}+$/g`, "")
  );
};
let github = VM.require("docs.bos-workspace.near/widget/PR.adapter.github");
const data = {
  "": JSON.stringify({
    title: "My Documentation",
    sections: [
      {
        title: "Getting Started",
        content: "",
        subsections: [
          {
            title: "Migration Guide",
            content: "# Instructions for installing the software.",
          },
          {
            title: "Installation",
            content: "# Instructions for installing the software.",
          },
          {
            title: "Setup",
            content: "Guidelines for setting up the environment.",
          },
        ],
      },
      {
        title: "Usage",
        content: "Hello 2",
        subsections: [
          {
            title: "Aliases",
            content: "Instructions for basic usage.",
          },
          {
            title: "Deploy",
            content: "Instructions for advanced usage.",
          },
        ],
      },
      {
        title: "Examples",
        content: "Hello 3",
        subsections: [
          {
            title: "Example 1",
            content: "Description and usage of Example 1.",
          },
          {
            title: "Example 2",
            content: "Description and usage of Example 2.",
          },
        ],
      },
      {
        title: "Blocks",
        content: {},
        subsections: [
          {
            title: "Template",
            content: "Description and usage of Example 1.",
          },
        ],
      },
    ],
  }),
  metadata: {
    name: "bos-workspace",
    description: `bos-workspace is a comprehensive toolset designed to simplify the
      development and deployment of NEAR components and applications. With
      support for hot reload, TypeScript, and multiple app management, it caters
      to developers looking for an efficient and scalable developer environment.`,
  },
};
const documentation = JSON.parse(data[""] || "null");
const contentMap = {};
// Iterate over sections and subsections to populate content map
documentation.sections.forEach((section) => {
  const sectionPath = normalize(section.title, "_");
  contentMap[sectionPath] = { title: section.title, content: section.content };
  section.subsections.forEach((subsection) => {
    const subsectionPath = `${sectionPath}/${normalize(subsection.title, "_")}`;
    contentMap[subsectionPath] = {
      title: subsection.title,
      content: subsection.content,
    };
  });
});
return {
  get: (params) => {
    if (params) {
      let path = params.path;
      let parts = path.split("/");
      if (parts.length === 1) {
        parts.push("index");
        path = parts.join("/");
      }
      return github.get(path + ".md");
    }
    return contentMap; // index
  },
  create: (k, v) => {
    console.log("create");
  },
};
