const addressForArticles = "sayALotArticle";
const authorForWidget = "sayalot.near";
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
const tagsArray = state.tags ? state.tags : [];

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
        href={`https://near.social/#/${authorForWidget}/widget/SayALot`}
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
                  state.tags = Object.keys(tags);
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
