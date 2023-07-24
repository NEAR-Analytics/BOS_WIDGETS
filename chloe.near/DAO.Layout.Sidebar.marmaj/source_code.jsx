const daoId = props.daoId ?? "marmaj.sputnik-dao.near";
const profile = daoId ? Social.get(`${daoId}/profile/**`, "final") : {};

const Sidebar = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;

  @media (max-width: 1024px) {
    margin-top: -40px;
  }
`;

return (
  <Sidebar>
    <Widget
      src="chloe.near/widget/DAO.Page.Sidebar.marmaj"
      props={{
        daoId,
        profile,
      }}
    />
  </Sidebar>
);
