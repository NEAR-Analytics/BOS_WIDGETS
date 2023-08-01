let { sharedBlockHeight, isTest, accountId } = props;

if (!accountId) accountId = context.accountId;

const tabs = {
  SHOW_ARTICLES_LIST: { id: 0 },
  SHOW_ARTICLE: { id: 1 },
  ARTICLE_WORKSHOP: { id: 2 },
};

State.init({
  displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
});

const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const widgets = {
  header: `${authorForWidget}/widget/NDC.NavBar`,
  showArticlesList: `${authorForWidget}/widget/`,
};

function stateUpdate(obj) {
  State.update(obj);
}

let writersWhiteList = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "fiftycent.near",
  "ozymandius.near",
  "chloe.near",
];

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  "blaze.near",
  "ayelen.near",
  "kenrou-it.near",
];

if (isDebug) {
  writersWhiteList = sayALotWorkers;
}

const brand = {
  homePageId: tabs.SHOW_ARTICLES_LIST.id,
  brandName: "Say a lot",
  logoHref:
    "https://ipfs.near.social/ipfs/bafkreiaqxa4st4vp4rtq2iyobdgqe5tpfg55mmyvfg25upd2qplcxylyfi",
  logoRemWidth: 6,
  logoRemHeight: 6,
};

const navigationPills = [
  { id: tabs.SHOW_ARTICLES_LIST.id, title: "Articles" },
  { id: tabs.SHOW_ARTICLES_LIST.id, title: "Authors" },
];

const navigationButtons = [
  { id: ARTICLE_WORKSHOP.id, title: "+Create article" },
];

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const authorProfile = Social.getr(`${author}/profile`);
if (author && !authorProfile) {
  return "Loading...";
}

return (
  <>
    <Widget
      src={widgets.header}
      props={{
        stateUpdate,
        brand,
        pills: navigationPills,
        navigationButtons,
        isTest,
        displayedTabId: state.displayedTabId,
        writersWhiteList,
      }}
    />
    {false && state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id && (
      <Widget src={widgets.showArticlesList} />
    )}
  </>
);
