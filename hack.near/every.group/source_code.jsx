const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "hack.near";

const widgets = {
  group: "hack.near/widget/group.card",
  create: "hack.near/widget/group.create",
  edit: "hack.near/widget/group.edit",
};

const groups = Social.index("every", "group", { limit: 10 });

if (!groups) {
  return "";
}

const { isVerified } = props;

const isMember = Social.keys(
  `${accountId}/graph/${groupId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const type = join ? "leave" : "join";

const handleJoin = () => {
  Social.set({
    graph: { [groupId]: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          accountId,
        },
      }),
      notify: JSON.stringify({
        key: creatorId,
        value: {
          type,
          accountId,
          message: "everyone is growing!",
        },
      }),
    },
  });
};

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
`;

const Header = styled.div`
  background: black;

  .large-text {
    font-size: 19px;
    font-weight: 555;
  }
`;

const Navbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

const Center = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;

  .group-card {
    width: 100%;
  }
`;

return (
  <>
    <div>
      <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: {
              url: "https://pbs.twimg.com/profile_images/1690850854457204736/KUXVTpZt_400x400.png",
            },
            alt: "Near Builders",
            style: {
              height: "42px",
              objectFit: "cover",
            },
          }}
        />
        {!context.accountId ? (
          <a href="https://shard.dog/nearweek" className="btn btn-success">
            news
          </a>
        ) : (
          <Navbar>
            {isMember && Object.keys(isMember).length ? (
              <button
                onClick={() => State.update({ showModal: true })}
                className="btn btn-success"
              >
                create
              </button>
            ) : (
              <button onClick={handleJoin} className="btn btn-success">
                start
              </button>
            )}
          </Navbar>
        )}
      </Header>
      <Container className="d-flex justify-content-between w-100">
        <Center className="px-2 px-md-3 d-flex flex-column">
          <h4 className="mb-1">Discover Groups</h4>
          {groups.map((group, i) => (
            <div className="group-card">
              <Widget
                key={i}
                src={widgets.group}
                props={{
                  groupId: group.value.id,
                  creatorId: group.accountId,
                }}
              />
            </div>
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
