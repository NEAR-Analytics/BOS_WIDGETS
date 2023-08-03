const role = props.role ?? "boshacks";
const daoId = props.daoId ?? "hacks.sputnik-dao.near";

const receiver = props.receiver ?? "root.near";
const description =
  props.description ?? `Add ${receiver} as a ${role} to ${daoId}`;
const buttonName = props.buttonName ?? "Propose to Add to DAO";

const proposeToAddToDAO = () => {};
const Wrapper = styled.div`
  .follow-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: #006ADC !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7E868C;
    }

    .bi-16 {
      font-size: 16px;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <button className="follow-button" onClick={proposeToAddToDAO}>
      {buttonName}
    </button>
  </Wrapper>
);
