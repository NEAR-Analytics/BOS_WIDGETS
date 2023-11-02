let { sharedBlockHeight, tagShared, isTest, accountId } = props;

const sbtWhiteList = [
  "fractal.i-am-human.near - class 1",
  "community.i-am-human.near - class 1",
  "community.i-am-human.near - class 2",
  "community.i-am-human.near - class 3",
  "public",
];

// const authorForWidget = "sayalot.near";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";

const configWidget = "SayALot.Config";

const widgets = {
  thisForum: `${authorForWidget}/widget/${configWidget}`, ////////////////////////////////////////////////////////////////////////////////
  create: `${authorForWidget}/widget/NDC.Forum.Create`, ///////////////////////////////////////////////////////////////////////////////////
  //   header: `${authorForWidget}/widget/SayALot.NavBar`,//////////////////////////////////////////////////////////////////////////////////////////
  header: `${authorForWidget}/widget/SayALot.NavBar`, //////////////////////////////////////////////////////////////////////////////////////////
  showArticlesList: `${authorForWidget}/widget/NDC.Forum.AllArticlesList`, ////////////////////////////////////////////////////////////////////////////
  showArticlesListSortedByAuthors: `${authorForWidget}/widget/SayALot.AllArticlesSortByAuthors`,
  articlesByAuthorCard: `${authorForWidget}/widget/SayALot.ArticlesByAuthorCard`,
  generalCard: `${authorForWidget}/widget/NDC.GeneralCard`, /////////////////////////////////////////////////////////////////////////
  //   articleView: `${authorForWidget}/widget/SayALot.ArticleView`,///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  articleView: `${authorForWidget}/widget/SayALot.ArticleView`, /////////////////////////////////////////////////////////////////////////
  reactions: `${authorForWidget}/widget/NDC.Reactions`, //////////////////////////////////////////////////////////////////////////////////////////
  addComment: `${authorForWidget}/widget/NDC.AddComment`, //////////////////////////////////////////////////////////////////////////////////////////
  commentView: `${authorForWidget}/widget/SayALot.CommentView`,
  libSBT: `${authorForWidget}/widget/lib.SBT`, //////////////////////////////////////////////////////////////////////////////////////////
  libComment: `${authorForWidget}/widget/lib.comment`, //////////////////////////////////////////////////////////////////////////////////////////
  libArticle: `${authorForWidget}/widget/lib.article`, //////////////////////////////////////////////////////////////////////////////////////////
  libEmojis: `${authorForWidget}/widget/lib.emojis`, //////////////////////////////////////////////////////////////////////////////////////////
  libUpVotes: `${authorForWidget}/widget/lib.upVotes`, //////////////////////////////////////////////////////////////////////////////////////////
  upVoteButton: `${authorForWidget}/widget/NDC.UpVoteButton`, //////////////////////////////////////////////////////////////////////////////////////////
  styledComponents: "rubycop.near/widget/NDC.StyledComponents", //////////////////////////////////////////////////////////////////////////////////////////
  newStyledComponents: {
    //////////////////////////////////////////////////////////////////////////////////////////
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
  fasterTextInput: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/fasterTextInput`, //////////////////////////////////////////////////////////////////////////////////////////
  markownEditorIframe: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/MarkdownEditorIframe`, //////////////////////////////////////////////////////////////////////////////////////////
  tagsEditor: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/TagsEditor`, //////////////////////////////////////////////////////////////////////////////////////////
  socialMarkdown: "mob.near/widget/SocialMarkdown", //////////////////////////////////////////////////////////////////////////////////////////
  profileOverlayTrigger: "mob.near/widget/Profile.OverlayTrigger", //////////////////////////////////////////////////////////////////////////////////////////
  profileImage: "mob.near/widget/ProfileImage", //////////////////////////////////////////////////////////////////////////////////////////
  wikiOnSocialDB_TooltipProfiles: `testwiki.near/widget/WikiOnSocialDB_TooltipProfiles`, //////////////////////////////////////////////////////////////////////////////////////////
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

return (
  <Widget
    src={
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.Forum"
    }
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
