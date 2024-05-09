const { Sidebar, Content, editData, onSubmit, BlogPostSettings } = props;

// Selected Item is the property "parameters" of the community addon (blog)
const [selectedItem, setSelectedItem] = useState(editData);
const [showEditor, setShowEditor] = useState(false);
const [showBlogPostSettings, setBlogPostSettings] = useState(false);

const handleItemClick = (item) => {
  if (item) {
    setSelectedItem(item);
    setShowEditor(true);
  } else {
    setSelectedItem(null);
  }
};

const goBack = () => {
  setSelectedItem(null);
  setShowEditor(false);
};

// TODO Move to layout
const openBlogPostSettings = () => {
  // TODO 599
  setBlogPostSettings(true);
};

const saveBlogPostSettings = () => {
  // TODO 599 move to provider
  console.log("Implement saving blog settings issue 599");
};

const handlePublish = (status) => {
  onSubmit &&
    onSubmit(
      {
        id: data.id || undefined,
        title,
        subtitle,
        description,
        date,
        status,
        content,
        author,
        category,
        community: handle, // TODO remove this?
      },
      data.id !== undefined
    );
};

const openAnalytics = () => {
  window.open("https://eu.posthog.com/project/20896", "_blank");
};

return (
  <div style={{ width: "100%", height: "100%" }}>
    {showBlogPostSettings ? (
      <div>
        {/* TODO move this to BlogPostSettings */}
        <div className="d-flex gap-1 align-items-end justify-content-end">
          <button
            className="btn btn-light"
            onClick={() => setBlogPostSettings(false)}
          >
            Cancel
          </button>
          <Widget
            src={"thomasguntenaar.near/widget/devhub.components.molecule.BlogControl"}
            props={{
              title: "Save Settings",
              onClick: saveBlogPostSettings,
            }}
          />
        </div>
        <BlogPostSettings />
      </div>
    ) : (
      <>
        {showEditor ? null : (
          <div className="d-flex gap-1 align-items-end justify-content-end w-100 mb-4">
            {/* TODO PETER <input type="text" placeholder="Search blog posts" />
            <button className="btn btn-secondary">Filter</button>
            END PETER */}
            <button className="btn btn-light" onClick={openAnalytics}>
              Analytics
            </button>
            <button className="btn btn-light" onClick={openBlogPostSettings}>
              Settings
            </button>
            <Widget
              src={
                "thomasguntenaar.near/widget/devhub.components.molecule.BlogControl"
              }
              props={{
                title: "New Blog Post",
                onClick: () => {
                  handleItemClick("new");
                  setShowEditor(true);
                },
              }}
            />
          </div>
        )}
        <div
          className="template"
          style={{ display: "flex", width: "100%", height: "100%" }}
        >
          <div
            className="left-panel"
            style={{
              width: showEditor ? "20%" : "100%",
            }}
          >
            <Sidebar
              selectedItem={selectedItem}
              handleItemClick={handleItemClick}
              hideColumns={showEditor}
            />
          </div>
          {showEditor && (
            <div
              className="right-panel"
              style={{ flex: 1, width: 0, overflow: "scroll" }}
              key={selectedItem.id}
            >
              <Content data={selectedItem} onCancel={goBack} />
            </div>
          )}
        </div>
      </>
    )}
  </div>
);
