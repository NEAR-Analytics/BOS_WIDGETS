if (!props.src) return "";

const { customHomeLoading } = state;
State.init({
  copiedShareUrl: false,
  customHomeLoading: canCustomHome ? true : false,
});

const { canCustomHome, src } = props;
const primaryAction = props.primaryAction || "viewDetails";
let myHomePagePath;
if (canCustomHome || props.primaryAction) {
  myHomePagePath = Social.get(`${context.accountId}/myHomePagePath`);
}
if (myHomePagePath !== null) {
  State.update({
    customHomeLoading: false,
  });
}
if (customHomeLoading) return "";
const finalSrc = canCustomHome ? myHomePagePath || src : src;
const [accountId, widget, widgetName] = finalSrc.split("/");
const data = Social.get(`${accountId}/widget/${widgetName}/metadata/**`);
const metadata = data || {};
const tags = Object.keys(metadata.tags || {});
const appUrl = `#/${finalSrc}`;
const detailsUrl = `#/ref-admin.near/widget/ComponentDetailsPage?src=${finalSrc}`;
const shareUrl = `https://near.org${detailsUrl}`;
const size = props.size || "large";

const primaryActions = {
  open: {
    display: "Open",
    url: appUrl,
  },
  viewDetails: {
    display: "View Details",
    url: detailsUrl,
  },
};

const sizes = {
  medium: {
    gap: "16px",
    thumbnail: "56px",
    title: "16px",
  },
  large: {
    gap: "16px",
    thumbnail: "100px",
    title: "32px",
  },
};

const Wrapper = styled.div`
background-repeat:no-repeat;
background-size: cover;
background-image:${() => {
  return props.primaryAction
    ? 'url("https://ipfs.near.social/ipfs/bafybeiduczlwb5wvqng2jjyifcyuyj4hs3mpfdgoex6xkswbqyviywkaje")'
    : "none";
}};
border-radius:10px;
padding: 0 10px 16px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => sizes[p.size].gap};
  margin-bottom: 32px;

  > * {
    min-width: 0;
  }

  @media (max-width: 770px) {
    gap: 16px;
  }
`;

const TagsWrapper = styled.div`
  margin-bottom: 32px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  line-height: 1.2em;
  color: #fff;
  margin: 0 0 8px;
  font-weight: 600;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;

const Thumbnail = styled.div`
  width: ${(p) => sizes[p.size].thumbnail};
  height: ${(p) => sizes[p.size].thumbnail};
  flex-shrink: 0;
  // border: 1px solid #eceef0;
  border-radius: 12px;
  overflow: hidden;
  // box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
  //   0px 1px 2px rgba(16, 24, 40, 0.06);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 770px) {
    width: 58px;
    height: 58px;
  }
`;

const sharedButtonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

const Button = styled.button`
//   ${sharedButtonStyles}
//   color: ${(p) => (p.primary ? "#09342E" : "#11181C")} !important;
//   background: ${(p) => (p.primary ? "#59E692" : "#FBFCFD")};
//   border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

//   &:hover,
//   &:focus {
//     background: ${(p) => (p.primary ? "rgb(112 242 164)" : "#ECEDEE")};
//   }
background: rgba(26, 46, 51, 0.25);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 38px;
  color:#fff;
`;

const ButtonLink = styled.a`
//   ${sharedButtonStyles}
//   color: ${(p) => (p.primary ? "#09342E" : "#11181C")} !important;
//   background: ${(p) => (p.primary ? "#59E692" : "#FBFCFD")};
//   border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

//   &:hover,
//   &:focus {
//     background: ${(p) => (p.primary ? "rgb(112 242 164)" : "#ECEDEE")};
//   }
  background: rgba(26, 46, 51, 0.25);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 38px;
  color:#fff;
  &:hover{
    color:#fff;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#fff" : "#fff")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};

  i {
    margin-right: 4px;
  }
`;

return (
  <Wrapper>
    <Header size={size}>
      <Thumbnail size={size}>
        <Widget
          src="ref-admin.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
            alt: metadata.name,
          }}
        />
      </Thumbnail>

      <div>
        <Title size={size}>{metadata.name || widgetName}</Title>
        <Text ellipsis>{finalSrc}</Text>
      </div>
    </Header>

    {props.showTags && tags.length > 0 && (
      <TagsWrapper>
        <Widget
          src="ref-admin.near/widget/Tags"
          props={{
            tags,
          }}
        />
      </TagsWrapper>
    )}

    <Actions>
      <ButtonLink primary href={primaryActions[primaryAction].url}>
        {primaryActions[primaryAction].display}
      </ButtonLink>

      <ButtonLink href={`#/edit/${finalSrc}`}>
        {context.accountId === accountId ? (
          <>
            <i className="bi bi-pencil-fill"></i> Edit
          </>
        ) : (
          <>
            <i className="bi bi-git"></i> Fork
          </>
        )}
      </ButtonLink>

      <ButtonLink href={`${detailsUrl}&tab=source`}>
        <i className="bi bi-code-square"></i>
        View Source
      </ButtonLink>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
      >
        <Button
          type="button"
          onMouseLeave={() => {
            State.update({ copiedShareUrl: false });
          }}
          onClick={() => {
            clipboard.writeText(shareUrl).then(() => {
              State.update({ copiedShareUrl: true });
            });
          }}
        >
          {state.copiedShareUrl ? (
            <i className="bi bi-16 bi-check"></i>
          ) : (
            <i className="bi bi-16 bi-link-45deg"></i>
          )}
          Share
        </Button>
      </OverlayTrigger>
      {props.primaryAction && (
        <Widget
          src="ref-admin.near/widget/apply-as-home-button"
          props={{ src: finalSrc, istemplate: props.istemplate }}
        ></Widget>
      )}
    </Actions>
  </Wrapper>
);
