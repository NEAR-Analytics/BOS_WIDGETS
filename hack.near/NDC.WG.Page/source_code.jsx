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

const groups = {
  RC: {
    title: "Regional Communities",
    creatorId: "rc-dao.near",
    members: [
      "abbakaka.near",
      "igboze_builder.near",
      "inspiratibiz.near",
      "james.near",
      "yuenisd.near",
    ],
    daoId: "rc-dao.sputnik-dao.near",
  },
  NFT: {
    title: "Non-Fungible Tokens",
    creatorId: "nearnftwg.near",
    members: ["aescobar.near", "krikkraktrak.near", "nearversedao.near"],
    daoId: "nearnftwg.sputnik-dao.near",
  },
  DeFi: {
    title: "Decentralized Finance",
    creatorId: "defindc.near",
    groupId: "DeFi",
    members: ["ntare.near"],
    daoId: "defi-ndc.sputnik-dao.near",
  },
  AI: {
    title: "Artificial Intelligence",
    creatorId: "ai-dao.near",
    members: ["damboy22.near"],
    daoId: "ai-dao.sputnik-dao.near",
  },
  Gaming: {
    title: "Gaming",
    creatorId: "haenko.near",
    members: ["haenko.near", "dazo_gaming.near", "jeffgold.near"],
  },
  Events: {
    title: "Events",
    creatorId: "neardigitalcollective.near",
    members: ["ogruss.near"],
  },
  FDAO: {
    title: "Freelancers",
    creatorId: "freelancerdao.near",
    members: [
      "blaze.near",
      "fiftycent.near",
      "atrox1382.near",
      "robert.near",
      "kazanderdad.near",
    ],
    daoId: "freelancerdao.sputnik-dao.near",
  },
  NRC: {
    title: "Research",
    creatorId: "research-collective.near",
    members: ["chloe.near", "earnestetim.near", "xvii.near"],
    daoId: "research-collective.sputnik-dao.near",
  },
  ReFi: {
    title: "Regenerative Finance",
    creatorId: "nearrefi.near",
    members: [
      "earnestetim.near",
      "liight.near",
      "trophy001.near",
      "skyempire.near",
      "ndcplug.near",
      "ntare.near",
      "wolfwood.near",
    ],
    daoId: "refi.sputnik-dao.near",
  },
  Aurora: {
    title: "Aurora",
    creatorId: "ac-dao.near",
    members: ["whendacha.near", "techdir.near", "johanga.near"],
    daoId: "aurora-community-dao.sputnik-dao.near",
  },
  Tech: {
    title: "Technology",
    creatorId: "neardigitalcollective.near",
    members: ["robert.near", "jlw.near", "blaze.near"],
    daoId: "ndc-techwg.sputnik-dao.near",
  },
  GWG: {
    title: "Governance",
    creatorId: "govworkinggroup.near",
    members: [
      "yuensid.near",
      "fiftycent.near",
      "atrox1382.near",
      "robert.near",
      "kazanderdad.near",
    ],
    daoId: "gwg.sputnik-dao.near",
  },
};

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

  State.update({
    og: ogTokens.some((sbt) => sbt.owner === context.accountId),
    sbt: isHuman[0][1].length > 0,
  });
};

const getGroupData = (group) => Social.get(`${daoId}/groups/${group}`);

// const handleSelect = (item) => {
//   switch (item.id) {
//     case 1:
//       getGroupData("RegionalCommunties");
//       break;
//     case 2:
//       getGroupData("NFT");
//       break;
//     case 3:
//       getGroupData("Gaming");
//       break;
//     case 4:
//       getGroupData("Tech");
//       break;
//     case 5:
//       getGroupData("ReFi");
//       break;
//   }
//   State.update({ selectedGroup: item.id });
// };

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

const Filter = styled.div`
  margin-top: 32px;

  @media only screen and (max-width: 1061px) {
    flex-direction: column;
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
        {isVerified ? (
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
                    text: "Delete Work Group",
                    onClick: () => State.update({ showModalDelete: true }),
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
          <div>
            {!state.sbt ? (
              <div className="mt-5">
                <Widget
                  src={widgets.verifyHuman}
                  props={{
                    title: "Get Verified To Create a WG",
                    small: true,
                  }}
                />
              </div>
            ) : (
              <div className="mt-5">
                <Toolbar>
                  {props.createdGroup ? (
                    <Widget
                      src={widget.styledComponents}
                      props={{
                        Button: {
                          className: "danger primary",
                          text: "Delete Work Group",
                          onClick: () =>
                            State.update({ showModalDelete: true }),
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
              </div>
            )}
          </div>
        </Left>
        <Center className="col-lg-9 px-2 px-md-3 d-flex flex-column">
          <h2>NDC Work Groups</h2>
          <div className="d-flex flex-row flex-wrap">
            {Object.values(groups).map((group, i) => (
              <Widget
                key={i}
                src={widgets.card}
                props={{
                  data: group,
                  registry_contract: registryContract,
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
