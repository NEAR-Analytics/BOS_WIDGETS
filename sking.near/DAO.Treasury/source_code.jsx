const WIDGET_AUTHOR = "sking.near";
const daoId = props.daoId ?? "multi.sputnik-daos.near";
const proposalsPerPage = props.proposalsPerPage ?? 10; // Number of proposals to fetch at a time

State.init({
  daoId,
  selectedTab: "assets", // assets | transfers
});

const loadTransactions = () => {};

const onChangeDAO = (newDaoId) => {
  State.update({
    daoId: newDaoId,
    selectedTab: "assets",
  });
};

const onChangeTab = (newTab) => {
  State.update({
    ...state,
    selectedTab: newTab,
  });
};

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 28px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 26px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

return (
  <>
    <div>
      {!props.daoId && (
        <div className="mb-2">
          <p className="m-1">Sputnik Contract ID:</p>
          <input
            type="text"
            placeholder="example.sputnik-daos.near"
            onChange={(e) => onChangeDAO(e.target.value)}
          />
        </div>
      )}

      <Tabs>
        <h3 className="me-auto">Treasury</h3>
        <TabsButton
          onClick={() => onChangeTab("assets")}
          selected={state.selectedTab === "assets"}
        >
          Assets
        </TabsButton>
        <TabsButton
          onClick={() => onChangeTab("transfers")}
          selected={state.selectedTab === "transfers"}
        >
          Transfers
        </TabsButton>
      </Tabs>

      {state.selectedTab === "assets" && (
        <Widget src="sking.near/widget/DAO.Treasury.Assets" props={{ daoId }} />
      )}

      {state.selectedTab === "transfers" && (
        <Widget
          src="sking.near/widget/DAO.Treasury.Transfers"
          props={{ daoId }}
        />
      )}
    </div>
  </>
);
