const data = props.data;
const tabs = props.tabs;

// {
//   banner_url: "",
//   logo_url: "",
//   name: "",
//   description: "",
// };
// [
//   {
//     defaultActive: true,
//     iconClass: "bi bi-house-door",
//     route: "community.activity",
//     title: "Activity",
//   },
// ]

const Header = styled.div`
  overflow: hidden;
  background: #fff;
  margin-bottom: 25px;
`;

const NavUnderline = styled.ul`
  border-bottom: 1px #eceef0 solid;

  a {
    color: #687076;
    text-decoration: none;
  }

  a.active {
    font-weight: bold;
    color: #0c7283;
    border-bottom: 4px solid #0c7283;
  }
`;

const Button = styled.button`
  height: 40px;
  font-size: 14px;
  border-color: #e3e3e0;
  background-color: #ffffff;
`;

const Banner = styled.div`
  max-width: 100%;
  width: 1320px;
  height: 240px;
`;

const LogoImage = styled.img`
  top: -50px;
`;

const SizedDiv = styled.div`
  width: 150px;
  height: 100px;
`;

return (
  <Header className="d-flex flex-column gap-3">
    <Banner
      className="object-fit-cover"
      style={{
        background: `center / cover no-repeat url(${data.banner_url})`,
      }}
    />

    <div className="d-md-flex d-block justify-content-between container">
      <div className="d-md-flex d-block align-items-end">
        <div className="position-relative">
          <SizedDiv>
            <LogoImage
              src={data.logo_url}
              alt="Community logo"
              width="150"
              height="150"
              className="border border-3 border-white rounded-circle shadow position-absolute"
            />
          </SizedDiv>
        </div>

        <div>
          <div className="h1 pt-3 ps-3 text-nowrap">{data.name}</div>

          <div className="ps-3 pb-2 text-secondary">{data.description}</div>
        </div>
      </div>

      <div className="d-flex align-items-end gap-3">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
        >
          <Button
            type="button"
            className={[
              "d-flex align-items-center gap-2 border border-1 rounded-pill px-3 py-2",
              "text-dark text-nowrap font-weight-bold fs-6",
            ].join(" ")}
            onMouseLeave={() => {
              State.update({ copiedShareUrl: false });
            }}
            onClick={() => {
              clipboard
                .writeText(
                  "https://near.org" + href("community.activity", { handle })
                )
                .then(() => {
                  State.update({ copiedShareUrl: true });
                });
            }}
          >
            {state.copiedShareUrl ? (
              <i className="bi bi-16 bi-check"></i>
            ) : (
              <i className="bi bi-16 bi-link-45deg"></i>
            )}

            <span>Share</span>
          </Button>
        </OverlayTrigger>
      </div>
    </div>

    <NavUnderline className="nav">
      {tabs.map(({ defaultActive, params, route, title }) =>
        title ? (
          <li className="nav-item" key={title}>
            <a
              aria-current={defaultActive && "page"}
              className={[
                "d-inline-flex gap-2",
                activeTabTitle === title ? "nav-link active" : "nav-link",
              ].join(" ")}
              //   href={href(route, { handle, ...(params ?? {}) })}
            >
              <span>{title}</span>
            </a>
          </li>
        ) : null
      )}
    </NavUnderline>
  </Header>
);
