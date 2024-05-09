const Cookies = styled.div`
    background-color: white;
    position: fixed;
    bottom: 0;
    box-shadow: 0 8px 48px rgba(0,0,0,.15);
    border-radius: 4px;
    margin: 16px auto;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 80%;
    left: 0;
    right: 0;
    
    p {
        margin-bottom: 0;
    }

    .buttons {
        display: flex;
        gap: 15px;

        button {
            color: white;
            border-radius: 100px;
            padding-left: 25px;
            padding-right: 25px;
        }

        .btn-secondary {
            background-color: #33353B;
        }
    }

    @media only screen and (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const CustomizeDialogContent = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 50px;

    .info {
        display: flex;
        flex-direction: column;
        gap: 20px;

        h2 {
            font-size: 22px;
        }
    }

`;

State.init({
  cookiePopupTimestamp: null,
  cookieAcceptance: null,
  isDialogOpen: false,
});

useEffect(() => {
  State.update({ cookiePopupTimestamp: Storage.get("cookie_popup_timestamp") });
  State.update({ cookieAcceptance: Storage.get("cookie_acceptance") });
}, []);

if (state.cookiePopupTimestamp && state.cookieAcceptance) {
  return "";
}

const onAccept = (cookie_acceptance) => {
  const cookie_popup_timestamp = Date.now();

  Storage.set("cookie_popup_timestamp", cookie_popup_timestamp);
  Storage.set("cookie_acceptance", cookie_acceptance);

  State.update({ cookiePopupTimestamp: cookie_popup_timestamp });
  State.update({ cookieAcceptance: cookie_acceptance });
};

const onCustomize = () => {
  State.update({ isDialogOpen: true });
};

return (
  <Cookies>
    <Widget
      src="near/widget/DIG.Dialog"
      props={{
        content: (
          <CustomizeDialogContent>
            <div class="info">
              <div>
                <h2>Necessary Cookies</h2>
                <p>
                  These cookies are required for website functionality such as
                  storing your settings and preferences, as detailed{" "}
                  <a href="near.org/near/widget/NearOrg.CookieDetails">here</a>.
                </p>
              </div>
              <div>
                <h2>Marketing & Analytics Cookies</h2>
                <p>
                  We recommend accepting these cookies, which include
                  third-party cookies, for the improvement of user experience
                  and discoverability on the B.O.S. These cookies contribute to
                  anonymized statistics which are analyzed in aggregate.
                </p>
              </div>
            </div>
            <div class="buttons">
              <button
                onClick={() => {
                  onAccept("all");
                  State.update({ isDialogOpen: false });
                }}
              >
                Accept All
              </button>
              <button
                class="btn-secondary"
                onClick={() => {
                  onAccept("required_only");
                  State.update({ isDialogOpen: false });
                }}
              >
                Accept Required Only
              </button>
            </div>
          </CustomizeDialogContent>
        ),
        open: state.isDialogOpen,
        actionButtons: false,
        contentStyles: "max-width: 750px;",
        onOpenChange: (value) => State.update({ isDialogOpen: value }),
      }}
    />
    <p>
      We use our own and third-party cookies on our website to enhance your
      experience, analyze traffic, and for marketing. For more information see
      our{" "}
      <a
        href="https://near.org/cookies"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cookie Policy
      </a>
      .{" "}
    </p>
    <div class="buttons">
      <button className="btn-secondary" onClick={onCustomize}>
        Customize
      </button>
      <button onClick={() => onAccept("all")}>Accept</button>
    </div>
  </Cookies>
);
