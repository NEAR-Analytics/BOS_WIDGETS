let { sharedBlockHeight, tagShared, isTest, accountId } = props;

const sbtWhiteList = [
  "fractal.i-am-human.near - class 1",
  "community.i-am-human.near - class 1",
  "community.i-am-human.near - class 2",
  "community.i-am-human.near - class 3",
  "public",
];

// const componentsOwner =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const componentsOwner = "sayalot.near";

const authorForWidget = "communityvoice.ndctools.near";
// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";

const configWidget = "home";

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
  tagsEditor: `${componentsOwner}/widget/TagsEditor`,
  profileShortInlineBlock: `${componentsOwner}/widget/Profile.ShortInlineBlock`,

  //Libs
  libSBT: `${componentsOwner}/widget/lib.SBT`,
  libComment: `${componentsOwner}/widget/lib.comment`,
  libArticle: `${componentsOwner}/widget/lib.article`,
  libEmojis: `${componentsOwner}/widget/lib.emojis`,
  libUpVotes: `${componentsOwner}/widget/lib.upVotes`,

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
    }}
  />
);
