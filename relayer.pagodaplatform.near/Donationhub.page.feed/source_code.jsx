const { author, recency, tag } = props;
const { page, ...passProps } = props;

const { href } = VM.require("devhub.near/widget/core.lib.url");
const { AppLayout } = VM.require(
  "lucus.near/widget/DonationHub.components.templates.AppLayout"
);

if (!AppLayout) {
  return <p>Loading modules...</p>;
}

if (!href) {
  return <p>Loading modules...</p>;
}
const Theme = styled.div`
  a {
    color: inherit;
  }

  .attractable {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    transition: box-shadow 0.6s;

    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
  }
`;
if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "home";
}

function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "home": {
      return (
        <Widget
          src={"natapat.near/widget/Donationhub.page.feed"}
          props={passProps}
        />
      );
    }

    // ?page=feed
    case "feed": {
      return (
        <Widget
          src={"natapat.near/widget/DonationHub.page.feed"}
          props={passProps}
        />
      );
    }
    // ?page=create
    case "create": {
      return (
        <Widget
          src={"natapat.near/widget/Donation.Project.Create"}
          props={passProps}
        />
      );
    }
    // ?page=about

    case "profile": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.profile"}
          props={passProps}
        />
      );
    }
    // ?page=blog
    default: {
      // TODO: 404 page
      return <p>404</p>;
    }
  }
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
      <Widget src={`lucus.near/widget/DonationHub.components.island.banner`} />
      <Widget
        src={"natapat.near/widget/Donationhub.feature.post-search.panel"}
        props={{
          hideHeader: false,
          children: (
            <Widget
              src={
                "lucus.near/widget/DonationHub.components.molecule.PostControls"
              }
              props={{
                title: "Post",
                href: href({
                  widgetSrc: "natapat.near/widget/DonationHub",
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
return (
  <Theme>
    <AppLayout page={page}>
      <Page />
    </AppLayout>
  </Theme>
);
