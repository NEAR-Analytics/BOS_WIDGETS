const { href } = VM.require("megha19.near/widget/core.lib.url");

if (!href) {
  return <></>;
}

const Card = styled.div`
  cursor: pointer;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  gap: 1rem;
  height: 100%;
  min-height: 12rem;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 300ms;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  img.logo {
    height: 6rem;
    width: 6rem;
    border-radius: 50%;

    object-fit: cover;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const CommunityCard = ({ metadata }) => {
  const { handle, logo_url, name, description } = metadata;
  const link = href({
    widgetSrc: "megha19.near/widget/app",
    params: { page: "community", handle: handle },
  });

  const CommunityName = styled.h5`
    color: #151515;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 41.667% */
  `;

  const CommunityDataContainer = styled.div`
    max-width: 60%;
    @media screen and (max-width: 576px) {
      max-width: 90%;
    }
  `;

  const CommunityDescription = styled.p`
    color: #818181;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 28.8px */
  `;

  const Logo = styled.img`
    width: 8rem;
    height: 8rem;
    object-fit: cover;

    @media screen and (max-width: 992px) {
      width: 4rem;
      height: 4rem;
    }

    @media screen and (min-width: 992px) and (max-width: 1200px) {
      width: 6rem;
      height: 6rem;
    }
  `;

  const formatSmall = (
    <Link
      {...otherProps}
      to={link}
      className={[
        "d-flex p-0 p-lg-3",
        "rounded-2 border border-2",
        "text-black text-decoration-none attractable flex-grow-1 h-100",
      ].join(" ")}
      style={{
        background: isBannerEnabled
          ? `center / cover no-repeat url(${metadata.banner_url})`
          : "#ffffff",
      }}
    >
      <div
        className="d-flex align-items-center gap-3 rounded-4 w-100 h-100"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(4px)",
          padding: "3rem 1rem",
        }}
      >
        <Logo
          alt="Community logo"
          className="flex-shrink-0 rounded-circle attractable"
          src={metadata.logo_url}
        />

        <CommunityDataContainer className="d-flex flex-column justify-content-center gap-1 w-100">
          <CommunityName
            style={{ textOverflow: "ellipsis", wordWrap: "break-word" }}
          >
            {metadata.name}
          </CommunityName>

          <CommunityDescription
            style={{ textOverflow: "ellipsis", wordWrap: "break-word" }}
          >
            {metadata.description}
          </CommunityDescription>
        </CommunityDataContainer>
      </div>
    </Link>
  );

  const formatMedium = (
    <Link
      className="card d-flex flex-column flex-shrink-0 text-decoration-none text-reset attractable h-100"
      to={link}
      style={{ width: "23%", maxWidth: 304 }}
    >
      <div
        className="card-img-top w-100"
        style={{
          background: `center / cover no-repeat url(${metadata.banner_url})`,
        }}
      />

      <div className="d-flex flex-column gap-2 p-3 card-text">
        <h5 class="h5 m-0">{metadata.name}</h5>
        <span class="text-secondary text-wrap">{metadata.description}</span>
      </div>
    </Link>
  );

  return {
    small: formatSmall,
    medium: formatMedium,
  }[renderFormat];
};

return CommunityCard(props);
