const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";

const widgets = {
  header: "hack.near/widget/page.navbar",
  card: "hack.near/widget/group.card",
  create: "hack.near/widget/group.create",
};

Social.index("every", "group", { limit: 10 });

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

const groupCards = Object.keys(groups[accountId]["graph"]).map((key, index) => (
  <div key={index}>
    {key.length === 34 && (
      <div className="m-2">
        <Widget src={widgets.card} props={{ groupId: key }} />
      </div>
    )}
  </div>
));

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
            NEWS
          </a>
        ) : (
          <Toolbar>
            {isMember && Object.keys(isMember).length ? (
              <button
                onClick={() => State.update({ showModal: true })}
                className="btn btn-success"
              >
                CREATE
              </button>
            ) : (
              <button
                onClick={() =>
                  Social.set({
                    graph: { [groupId]: { [context.accountId]: "" } },
                  })
                }
                className="btn btn-success"
              >
                JOIN
              </button>
            )}
          </Toolbar>
        )}
      </Header>
      <Container className="d-flex justify-content-between w-100">
        <Center className="px-2 px-md-3 d-flex flex-column">
          <h2 className="mb-1">Social Groups</h2>
          <div className="d-flex flex-row flex-wrap">{groupCards}</div>
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
