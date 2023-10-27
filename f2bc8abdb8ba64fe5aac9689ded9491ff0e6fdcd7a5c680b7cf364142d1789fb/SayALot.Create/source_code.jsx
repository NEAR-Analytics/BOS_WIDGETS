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
  sbtWhiteList,
  sbts,
  canLoggedUserCreateArticles,
} = props;

const libSrcArray = [widgets.libArticle];

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

State.init({
  ...initialCreateState,
  initialBody: props.initialBody ?? "",
  functionsToCallByLibrary: {
    article: [],
  },
});

function createStateUpdate(obj) {
  State.update(obj);
}

const tagsArray =
  editArticleData && !state.tagsModified ? editArticleData.tags : state.tags;

const accountId = context.accountId;

function getRealArticleId() {
  if (editArticleData) {
    return (
      editArticleData.id ??
      `${editArticleData.author}-${editArticleData.timeCreate}`
    );
  } else {
    return `${accountId}-${Date.now()}`;
  }
}

const getArticleData = () => {
  const args = {
    title: editArticleData.title ?? state.title,
    author: editArticleData.author ?? accountId,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    timeCreate: editArticleData.timeCreate ?? Date.now(),
    body: state.articleBody,
    version: editArticleData ? editArticleData.version + 1 : 0,
    navigation_id: null,
    tags: tagsArray,
    id: getRealArticleId(),
    sbts,
  };
  return args;
};

function onCommit() {
  State.update({
    title: "",
    clearArticleId: true,
    tags: [],
    clearTags: true,
    articleBody: "",
    clearArticleBody: true,
    initalBody: "",
    showCreatedArticle: true,
    showPreview: false,
  });
}

function onCancel() {
  State.update({ createdArticle: undefined });
}

function createArticleListener() {
  //To test without commiting use the next line and comment the rest
  // onCommit();
  const article = getArticleData();
  const newLibsCalls = Object.assign({}, state.functionsToCallByLibrary);
  newLibsCalls.article.push({
    functionName: "createArticle",
    key: "createdArticle",
    props: {
      article,
      onCommit,
      onCancel,
    },
  });

  State.update({ functionsToCallByLibrary: newLibsCalls });
}

function switchShowPreview() {
  State.update({
    showPreview: !state.showPreview,
    initialBody: state.articleBody,
  });
}

const GeneralContainer = styled.div`
  background-color: rgb(248, 248, 249);
`;

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
  min-width: 360px;
  background-color: white;
  padding: 1rem;
`;

const BoxShadow = styled.div`
  box-shadow: rgba(140, 149, 159, 0.1) 0px 4px 28px 0px;
`;

const initialTagsObject = {};

Array.isArray(tagsArray) &&
  tagsArray.forEach((tag) => {
    initialTagsObject[tag] = true;
  });

return (
  <div>
    <GeneralContainer className="pt-2 row card-group">
      <BoxShadow className="rounded-3 p-3 m-3 bg-white col-lg-8 col-md-8 col-sm-12">
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
              callLibs,
            }}
          />
        ) : (
          <div>
            {
              // <CreationContainer className="container-fluid">
            }
            <SecondContainer className="rounded">
              {state.showPreview ? (
                <Widget
                  src={widgets.generalCard}
                  props={{
                    widgets,
                    isTest,
                    data: {
                      title: state.title,
                      author: accountId,
                      lastEditor: accountId,
                      timeLastEdit: Date.now(),
                      timeCreate: Date.now(),
                      body: state.articleBody,
                      version: 0,
                      navigation_id: null,
                      tags: tagsArray,
                      id: getRealArticleId(),
                      sbts,
                    },
                    addressForArticles,
                    handleOpenArticle: () => {},
                    handleFilterArticles: () => {},
                    authorForWidget,
                    handleShareButton: () => {},
                    callLibs,
                  }}
                />
              ) : (
                <div>
                  <div className="d-flex flex-column pt-3">
                    <label for="inputArticleId" className="small text-danger">
                      {state.errorId}
                    </label>
                    <Widget
                      src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/fasterTextInput`}
                      props={{
                        firstText: state.title,
                        forceClear: state.clearArticleId,
                        stateUpdate: (obj) => State.update(obj),
                        filterText: (e) => e.target.value,
                        placeholder: "Post title (case-sensitive)",
                        editable: editArticleData,
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column pt-3">
                    <label
                      for="textareaArticleBody"
                      className="small text-danger"
                    >
                      {state.errorBody}
                    </label>
                    <div className="d-flex gap-2">
                      <Widget
                        // src={`${authorForWidget}/widget/MarkdownEditorIframe`}
                        src={`${context.accountId}/widget/MarkdownEditorIframe`}
                        props={{
                          initialText:
                            state.initialBody == "" || !state.initialBody
                              ? "Post content (markdown supported)"
                              : state.initalBody,
                          onChange: (articleBody) =>
                            State.update({
                              articleBody,
                              clearArticleBody: false,
                            }),
                          clearArticleBody: state.clearArticleBody,
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column pt-3">
                    <Widget
                      src={`${authorForWidget}/widget/TagsEditor`}
                      props={{
                        forceClear: state.clearTags,
                        stateUpdate: (obj) => State.update(obj),
                        initialTagsObject,
                        placeholder: "Input tags",
                        setTagsObject: (tags) => {
                          // state.tags = Object.keys(tags);
                          State.update({
                            tagsModified: true,
                            tags: Object.keys(tags),
                          });
                        },
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="mt-2 d-flex justify-content-end">
                <Widget
                  src={widgets.newStyledComponents.Input.Button}
                  props={{
                    className: "info outline mx-2",
                    disabled:
                      state.title.length === 0 ||
                      state.articleBody.length === 0,
                    onClick: switchShowPreview,
                    children: (
                      <i
                        className={`bi ${
                          state.showPreview ? "bi-pencil" : "bi-eye-fill"
                        }`}
                      ></i>
                    ),
                  }}
                />
                <Widget
                  src={widgets.newStyledComponents.Input.Button}
                  props={{
                    className: "info ",
                    disabled:
                      state.title.length === 0 ||
                      state.articleBody.length === 0,
                    onClick: createArticleListener,
                    children: (
                      <div className="d-flex justify-conten-center align-items-center">
                        <span>{editArticleData ? "Save edition" : "Post"}</span>
                        <i className="bi bi-check2"></i>
                      </div>
                    ),
                  }}
                />
              </div>
            </SecondContainer>
            <div style={{ display: "none" }}>
              {libSrcArray.map((src) => {
                return callLibs(
                  src,
                  createStateUpdate,
                  state.functionsToCallByLibrary,
                  { baseAction: "sayALotArticle" },
                  "Create"
                );
              })}
            </div>
          </div>
        )}
      </BoxShadow>
    </GeneralContainer>
  </div>
);
