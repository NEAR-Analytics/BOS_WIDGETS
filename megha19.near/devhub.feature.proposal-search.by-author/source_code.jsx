const [authorsOptions, setAuthorsOptions] = useState([]);
const [selectedAuthor, setSelectedAuthor] = useState(null);

if (!authorsOptions.length) {
  const data = [];
  const authors = Near.view("truedove38.near", "get_all_proposal_authors", {});

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
      src="megha19.near/widget/devhub.components.molecule.DropDown"
      props={{
        options: authorsOptions,
        label: "Author",
        onUpdate: (v) => {
          setSelectedAuthor(v);
        },
      }}
    />
  </div>
);
