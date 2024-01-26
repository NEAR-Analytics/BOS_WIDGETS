const { formState, hasPermission, daoId } = props;

const [policyState, setPolicyState] = useState(formState);
const [selectedTab, setSelectedTab] = useState("Groups");

const handleProposal = () => {
  const deposit = formState.policy.proposal_bond;
  const gas = 200000000000000;

  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "Update policy",
          kind: {
            ChangePolicy: policyState
          }
        }
      },
      gas: gas,
      deposit: deposit
    }
  ]);
};

const Footer = () => {
  return (
    <div className="d-flex justify-content-end mt-4">
      <Widget
        src="nearui.near/widget/Input.Button"
        props={{
          children: (
            <>
              <i class="bi bi-check-lg"></i> Propose changes
            </>
          ),
          variant: "info " + (!hasPermission && "disabled"),
          size: "lg",
          onClick: () => handleProposal(),
          buttonProps: {
            type: "submit"
          }
        }}
      />
    </div>
  );
};

const tabs = {
  Groups: {
    name: "Groups",
    component: (
      <Widget
        src={`megha19.near/widget/CreateDAO.Step4`}
        props={{
          formState: policyState,
          updateParentState: (data) => setPolicyState(data),
          isConfigScreen: true,
          renderFooter: (data) => <></>
        }}
      />
    )
  },
  Permissions: {
    name: "Proposal and Voting Permissions",
    component: (
      <Widget
        src={`megha19.near/widget/CreateDAO.Step5`}
        props={{
          formState: policyState,
          updateParentState: (data) => setPolicyState(data),
          renderFooter: (data) => <></>
        }}
      />
    )
  }
};

const tabContent = tabs[selectedTab].component;

return (
  <div style={{ marginTop: 30 }}>
    <Widget
      src={`megha19.near/widget/DAO.Layout.Tabs`}
      props={{
        tabs: tabs,
        tab: selectedTab,
        update: (state) => setSelectedTab(state.tab),
        allowHref: false
      }}
    />
    <div style={{ marginTop: "-25px" }}>{tabContent}</div>
    <Footer />
  </div>
);
