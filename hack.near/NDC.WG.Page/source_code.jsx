let { dev } = props;

const registryContract = dev
  ? "registry-v1.gwg-testing.near"
  : "registry.i-am-human.near";
const issuer = dev ? "fractal.i-am-human.near" : "community.i-am-human.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const widgets = {
  header: "hack.near/widget/NDC.WG.Header",
  card: "hack.near/widget/NDC.WG.Card",
  about: "hack.near/widget/NDC.WG.About",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
  compose: "hack.near/widget/NDC.WG.Compose",
  deleteGroup: "hack.near/widget/NDC.WG.DeleteGroup",
};

State.init({
  selectedGroup: "RegionalCommunities",
  start: true,
  groups: [],
  sbt: false,
  og: false,
  createdGroup: false,
  groupId: "",
  originGroups: [],
  notFound: "There are no active work groups at the moment.",
  loading: false,
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

const getGroupData = () => Social.get(`${daoId}/groups`);

const handleSelect = (item) => {
  switch (item.id) {
    case 1:
      getGroupData("RegionalCommunties");
      break;
    case 2:
      getGroupData("NFT");
      break;
    case 3:
      getGroupData("Gaming");
      break;
    case 4:
      getGroupData("Tech");
      break;
    case 5:
      getGroupData("ReFi");
      break;
  }
  State.update({ selectedGroup: item.id });
};

const handleFilter = (e) => {
  const text = e.target.value;

  State.update({ groupId: text });

  if (text.length > 0) {
    let filtered = state.originNominations.filter((data) => {
      const affiliations = JSON.parse(data.groupData.afiliation);
      const companyNames =
        affiliations?.length > 0 &&
        affiliations.map((af) => af.company_name.toLowerCase());

      return (
        data.profileData.name.toLowerCase().includes(text.toLowerCase()) ||
        (companyNames &&
          companyNames.some((c) => c.includes(text.toLowerCase())))
      );
    });

    if (filtered.length > 0) State.update({ groups: filtered });
    else
      State.update({
        notFound: "There are no such groups or affiliations",
        groups: [],
      });
  } else {
    State.update({ groups: state.originGroups });
  }
};

if (state.start) {
  getVerifiedHuman();
  getGroupData("RegionalCommunities");

  State.update({ start: false });
}

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

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <>
    <div>
      <Widget
        src={widgets.header}
        props={{
          type: "WG",
          isVerified: !sbt,
          showModal: state.showModal,
        }}
      />
      <Container className="d-flex row justify-content-between w-100">
        <Left className="col-lg">
          <H5>Learning Together</H5>
          <Widget
            src={widgets.about}
            props={{
              selectedGroup: state.selectedGroup,
              handleSelect: (item) => handleSelect(item),
            }}
          />
          <div>
            {!state.sbt && (
              <div className="mt-5">
                <Widget
                  src={widgets.verifyHuman}
                  props={{
                    title: "To Create a Work Group",
                    small: true,
                  }}
                />
              </div>
            )}
          </div>
        </Left>
        <Center className="col-lg-9 px-2 px-md-3 d-flex flex-row flex-wrap">
          {state.loading ? (
            <Loader />
          ) : state.groups.length > 0 ? (
            state.groups.map((data) => (
              <Widget
                src={widgets.card}
                props={{
                  data,
                  registry_contract: registryContract,
                  api_key: apiKey,
                  dev,
                }}
              />
            ))
          ) : (
            <div className="flex mt-10 container-fluid align-self-center">
              <H5 className="text-center">{state.notFound}</H5>
            </div>
          )}
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
