const accountId = props.accountId ?? context.accountId;
const creatorId = props.creatorId ?? "hack.near";

const widgets = {
  header: "hack.near/widget/page.navbar",
  card: "hack.near/widget/group.card",
  create: "hack.near/widget/group.create",
  edit: "hack.near/widget/group.edit",
};

const groups = Social.index("every", "group", { limit: 10 });

if (!groups) {
  return "none found";
}

const { isVerified } = props;

const isMember = Social.keys(
  `${context.accountId}/graph/${groupId}/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Center = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  color: #fff;
  background: #4ba6ee;

  &:hover {
    background: #3b86cb;
  }
`;

const Header = styled.div`
  background: black;

  .large-text {
    font-size: 19px;
    font-weight: 555;
  }
`;

const Toolbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

return (
  <>
    <div>
      <Widget
        src={widgets.header}
        props={{
          accountId,
          groupId,
          creatorId,
        }}
      />
      <Container className="d-flex justify-content-between w-100">
        <Center className="px-2 px-md-3 d-flex flex-column">
          <h4 className="mb-1">Discover BOS Communities</h4>
          {groups.map((group, i) => (
            <Widget
              key={i}
              src={widgets.card}
              props={{
                groupId: group.value.id,
                creatorId: group.accountId,
              }}
            />
          ))}{" "}
        </Center>
      </Container>
    </div>

    <>
      {state.showModal && (
        <Widget
          src={widgets.create}
          props={{
            handleClose: () => State.update({ showModal: false }),
          }}
        />
      )}
      {state.showModalEdit && (
        <Widget
          src={widgets.edit}
          props={{
            group: state.group,
            handleClose: () => State.update({ showModalEdit: false }),
          }}
        />
      )}
    </>
  </>
);
