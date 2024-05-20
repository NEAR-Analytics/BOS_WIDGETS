const { Card } =
  VM.require("thomasguntenaar.near/widget/devhub.entity.addon.blogv2.Card") ||
  (() => <></>);
const { Page } =
  VM.require("thomasguntenaar.near/widget/devhub.entity.addon.blogv2.Page") ||
  (() => <></>);
const { href } = VM.require("thomasguntenaar.near/widget/core.lib.url") || (() => {});

const categories = [
  {
    label: "Guide",
    value: "guide",
  },
  {
    label: "News",
    value: "news",
  },
  {
    label: "Reference",
    value: "reference",
  },
];

const selectOptions = useMemo(
  () =>
    categories.map((it) => ({
      label: it.label,
      value: it.value,
    })),
  [categories]
);

const Banner = styled.div`
  border-radius: var(--bs-border-radius-xl) !important;
  height: 100%;

  & > div :not(.btn) {
    position: absolute;
    display: none;
    margin: 0 !important;
    width: 0 !important;
    height: 0 !important;
  }

  .btn {
    padding: 0.5rem 0.75rem !important;
    min-height: 32;
    line-height: 1;

    border: none;
    border-radius: 50px;
    --bs-btn-color: #ffffff;
    --bs-btn-bg: #087990;
    --bs-btn-border-color: #087990;
    --bs-btn-hover-color: #ffffff;
    --bs-btn-hover-bg: #055160;
    --bs-btn-hover-border-color: #055160;
    --bs-btn-focus-shadow-rgb: 49, 132, 253;
    --bs-btn-active-color: #ffffff;
    --bs-btn-active-bg: #055160;
    --bs-btn-active-border-color: #055160;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;

const DropdownBtnContainer = styled.div`
  font-size: 13px;
  min-width: 150px;

  .custom-select {
    position: relative;
  }

  .select-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius-top: 5px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
  }

  .no-border {
    border: none !important;
  }

  .options-card {
    position: absolute;
    top: 100%;
    right: 0;
    width: 200%;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 0.5rem;
    z-index: 99;
    font-size: 13px;
    border-radius:0.375rem !important;
  }

  .left {
    right: 0 !important;
    left: auto !important;
  }

  @media screen and (max-width: 768px) {
    .options-card {
      right: 0 !important;
      left: auto !important;
    }
  }

  .option {
    margin-block: 5px;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.3s ease;
    border-radius: 0.375rem !important;
  }

  .option:hover {
    background-color: #f0f0f0; /* Custom hover effect color */
  }

  .option:last-child {
    border-bottom: none;
  }

  .selected {
    background-color: #f0f0f0;
  }

  .disabled {
    background-color: #f4f4f4 !important;
    cursor: not-allowed !important;
    font-weight: 500;
    color: #b3b3b3;
  }

  .disabled .circle {
    opacity: 0.5;
  }

  .circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .grey {
    background-color: rgba(129, 129, 129, 0.5);
  }

  .green {
    background-color: #00ec97;
  }

  a:hover {
    text-decoration: none;
  }

}
`;

const {
  data,
  handle,
  onSubmit,
  onCancel,
  onDelete,
  allBlogs: allBlogsOfThisInstance,
  communityAddonId,
} = props;

const allBlogKeys =
  Social.keys(`${handle}.community.devhub.near/blog/*`, "final") || {};

const initialData = data;

const [initialBlogAmount, setInitialBlogAmount] = useState(
  Object.keys(allBlogKeys[`${handle}.community.devhub.near`]["blog"] || {})
    .length || 0
);

// Parse the date string to create a Date object
const publishedAtDate = new Date(initialData.publishedAt || new Date());
const year = publishedAtDate.getFullYear();
const month = (publishedAtDate.getMonth() + 1).toString().padStart(2, "0");
const day = publishedAtDate.getDate().toString().padStart(2, "0");
const initialFormattedDate = year + "-" + month + "-" + day;

const [content, setContent] = useState(initialData.content || "");
const [title, setTitle] = useState(initialData.title || "");
const [subtitle, setSubtitle] = useState(initialData.subtitle || "");
const [description, setDescription] = useState(initialData.description || "");
const [author, setAuthor] = useState(initialData.author || context.accountId);
const [previewMode, setPreviewMode] = useState("edit"); // "edit" or "card" or "page"
const [date, setDate] = useState(initialFormattedDate || new Date());
const [category, setCategory] = useState(initialData.category || "guide");
const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false);
const [isDraftBtnOpen, setDraftBtnOpen] = useState(false);
const [selectedStatus, setSelectedStatus] = useState(
  initialData.status || "DRAFT"
);

// Dont ask me again check when deleting
const [submittedBlogDeleted, setSubmittedBlogDeleted] = useState(null);
useEffect(() => {
  const checkForDeletedBlogInSocialDB = () => {
    const communityAccount = `${handle}.community.devhub.near`;
    Near.asyncView("social.near", "get", {
      keys: [`${communityAccount}/blog/**`],
      options: {
        return_deleted: true,
      },
    }).then((result) => {
      try {
        if (
          JSON.parse(result[communityAccount].blog[submittedBlogDeleted]) ===
          null
        ) {
          // Blog is deleted
          setSubmittedBlogDeleted(null);
        }
      } catch (e) {}
      setTimeout(() => checkForDeletedBlogInSocialDB(), 1000);
    });
  };
  if (submittedBlogDeleted) {
    checkForDeletedBlogInSocialDB();
  }
}, [submittedBlogDeleted]);

// Dont ask me again check when updating and creating blogs
const [submittedBlogData, setSubmittedBlogData] = useState(null);
useEffect(() => {
  const checkForNewOrUpdatedBlogInSocialDB = () => {
    const communityAccount = `${handle}.community.devhub.near`;
    Near.asyncView("social.near", "get", {
      keys: [`${communityAccount}/blog/**`],
    }).then((result) => {
      try {
        if (initialData.id) {
          // Update
          const updatedBlog =
            result[communityAccount]["blog"][initialData.id].metadata;
          updatedBlog.content =
            result[communityAccount]["blog"][initialData.id][""];

          let theyMatch = true;
          let keys = Object.keys(submittedBlogData);
          for (const key of keys) {
            // Get the full data of the new blog and compare it to socialDB
            if (updatedBlog[key] !== submittedBlogData[key]) {
              theyMatch = false;
              break;
            }
          }
          if (theyMatch) {
            setSubmittedBlogData(null);
          }
        } else {
          // Create
          let blogArray = Object.keys(result).map(
            (blogKey) => result[communityAccount]["blog"][blogKey]
          );

          if (
            blogArray.length &&
            blogArray.find(
              (blog) =>
                blog.metadata.title === submittedBlogData.title &&
                blog.metadata.description === submittedBlogData.description
            )
          ) {
            setSubmittedBlogData(null);
          }
        }
      } catch (e) {
        console.log("Error in useEffect checkForNewOrUpdatedBlogInSocialDB", e);
      }
      setTimeout(() => checkForNewOrUpdatedBlogInSocialDB(), 1000);
    });
  };
  if (submittedBlogData) {
    checkForNewOrUpdatedBlogInSocialDB();
  }
}, [submittedBlogData]);

const LoadingButtonSpinner = (
  <span
    class="submit-blog-loading-indicator spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>
);

const SubmitBtn = () => {
  const btnOptions = [
    {
      iconColor: "grey",
      label: "Save Draft",
      description:
        "The author can still edit the blog before sharing it with the community.",
      value: "DRAFT",
    },
    {
      iconColor: "bg-devhub-green",
      label: "Publish",
      description:
        "The blog will be shared with the community and can be viewed by everyone.",
      value: "PUBLISH",
    },
  ];

  const handleOptionClick = (option) => {
    setDraftBtnOpen(false);
    setSelectedStatus(option.value);
    setSubmittedBlogData(null);
  };

  const toggleDropdown = () => {
    setDraftBtnOpen(!isDraftBtnOpen);
    setSubmittedBlogData(null);
  };

  const handleSubmit = () => {
    // Set the title for dont ask me again check
    setSubmittedBlogData({
      title,
      subtitle,
      description,
      author,
      date,
      content,
      category,
      community: handle,
      publishedAt,
      status: selectedStatus,
    });
    handlePublish(selectedStatus);
  };

  const selectedOption = btnOptions.find((i) => i.value === selectedStatus);

  return (
    <DropdownBtnContainer>
      <div
        className="custom-select shadow-sm"
        tabIndex="0"
        onBlur={() => setDraftBtnOpen(false)}
      >
        <div
          data-testid="parent-submit-blog-button"
          className={`select-header d-flex gap-1 align-items-center submit-draft-button ${
            shouldBeDisabled() ? "disabled" : ""
          }`}
        >
          <div
            onClick={() => !shouldBeDisabled() && handleSubmit()}
            className="py-2.5 px-2 d-flex gap-2 align-items-center "
            data-testid="submit-blog-button"
          >
            {submittedBlogData ? (
              LoadingButtonSpinner
            ) : (
              <div className={"circle " + selectedOption.iconColor}></div>
            )}
            <div className={`selected-option`}>{selectedOption.label}</div>
          </div>
          <div
            className="h-100 py-2.5 px-2"
            style={{ borderLeft: "1px solid #ccc" }}
            onClick={toggleDropdown}
          >
            <i
              data-testid="toggle-dropdown"
              class={`bi bi-chevron-${isDraftBtnOpen ? "up" : "down"}`}
            ></i>
          </div>
        </div>

        {isDraftBtnOpen && (
          <div className="options-card">
            {btnOptions.map((option) => (
              <div
                key={option.value}
                className={`option ${
                  selectedOption.value === option.value ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
                data-testid={"submit-button-option-" + option.value}
              >
                <div className={`d-flex gap-2 align-items-center`}>
                  <div className={"circle " + option.iconColor}></div>
                  <div className="fw-bold">{option.label}</div>
                </div>
                <div className="text-muted text-xs">{option.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DropdownBtnContainer>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: left;
`;

// TODO do the test still succeed
const shouldBeDisabled = () => {
  return hasEmptyFields() || submittedBlogData;
};

const hasEmptyFields = () => {
  return (
    content.trim() === "" ||
    title.trim() === "" ||
    subtitle.trim() === "" ||
    description.trim() === "" ||
    author.trim() === "" ||
    date === "NaN-NaN-NaN" ||
    category.trim() === ""
  );
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
        content,
        status,
        author,
        category,
        community: handle,
      },
      data.id !== undefined
    );
};

function handleDelete() {
  setSubmittedBlogDeleted(initialData.id);
  onDelete(data.id);
}

function Preview() {
  switch (previewMode) {
    case "card": {
      return (
        <Card
          data={{
            title,
            subtitle,
            description,
            publishedAt: date,
            content,
            author,
            category,
            community: handle,
          }}
        />
      );
    }
    case "page": {
      return (
        <Page
          data={{
            title,
            subtitle,
            description,
            publishedAt: date,
            content,
            author,
            category,
            community: handle,
          }}
        />
      );
    }
  }
}

const tabs = [
  { name: "Edit", value: "edit" },
  { name: "Preview Card", value: "card" },
  { name: "Preview Page", value: "page" },
];

return (
  <Container>
    <div className="flex flex-wrap-reverse gap-1 justify-between w-100 mb-4">
      <div className="sm:hidden grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label
          htmlFor="tabs"
          className="sr-only block text-xs font-medium text-gray-900"
        >
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-9 border-gray-300 block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          defaultValue={tabs.find((tab) => tab.value === previewMode).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name} onClick={() => setPreviewMode(tab.value)}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="-mb-px flex gap-x-3 px-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              onClick={() => setPreviewMode(tab.value)}
              className={`rounded-md px-3.5 py-2.5 text-sm cursor-pointer font-semibold text-devhub-green hover:text-green shadow-sm hover:bg-devhub-green-transparent whitespace-nowrap overflow-hidden truncate ${
                tab.value === previewMode
                  ? " bg-devhub-green text-white"
                  : " bg-devhub-green-light text-devhub-green"
              }`}
              aria-current={tab.value === previewMode ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
        </div>
      </div>
      <div className="flex gap-x-3 px-4">
        <p className="text-nowrap py-2.5 px-1">
          Status:{" "}
          <span className="text-amber-500">
            {initialData.status === "PUBLISH" ? (
              <Link
                to={href({
                  widgetSrc: "thomasguntenaar.near/widget/app",
                  params: {
                    page: "blogv2",
                    id: initialData.id,
                    community: handle,
                    communityAddonId,
                  },
                })}
                target="_blank"
                className="cursor-pointer underline"
              >
                Published
              </Link>
            ) : (
              <>Draft</>
            )}
          </span>
        </p>
        <button
          className={`rounded-md px-3.5 py-2.5 text-sm cursor-pointer font-semibold text-devhub-green hover:text-green shadow-sm hover:bg-devhub-green-transparent bg-devhub-green-light text-devhub-green`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <SubmitBtn />
      </div>
    </div>

    <div>
      {previewMode === "edit" && (
        <div className="tab-pane show active p-4" id="edit">
          <Widget
            src="thomasguntenaar.near/widget/devhub.entity.addon.blogv2.editor.form"
            props={{
              title,
              setTitle,
              subtitle,
              setSubtitle,
              options: selectOptions,
              category,
              setCategory,
              description,
              setDescription,
              author,
              setAuthor,
              date,
              setDate,
              content,
              setContent,
            }}
          />
          {/* Show delete button */}
          {data.id ? (
            <div
              className={
                "d-flex align-items-center justify-content-start gap-3 mt-4"
              }
              data-testid="delete-blog-button"
            >
              <Widget
                src="thomasguntenaar.near/widget/devhub.entity.addon.blogv2.editor.DeleteButton"
                props={{
                  onDelete: handleDelete,
                  disabled: submittedBlogDeleted,
                }}
              />
            </div>
          ) : null}
        </div>
      )}
      {(previewMode === "page" || previewMode === "card") && (
        <div
          className="w-100 h-100 p-4"
          id="preview"
          style={{ position: "relative" }}
        >
          <Preview />
        </div>
      )}
    </div>
  </Container>
);
