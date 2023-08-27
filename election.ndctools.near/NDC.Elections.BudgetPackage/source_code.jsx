const {
  id,
  typ,
  seats,
  electionContract,
  registryContract,
  isIAmHuman,
  myVotes,
} = props;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
};

const H4 = styled.h4`
  margin-bottom: 0;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

const Container = styled.div`
  position: relative:
  font-family: Avenir;
  font-size: 16px;
`;

const Info = styled.i`
  font-size: 12px;
  margin: 0 !important;
`;

const CandidatesContainer = styled.div`
  overflow-y: scroll;
  max-height: 490px;
  width: 100%;
`;

const StickyContainer = styled.div`
  position: "fixed",
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
`;

const Icon = styled.i`
  font-size: 14px;
`;

const CastVotesSection = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  @media (max-width: 400px) {
    flex-direction: column;
  }

  .wrapper {
    @media (max-width: 400px) {
      width: 100%;
    }
  }

  button {
    @media (max-width: 400px) {
      width: 100%;
    }
  }

  h3,
  h4 {
    margin: 0 3px;
  }

  h3 {
    font-weight: 900;
  }

  .text-secondary {
    margin: 0 10px;
  }

  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }

    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const Section = styled.div`
  gap: 8px;
  margin-bottom: 10px;
`;

const ActionSection = styled.div`
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const currentUser = context.accountId;
const alreadyVotedForHouse = () => myVotes.some((voter) => voter.house === typ);
const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);

const handleVote = (value) =>
  Near.call(
    electionContract,
    "vote",
    { prop_id: id, vote: [] },
    "70000000000000",
    150000000
  );

