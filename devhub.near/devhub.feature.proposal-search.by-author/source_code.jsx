const [authorsOptions, setAuthorsOptions] = useState([]);
const [selectedAuthor, setSelectedAuthor] = useState(null);

if (!authorsOptions.length) {
  const data = [{ label: "None", value: "" }];
  const authors = Near.view(
    "devhub.near",
    "get_all_proposal_authors",
    {}
  );

  if (Array.isArray(authors)) {
    for (const author of authors) {
      data.push({ label: author, value: author });
    }
    setAuthorsOptions(data);
  }
}

return (
  <div>
    <Widget
      src="devhub.near/widget/devhub.components.molecule.DropDown"
      props={{
        options: authorsOptions,
        label: "Author",
        onUpdate: (v) => {
          setSelectedAuthor(v);
          props.onAuthorChange(v);
        },
        selectedValue: props.author,
      }}
    />
  </div>
);
