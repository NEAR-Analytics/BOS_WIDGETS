const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const { getProjectMeta } = VM.require(
  "buildhub.near/widget/lib.project-data"
) || {
  getProjectMeta: () => {},
};
const { id } = props;
const project = getProjectMeta(id);
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  .link {
    display: flex;
    gap: 16px;
    flex-direction: row;
    align-items: center;
  }
`;
return <Container className="text-white"></Container>;
