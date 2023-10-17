if (context.loading) {
  return "";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  State.update({ askQuestion: !state.askQuestion });
};

// const sortByCategories = ["Newest", "Popular"];
// const filterByTopic = ["one", "two", "three"];

const labelFilter = props.labelFilter; // should null check, this is intended to be passed to features and filter based on amount per label
const SidebarWrapper = styled.div`
    border-right: 1px solid #ECEEF0;
  `;

return (
  <div class="container-fluid py-3 mb-5">
    <div class="row">
      <div class="col-12">
        <div class="pb-3 border-bottom">
          <Widget
            src="y3k.near/widget/apps.ama.header"
            props={{ disabled: !context.accountId, onClick: toggleQuestion }}
          />
        </div>

        {state.askQuestion && (
          <div class="mt-4 p-2">
            <Widget
              src="y3k.near/widget/apps.ama.post"
              props={{ onCommit: () => State.update({ askQuestion: false }) }}
            />
          </div>
        )}

        <div class="mt-5">
          <Widget
            src="y3k.near/widget/apps.ama.features"
            props={{ admins, adminContract: adminContract, labelFilter }}
          />
        </div>
      </div>
    </div>
  </div>
);
