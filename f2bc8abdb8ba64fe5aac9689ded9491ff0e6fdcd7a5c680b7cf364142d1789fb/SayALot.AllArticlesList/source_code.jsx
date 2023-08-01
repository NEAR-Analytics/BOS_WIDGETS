//===============================================INITIALIZATION=====================================================

let { isTest, stateUpdate, finalArticles, tabs, widgets, addressForArticles } =
  props;

State.init({ start: Date.now() });

//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================

//=================================================END CONSTS=======================================================

//==================================================FUNCTIONS=======================================================

function getDateLastEdit(timestamp) {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
}

function handleOpenArticle(article) {
  return () =>
    stateUpdate({
      displayedTabId: tabs.SHOW_ARTICLE.id,
      infoToRenderArticle: {
        articleId: article.articleId,
        blockHeight: article.blockHeight,
        lastEditor: article.lastEditor,
      },
    });
}
//================================================END FUNCTIONS=====================================================

return (
  <div className="row card-group py-3">
    {finalArticles.length > 0 &&
      finalArticles.map((article) => {
        // If some widget posts data different than an array it will be ignored
        if (!Array.isArray(article.tags)) article.tags = [];
        return (
          <Widget
            src={widgets.generalCard}
            props={{
              data: article,
              displayOverlay: true,
              renderReactions: true,
              widgets,
              addressForArticles,
            }}
          />
        );
        // return (
        //   <div
        //     className="col-sm-12 col-lg-6 col-2xl-4 gy-3"
        //     key={article.articleId}
        //   >
        //     <div className="card h-100">
        //       <div
        //         className="text-decoration-none text-dark"
        //         onClick={handleOpenArticle(article)}
        //       >
        //         <div className="card-body">
        //           <div className="row d-flex justify-content-center">
        //             <h5 className="card-title text-center pb-2 border-bottom">
        //               {article.articleId}
        //             </h5>
        //             <div className="col flex-grow-1">
        //               <Widget
        //                 src="mob.near/widget/Profile.ShortInlineBlock"
        //                 props={{ accountId: article.author, tooltip: true }}
        //               />
        //             </div>
        //             <div className="col flex-grow-0">
        //               <p className="card-subtitle text-muted text-end">
        //                 {getDateLastEdit(article.timeCreate).date}
        //               </p>{" "}
        //               <p className="card-subtitle text-muted text-end">
        //                 {getDateLastEdit(article.timeCreate).time}
        //               </p>
        //             </div>
        //           </div>
        //           <div
        //             className="mt-3 alert alert-secondary"
        //             style={{ backgroundColor: "white" }}
        //           >
        //             <div>
        //               Last edit by{" "}
        //               <a
        //                 href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
        //                 style={{ textDecoration: "underline" }}
        //               >
        //                 {article.lastEditor}
        //               </a>
        //               <br />
        //               Edited on {getDateLastEdit(article.timeLastEdit).date}
        //               <br />
        //               Edit versions: {article.version}
        //             </div>
        //             <Widget
        //               src={`${authorForWidget}/widget/SayALot_TagList`}
        //               props={{ tags: article.tags, isDebug }}
        //             />
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // );
      })}
  </div>
);
