const daoId = "hack.near";

const registryContract = "registry.i-am-human.near";
const issuer = "fractal.i-am-human.near";

const widgets = {
  header: "hack.near/widget/NDC.WG.Header",
  card: "hack.near/widget/NDC.WG.Card",
  about: "hack.near/widget/NDC.WG.About",
  styledComponents: "hack.near/widget/NDC.StyledComponents",
  verifyHuman: "hack.near/widget/NDC.VerifyHuman",
  compose: "hack.near/widget/NDC.WG.Create",
  deleteGroup: "hack.near/widget/NDC.WG.Delete",
};

const groups = Social.get(`${daoId}/thing/directory`);

if (!groups) {
  return "";
}

const groupArray = JSON.parse(groups);

State.init({
  start: true,
  sbt: false,
  og: false,
});

const getVerifiedHuman = () => {
  const isHuman = Near.view(registryContract, "is_human", {
    account: context.accountId,
  });
  const ogTokens = Near.view(registryContract, "sbt_tokens", {
    issuer,
  });

  if (!isHuman) {
    return "";
  }
  if (!ogTokens) {
    return "";
  }
  State.update({
    og: ogTokens.some((sbt) => sbt.owner === context.accountId),
    sbt: isHuman[0][1].length > 0,
  });
};

if (state.start) {
  getVerifiedHuman();
  State.update({ start: false });
}

const widget = {
  styledComponents: "hack.near/widget/NDC.StyledComponents",
};

const Header = styled.div`
  background: black;
`;

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

const Center = styled.div``;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const ButtonNominateContainer = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: #f8f8f9;
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
      <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: {
              url: "https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg",
            },
            alt: "ndc",
            style: {
              height: "42px",
              objectFit: "cover",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
        {!sbt ? (
          <Widget
            src={widget.styledComponents}
            props={{
              Link: {
                text: "Verify as Human",
                href: "https://i-am-human.app/",
              },
            }}
          />
        ) : (
          <Toolbar>
            {props.createdGroup ? (
              <Widget
                src={widget.styledComponents}
                props={{
                  Button: {
                    className: "danger primary",
                    text: "Edit Work Group",
                    onClick: () => State.update({ showModal: true }),
                    icon: <i class="bi bi-trash"></i>,
                  },
                }}
              />
            ) : (
              <Widget
                src={widget.styledComponents}
                props={{
                  Button: {
                    text: "Create Work Group",
                    onClick: () => State.update({ showModal: true }),
                    icon: <i class="bi bi-plus-lg"></i>,
                  },
                }}
              />
            )}
          </Toolbar>
        )}
      </Header>
      <Container className="d-flex row justify-content-between w-100">
        <Left className="col-lg mb-3">
          <H5>Learning Together</H5>
          <Widget src={widgets.about} />
        </Left>
        <Center className="col-lg-9 px-2 px-md-3 d-flex flex-column">
          <h2>NDC Work Groups</h2>
          <div className="d-flex flex-row flex-wrap">
            {groupArray.map((group, i) => (
              <Widget
                key={i}
                src={widgets.card}
                props={{
                  groupId: group,
                }}
              />
            ))}
          </div>
        </Center>
      </Container>
    </div>

    <>
      {state.showModal && (
        <Widget
          src={widgets.compose}
          props={{
            handleClose: () => State.update({ showModal: false }),
          }}
        />
      )}
      {state.showModalDelete && (
        <Widget
          src={widgets.deleteGroup}
          props={{
            group: state.group,
            handleClose: () => State.update({ showModalDelete: false }),
          }}
        />
      )}
    </>
  </>
);
