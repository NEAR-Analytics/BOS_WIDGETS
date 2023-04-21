if (context.loading) {
  return "Loading";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  State.update({ askQuestion: !state.askQuestion });
};

const adminContract = "admin.dev-support.near";
const admins = Near.view(adminContract, "get_admins", {});

// const sortByCategories = ["Newest", "Popular"];
// const filterByTopic = ["one", "two", "three"];

const SidebarWrapper = styled.div`
  border-right: 1px solid #ECEEF0;
`;

return (
  <div class="container-fluid py-3 mb-5">
    <div class="row">
      {/**
    <SidebarWrapper className="col-2 pe-5">
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Main.Sidebar"
          props={{ categories: sortByCategories, topics: filterByTopic }}
        />
      </SidebarWrapper>
    */}

      <div class="col-12">
        <div class="pb-3 border-bottom">
          <Widget
            src="dev-support.near/widget/DevSupport.Discussion.Title"
            props={{ disabled: !context.accountId, onClick: toggleQuestion }}
          />
        </div>
        <div class="mt-5 mb-3">
          {state.askQuestion && (
            <Widget src="dima_sheleg.near/widget/DevSupport.Question.Edit" />
          )}
        </div>
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Feed"
          props={{ admins, adminContract: adminContract }}
        />
      </div>
    </div>
  </div>
);
