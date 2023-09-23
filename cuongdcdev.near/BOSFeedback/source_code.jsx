const feedbackEndpoint = props.endpoint
  ? props.endpoint
  : "https://test1.sctuts.com";

const projectName = props.projectName ? props.projectName : "uncategorized";
const thankyou = props.thankyou
  ? props.thankyou
  : "Your feedback was sent! Thanks!";
const errorMsg = props.errorMsg
  ? props.errorMsg
  : "Something wrong,plz try again";
const formTitle = props.txtTitle ? props.txtTitle : "Feedback or support form";
const userWalletAddr = context.accountId;
const txtContact = props.txtContact
  ? props.txtContact
  : "Contact address (optional)";
const txtFeedback = props.txtFeedback ? props.txtFeedback : "Feedback message";
const inlineCss = props.inlineCss ? props.inlineCss : {};

const creatorId = "cuongdcdev.near";

const Css = styled.b`
  .DialogOverlay {
    background-color: rgba(0, 0, 0, 0.68);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    z-index:1111;

  }
  
  .DialogContent {
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    z-index:2222;

  }
  .DialogContent:focus {
    outline: none;
  }
  
  .DialogDescription {
    margin: 10px 0 20px;
    color: var(--mauve11);
    font-size: 15px;
    line-height: 1.5;
  }
  
  .closeBtn{
    position: absolute;
    right: 0;
    top: 10px;
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  `;

State.init({
  opened: props.autoOpen,
  feedbackSent: false,
  showMsg: false,
});

const onChangeValue = (t, v) => {
  State.update({
    [t]: v,
  });
};

const submitFeedback = () => {
  if (state.fFeedback && state.fFeedback.length > 1) {
    console.log("Submit feedback: ", state);

    State.update({
      showMsg: false,
    });

    console.log("project name : ", projectName);
    // return;
    //submit user feedback
    asyncFetch(feedbackEndpoint + "/wp-json/bosfb/v1/new", {
      method: "POST",
      body: JSON.stringify({
        wallet_addr: userWalletAddr,
        contact_addr: state.fContact,
        message: state.fFeedback,
        project_name: projectName,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          State.update({
            feedbackSent: true,
            showMsg: thankyou,
          });
        } else {
          State.update({
            feedbackSent: false,
            showMsg: errorMsg,
          });
        }
      })
      .catch((res) => {
        console.log("Error response: ", res);
      });

    //end submit feedback
  } else {
    State.update({
      showMsg: "Please fill the feedback form!",
    });
  }
};

return (
  <>
    <Css>
      <Dialog.Root open={state.opened}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <h6> {formTitle}</h6>

          <div className="DialogBody">
            <a
              aria-label="Close"
              className="btn btn-lg closeBtn"
              onClick={() => {
                State.update({ opened: false });
              }}
            >
              <i class="bi bi-x-circle-fill"></i>
            </a>

            {/* feedback form  */}

            {!state.feedbackSent && (
              <div className="feedback-wrap">
                <div className="form-outline mb-2">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder={txtFeedback}
                    onChange={(e) => {
                      onChangeValue("fFeedback", e.target.value);
                    }}
                  ></textarea>
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      onChangeValue("fContact", e.target.value);
                    }}
                    placeholder={txtContact}
                  />
                </div>

                <button
                  className="btn btn-primary btn-sm px-4"
                  onClick={(e) => {
                    console.log("submit");
                    submitFeedback();
                  }}
                >
                  Send
                </button>
              </div>
            )}

            {state.showMsg && (
              <>
                <p className="text text-danger">{state.showMsg}</p>
              </>
            )}
            {/* close feedback form  */}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </Css>

    {/* btn float */}
    <button
      className="btn btn-secondary btn-outline"
      style={{
        ...{
          borderRadius: "100%",
          width: props.size ? props.size : "3em",
          height: props.size ? props.size : "3em",
          position: "fixed",
          right: 0,
          bottom: 0,
          zIndex: 99,
          display: state.opened ? "none" : "block",
        },
        ...inlineCss,
      }}
      onClick={() => {
        State.update({
          opened: state.opened ? false : true,
          feedbackSent: false,
          showMsg: false,
        });
      }}
    >
      <i className="bi bi-question-square"></i>
    </button>
  </>
);
