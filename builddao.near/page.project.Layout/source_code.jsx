const { Metadata } = VM.require(
  "builddao.near/widget/page.project.Metadata"
) || {
  Metadata: () => <></>,
};
const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};
const Layout = ({ projectAccountId, profile, children, project, tab }) => {
  const { title } = project;
  if (!projectAccountId) {
    return <p className="fw-bold text-white">No Account ID</p>;
  }
  return (
    <>
      <div className="my-3 w-100">
        <Link
          style={{ textDecoration: "none" }}
          to={href({
            widgetSrc: "builddao.near/widget/Index",
            params: {
              page: "projects",
            },
          })}
        >
          <span className="text-white">
            <i className="bi bi-chevron-left"></i> Back to Projects
          </span>
        </Link>
      </div>
      <Metadata
        title={title}
        profile={profile}
        projectAccountId={projectAccountId}
      />
      <h5
        style={{
          textTransform: "capitalize",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        className="text-white py-2"
      >
        {tab}
      </h5>
      <div
        className="tab-content"
        style={{ marginTop: 8 }}
        id="pills-tabContent"
      >
        <div
          className="tab-pane fade show active"
          id="pills-overview"
          role="tabpanel"
          aria-labelledby="pills-overview-tab"
        >
          {children}
        </div>
      </div>
    </>
  );
};
return { Layout };
