zconst addressForArticles = "sayALotArticle";
const authorForWidget = "silkking.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const initialBody = `# h1 Heading 8-) 
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

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

const initialCreateArticleState = {
  articleId: "",
  articleBody: initialBody,
  errorId: "",
  errorBody: "",
  tags: {},
  saveComplete: false,
};

State.init(initialCreateArticleState);
const tagsArray = state.tags ? state.tags : undefined;

const getArticleData = () => {
  const args = {
    articleId: state.articleId,
    author: accountId,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    timeCreate: Date.now(),
    body: state.articleBody,
    version: 0,
    navigation_id: null,
    tags: tagsArray,
  };
  return args;
};

const composeData = () => {
  const data = {
    sayALotArticle: {
      main: JSON.stringify(getArticleData()),
    },
    index: {
      sayALotArticle: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };

  if (tagsArray.length) {
    data.index.tag = JSON.stringify(
      tagsArray.map((tag) => ({
        key: tag,
        value: item,
      }))
    );
  }

  return data;
};

// === SAVE HANDLER ===
const saveHandler = (e) => {
  State.update({
    errorId: "",
    errorBody: "",
  });
  if (state.articleId && state.articleBody) {
    // TODO check it automaticle
    const isArticleIdDuplicated = false;

    if (!isArticleIdDuplicated) {
      const newData = composeData();

      State.update({ saving: true });

      Social.set(newData, {
        force: true,
        onCommit: () => {
          State.update({ saveComplete: true, saving: false });
        },
        onCancel: () => {
          State.update({ saving: false });
        },
      });
    } else {
      State.update({
        errorId: errTextDublicatedId,
      });
    }
  } else {
    if (!state.articleId) {
      State.update({
        errorId: errTextNoId,
      });
    }
    if (!state.articleBody) {
      State.update({ errorBody: errTextNoBody });
    }
  }
};

const Button = styled.button` 
  margin: 0px 1rem; 
  display: inline-block; 
  text-align: center; 
  vertical-align: middle; 
  cursor: pointer; 
  user-select: none; 
  transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out; 
 
  border: 2px solid transparent; 
  font-weight: 500; 
  padding: 0.3rem 0.5rem; 
  background-color: #010A2D; 
  border-radius: 12px; 
  color: white; 
  text-decoration: none;   
 
  &:hover { 
    color: #010A2D; 
    background-color: white; 
  } 
`;

return (
  <div
    className="container-fluid"
    style={
      state.saveComplete
        ? {
            backgroundColor: "rgb(230, 230, 230)",
            borderRadius: "20px",
            padding: "0 0 1rem 0 ",
            position: "relative",
            overflow: "hidden",
            height: "80vh",
          }
        : {
            backgroundColor: "rgb(230, 230, 230)",
            borderRadius: "20px",
            padding: "0 0 1rem 0 ",
            position: "relative",
          }
    }
  >
    {state.saveComplete && (
      <a
        style={{
          position: "absolute",
          top: "0",
          height: "100%",
          width: "100%",
          backdropFilter: "blur(5px)",
        }}
        href={`https://near.social/#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${state.articleId}&lastEditor=${accountId}`}
      >
        <div
          style={{
            width: "50%",
            margin: "0 auto",
            position: "relative",
            top: "40vh",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "black",
              backgroundColor: "rgb(230, 230, 230)",
              zIndex: "2",
            }}
            className="rounded-pill p-3"
          >
            Click to continue
          </h3>
        </div>
      </a>
    )}
    <Widget
      src={`${authorForWidget}/widget/SayALot_MainNavigation`}
      props={{ currentNavPill: "create" }}
    />
    <div
      style={{
        margin: "0 auto",
        width: "90%",
        minWidth: "360px",
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "20px",
      }}
    >
      <h1 className="mb-3"> Create Article</h1>
      <div>
        <div>
          <Button type="submit" onClick={saveHandler}>
            {state.saving && (
              <div
                className="spinner-border text-secondary"
                style={{ height: "1rem", width: "1rem" }}
                role="status"
              >
                <span className="sr-only" title="Loading..."></span>
              </div>
            )}
            Save Article
          </Button>
        </div>
        <div className="d-flex flex-column pt-3">
          <label for="inputArticleId">
            Input article id (case-sensitive, without spaces):
          </label>
          <label for="inputArticleId" className="small text-danger">
            {state.errorId}
          </label>
          <Widget
            src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/fasterTextInput`}
            props={{
              firstText: state.articleId,
              stateUpdate: (obj) => State.update(obj),
              filterText: (e) => e.target.value.replace(/\s+/g, ""),
            }}
          />
        </div>
        <div className="d-flex flex-column pt-3">
          {!state.saveComplete && (
            <Widget
              src="mob.near/widget/TagsEditor"
              props={{
                initialTagsObject: state.tags,
                placeholder: "Input tags",
                setTagsObject: (tags) => {
                  state.tags = tags;
                  State.update();
                },
              }}
            />
          )}
        </div>
        <div className="d-flex flex-column pt-3">
          <label for="textareaArticleBody">
            Input article body (in makrdown format):
          </label>
          <label for="textareaArticleBody" className="small text-danger">
            {state.errorBody}
          </label>
          <div className="d-flex gap-2" style={{ minHeight: "300px" }}>
            <div className="w-50">
              <Widget
                src="mob.near/widget/MarkdownEditorIframe"
                props={{
                  initialText: initialBody,
                  onChange: (articleBody) => State.update({ articleBody }),
                }}
              />
            </div>
            <div className="w-50">
              <Widget
                src="mob.near/widget/SocialMarkdown"
                props={{ text: state.articleBody }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
