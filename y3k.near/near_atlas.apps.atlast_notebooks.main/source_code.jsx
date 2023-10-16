if (context.loading) {
  return "";
}

// By default the form to post a notebook is hidden
initState({ noteBook: false });
const toggleNotebook = () => {
  State.update({ noteBook: !state.noteBook });
};

const labelFilter = props.labelFilter; // should null check, this is intended to be passed to features and filter based on amount per label
const SidebarWrapper = styled.div`
    border-right: 1px solid #ECEEF0;
  `;

return (
  <div className="container-fluid py-3 mb-5">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sidebar */}
      <div className="col-span-3 md:col-span-1">
        <div className="pb-3 border-b border-gray-300">
          <Widget
            src="y3k.near/widget/near_atlas.apps.atlast_notebooks.header"
            props={{ disabled: !context.accountId, onClick: toggleNotebook }}
          />
        </div>

        {state.noteBook && (
          <div className="mt-4 p-2">
            <Widget
              src="y3k.near/widget/near_atlas.apps.atlast_notebooks.post"
              props={{ onCommit: () => State.update({ noteBook: false }) }}
            />
          </div>
        )}

        <div className="mt-5">
          <Widget
            src="y3k.near/widget/near_atlas.apps.atlast_notebooks.features"
            props={{ admins, adminContract: adminContract, labelFilter }}
          />
        </div>
      </div>
    </div>
  </div>
);
