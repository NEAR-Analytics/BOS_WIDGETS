//===============================================INITIALIZATION=====================================================
let { sharedBlockHeight, tagShared, isTest, accountId } = props;

const initLibCalls = [
  {
    functionName: "getLastEditArticles",
    key: "articles",
    props: {
      env: isTest ? "test" : "prod",
    },
  },
];

if (!accountId) accountId = context.accountId;

const tabs = {
  SHOW_ARTICLES_LIST: { id: 0 },
  SHOW_ARTICLE: { id: 1 },
  ARTICLE_WORKSHOP: { id: 2 },
  SHOW_ARTICLES_LIST_BY_AUTHORS: { id: 3 },
};

State.init({
  displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
  articleToRenderData: {},
  filterBy: tagShared
    ? { parameterName: "tag", parameterValue: tagShared }
    : { parameterName: "" },
  authorsProfiles: [],
  libCalls: initLibCalls,
});

//=============================================END INITIALIZATION===================================================

//==================================================CONSTS==========================================================

//const authorForWidget = "sayalot.near";
// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const authorForWidget = "kenrou-it.near";
const libSrcArray = [
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/SayALot.lib.article",
];
const thisWidgetName = "sayALot.generalHandler";

// let writersWhiteList = [
//   "neardigitalcollective.near",
//   "blaze.near",
//   "jlw.near",
//   "kazanderdad.near",
//   "joep.near",
//   "sarahkornfeld.near",
//   "yuensid.near",
//   "shubham007.near",
//   "fiftycent.near",
//   "ozymandius.near",
//   "chloe.near",
// ];

// const sayALotWorkers = [
//   "silkking.near",
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
//   "blaze.near",
//   "ayelen.near",
//   "kenrou-it.near",
// ];

// if (isTest) {
//   writersWhiteList = sayALotWorkers;
// }

const widgets = {
  thisWidget: `${authorForWidget}/widget/${thisWidgetName}`,
  create: `${authorForWidget}/widget/SayALot.Create`,
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
  header: `${authorForWidget}/widget/NDC.NavBar`,
  showArticlesList: `${authorForWidget}/widget/SayALot.AllArticlesList`,
  showArticlesListSortedByAuthors: `${authorForWidget}/widget/SayALot.AllArticlesSortByAuthors`,
  articlesByAuthorCard: `${authorForWidget}/widget/SayALot.ArticlesByAuthorCard`,
  generalCard: `${authorForWidget}/widget/NDC.GeneralCard`,
  oneArticle: `${authorForWidget}/widget/NDC.General.ArticleView`,
  reactions: "sayalot.near/widget/SayALot_Reactions",
  addComment: `${authorForWidget}/widget/NDC.SayALot.AddComment`,
  comment: `nomination.ndctools.near/widget/NDC.Nomination.Candidate.Comment`,
  candidatePage: `#/rubycop.near/widget/NDC.Nomination.Candidate.Page`,
  libComment: `${authorForWidget}/widget/SayALot.lib.comment`,
  reactions: `${authorForWidget}/widget/NDC.Reactions`,
};
a;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

let authorProfile = {};
if (state.filterBy.parameterName == "author") {
  authorProfile = Social.getr(`${state.filterBy.parameterValue}/profile`);
  if (!authorProfile) return "Loading...";
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
  { id: tabs.SHOW_ARTICLES_LIST_BY_AUTHORS.id, title: "Authors" },
];

const navigationButtons = [
  { id: tabs.ARTICLE_WORKSHOP.id, title: "+Create article" },
];

