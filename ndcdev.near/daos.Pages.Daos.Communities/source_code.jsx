let { content, contractName } = VM.require(
  `ndcdev.near/widget/daos.Config`,
);

const { dao_id } = props;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem;
  background: ${(p) => (p.bgColor ? p.bgColor : "inherit")};

  @media screen and (max-width: 786px) {
    padding: 2rem;
  }

  h2 {
    font-size: 3rem;
    font-weight: 600;
    width: 80%;
  }

  h4 {
    color: #1e1d22;
    font-size: 24px;
    font-weight: 400;
    width: 50%;
  }

  h3 {
    color: #222325;
    font-size: 24px;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }

  .item {
    width: 75%;
    .header {
      display: flex;
      border-radius: 10px 10px 0px 0px;

      h4 {
        margin: 10px 0 0 0;
        width: max-content;
      }
    }

    .icon {
      width: 40px;
    }

    p {
      font-size: 16px;
      font-weight: 300;
      margin: 0;
    }

    a {
      color: #151718 !important;

      :hover {
        text-decoration: none;
      }
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }

    a.btn-primary {
      border-radius: 10px;
      border: 2px solid #e6cde6;
      background: rgba(252, 248, 246, 0);
      box-shadow: unset;
      font-size: 18px;
      font-weight: 400;
      color: #151718;
      padding: 5px 15px;
      width: 100%;

      div {
        width: 80%;
      }

      &:hover {
        text-decoration: none;
      }

      @media screen and (max-width: 786px) {
        width: 100%;
      }
    }
  }
`;

if (!contractName || !content)
  return <Widget src="flashui.near/widget/Loading" />;

const dao = Near.view(contractName, "get_dao_by_handle", { handle: dao_id });
const section = content.daos[dao_id].sections;

if (!dao) return <Widget src="flashui.near/widget/Loading" />;

const projects = Near.view(contractName, "get_dao_communities", {
  dao_id: dao.id,
});

const ProjectCard = ({ project }) => (
  <ProjectContainer src={project.logo_url}>
    <div className="wrapper">
      <div className="image" />
    </div>
    <span className="title">{project.title}</span>
  </ProjectContainer>
);

return (
  <Container>
    <img className="hero-img" src={dao.banner_url} />

    {projects?.length > 0 ? (
      <Section>
        <Widget
          src={`ndcdev.near/widget/daos.Components.Dao.Communities`}
          props={{ title: section.projects.title, projects }}
        />
      </Section>
    ) : (
      ""
    )}
  </Container>
);
