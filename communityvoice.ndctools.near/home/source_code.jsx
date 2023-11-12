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

const authorForWidget = "communityvoice.ndctools.near";
// const authorForWidget =
// "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";

const configWidget = "home";

const widgets = {
  thisForum: `${authorForWidget}/widget/${configWidget}`,

  //Editable widgets
  ndcForum: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.Forum`, ///////////////////////////////////////////////////
  create: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.Forum.Create`, ///////////////////////////////////////////////////
  header: `${componentsOwner}/widget/NDC.NavBar`,
  showArticlesList: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.Forum.AllArticlesList`, /////////////////////////////////
  showArticlesListSortedByAuthors: `${componentsOwner}/widget/NDC.AllArticlesSortByAuthors`,
  articlesByAuthorCard: `${componentsOwner}/widget/NDC.ArticlesByAuthorCard`,
  generalCard: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.GeneralCard`, ///////////////////////////////////////////////
  articleView: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.ArticleView`, ///////////////////////////////////////////////
  reactions: `${componentsOwner}/widget/NDC.Reactions`,
  addComment: `${componentsOwner}/widget/NDC.AddComment`,
  commentView: `${componentsOwner}/widget/NDC.CommentView`,
  upVoteButton: `${componentsOwner}/widget/NDC.UpVoteButton`,
  profileShortInlineBlock: `${componentsOwner}/widget/Profile.ShortInlineBlock`,
  tagsEditor: `${componentsOwner}/widget/TagsEditor`,

  //Libs
  // libSBT: `sayalot.near/widget/lib.SBT`,
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
  brandName: "Community Voice",
  logoHref:
    "https://ipfs.near.social/ipfs/bafkreifhkslni6dlocxya35vjft3fefk2am5uzkagmjjzobdjqlhrnbjz4",
  logoRemWidth: 12,
  logoRemHeight: 4,
};

const baseActions = {
  commentBaseAction: "communityVoiceComment",
  articlesBaseAction: "communityVoiceArticle",
  upVoteBaseAction: "communityVoiceUpVote",
  reactionBaseAction: "communityVoiceReaction",
};

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
    }}
  />
);
