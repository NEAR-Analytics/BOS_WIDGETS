const tabs = {
  MY_POLLS: { id: 0, text: "My Polls" },
  EDIT_POLLS: { id: 1, text: "Edit Polls" },
  VIEW_POLLS: { id: 2, text: "View Polls" },
  PLANS: { id: 3, text: "Plans" },
};
const headercolor = "#969696";

const widgetOwner = "easypoll.near";

const abortPollCreation = () => {
  State.update({ showAbortPollCreation: true });
};

const AddPoll = () => {
  State.update({ displaying: 1 });
};

State.init({
  displaying: tabs.MY_POLLS.id,
  hoveringElement: "",
  showAbortPollCreation: false,
  abortThroughAllExistingPolls: false,
  profile: {},
});
console.log(state.displaying);
console.log(state.hoveringElement);
return (
  <div
    className="pb-5"
    style={{
      backgroundColor: "rgb(230, 230, 230)",
      fontFamily: "Mono Sans",
      fontStyle: "normal",
      borderRadius: "20px",
    }}
  >
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3"
      style={{
        backgroundColor: "grey",
        boxShadow: "0px 4px 28px rgba(43, 68, 106, 0.04)",
      }}
    >
      <div className="d-flex align-items-center">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#010A2D",
            color: "white",
            height: "100%",
            minWidth: "2.5rem",
            aspectRatio: "1",
            borderRadius: "12px",
          }}
        >
          <i className="bi bi-bar-chart-fill"></i>
        </div>
        <h3
          style={{
            margin: "0 0.5rem",
            color: "#010A2D",
            fontWeight: "700",
            fontSize: "1.3rem",
            letterSpacing: "0.1px",
          }}
        >
          EasyPoll
        </h3>
      </div>
      <div
        className="w-100 d-flex justify-content-between"
        style={{ margin: "0 4rem" }}
      >
        <div style={{ marginTop: "0.6rem", fontSize: "1rem" }}>
          <div className="d-flex">
            {Object.keys(tabs).map((tabKey) => {
              const tab = tabs[tabKey];
              return (
                <div
                  style={{
                    marginRight: "1.5rem",
                    position: "relative",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <p
                    ariaCurrent="page"
                    onMouseEnter={() => {
                      State.update({ hoveringElement: tab.id });
                    }}
                    onMouseLeave={() => {
                      State.update({ hoveringElement: "" });
                    }}
                    onClick={() => {
                      state.displaying != tabs.ALL_EXISTING_POLLS.id
                        ? State.update({ displaying: tab.id })
                        : tab.id == tabs.ALL_EXISTING_POLLS.id
                        ? State.update({
                            showAbortPollCreation: true,
                            abortThroughAllExistingPolls: true,
                          })
                        : State.update({ showAbortPollCreation: true });
                    }}
                    style={{
                      fontWeight: "500",
                      fontSize: "1rem",
                      margin: "0",
                    }}
                  >
                    {tab.text}
                  </p>
                  {(state.hoveringElement == tab.id ||
                    state.displaying == tab.id) && (
                    <div
                      style={{
                        height: "0.2rem",
                        width: "50%",
                        position: "absolute",
                        bottom: "-55%",
                        left: "25%",
                        backgroundColor: "#010A2D",
                        borderRadius: "8px",
                      }}
                    >
                      {/*Decorative Div, do not delete*/}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    {state.displaying == tabs.MY_POLLS.id && (
      <div className="px-4">
        <h2
          style={{
            margin: "2rem 0 0.5rem 0",
            fontWeight: "700",
            color: "white",
            backgroundColor: "#00bcd4",
            padding: "3px 5px",
            margin: 0,
            textAlign: "center",
            width: "20%",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          My Polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/showQuestionsHandler`}
          props={{ sharedBlockHeight, onlyUser: true }}
        />
        <button
          onMouseEnter={() => {
            State.update({ hoveringElement: "refreshPoll" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          onClick={abortPollCreation}
          style={
            state.hoveringElement == "refreshPoll"
              ? {
                  border: "2px solid transparent",
                  fontWeight: "500",
                  fontSize: "1rem",
                  padding: "0.3rem 1.5rem",
                  backgroundColor: "#010A2D",
                  borderRadius: "12px",
                  color: "white",
                  transform: "translateY(-2.3rem)",
                  float: "right",
                  marginRight: "5px",
                }
              : {
                  border: "2px solid black",
                  color: "black",
                  backgroundColor: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                  padding: "0.3rem 1.5rem",
                  borderRadius: "12px",
                  transform: "translateY(-2.3rem)",
                  float: "right",
                  marginRight: "5px",
                }
          }
        >
          Refresh
        </button>
        <button
          onMouseEnter={() => {
            State.update({ hoveringElement: "addPoll" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          onClick={AddPoll}
          style={
            state.hoveringElement == "addPoll"
              ? {
                  border: "2px solid transparent",
                  fontWeight: "500",
                  fontSize: "1rem",
                  padding: "0.3rem 1.5rem",
                  backgroundColor: "#010A2D",
                  borderRadius: "12px",
                  color: "white",
                  transform: "translateY(-2.3rem)",
                  float: "right",
                  marginRight: "5px",
                }
              : {
                  border: "2px solid black",
                  color: "black",
                  backgroundColor: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                  padding: "0.3rem 1.5rem",
                  borderRadius: "12px",
                  transform: "translateY(-2.3rem)",
                  float: "right",
                  marginRight: "5px",
                }
          }
        >
          Add
        </button>
      </div>
    )}
    {state.displaying == tabs.EDIT_POLLS.id && (
      <div className="px-4">
        <h2
          style={{
            margin: "2rem 0 0.5rem 0",
            fontWeight: "700",
            color: "white",
            backgroundColor: "#00bcd4",
            padding: "3px 5px",
            margin: 0,
            textAlign: "center",
            width: "20%",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          Edit Polls
        </h2>
        <div>
          <Widget
            src={`${widgetOwner}/widget/newPollQuestionInterface`}
            props={{ indexVersion }}
          />
        </div>
      </div>
    )}
    {state.displaying == tabs.VIEW_POLLS.id && (
      <div className="px-4">
        <div
          className="d-flex"
          style={{
            margin: "2rem 0 0.5rem 0",
            fontWeight: "700",
            color: "white",
            backgroundColor: "#00bcd4",
            padding: "3px 5px",
            margin: 0,
            textAlign: "center",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <input
            type="button"
            style={{
              fontWeight: "700",
              color: "white",
              backgroundColor: "#00bcd4",
              padding: "3px 5px",
              margin: 0,
              textAlign: "center",
              width: "5%",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              display: "inline-block",
            }}
            value="all"
          />
          <input
            type="date"
            style={{
              fontWeight: "700",
              color: "white",
              backgroundColor: "#00bcd4",
              padding: "3px 5px",
              marginLeft: "5px",
              textAlign: "center",
              width: "20%",
              display: "inline-block",
            }}
          />
          <div
            className="d-flex"
            style={{
              fontWeight: "700",
              color: "white",
              backgroundColor: "#00bcd4",
              padding: "3px 5px",
              marginLeft: "5px",
              textAlign: "center",
              marginLeft: "40%",
              width: "30%",
              display: "inline-block",
            }}
          >
            <label style={{ width: "30%", display: "inline-block" }}>
              Search
            </label>
            <input
              type="search"
              style={{
                fontWeight: "700",
                color: "white",
                backgroundColor: "#00bcd4",
                padding: "3px 5px",
                marginLeft: "5px",
                textAlign: "center",
                width: "70%",
                display: "inline-block",
              }}
            />
          </div>
        </div>
        <Widget
          src={`${widgetOwner}/widget/showQuestionsHandler`}
          props={{ sharedBlockHeight, onlyUser: true }}
        />
      </div>
    )}
    {state.displaying == tabs.PLANS.id && (
      <div className="px-4">
        <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>
          My Polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/showQuestionsHandler`}
          props={{ sharedBlockHeight, onlyUser: true }}
        />
      </div>
    )}
  </div>
);