const initialBodyAtCreation =
  state.editArticleData.body ??
  `# h1 Heading 8-) 
## h2 Heading 
### h3 Heading 
#### h4 Heading 
##### h5 Heading 
###### h6 Heading 
 
 
## Horizontal Rules 
 
___ 
 
--- 
 
*** 
 
 
## Typographic replacements 
 
Enable typographer option to see result. 
 
(c) (C) (r) (R) (tm) (TM) (p) (P) +- 
 
test.. test... test..... test?..... test!.... 
 
!!!!!! ???? ,,  -- --- 
 
"Smartypants, double quotes" and 'single quotes' 
 
 
## Emphasis 
 
This is bold text 
 
This is bold text 
 
*This is italic text* 
 
_This is italic text_ 
 
Strikethrough 
 
 
## Blockquotes 
 
 
> Blockquotes can also be nested... 
>> ...by using additional greater-than signs right next to each other... 
> > > ...or with spaces between arrows. 
 
 
## Lists 
 
Unordered 
 
+ Create a list by starting a line with \`+\`, \`-\`, or \`*\` 
+ Sub-lists are made by indenting 2 spaces: 
  - Marker character change forces new list start: 
    * Ac tristique libero volutpat at 
    + Facilisis in pretium nisl aliquet 
    - Nulla volutpat aliquam velit 
+ Very easy! 
 
Ordered 
 
1. Lorem ipsum dolor sit amet 
2. Consectetur adipiscing elit 
3. Integer molestie lorem at massa 
 
 
1. You can use sequential numbers... 
1. ...or keep all the numbers as \`1.\` 
 
Start numbering with offset: 
 
57. foo 
1. bar 
 
 
## Code 
 
Inline \`code\` 
 
Indented code 
 
    // Some comments 
    line 1 of code 
    line 2 of code 
    line 3 of code 
 
 
Block code "fences" 
 
\`\`\` 
Sample text here... 
\`\`\` 
 
Syntax highlighting 
 
\`\`\` js 
var foo = function (bar) { 
  return bar++; 
}; 
 
console.log(foo(5)); 
\`\`\` 
 
## Tables 
 
| Option | Description | 
| ------ | ----------- | 
| data   | path to data files to supply the data that will be passed into templates. | 
| engine | engine to be used for processing templates. Handlebars is the default. | 
| ext    | extension to be used for dest files. | 
 
Right aligned columns 
 
| Option | Description | 
| ------:| -----------:| 
| data   | path to data files to supply the data that will be passed into templates. | 
| engine | engine to be used for processing templates. Handlebars is the default. | 
| ext    | extension to be used for dest files. | 
 
 
## Links 
 
link text 
 
link with title 
 
Autoconverted link https://github.com/nodeca/pica (enable linkify to see) 
 
 
## Images 
 
!Minion 
!Stormtroopocat 
 
Like links, Images also have a footnote style syntax 
 
![Alt text][id] 
 
With a reference later in the document defining the URL location: 
 
[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat" 
 
### Emojies 
 
> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum: 
> 
> Shortcuts (emoticons): :-) :-( 8-) ;) 
 
see how to change output with twemoji. 
 
 
### Subscript / Superscript 
 
- 19^th^ 
- H~2~O 
 
 
### \<ins> 
 
++Inserted text++ 
 
 
### \<mark> 
 
==Marked text== 
 
 
### Footnotes 
 
Footnote 1 link[^first]. 
 
Footnote 2 link[^second]. 
 
Inline footnote^[Text of inline footnote] definition. 
 
Duplicated footnote reference[^second]. 
 
[^first]: Footnote can have markup 
 
    and multiple paragraphs. 
 
[^second]: Footnote text. 
 
 
### [Definition lists](https://github.com/markdown-it/markdown-it-deflist) 
 
Term 1 
 
:   Definition 1 
with lazy continuation. 
 
Term 2 with *inline markup* 
 
:   Definition 2 
 
        { some code, part of Definition 2 } 
 
    Third paragraph of definition 2. 
 
_Compact style:_ 
 
Term 1 
  ~ Definition 1 
 
Term 2 
  ~ Definition 2a 
  ~ Definition 2b 
`;

//=================================================END CONSTS=======================================================

//=================================================GET DATA=========================================================
const finalArticles = state.articles;
//===============================================END GET DATA=======================================================

