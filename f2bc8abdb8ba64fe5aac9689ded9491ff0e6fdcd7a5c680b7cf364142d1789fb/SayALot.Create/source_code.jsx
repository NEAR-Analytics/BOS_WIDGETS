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
  createSbtOptions,
  canLoggedUserCreateArticles,
} = props;

const libSrcArray = [widgets.libArticle];

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

State.init({ ...initialCreateState, initialBody: props.initialBody ?? "" });

function createStateUpdate(obj) {
  State.update(obj);
}

const tagsArray = state.tags;

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

function handleSbtSelection(string) {
  State.update({ sbts: [string] });
}

const sbts = state.sbts; //TODO[""] currently it will be only 1 sbt

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

function switchShowPreview() {
  State.update({
    showPreview: !state.showPreview,
    initialBody: state.articleBody,
  });
}

function createUserOptions() {
  const allOptions = createSbtOptions().map((option) => {
    //Discard the default atribute
    return { title: option.title, value: option.value };
  });

  const userOptions = allOptions.filter((sbt) => {
    return canLoggedUserCreateArticles[sbt.value];
  });

  if (userOptions[0]) userOptions[0]["default"] = true;

  return userOptions;
}

const userOptions = createUserOptions();

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
      <div className="border rounded">
        {
          // <CreationContainer className="container-fluid">
        }
        <SecondContainer className="mx-3">
          <h5 className="mb-1">
            {editArticleData ? "Edit Article" : "Create Article"}
          </h5>

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
              }}
            />
          ) : (
            <div>
              <div className="d-flex flex-column pt-3">
                <label for="inputArticleId">Title (case-sensitive):</label>
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
              <div className="d-flex flex-column pt-3 ">
                <Widget
                  src={widgets.newStyledComponents.Input.Select}
                  props={{
                    label: "Select SBT",
                    value: userOptions[0],
                    onChange: handleSbtSelection,
                    options: userOptions,
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
                    src={`${authorForWidget}/widget/MarkdownEditorIframe`}
                    props={{
                      initialText: state.initialBody ?? "",
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
            </div>
          )}
          <div className="mt-2 d-flex justify-content-end">
            <Widget
              src={widgets.newStyledComponents.Input.Button}
              props={{
                className: "info outline mx-2",
                disabled:
                  state.title.length === 0 || state.articleBody.length === 0,
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
                  state.title.length === 0 || state.articleBody.length === 0,
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
          {callLibs(libSrcArray, createStateUpdate, state.libCalls)}
        </div>
        {
          //</CreationContainer>
        }
      </div>
    )}
  </>
);
