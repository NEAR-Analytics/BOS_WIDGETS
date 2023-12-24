let { sharedBlockHeight, tagShared, isTest, accountId } = props;

const sbtWhiteList = [
  "fractal.i-am-human.near - class 1",
  "community.i-am-human.near - class 1",
  "community.i-am-human.near - class 2",
  "community.i-am-human.near - class 3",
  "elections.ndc-gwg.near - class 2",
  "elections.ndc-gwg.near - class 3",
  "elections.ndc-gwg.near - class 4",
  "public",
];

function createSbtOptions() {
  return sbtWhiteList.map((option, i) => {
    const title = "";

    if (option === "fractal.i-am-human.near - class 1") {
      title = "General";
    } else if (option === "community.i-am-human.near - class 1") {
      title = "OG";
    } else if (option === "community.i-am-human.near - class 2") {
      title = "Contributor";
    } else if (option === "community.i-am-human.near - class 3") {
      title = "Core Contributor";
    } else if (option === "elections.ndc-gwg.near - class 2") {
      title = "HoM";
    } else if (option === "elections.ndc-gwg.near - class 3") {
      title = "CoA";
    } else if (option === "elections.ndc-gwg.near - class 4") {
      title = "TC";
    } else {
      title = "Public";
    }

    if (i == 0) {
      //The first options is always the default one
      return { title, default: true, value: option };
    } else {
      return { title, value: option };
    }
  });
}

// const componentsOwner =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const componentsOwner = "sayalot.near";

const authorForWidget = "sayalot.near";
// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";

const configWidget = "SayALot";

const widgets = {
  thisForum: `${authorForWidget}/widget/${configWidget}`,

  //Editable widgets
  ndcForum: `${componentsOwner}/widget/NDC.Forum`,
  create: `${componentsOwner}/widget/NDC.Forum.Create`,
  header: `${componentsOwner}/widget/NDC.NavBar`,
  showArticlesList: `${componentsOwner}/widget/NDC.Forum.AllArticlesList`,
  showArticlesListSortedByAuthors: `${componentsOwner}/widget/NDC.AllArticlesSortByAuthors`,
  articlesByAuthorCard: `${componentsOwner}/widget/NDC.ArticlesByAuthorCard`,
  generalCard: `${componentsOwner}/widget/NDC.GeneralCard`,
  articleView: `${componentsOwner}/widget/NDC.ArticleView`,
  reactions: `${componentsOwner}/widget/NDC.Reactions`,
  addComment: `${componentsOwner}/widget/NDC.AddComment`,
  commentView: `${componentsOwner}/widget/NDC.CommentView`,
  upVoteButton: `${componentsOwner}/widget/NDC.UpVoteButton`,
  profileShortInlineBlock: `${componentsOwner}/widget/Profile.ShortInlineBlock`,
  tagsEditor: `${componentsOwner}/widget/TagsEditor`,
  kanbanBoard: `${componentsOwner}/widget/NDC.KanbanBoard`,
  compactPost: `${componentsOwner}/widget/NDC.CompactPost`,

  //Libs
  libSBT: `sayalot.near/widget/lib.SBT`,
  libComment: `sayalot.near/widget/lib.comment`,
  libArticle: `sayalot.near/widget/lib.article`,
  libEmojis: `sayalot.near/widget/lib.emojis`,
  libUpVotes: `sayalot.near/widget/lib.upVotes`,

  //Standard widgets
  fasterTextInput: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/fasterTextInput`,
  markownEditorIframe: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/MarkdownEditorIframe`,
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
  newStyledComponents: {
    Element: {
      Badge: "nearui.near/widget/Element.Badge",
      User: "nearui.near/widget/Element.User",
    },
    Feedback: {
      Spinner: "nearui.near/widget/Feedback.Spinner",
    },
    Input: {
      Button: "nearui.near/widget/Input.Button",
      Checkbox: "nearui.near/widget/Input.Checkbox",
      Select: "nearui.near/widget/Input.Select",
    },
  },
  socialMarkdown: "mob.near/widget/SocialMarkdown",
  profileOverlayTrigger: "mob.near/widget/Profile.OverlayTrigger",
  profileImage: "mob.near/widget/ProfileImage",
  wikiOnSocialDB_TooltipProfiles: `testwiki.near/widget/WikiOnSocialDB_TooltipProfiles`,
};

const brand = {
  brandName: "Say a lot",
  logoHref:
    "https://ipfs.near.social/ipfs/bafkreiaqxa4st4vp4rtq2iyobdgqe5tpfg55mmyvfg25upd2qplcxylyfi",
  logoRemWidth: 6,
  logoRemHeight: 6,
};

const baseActions = {
  commentBaseAction: "sayALotComment",
  articlesBaseAction: "sayALotArticle",
  upVoteBaseAction: "sayALotUpVote",
  reactionBaseAction: "sayALotReaction",
};

const kanbanColumns = ["Open", "Claimed", "In Work", "Closed"];

const kanbanRequiredTags = [];
const kanbanExcludedTags = [];

return (
  <Widget
    src={widgets.ndcForum}
    props={{
      sharedBlockHeight,
      tagShared,
      isTest,
      accountId,
      sbtWhiteList,
      authorForWidget,
      widgets,
      brand,
      baseActions,
      createSbtOptions,
      kanbanColumns,
      kanbanRequiredLabels,
      kanbanExcludedLabels,
    }}
  />
);