//=================================================FUNCTIONS========================================================
function getValidEditArticleDataTags() {
  let tags = state.editArticleData.tags;
  let newFormatTags = {};

  tags.map((tag) => {
    newFormatTags[tag] = "";
  });
  return newFormatTags;
}

const initialCreateState = {
  articleId: state.editArticleData.articleId ?? "",
  articleBody: state.editArticleData.body ?? initialBodyAtCreation,
  tags: state.editArticleData.tags ? getValidEditArticleDataTags() : {},
  libCalls: [],
};

function stateUpdate(obj) {
  State.update(obj);
}

function handleOpenArticle(articleToRenderData) {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLE.id,
    articleToRenderData,
  });
}

function handleEditArticle(articleData) {
  State.update({
    displayedTabId: tabs.ARTICLE_WORKSHOP.id,
    editArticleData: articleData,
  });
}

// TODO fix
function handleFilterArticles(filter) {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
    filterBy: { parameterName: filter.filterBy, parameterValue: filter.value },
  });
}

function handleBackButton() {
  props.editArticleData
    ? State.update({
        displayedTabId: tabs.SHOW_ARTICLE.id,
        editArticleData: undefined,
      })
    : State.update({
        displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
        articleToRenderData: {},
      });
}

function handleGoHomeButton() {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
    articleToRenderData: {},
    filterBy: { parameterName: "", parameterValue: {} },
  });
}

function handlePillNavigation(navegateTo) {
  stateUpdate({ displayedTabId: navegateTo });
}

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

//===============================================END FUNCTIONS======================================================
return (
  <>
    <Widget
      src={widgets.header}
      props={{
        isTest,
        stateUpdate,
        handleGoHomeButton,
        handlePillNavigation,
        brand,
        pills: navigationPills,
        navigationButtons,
        displayedTabId: state.displayedTabId,
        handleFilterArticles,
      }}
    />
    {(((state.filterBy.parameterName == "tag" ||
      state.filterBy.parameterName == "author") &&
      state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id) ||
      state.displayedTabId == tabs.SHOW_ARTICLE.id ||
      state.displayedTabId == tabs.ARTICLE_WORKSHOP.id ||
      state.displayedTabId == tabs.SHOW_ARTICLES_LIST_BY_AUTHORS.id) && (
      <div
        style={{ cursor: "pointer" }}
        onClick={
          state.displayedTabId == tabs.SHOW_ARTICLE.id ||
          (state.editArticleData && tabs.ARTICLE_WORKSHOP.id)
            ? handleBackButton
            : handleGoHomeButton
        }
        className="my-3"
      >
        <i className="bi bi-chevron-left mr-2"></i>
        Back
      </div>
    )}
    {state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id && (
      <Widget
        src={widgets.showArticlesList}
        props={{
          isTest,
          finalArticles,
          tabs,
          widgets,
          addressForArticles,
          handleOpenArticle,
          handleFilterArticles,
          authorForWidget,
        }}
      />
    )}
    {state.displayedTabId == tabs.SHOW_ARTICLE.id && (
      <Widget
        src={widgets.oneArticle}
        props={{
          isTest,
          widgets,
          handleFilterArticles,
          articleToRenderData: state.articleToRenderData,
          authorForWidget,
          handleEditArticle,
        }}
      />
    )}

    {state.displayedTabId == tabs.SHOW_ARTICLES_LIST_BY_AUTHORS.id && (
      <Widget
        src={widgets.showArticlesListSortedByAuthors}
        props={{
          isTest,
          finalArticles,
          tabs,
          widgets,
          handleOpenArticle,
          handleFilterArticles,
          authorForWidget,
        }}
      />
    )}

    {state.displayedTabId == tabs.ARTICLE_WORKSHOP.id && (
      <Widget
        src={widgets.create}
        props={{
          isTest,
          addressForArticles,
          authorForWidget,
          stateUpdate,
          widgets,
          initialBody: initialBodyAtCreation,
          initialCreateState,
          editArticleData: state.editArticleData,
          callLibs,
        }}
      />
    )}
    <div style={{ display: "none" }}>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </div>
  </>
);
