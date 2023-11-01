const ownerId = "nearcon23.near";
const apiUrl = "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

const Navbar = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  // padding: 0.75rem 20px 1.5rem 20px;
  padding: 0 10px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: sticky;
  top: 0;
  // padding-top: 32px;
  // margin-bottom: 0.75rem;

  // max-height: 2.5em;
  // height: 100%;
  // max-height: 5.5em;

  height: 90px;

  background-color: ${props.collapsible ? "transparent" : "#FFffFF"};
  backdrop-filter: blur(8px);
`;

const HideInMobile = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LogoArea = styled.a`
  display: block;
  width: 10em;
  padding: 0px;
  gap: 0.7em;
  font-style: normal;
  font-weight: 700;
  font-size: 1em;
  line-height: 1em;
  color: #11181c;
  transform: translateY(0.675em);

  &:hover {
    text-decoration: none;
    color: #11181c;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 1em;
`;

const logo = (
  <LogoArea
    href={`/${ownerId}/widget/Index`}
    onClick={() => props.update({ tab: "home" })}
  >
    <Widget src={`${ownerId}/widget/Icons.NearconLogo`} />
  </LogoArea>
);

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  flex: none;
  order: 0;
  align-self: stretch;
  font-family: "Mona Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 1em;
  text-align: right;
  color: #00EC97;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Trigger = styled.button`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 0.5em;
  border: none;
  // background-color: #f9fafb;
  background-color: #000000;
  transition: all 0.25s ease-in-out;
  width: 40px;
  height: 40px;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  // &[data-state="open"] {
  //   transform: rotate(-90deg);
  // }

  // &[data-state="closed"] {
  //   transform: rotate(0deg);
  // }

  transform: rotate(${props.collapsible === false ? "0" : "-90"}deg);
`;

const info = <Info>Nov 7-10 + Lisbon</Info>;

const accountId = props.accountId || context.accountId;
const nearconId = props.nearconId;

const secretKey = Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const url = "bafkreifunmukd4k2u7picjrdwvgenv2xte7nzvmnrip5gg45prc2bl7fie";

State.init({ img: null });

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;

    asyncFetch(
      `${apiUrl}/users/${cid}/${secretKey}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer 83d2e488-68e3-11ee-8c99-0242ac120002",
          "x-amzn-RequestId": "83d2e488-68e3-11ee-8c99-0242ac120002",
        },
      }
    )
      .then((res) => {
        console.log("SUCCESS", res);
      })
      .catch((err) => {
        console.log("ERR", err);
      });

    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const actions = (
  <ActionArea>
    {!props.hideLocation && <> {info}</>}

    {nearconId ? (
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        clickable
        onChange={filesOnChange}
      >
        {state.img?.uploading ? (
          <div
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                width: 25,
                height: 25,
                aspectRatio: "1 / 1",
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: 0,
              }}
              class="spinner-border"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <img
            style={{
              maxWidth: 40,
              width: "100%",
              minWidth: 40,
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderWidth: 0,
              borderRadius: "50%",
            }}
            src={`https://ipfs.near.social/ipfs/${
              state.img ? state.img.cid : props.cid ? props.cid : url
            }`}
            alt="profile"
          />
        )}
      </Files>
    ) : (
      <Widget src={`${ownerId}/widget/Register.Button`} />
    )}
  </ActionArea>
);

return (
  <Navbar>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      {!nearconId && (
        <Trigger
          onClick={() => {
            props.update({
              collapsible: !props.collapsible,
            });
          }}
        >
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H19M1 1H19M1 13H19"
              stroke="#00ec97"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Trigger>
      )}

      {logo}
    </div>

    {actions}
  </Navbar>
);