State.init({
  availableVotes: seats - myVotesForHouse().length,
});

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>{alreadyVotedForHouse() ? 0 : state.availableVotes}</H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        {alreadyVotedForHouse() && (
          <span>You're already accepted budget package</span>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "Yes",
            className: "primary success justify-content-center",
            icon: <i className="bi bi-hand-thumbs-up" />,
            onClick: () => handleVote("yes"),
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "No",
            className: "primary danger justify-content-center",
            icon: <i className="bi bi-hand-thumbs-down" />,
            onClick: () => handleVote("no"),
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "Abstain",
            className: "justify-content-center",
            icon: <i className="bi bi-x-lg" />,
            onClick: () => handleVote("abstain"),
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);

const Content = () => (
  <small>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Sed viverra ipsum nunc
    aliquet bibendum enim. Congue mauris rhoncus aenean vel elit scelerisque
    mauris pellentesque pulvinar. Venenatis a condimentum vitae sapien. Pretium
    vulputate sapien nec sagittis. In eu mi bibendum neque egestas congue. Quis
    ipsum suspendisse ultrices gravida dictum fusce ut. Eu sem integer vitae
    justo. Arcu risus quis varius quam quisque id diam. Cursus in hac habitasse
    platea dictumst. Ullamcorper eget nulla facilisi etiam dignissim. Blandit
    cursus risus at ultrices mi tempus imperdiet nulla. Posuere ac ut consequat
    semper viverra nam libero justo laoreet. Nulla at volutpat diam ut
    venenatis. Mauris pharetra et ultrices neque ornare aenean. Augue ut lectus
    arcu bibendum at varius vel. Ultrices vitae auctor eu augue ut lectus arcu.
    Nascetur ridiculus mus mauris vitae. Nunc faucibus a pellentesque sit amet
    porttitor eget dolor morbi. Laoreet non curabitur gravida arcu ac tortor
    dignissim convallis aenean. Tincidunt id aliquet risus feugiat in ante metus
    dictum. A cras semper auctor neque vitae tempus quam pellentesque nec. Proin
    libero nunc consequat interdum varius sit amet. Netus et malesuada fames ac
    turpis egestas. Quis ipsum suspendisse ultrices gravida dictum fusce. Dictum
    sit amet justo donec enim diam vulputate. Morbi tristique senectus et netus.
    Elementum integer enim neque volutpat ac tincidunt. Dictumst quisque
    sagittis purus sit amet volutpat. Eros donec ac odio tempor orci dapibus
    ultrices in. Viverra accumsan in nisl nisi scelerisque. Pellentesque
    habitant morbi tristique senectus et netus et. Vitae elementum curabitur
    vitae nunc sed velit. Ut placerat orci nulla pellentesque dignissim enim
    sit. Nulla aliquet porttitor lacus luctus accumsan tortor. Elit ullamcorper
    dignissim cras tincidunt lobortis feugiat vivamus at augue. Neque convallis
    a cras semper auctor. Non odio euismod lacinia at quis risus. Maecenas
    pharetra convallis posuere morbi. Ipsum dolor sit amet consectetur
    adipiscing elit pellentesque habitant. Facilisi morbi tempus iaculis urna id
    volutpat lacus laoreet. Feugiat pretium nibh ipsum consequat nisl vel
    pretium. Pretium fusce id velit ut tortor pretium viverra. Ultrices dui
    sapien eget mi proin sed libero enim. Diam quis enim lobortis scelerisque
    fermentum. Magna ac placerat vestibulum lectus mauris ultrices eros. Sed
    tempus urna et pharetra pharetra massa massa ultricies. Consectetur a erat
    nam at lectus urna duis convallis convallis. Iaculis nunc sed augue lacus
    viverra vitae congue eu consequat. Mauris pharetra et ultrices neque ornare.
    Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Augue ut lectus
    arcu bibendum at varius vel pharetra vel. Nunc sed augue lacus viverra vitae
    congue eu consequat. Pulvinar sapien et ligula ullamcorper malesuada proin
    libero nunc. Sit amet consectetur adipiscing elit pellentesque habitant
    morbi tristique senectus. Etiam dignissim diam quis enim lobortis
    scelerisque. Sed elementum tempus egestas sed sed risus pretium. Sit amet
    massa vitae tortor condimentum lacinia quis. At risus viverra adipiscing at
    in tellus. Iaculis eu non diam phasellus vestibulum lorem. Facilisis gravida
    neque convallis a cras. Porta lorem mollis aliquam ut porttitor leo. Quisque
    sagittis purus sit amet volutpat consequat mauris nunc. Et odio pellentesque
    diam volutpat commodo sed egestas. Aliquet eget sit amet tellus cras
    adipiscing. Vitae semper quis lectus nulla at volutpat diam ut. Pharetra
    magna ac placerat vestibulum lectus. Mi in nulla posuere sollicitudin. Lorem
    dolor sed viverra ipsum. Faucibus turpis in eu mi. Pulvinar mattis nunc sed
    blandit libero. Id leo in vitae turpis massa. Elit pellentesque habitant
    morbi tristique senectus et netus et malesuada. Vestibulum lectus mauris
    ultrices eros in cursus turpis massa tincidunt. Dolor sit amet consectetur
    adipiscing elit. Platea dictumst quisque sagittis purus sit amet volutpat
    consequat mauris. Ultricies mi quis hendrerit dolor magna. Diam sit amet
    nisl suscipit adipiscing bibendum est ultricies. Nunc vel risus commodo
    viverra maecenas accumsan. Pretium vulputate sapien nec sagittis aliquam.
    Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Scelerisque
    eleifend donec pretium vulputate. Elementum integer enim neque volutpat ac
    tincidunt vitae. Felis donec et odio pellentesque diam. Facilisi cras
    fermentum odio eu feugiat pretium nibh. Maecenas ultricies mi eget mauris
    pharetra et. Leo duis ut diam quam nulla porttitor massa id neque. Pretium
    fusce id velit ut tortor pretium viverra suspendisse potenti. Massa enim nec
    dui nunc mattis enim. Mauris pharetra et ultrices neque ornare aenean
    euismod. Lorem ipsum dolor sit amet consectetur. Sit amet venenatis urna
    cursus eget. Porttitor eget dolor morbi non arcu risus quis varius. Nulla
    pharetra diam sit amet. Placerat in egestas erat imperdiet sed euismod.
    Morbi tristique senectus et netus et. Morbi quis commodo odio aenean sed.
    Fringilla urna porttitor rhoncus dolor purus non enim. Enim tortor at auctor
    urna nunc id cursus metus aliquam. Donec massa sapien faucibus et molestie
    ac. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt.
    Et malesuada fames ac turpis egestas integer eget aliquet nibh. Urna
    molestie at elementum eu facilisis. Elit sed vulputate mi sit amet mauris
    commodo quis imperdiet. Pellentesque diam volutpat commodo sed egestas
    egestas fringilla phasellus faucibus. Leo urna molestie at elementum eu
    facilisis sed odio. Tortor dignissim convallis aenean et tortor. Tellus in
    hac habitasse platea dictumst vestibulum rhoncus est. Etiam dignissim diam
    quis enim lobortis scelerisque fermentum. Eget velit aliquet sagittis id
    consectetur purus. Sit amet purus gravida quis blandit turpis cursus. Duis
    tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Arcu
    vitae elementum curabitur vitae nunc sed velit dignissim. Lorem ipsum dolor
    sit amet consectetur adipiscing elit duis tristique. Auctor eu augue ut
    lectus arcu. Sem et tortor consequat id. Eget est lorem ipsum dolor. A
    pellentesque sit amet porttitor eget dolor morbi non. Egestas sed sed risus
    pretium quam vulputate dignissim suspendisse in. Ac feugiat sed lectus
    vestibulum mattis ullamcorper velit sed ullamcorper. Erat velit scelerisque
    in dictum non consectetur a. At augue eget arcu dictum. Malesuada fames ac
    turpis egestas maecenas pharetra convallis. Scelerisque in dictum non
    consectetur a erat. Aliquam purus sit amet luctus venenatis lectus magna.
    Nisi scelerisque eu ultrices vitae auctor. Ut venenatis tellus in metus
    vulputate eu scelerisque felis imperdiet. Quam nulla porttitor massa id
    neque aliquam vestibulum. Dictum sit amet justo donec enim diam. Nulla
    pharetra diam sit amet nisl suscipit adipiscing bibendum. Ornare massa eget
    egestas purus viverra. At erat pellentesque adipiscing commodo elit at
    imperdiet dui accumsan. Est pellentesque elit ullamcorper dignissim cras
    tincidunt lobortis feugiat vivamus. Adipiscing elit pellentesque habitant
    morbi tristique senectus et netus. Porta lorem mollis aliquam ut porttitor
    leo. Id leo in vitae turpis massa sed elementum tempus. Tincidunt nunc
    pulvinar sapien et ligula ullamcorper. Tellus mauris a diam maecenas sed
    enim ut sem. Elit eget gravida cum sociis. Ullamcorper velit sed ullamcorper
    morbi tincidunt. Et netus et malesuada fames ac turpis egestas integer.
    Mauris pharetra et ultrices neque ornare. Scelerisque varius morbi enim
    nunc. Ante metus dictum at tempor. Varius quam quisque id diam vel quam
    elementum pulvinar. Sed tempus urna et pharetra pharetra massa massa
    ultricies. Interdum velit euismod in pellentesque massa placerat duis
    ultricies. Morbi tincidunt augue interdum velit. Eget gravida cum sociis
    natoque penatibus. Eu turpis egestas pretium aenean pharetra. Nibh mauris
    cursus mattis molestie a iaculis at. Eget velit aliquet sagittis id
    consectetur purus ut faucibus. Etiam sit amet nisl purus in mollis nunc sed
    id. At risus viverra adipiscing at in. Risus feugiat in ante metus.
  </small>
);

return (
  <Container>
    <h1>Budget Package</h1>
    <CandidatesContainer>
      <Content />
      <a href="https://bafkreidwdxocdkfsv6srynw7ipnogfuw76fzncmxd5jv7furbsn5cp4bz4.ipfs.nftstorage.link/">
        View Budget Package
        <i className="ml-2 bi bi-box-arrow-up-right" />
      </a>
    </CandidatesContainer>

    <div>
      {isIAmHuman ? (
        <CastVotes />
      ) : (
        <Widget
          src={widgets.verifyHuman}
          props={{
            title: "Want to vote?",
            description: "Click on Verify as a Human to proceed.",
          }}
        />
      )}
    </div>
  </Container>
);
