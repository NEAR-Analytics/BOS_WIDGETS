const {
  isTest,
  addressForArticles,
  authorForWidget,
  stateUpdate,
  initialBody,
  initialCreateState,
  editArticleData,
  callLibs,
  widgets,
  handleFilterArticles,
  handleEditArticle,
  handlerStateUpdate,
} = props;

const libSrcArray = [widgets.libArticle];

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

State.init(initialCreateState);

function createStateUpdate(obj) {
  State.update(obj);
}

const tagsArray = state.tags;

const accountId = context.accountId;

function getRealArticleId() {
  if (editArticleData) {
    return (
      editArticleData.realArticleId ??
      `${editArticleData.author}-${editArticleData.timeCreate}`
    );
  } else {
    return `${accountId}-${Date.now()}`;
  }
}

const getArticleData = () => {
  const args = {
    articleId: editArticleData.articleId ?? state.articleId,
    author: editArticleData.author ?? accountId,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    timeCreate: editArticleData.timeCreate ?? Date.now(),
    body: state.articleBody,
    version: editArticleData ? editArticleData.version + 1 : 0,
    navigation_id: null,
    tags: tagsArray,
    realArticleId: getRealArticleId(),
  };
  return args;
};

function onCommit() {
  State.update({
    articleId: "",
    clearArticleId: true,
    tags: [],
    clearTags: true,
    articleBody: "",
    clearArticleBody: true,
    showCreatedArticle: true,
  });
}

function onCancel() {
  State.update({ createdArticle: undefined });
}

function createArticleListener() {
  const article = getArticleData();
  const newLibCalls = [...state.libCalls];
  newLibCalls.push({
    functionName: "createArticle",
    key: "createdArticle",
    props: {
      article,
      onCommit,
      onCancel,
    },
  });
  State.update({ libCalls: newLibCalls });
}

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

const CreationContainer = styled.div`
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
  padding: 1rem 0;
  position: relative;
`;

const SecondContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  min-width: 360px;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
`;

// console.log(
//   "Data: ",
//   state.clearArticleId,
//   state.articleId,
//   state.tags,
//   state.articleBody
// );

return (
  <>
    {state.createdArticle && state.showCreatedArticle && editArticleData ? (
      <Widget
        src={widgets.articleView}
        props={{
          widgets,
          isTest,
          handleFilterArticles,
          articleToRenderData: state.createdArticle,
          authorForWidget,
          handleEditArticle,
        }}
      />
    ) : (
      <div className="border rounded mx-3">
        {
          // <CreationContainer className="container-fluid">
        }
        <SecondContainer>
          <h5 className="mb-1">
            {editArticleData ? "Edit Article" : "Create Article"}
          </h5>

          <div>
            {
              // <div>
              //   <Widget
              //     src={"rubycop.near/widget/NDC.StyledComponents"}
              //     props={{
              //       Button: {
              //         className: "primary dark",
              //         disable: state.articleId > 0 || state.articleBody > 0,
              //         text: editArticleData ? "Save edition" : "Save article",
              //         onClick: createArticleListener,
              //         icon: <i className="bi bi-check2"></i>,
              //       },
              //     }}
              //   />
              // </div>
            }
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
                  forceClear: state.clearArticleId,
                  stateUpdate: (obj) => State.update(obj),
                  filterText: (e) => e.target.value.replace(/\s+/g, ""),
                  editable: editArticleData,
                }}
              />
            </div>
            <div className="d-flex flex-column pt-3">
              <Widget
                src={`${authorForWidget}/widget/TagsEditor`}
                props={{
                  forceClear: state.clearTags,
                  stateUpdate: (obj) => State.update(obj),
                  initialTagsObject: state.tags,
                  placeholder: "Input tags",
                  setTagsObject: (tags) => {
                    state.tags = Object.keys(tags);
                    State.update();
                  },
                }}
              />
            </div>
            <div className="d-flex flex-column pt-3">
              <label for="textareaArticleBody">
                Input article body (in makrdown format):
              </label>
              <label for="textareaArticleBody" className="small text-danger">
                {state.errorBody}
              </label>
              <div className="d-flex gap-2">
                {
                  //<div className="w-50">
                }
                <Widget
                  src="mob.near/widget/MarkdownEditorIframe"
                  props={{
                    initialText: initialBody,
                    onChange: (articleBody) => State.update({ articleBody }),
                    forceClear: state.clearArticleBody,
                    stateUpdate: (obj) => State.update(obj),
                  }}
                />
                {
                  //</div>
                }
                {
                  //<div className="w-50">
                }
                {
                  //TODO make this visible when clicking a show preview button after creating it
                  //
                  // <Widget
                  // src="mob.near/widget/SocialMarkdown"
                  // props={{ text: state.articleBody }}
                  // />
                }
                {
                  //</div>
                }
              </div>
            </div>
            <div className="mt-2 d-flex justify-content-end">
              <Widget
                src={"rubycop.near/widget/NDC.StyledComponents"}
                props={{
                  Button: {
                    className: "primary dark",
                    disabled:
                      state.articleId.length == 0 ||
                      state.articleBody.length == 0,
                    text: editArticleData ? "Save edition" : "Post",
                    onClick: createArticleListener,
                    icon: <i className="bi bi-check2"></i>,
                  },
                }}
              />
            </div>
          </div>
        </SecondContainer>
        <div style={{ display: "none" }}>
          {callLibs(libSrcArray, createStateUpdate, state.libCalls)}
        </div>
        {
          //</CreationContainer>
        }
      </div>
    )}
  </>
);
