const communityId = props.communityId ?? context.accountId;
const profile = Social.get(`${communityId}/profile/**`);

const tags = Object.keys(profile.tags);

const Div = styled.div`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  transition: box-shadow 0.6s;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
`;

const Link = styled.a`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  transition: box-shadow 0.6s;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
`;

const Logo = styled.img`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  transition: box-shadow 0.6s;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
`;

const CommunityCard = ({
  format,
  isBannerEnabled,
  metadata,
  ...otherProps
}) => {
  const renderFormat =
    format === "small" || format === "medium" ? format : "small";

  const formatSmall = (
    <Link
      {...otherProps}
      className={[
        "d-flex flex-shrink-0 p-3",
        "rounded-4 border border-2",
        "text-black text-decoration-none",
      ].join(" ")}
      style={{
        background:
          isBannerEnabled ?? false
            ? `center / cover no-repeat url(${profile.backgroundImage})`
            : "#ffffff",

        width: 400,
        height: 120,
      }}
    >
      <div
        className="d-flex align-items-center gap-3 rounded-4 w-100 h-100"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{ image: profile.image }}
        />

        <div className="d-flex flex-column justify-content-center w-100">
          <h5
            className="h5 m-0 text-nowrap overflow-hidden"
            style={{ textOverflow: "ellipsis" }}
          >
            {profile.name}
          </h5>
          {tags.length > 0 && (
            <div>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="me-1 mt-1 mb-1 fw-light badge border border-secondary text-bg-light"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  const formatMedium = (
    <Link
      className="card d-flex flex-column flex-shrink-0 text-decoration-none text-reset"
      style={{ width: "23%", maxWidth: 304 }}
    >
      <div
        className="card-img-top w-100"
        style={{
          background: `center / cover no-repeat url(${metadata.banner_url})`,
          height: 164,
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

return <>{CommunityCard(props)}</>;
