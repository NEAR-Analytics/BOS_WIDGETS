const { author, recency, tag } = props;

const { href } = VM.require("devhub.near/widget/core.lib.url");

if (!href) {
  return <p>Loading modules...</p>;
}

const Gradient = styled.div`
  height: 250px;
  text-align: center;
  background: radial-gradient(
    circle,
    rgba(29, 55, 57, 1) 30%,
    rgba(24, 24, 24, 1) 80%
  );

  font-family: Arial, sans-serif;

  .text-primary-gradient {
    color: #53fdca;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(#8e76ba, #1ed2f0);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .subtitle-above {
    font-size: 18px;
    letter-spacing: 1px;
    font-family: Courier, monospace;
  }

  .subtitle-below {
    font-size: 16px;
  }

  .slogan {
    font-weight: 600;
    font-size: 60px;
  }
`;

const FeedPage = ({ recency, tag }) => {
  return (
    <div className="w-100">
      <Widget src={`devhub.near/widget/devhub.components.island.banner`} />
      <Widget
        src={"devhub.near/widget/devhub.feature.post-search.panel"}
        props={{
          hideHeader: false,
          children: (
            <Widget
              src={
                "devhub.near/widget/devhub.components.molecule.PostControls"
              }
              props={{
                title: "Post",
                href: href({
                  widgetSrc: "devhub.near/widget/app",
                  params: { page: "create" },
                }),
              }}
            />
          ),
          recency,
          tag,
          author,
          transactionHashes: props.transactionHashes,
        }}
      />
    </div>
  );
};

return FeedPage(props);
