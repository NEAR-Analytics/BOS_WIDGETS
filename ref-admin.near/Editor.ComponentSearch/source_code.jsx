const SearchInput = styled.div`
  background-color:#fff;
  display:flex;
  align-items:center;
  background: #1A2E33;
  border-radius: 10px;  
  .input-group .form-control:focus{
    box-shadow:none;
  }
  .input-group .form-control{
    border-radius:10px;
    color:#fff;
  }
  .btn-outline-secondary{
    border:none!important;
  }
`;
const SearchList = styled.div`
  background: #2D4348;
  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color:#fff;
`;
const searchIcon = (
  <svg
    style={{ marginLeft: "15px" }}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7.19239"
      cy="7.19238"
      r="5.08579"
      transform="rotate(-45 7.19239 7.19238)"
      stroke="#73818B"
      stroke-width="2"
    />
    <path
      d="M10.7891 10.7886L14.3853 14.3848"
      stroke="#73818B"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

return (
  <div>
    <SearchInput className="mb-2">
      {searchIcon}
      <Widget
        src="ref-admin.near/widget/ComponentSearch"
        props={{
          limit: 10,
          term: state.term,
          onChange: ({ result: components, term }) =>
            State.update({ components, term }),
        }}
      />
    </SearchInput>
    {state.components && state.components.length > 0 && (
      <SearchList className="mb-2">
        {state.components.map((component, i) => (
          <div key={i}>
            <Widget
              src="ref-admin.near/widget/Editor.ComponentSearch.Item"
              props={{
                accountId: component.accountId,
                widgetName: component.widgetName,
                onEmbed: () => State.update({ components: null }),
                onHide: () => State.update({ components: null }),
                extraButtons: props.extraButtons,
              }}
            />
          </div>
        ))}
      </SearchList>
    )}
  </div>
);
