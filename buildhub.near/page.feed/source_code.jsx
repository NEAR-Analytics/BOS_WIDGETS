const { TEMPLATES } = VM.require("buildhub.near/widget/feed.templates") || {
  TEMPLATES: {},
};
const { SidebarLayout } = VM.require(
  "buildhub.near/widget/template.SidebarLayout"
) || {
  SidebarLayout: () => <></>,
};
const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};
const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => <></>,
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      all: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: "All",
          name: "All",
          icon: "bi-list",
          requiredHashtags: ["build"],
        },
        default: true,
      },
      updates: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: "Updates",
          name: "Updates",
          icon: "bi-bell",
          requiredHashtags: ["build", "update"],
          template: TEMPLATES.updates,
        },
      },
      question: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: "Question",
          name: "Question",
          icon: "bi-question-lg",
          requiredHashtags: ["build", "question"],
          template: TEMPLATES.question,
        },
      },
      idea: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: "Idea",
          name: "Idea",
          icon: "bi-lightbulb",
          requiredHashtags: ["build", "idea"],
          template: TEMPLATES.idea,
        },
      },
      feedback: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: "Feedback",
          name: "Feedback",
          icon: "bi-chat-left-text",
          requiredHashtags: ["build", "feedback"],
        },
      },
      events: {
        path: "buildhub.near/widget/events.Calendar",
        blockHeight: "final",
        init: {
          feedName: "Events",
          name: "Events",
          icon: "bi-calendar",
          app: "every",
          thing: "event",
        },
      },
      bookmarks: {
        path: "buildhub.near/widget/OrderedGraphFeed",
        blockHeight: "final",
        init: {
          feedName: "Bookmarks",
          name: "Bookmarks",
          icon: "bi-bookmark",
          itemType: "bookmark",
          renderItem: (item) => {
            return (
              <Post
                accountId={item.accountId}
                blockHeight={item.blockHeight}
                noBorder={true}
                hideComments={true}
              />
            );
          },
        },
      },
      request: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: "Request",
          name: "Request",
          icon: "bi-file-earmark-text",
          requiredHashtags: ["build", "request"],
          customActions: [
            {
              type: "modal",
              icon: "bi-file-earmark-text",
              label: "Propose",
              onClick: (modalToggles) => {
                const toggle = modalToggles.propose;
                toggle();
              },
            },
          ],
          template: TEMPLATES.request,
        },
      },
      proposals: {
        path: "buildhub.near/widget/Proposals",
        blockHeight: "final",
        init: {
          feedName: "Proposals",
          name: "Proposals",
          icon: "bi-file-earmark-text",
          daoId: "build.sputnik-dao.near",
        },
      },
    },
  },
};
const Root = styled.div``;
return (
  <Root>
    <SidebarLayout
      currentPath={"/buildhub.near/widget/app?page=feed"}
      page={props.tab}
      routes={config.router.routes}
    >
      <Widget
        src="buildhub.near/widget/app.view"
        props={{ config, ...props }}
      />
    </SidebarLayout>
  </Root>
);
