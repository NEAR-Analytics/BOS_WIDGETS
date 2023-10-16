if (context.loading) {
  return "";
}

// By default the form to ask a question is hidden
initState({ noteBook: false });
const toggleNotebook = () => {
  State.update({ noteBook: !state.noteBook });
};

const labelFilter = props.labelFilter; // should null check, this is intended to be passed to features and filter based on amount per label
const SidebarWrapper = styled.div`
    border-right: 1px solid #ECEEF0;
  `;

return (
  <div class="container-fluid py-3 mb-5">
    <div class="row">
      {/* Sidebar */}

      <div class="col-12">
        <div class="pb-3 border-bottom">
          <Widget
            src="y3k.near/widget/near_atlas.apps.atlast_notebooks.header"
            props={{ disabled: !context.accountId, onClick: toggleNotebook }}
          />
        </div>

        {state.noteBook && (
          <div class="mt-4 p-2">
            <Widget
              src="y3k.near/widget/near_atlas.apps.atlast_notebooks.post"
              props={{ onCommit: () => State.update({ noteBook: false }) }}
            />
          </div>
        )}

        <div class="mt-5">
          <Widget
            src="y3k.near/widget/near_atlas.apps.atlast_notebooks.features"
            props={{ admins, adminContract: adminContract, labelFilter }}
          />
        </div>
      </div>
    </div>
  </div>
);
