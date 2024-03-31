const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const daoName = "Harmonic Guild";
const feedLink = "https://https://www.harmonicguild.io";

return {
  type: "app", // every.near/type/app
  routes: {
    all: {
      path: "abdullahi3000.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "All", // maybe these should be moved to navbar specific
        icon: "bi-list",
        requiredHashtags: ["build"],
      },
    },
    pitch: {
      path: "abdullahi3000.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Pitch",
        icon: "bi-bell",
        requiredHashtags: ["build", "update"],
        template: `### BUILDER UPDATE:  ${formatDate(new Date())}
(posted via [${daoName} Gateway](${feedLink}?tab=update))

**✅ DONE**
- [what'd you do]
- [link proof]

**⏩ NEXT**
- [what's next?]
- [what are you thinking about?]

**🛑 BLOCKERS**
- [what's blocking you?]
- [how can someone help?]
`,
      },
    },
    documents: {
      path: "jgodwill.near/widget/gdocs",
      blockHeight: "final",
      init: {
        name: "Documents",
        icon: "bi-file-text",
        requiredHashtags: ["build", "question"],
        template: `## what is your question?
(posted via [${daoName} Gateway](${feedLink}?tab=question))

[what are you thinking about?]
[why are you asking?]
`,
      },
    },
  },
};
