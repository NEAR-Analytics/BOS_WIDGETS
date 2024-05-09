/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const onSearchAuthor = props.onSearchAuthor;
const selectedAuthors = props.authorQuery?.author
  ? [{ name: props.authorQuery.author }]
  : [];

const authors = Near.view(nearDevGovGigsContractAccountId, "get_all_authors");
if (!authors) {
  return <div>Loading ...</div>;
}
const wrappedAuthors = authors.map((author) => ({ name: author }));

const onChangeAuthor = (selectedAuthors) => {
  onSearchAuthor(selectedAuthors[0]?.name);
};

function customMenu(results, menuProps, menuState) {
  // return (

  // );

  return (
    <div
      aria-label="menu-options"
      class="rbt-menu dropdown-menu show"
      role="listbox"
      data-popper-reference-hidden="false"
      data-popper-escaped="false"
      data-popper-placement="bottom-start"
    >
      {results.map((result, idx) => (
        <a
          aria-label={result.name}
          aria-selected="false"
          id={`basic-typeahead-single-item-${idx}`}
          role="option"
          class="dropdown-item"
          href="#"
        >
          {result.name}
        </a>
      ))}
    </div>
  );
}

return (
  <>
    <Typeahead
      clearButton
      className="bg-light border border-light"
      style={{ width: "10rem" }}
      id="basic-typeahead-single"
      labelKey="name"
      onChange={onChangeAuthor}
      options={wrappedAuthors}
      placeholder="Search by author"
      selected={selectedAuthors}
    />
  </>
);
