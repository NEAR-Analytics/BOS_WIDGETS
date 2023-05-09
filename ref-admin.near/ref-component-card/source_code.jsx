const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);

const tags = Object.keys(metadata.tags || {});
State.init({
  hover: false,
});
const candBg = [
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #5B8088 0%, #091518 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #877366 0%, #1A1A1A 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #F39BBB 0%, #380F1B 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #2F629E 0%, #0A1420 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #2B8888 0%, #071216 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #9B6B42 0%, #221511 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #5B887B 0%, #091815 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #373589 0%, #0F0F23 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #A3985F 0%, #2D261A 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #B3699E 0%, #BE4A6D 0.01%, #200A0E 100%)",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const randomBg = getRandomInt(candBg.length);

const role = props.role;

const detailsUrl = `#/near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `#/${accountId}/widget/${widgetName}`;

const previewUrl = `#/near/widget/ComponentDetailsPage?istemplate=false&tab=preview&src=${accountId}/widget/${widgetName}`;

const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const Card = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  width: 165px;
  height: 210px;
  background: radial-gradient(
    88.1% 88.1% at 49.7% 100%,
    #5b8088 0%,
    #091518 100%
  );
  border-radius: 16px;
`;

const CardBody = styled.div`
  padding: 16px 0 16px 0;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  overflow: hidden;

  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
  padding: 10px 0px 10px 10px;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const CardTag = styled.p`
  margin: 0;
  font-size: 9px;
  line-height: 14px;
  background: #eceef0;
  color: #687076;
  font-weight: 400;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 3px;
  padding: 0 4px;

  i {
    margin-right: 3px;
  }
`;

const TextLink = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffffff;
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

const Thumbnail = styled.a`
  display: block;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 26px;
  overflow: hidden;
  outline: none;
  display: flex;
  margin: auto;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  margin-top: 4px;
  padding-left: 9px;
  display: flex;
`;

const Tag = styled.div`
  box-sizing: border-box;
  background: rgba(26, 46, 51, 0.25);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 38px;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  padding: 1px 11px 1px 11px;
  white-space: nowrap;
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

const FooterIcon = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  overflow: hidden;
  outline: none;
  display: flex;
  margin-right: 4px;

  border-radius: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const onMouseEnter = () => {
  if (role === "Builder") {
    State.update({
      hover: true,
    });
  }
};

const onMouseLeave = () => {
  if (role === "Builder") {
    State.update({
      hover: false,
    });
  }
};

return (
  <>
    {!!state.hover && (
      <div onMouseLeave={onMouseLeave}>
        <Widget
          src="ref-admin.near/widget/ref-component-card-hover"
          props={{
            src: props.src,
            role: role,
          }}
        />
      </div>
    )}
    {!state.hover && (
      <Card
        style={{
          background: candBg[randomBg],
        }}
        onMouseEnter={onMouseEnter}
      >
        <CardBody>
          <Thumbnail href={role === "Builder" ? previewUrl : appUrl}>
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

          <TagsWrapper>
            {tags.length > 0 &&
              tags.map((t) => {
                return <Tag>{t}</Tag>;
              })}
          </TagsWrapper>

          <CardContent>
            <TextLink title={metadata.name || widgetName}>
              {metadata.name || widgetName}
            </TextLink>
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FooterIcon>
                {" "}
                <Widget
                  src="mob.near/widget/Image"
                  props={{
                    image: metadata.image,
                    fallbackUrl:
                      "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
                    alt: metadata.name,
                  }}
                />
              </FooterIcon>

              <TextLink>{accountId}</TextLink>
            </div>
          </CardContent>
        </CardBody>
      </Card>
    )}
  </>
);
