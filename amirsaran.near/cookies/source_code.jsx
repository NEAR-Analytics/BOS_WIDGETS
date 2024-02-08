const cookies = styled.div`
    position: fixed;
    bottom: 0;
    box-shadow: 0 8px 48px rgba(0,0,0,.15);
    border-radius: 4px;
    margin: 16px auto;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 80%;
    
    p {
        font-size: 0.9em;
        margin-bottom: 0;
    }

    .buttons {
        display: flex;
        gap: 10px;

        button {
            color: white;
            border-radius: 100px;
            padding-left: 25px;
            padding-right: 25px;
        }

        .btn-customize {
            background-color: #33353B;
        }
    }
`;

const [cookiePopupTimestamp, setCookiePopupTimestamp] = useState(null);
const [cookieAcceptance, setCookieAcceptance] = useState(null);

useEffect(() => {
  const cookie_popup_timestamp = Storage.get("cookie_popup_timestamp");
  const cookie_acceptance = Storage.get("cookie_acceptance");

  if (cookie_popup_timestamp && cookie_acceptance) {
    setCookiePopupTimestamp(Storage.get("cookie_popup_timestamp"));
    setCookieAcceptance(Storage.get("cookie_acceptance"));
  }
}, []);

// if (cookiePopupTimestamp && cookieAcceptance) {
//   return "";
// }

const onAccept = () => {
  const cookie_popup_timestamp = Date.now();
  const cookie_acceptance = "all";

  Storage.set("cookie_popup_timestamp", cookie_popup_timestamp);
  Storage.set("cookie_acceptance", cookie_acceptance);

  setCookiePopupTimestamp(cookie_popup_timestamp);
  setCookieAcceptance(cookie_acceptance);
};

return (
  <cookies>
    <p>
      We use our own and third-party cookies on our website to enhance your
      experience, analyze traffic, and for marketing. For more information see
      our <a href="https://near.org/cookies">Cookie Policy</a>.{" "}
    </p>
    <div class="buttons">
      <button className="btn-customize">Customize</button>
      <button onClick={onAccept}>Accept</button>
    </div>
  </cookies>
);
