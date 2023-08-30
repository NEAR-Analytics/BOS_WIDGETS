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

const TextContainer = styled.div`
  overflow-y: scroll;
  max-height: 490px;
  width: 100%;
  margin: 10px;
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
    { prop_id: id, vote: [value] },
    "110000000000000"
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
            className: "primary justify-content-center",
            icon: <i className="bi bi-x-lg" />,
            onClick: () => handleVote("abstain"),
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);

const Budget = styled.div`
  padding: 10px;
  p {
    line-height: 16px;
    font-size: 12px;
    text-align: justify;
  }
`;

const Content = () => (
  <Budget>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Velit laoreet id donec
      ultrices. Fringilla ut morbi tincidunt augue interdum velit euismod in
      pellentesque. Venenatis tellus in metus vulputate eu scelerisque felis.
      Eleifend quam adipiscing vitae proin sagittis nisl. Pellentesque id nibh
      tortor id aliquet. Sit amet luctus venenatis lectus magna fringilla urna
      porttitor. Quis auctor elit sed vulputate mi sit amet mauris. Massa sapien
      faucibus et molestie ac. Turpis cursus in hac habitasse platea dictumst
      quisque sagittis purus. Nisl purus in mollis nunc. Massa sed elementum
      tempus egestas sed sed risus pretium quam. Pretium nibh ipsum consequat
      nisl vel. Nullam non nisi est sit amet facilisis. Blandit volutpat
      maecenas volutpat blandit aliquam etiam. Vehicula ipsum a arcu cursus
      vitae congue. Ut lectus arcu bibendum at varius vel. Turpis tincidunt id
      aliquet risus feugiat in ante.
      <br />
      <br />
      Dolor morbi non arcu risus quis varius. Tortor dignissim convallis aenean
      et tortor at risus viverra. Purus ut faucibus pulvinar elementum integer
      enim neque volutpat ac. Nullam eget felis eget nunc. Risus commodo viverra
      maecenas accumsan lacus vel facilisis. Id neque aliquam vestibulum morbi
      blandit. Lacus laoreet non curabitur gravida arcu ac tortor. Morbi non
      arcu risus quis varius. Ut lectus arcu bibendum at varius vel pharetra.
      Vel eros donec ac odio tempor orci dapibus. Placerat orci nulla
      pellentesque dignissim enim sit amet venenatis urna. Vulputate ut pharetra
      sit amet aliquam id. Molestie at elementum eu facilisis sed.
      <br />
      <br />
      Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros.
      Donec ac odio tempor orci dapibus. Ultrices tincidunt arcu non sodales
      neque sodales. Cursus vitae congue mauris rhoncus aenean vel. Et ligula
      ullamcorper malesuada proin libero nunc consequat interdum varius. Quis
      lectus nulla at volutpat diam ut venenatis tellus in. Pellentesque nec nam
      aliquam sem et tortor consequat id porta. Nunc eget lorem dolor sed
      viverra. Id velit ut tortor pretium. Porta lorem mollis aliquam ut
      porttitor leo. Morbi tincidunt augue interdum velit euismod in
      pellentesque. Dictum at tempor commodo ullamcorper a lacus vestibulum sed
      arcu. Vel orci porta non pulvinar neque laoreet suspendisse. Consequat ac
      felis donec et odio pellentesque diam volutpat commodo. Arcu cursus
      euismod quis viverra. Pellentesque eu tincidunt tortor aliquam nulla
      facilisi cras. Facilisis mauris sit amet massa vitae tortor condimentum
      lacinia quis. Feugiat vivamus at augue eget arcu dictum varius duis at.
      Mauris augue neque gravida in fermentum et sollicitudin ac. Iaculis nunc
      sed augue lacus. Ipsum dolor sit amet consectetur adipiscing elit ut.
      Magnis dis parturient montes nascetur. Hac habitasse platea dictumst
      vestibulum rhoncus est. Ultrices vitae auctor eu augue. Vitae congue eu
      consequat ac. Viverra maecenas accumsan lacus vel facilisis volutpat est
      velit egestas. Hendrerit dolor magna eget est lorem. Nunc vel risus
      commodo viverra maecenas accumsan lacus vel. Cras fermentum odio eu
      feugiat pretium nibh ipsum. Quam quisque id diam vel quam elementum
      pulvinar etiam.
      <br />
      <br />
      Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Cras
      sed felis eget velit aliquet sagittis. Mollis nunc sed id semper risus in
      hendrerit. Nullam eget felis eget nunc lobortis mattis aliquam faucibus
      purus. Turpis tincidunt id aliquet risus feugiat in ante. Egestas dui id
      ornare arcu odio ut sem nulla. Velit sed ullamcorper morbi tincidunt
      ornare massa. Suspendisse in est ante in nibh mauris cursus mattis.
      Suspendisse in est ante in nibh mauris. Elementum sagittis vitae et leo
      duis ut diam quam. Gravida dictum fusce ut placerat orci nulla
      pellentesque. Diam ut venenatis tellus in. Ipsum consequat nisl vel
      pretium lectus. Enim tortor at auctor urna nunc id cursus metus. Sed
      turpis tincidunt id aliquet risus feugiat in ante. A scelerisque purus
      semper eget duis at.
      <br />
      <br />
      Non sodales neque sodales ut etiam sit amet nisl. Arcu vitae elementum
      curabitur vitae. Ac turpis egestas maecenas pharetra. Massa tempor nec
      feugiat nisl pretium fusce id. Pharetra et ultrices neque ornare aenean
      euismod elementum nisi. Augue neque gravida in fermentum et. Morbi
      tristique senectus et netus et malesuada fames. Arcu cursus euismod quis
      viverra. Sit amet dictum sit amet. Odio eu feugiat pretium nibh.
      <br />
      <br />
      Ornare suspendisse sed nisi lacus sed viverra tellus. Feugiat in ante
      metus dictum at tempor. Diam sollicitudin tempor id eu nisl nunc mi ipsum
      faucibus. Aliquet nibh praesent tristique magna. Tempus imperdiet nulla
      malesuada pellentesque elit. Luctus venenatis lectus magna fringilla.
      Vitae tempus quam pellentesque nec nam aliquam. Laoreet suspendisse
      interdum consectetur libero id faucibus nisl tincidunt. Quis commodo odio
      aenean sed adipiscing diam donec adipiscing. Sed lectus vestibulum mattis
      ullamcorper velit sed. Condimentum mattis pellentesque id nibh tortor id
      aliquet lectus. Nisi lacus sed viverra tellus. Luctus accumsan tortor
      posuere ac ut consequat semper viverra nam. In pellentesque massa placerat
      duis ultricies lacus sed turpis tincidunt. Sed augue lacus viverra vitae
      congue. Posuere morbi leo urna molestie at. Risus nullam eget felis eget
      nunc.
      <br />
      <br />
      Ultrices eros in cursus turpis massa. Et molestie ac feugiat sed lectus.
      Nisi scelerisque eu ultrices vitae auctor. Lobortis mattis aliquam
      faucibus purus in. Dictum non consectetur a erat nam. Interdum velit
      euismod in pellentesque massa. Arcu cursus vitae congue mauris rhoncus.
      Ridiculus mus mauris vitae ultricies. Donec ultrices tincidunt arcu non
      sodales neque sodales ut etiam. Sit amet volutpat consequat mauris nunc.
      Quam viverra orci sagittis eu volutpat odio. Amet luctus venenatis lectus
      magna fringilla urna porttitor. Risus nec feugiat in fermentum posuere
      urna nec tincidunt. Ornare quam viverra orci sagittis eu volutpat odio
      facilisis. Pretium quam vulputate dignissim suspendisse. Leo duis ut diam
      quam nulla. Velit sed ullamcorper morbi tincidunt.
      <br />
      <br />
      Cras sed felis eget velit aliquet sagittis id. Nunc id cursus metus
      aliquam eleifend. Lectus quam id leo in. Consequat mauris nunc congue nisi
      vitae suscipit tellus mauris a. Donec enim diam vulputate ut pharetra sit
      amet aliquam. Velit euismod in pellentesque massa placerat duis ultricies.
      Dolor magna eget est lorem ipsum dolor sit amet. Odio morbi quis commodo
      odio aenean sed adipiscing. Elementum nisi quis eleifend quam adipiscing.
      Condimentum mattis pellentesque id nibh tortor. Egestas congue quisque
      egestas diam in arcu cursus. A diam maecenas sed enim ut sem viverra
      aliquet.
      <br />
      <br />
      Tortor at risus viverra adipiscing at in. Nisl rhoncus mattis rhoncus
      urna. Odio facilisis mauris sit amet massa vitae. Mattis pellentesque id
      nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed
      cras ornare arcu dui. Consectetur adipiscing elit pellentesque habitant
      morbi. Donec pretium vulputate sapien nec sagittis aliquam malesuada
      bibendum arcu. Eget aliquet nibh praesent tristique magna sit amet purus.
      Massa massa ultricies mi quis hendrerit dolor magna. Pulvinar sapien et
      ligula ullamcorper malesuada proin libero. Dolor sit amet consectetur
      adipiscing elit duis tristique sollicitudin nibh. Sit amet purus gravida
      quis blandit turpis cursus. Ut sem viverra aliquet eget sit amet tellus
      cras.
    </p>
  </Budget>
);

return (
  <Container>
    <h1>Budget Package</h1>
    <a href="https://bafkreidwdxocdkfsv6srynw7ipnogfuw76fzncmxd5jv7furbsn5cp4bz4.ipfs.nftstorage.link/">
      View Budget Package
      <i className="ml-2 bi bi-box-arrow-up-right" />
    </a>
    <TextContainer>
      <Content />
    </TextContainer>

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
