const {
  isTest,
  addressForArticles,
  authorForWidget,
  stateUpdate,
  initialBody,
  initialCreateState,
} = props;

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

State.init(initialCreateState);
const tagsArray = state.tags;

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
  let data;
  if (isTest) {
    data = {
      test_sayALotArticle: {
        main: JSON.stringify(getArticleData()),
      },
      index: {
        test_sayALotArticle: JSON.stringify({
          key: "main",
          value: {
            type: "md",
            id: `${context.accountId}-${Date.now()}`,
          },
        }),
      },
    };
  } else {
    data = {
      sayALotArticle: {
        main: JSON.stringify(getArticleData()),
      },
      index: {
        sayALotArticle: JSON.stringify({
          key: "main",
          value: {
            type: "md",
            id: `${context.accountId}-${Date.now()}`,
          },
        }),
      },
    };
  }

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
    const isArticleIdDublicated = false;

    if (!isArticleIdDublicated) {
      const newData = composeData();

      State.update({ saving: true });

      Social.set(newData, {
        force: true,
        onCommit: () => {
          stateUpdate({
            displayedTabId: tabs.SHOW_ARTICLE.id,
            renderLastOfThisAccountId: accountId,
          });
          // State.update({ saveComplete: true, saving: false });
          State.update({ saving: false });
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

const CreationContainer = styled.div`
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
  padding: 0 0 1rem 0;
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
  <CreationContainer className="container-fluid">
    {
      //   state.saveComplete && (
      //   <a
      //     style={{
      //       position: "absolute",
      //       top: "0",
      //       height: "100%",
      //       width: "100%",
      //       backdropFilter: "blur(5px)",
      //     }}
      //     href={
      //       isTest
      //         ? `https://near.social/#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${state.articleId}&lastEditor=${accountId}&isTest=${isTest}&blockHeight=now`
      //         : `https://near.social/#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${state.articleId}&lastEditor=${accountId}&blockHeight=now`
      //     }
      //   >
      //     <div
      //       style={{
      //         width: "50%",
      //         margin: "0 auto",
      //         position: "relative",
      //         top: "40vh",
      //       }}
      //     >
      //       <h3
      //         style={{
      //           textAlign: "center",
      //           color: "black",
      //           backgroundColor: "rgb(230, 230, 230)",
      //           zIndex: "2",
      //         }}
      //         className="rounded-pill p-3"
      //       >
      //         Click to continue
      //       </h3>
      //     </div>
      //   </a>
      // )
    }
    <SecondContainer>
      <h1 className="mb-3">Create Article</h1>
      <div>
        <div>
          <Widget
            src={"rubycop.near/widget/NDC.StyledComponents"}
            props={{
              Button: {
                className: "primary dark",
                disable: state.articleId > 0 || state.articleBody > 0,
                text: "Save article",
                onClick: saveHandler,
                icon: <i className="bi bi-check2"></i>,
              },
            }}
          />

          {
            //   <Button
            //   type="submit"
            //   disable={state.articleId > 0 || state.articleBody > 0}
            //   onClick={saveHandler}
            // >
            //   {state.saving && (
            //     <div
            //       className="spinner-border text-secondary"
            //       style={{ height: "1rem", width: "1rem" }}
            //       role="status"
            //     >
            //       <span className="sr-only" title="Loading..."></span>
            //     </div>
            //   )}
            //   Save Article
            // </Button>
          }
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
          <Widget
            src={`${authorForWidget}/widget/TagsEditor`}
            props={{
              initialTagsObject: state.tags,
              placeholder: "Input tags",
              setTagsObject: (tags) => {
                state.tags = tags;
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
    </SecondContainer>
  </CreationContainer>
);
