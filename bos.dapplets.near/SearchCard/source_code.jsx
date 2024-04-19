const [accountId, unused, widgetName] = props.src.split("/");
const detailsUrl = `/near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `/${accountId}/widget/${widgetName}`;
const accountUrl = `/near/widget/ProfilePage?accountId=${accountId}`;
const metadata =
  props.metadata ??
  Social.get(`${accountId}/widget/${widgetName}/metadata/**`, "final") ??
  {};

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #eceef0;
  overflow: hidden;
  box-sizing: border-box;
`;

const CardBody = styled.div`
  padding: 9px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
`;

const TextLink = styled.div`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;

  i {
    margin-right: 3px;
  }
`;

const Thumbnail = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  transition: border-color 200ms;

  &:focus,
  &:hover {
    border-color: #d0d5dd;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ButtonLink = styled.button`
  padding: 8px;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border: none;
  background: #fff;
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
    border: none;
    background: #fff;
  }
`;

const plus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle
      cx="20"
      cy="20"
      r="14.4"
      stroke="#7E869E"
      strokeOpacity="0.25"
      strokeWidth="1.2"
    />
    <path
      d="M20 13.3333L20 26.6667"
      stroke="#222222"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M26.6666 20L13.3333 20"
      stroke="#222222"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

return (
  <Card>
    <CardBody>
      <Thumbnail>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
            alt: metadata.name,
          }}
        />
      </Thumbnail>

      <CardContent>
        <TextLink bold ellipsis>
          {metadata.name || widgetName}
        </TextLink>

        <TextLink small ellipsis>
          @{accountId}
        </TextLink>
      </CardContent>
      {!props.hideButtons && (
        <ButtonLink onClick={props.onComponentSelect} primary disabled={props.isWaiting}>
          {props.isWaiting
            ? <span role="status" aria-hidden="true" class="spinner-grow spinner-grow-sm" />
            : plus}
        </ButtonLink>
      )}
    </CardBody>
  </Card>
);
