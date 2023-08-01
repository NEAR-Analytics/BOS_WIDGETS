const {
  stateUpdate,
  brand,
  pills,
  navigationButtons,
  isTest,
  displayedTabId,
  writersWhiteList,
} = props;

/*
======================================================PILLS EXAMPLE====================================================
    *Note: the first pill allways has to be the first one displayed*
    pills: [{
        id: number,
        title: string,
    }]    
============(When modified to be web app we should delete action to replace it with a propper State.update)============

======================================================BRAND EXAMPLE====================================================
    brand: {
        homePageId: number,
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
  !stateUpdate ||
  (!displayedTabId && !(displayedTabId == 0)) ||
  !pills ||
  (brand &&
    (!brand.logoHref || (!brand.homePageId && !(brand.homePageId == 0))))
) {
  const crucialPropMissingMsg = "The following crucial props are missing:";
  return (
    <div>
      <h3 className="text-danger">{crucialPropMissingMsg}</h3>
      <ul>
        {!stateUpdate && <li className="text-danger">stateUpdate</li>}

        {!displayedTabId && <li className="text-danger">displayedTabId</li>}

        {!pills && <li className="text-danger">pills</li>}

        {brand && !brand.logoHref && (
          <li className="text-danger">brand.logoHref</li>
        )}

        {brand && !brand.homePageId && !(brand.homePageId == 0) && (
          <li className="text-danger">brand.homePageId</li>
        )}
      </ul>
    </div>
  );
}

const accountId = context.accountId;

//============================================Styled components==================================================
const BrandLogoContainer = styled.div`
    width: ${logoRemWidth ?? "4rem"};
    height: ${logoRemHeight ?? "4rem"};
    cursor: pointer;
`;

const Pill = styled.div`
    font-family: system-ui;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 24px;
    color: black;
    cursor: pointer;

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

//=================================================Components====================================================

const renderButton = (button) => {
  return (
    <Widget
      src="rubycop.near/widget/NDC.StyledComponents"
      props={{
        Button: {
          size: "big",
          onClick: () => {
            stateUpdate({ displayedTabId: button.id });
          },
          text: button.title,
          className: "primary dark",
        },
      }}
    />
  );
};
//==============================================End components===================================================

//==================================================FUNCTIONS====================================================

function getLink(widgetName) {
  let baseLink = widgetName
    ? `#/${authorForWidget}/widget/${widgetName}`
    : `#/${authorForWidget}/widget/SayALot_CreateArticle`;

  if (isTest) {
    return baseLink + "?isTest=true";
  } else baseLink;
}

function handleArticlesListNavigation(filterBy) {
  () => stateUpdate({ displayedTabId: brand.homePageId, listBy: filterBy });
}

//================================================END FUNCTIONS===================================================
console.log(
  1,
  navigationButtons &&
    accountId &&
    writersWhiteList &&
    writersWhiteList.some((whiteAddr) => whiteAddr === accountId)
);
return (
  <div className="navbar navbar-expand-md border-bottom mb-3">
    <div className="container-fluid">
      {brand && (
        <BrandLogoContainer
          className="navbar-brand text-decoration-none"
          onClick={handleArticlesListNavigation(navigationPills[0].title)}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              // image: metadata.image,
              className: "w-100 h-100",
              style: {
                objectFit: "cover",
              },
              thumbnail: false,
              fallbackUrl: brand.logoHref,
              alt: brand.brandName ?? "",
            }}
          />
        </BrandLogoContainer>
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
            pills.map((pill) => {
              return (!pill.id && !(pill.id == 0)) || !pill.title ? (
                <p className="text-danger border">Pill passed wrong</p>
              ) : (
                <li className="nav-item">
                  <Pill
                    onClick={handleArticlesListNavigation(pill.title)}
                    className={`nav-link ${
                      id === displayedTabId
                        ? "active text-decoration-underline"
                        : "text-decoration-none"
                    } `}
                  >
                    {pill.title}
                  </Pill>
                </li>
              );
            })}
          {navigationButtons &&
            accountId &&
            writersWhiteList &&
            writersWhiteList.some((whiteAddr) => whiteAddr === accountId) &&
            navigationButtons.map((button) => {
              return (!button.id && !(button.id == 0)) || !button.title ? (
                <p className="text-danger border">Button passed wrong</p>
              ) : (
                <div className="d-block d-md-none">{renderButton(button)}</div>
              );
            })}
        </ul>
      </div>
      {navigationButtons &&
        accountId &&
        writersWhiteList &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) &&
        navigationButtons.map((button) => {
          return (!button.id && !(button.id == 0)) || !button.title ? (
            <p className="text-danger border">Button passed wrong</p>
          ) : (
            <div className="d-none d-md-block">{renderButton(button)}</div>
          );
        })}
    </div>
  </div>
);
