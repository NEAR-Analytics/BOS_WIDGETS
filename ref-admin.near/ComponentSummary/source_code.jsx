if (!props.src) return "";

const { commitLoading } = state;
State.init({
  copiedShareUrl: false,
  commitLoading: false,
});

const src = props.src;
const primaryAction = props.primaryAction || "viewDetails";
const [accountId, widget, widgetName] = src.split("/");
const data = Social.get(`${accountId}/widget/${widgetName}/metadata/**`);
const metadata = data || {};
const tags = Object.keys(metadata.tags || {});
const appUrl = `/#/${src}`;
const detailsUrl = `/#/ref-admin.near/widget/ComponentDetailsPage?src=${src}`;
const shareUrl = `https://alpha.near.org${detailsUrl}`;
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
    title: "26px",
  },
};

const Wrapper = styled.div`
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
  align-items:center;
  justify-content:space-between;
  flex-wrap: wrap;
  margin-bottom: 16px;
  .actionsDiv{
    display: flex;
    align-items:center;
    gap:12px;
  }
`;

const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  color: #fff;
  margin: 0 0 8px;
  font-weight: 500;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;

const Thumbnail = styled.div`
  width: ${(p) => sizes[p.size].thumbnail};
  height: ${(p) => sizes[p.size].thumbnail};
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);

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
  color: #fff;
  font-weight: 500;
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};

  i {
    margin-right: 4px;
  }
`;
function applyHomePage() {
  if (commitLoading) return;
  State.update({ commitLoading: true });
  Social.set(
    {
      myHomePagePath: src,
    },
    {
      force: true,
      onCommit: () => {
        State.update({ commitLoading: false });
      },
      onCancel: () => {
        State.update({ commitLoading: false });
      },
    }
  );
}
const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
return (
  <Wrapper>
    <Header size={size}>
      <Thumbnail size={size}>
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

      <div>
        <Title size={size}>{metadata.name || widgetName}</Title>
        <Text ellipsis>{src}</Text>
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
      <div class="actionsDiv">
        <ButtonLink primary href={primaryActions[primaryAction].url}>
          {primaryActions[primaryAction].display}
        </ButtonLink>

        <ButtonLink href={`/#/edit/${src}`}>
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
      </div>
      {props.primaryAction && (
        <ButtonLink onClick={applyHomePage}>
          {commitLoading ? Loading : <i className="bi bi-house"></i>}
          Apply as homepage
        </ButtonLink>
      )}
    </Actions>
  </Wrapper>
);
