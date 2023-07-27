const {
  mainPageLink,
  brand,
  pills,
  authorForWidget,
  isDebug,
  currentNavPill,
  writersWhiteList,
  searchInputData,
} = props;

/*
=================================================searchInputData example===============================================
    searchInputData: {
        value: string,
        handleChange: function,
    }
    
============(When modified to be web app we should delete action to replace it with a propper State.update)============

======================================================pills example====================================================
    pills: [{
        id: number,
        title: string,
        widgetName: string,
    }]
    
============(When modified to be web app we should delete action to replace it with a propper State.update)============

======================================================brand example====================================================
    brand: {
        brandName: string,
        logoHref: string,
        logoRemWidth: number/string,
        logoRemHeight: number/string,
    }
    
============(When modified to be web app we should delete action to replace it with a propper State.update)============
*/

const logoRemWidth = brand.logoRemWidth
  ? brand.logoRemWidth + "rem"
  : undefined;
const logoRemHeight = brand.logoRemHeight
  ? brand.logoRemHeight + "rem"
  : undefined;

if (
  !mainPageLink ||
  (brand && (!logoRemWidth || !logoRemHeight || !brand.logoHref)) ||
  !authorForWidget
) {
  const crucialPropMissingMsg = "The following props are missing:";
  return (
    <div>
      <h3 className="text-danger">{crucialPropMissingMsg}</h3>
      <ul>{!mainPageLink && <li className="text-danger">mainPageLink</li>}</ul>
      <ul>
        {!authorForWidget && <li className="text-danger">authorForWidget</li>}
      </ul>
      <ul>{!logoRemWidth && <li className="text-danger">logoRemWidth</li>}</ul>
      <ul>
        {!logoRemHeight && <li className="text-danger">logoRemHeight</li>}
      </ul>
      <ul>
        {!brand.logoHref && <li className="text-danger">brand.logoHref</li>}
      </ul>
    </div>
  );
}

if (!currentNavPill) {
  currentNavPill = "";
}

const accountId = context.accountId;

if (!writersWhiteList) {
  if (isDebug) {
    writersWhiteList = [
      "silkking.near",
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      "blaze.near",
      "ayelen.near",
      "kenrou-it.near",
    ];
  } else {
    writersWhiteList = [
      "neardigitalcollective.near",
      "blaze.near",
      "jlw.near",
      "kazanderdad.near",
      "joep.near",
      "sarahkornfeld.near",
      "yuensid.near",
      "shubham007.near",
      "fiftycent.near",
      "ozymandius.near",
    ];
  }
}

//============================================Styled components==================================================
const Pill = styled.a`
    font-family: system-ui;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 24px;
    color: black;

    &:hover {
        color: #9333EA;
    }
`;

const StylessATag = styled.a`
    &:hover {
        text-decoration: none;
    }
`;
//============================================End styled components==============================================

function getLink(widgetName) {
  let baseLink = widgetName
    ? `#/${authorForWidget}/widget/${widgetName}`
    : `#/${authorForWidget}/widget/SayALot_CreateArticle`;

  if (isDebug) {
    return baseLink + "?isDebug=true";
  } else baseLink;
}

return (
  <div
    className="navbar navbar-expand-md border-bottom mb-3"
    style={{ backgroundColor: "white" }}
  >
    <div className="container-fluid">
      {brand && (
        <a
          className="navbar-brand text-decoration-none"
          href={mainPageLink}
          style={{
            width: logoRemWidth ?? "4rem",
            height: logoRemHeight ?? "4rem",
          }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: metadata.image,
              className: "w-100 h-100",
              style: {
                objectFit: "cover",
              },
              thumbnail: false,
              fallbackUrl: brand.logoHref,
              alt: brand.brandName ?? "",
            }}
          />
        </a>
      )}
      {searchInputData && (
        <div style={{ maxWidth: "10rem" }}>
          <Widget
            src="rubycop.near/widget/NDC.StyledComponents"
            props={{
              Input: {
                label: "Search",
                value: searchInputData.value,
                placeholder: "Search",
                handleChange: searchInputData.handleChange,
              },
            }}
          />
        </div>
      )}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {pills &&
            pills.map(({ id, title, widgetName }, i) =>
              !id || !title || !widgetName ? (
                <p className="text-danger">Pill passed wrong</p>
              ) : (
                <li className="nav-item">
                  <Pill
                    href={getLink(widgetName)}
                    className={`nav-link ${
                      id === currentPill
                        ? "active text-decoration-underline"
                        : "text-decoration-none"
                    } `}
                  >
                    {title}
                  </Pill>
                </li>
              )
            )}
        </ul>
      </div>
      {accountId &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
          <StylessATag href={getLink()}>
            <Widget
              src="rubycop.near/widget/NDC.StyledComponents"
              props={{
                Button: {
                  size: "big",
                  onClick: () => {},
                  text: "+ Create Article",
                  className: "primary dark",
                },
              }}
            />
          </StylessATag>
        )}
    </div>
  </div>
);
