const ProjectContainer = styled.div`
  height: 300px;
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  color: #0095b6;
  border-style: solid;
`
const Button = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a {
    color: #0095b6;
    font-size: 16px;
  }
`

const Main = (
  <ProjectContainer className="row m-2 p-4">
    <div ClassName="center">
      <h4 style={{ fontWeight: 1000 }}>Calimocho</h4>
      <h5 style={{ fontWeight: 200 }}>contract sign</h5>
    </div>
    <Button className="p-2">
      <a
        href="#"
        style={{
          backgroundColor: "#0095b6",
          color: "#FFF",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 24,
          border: "2px solid black",
        }}
      >
        Login
      </a>
      <a>please log in to see your contract page !</a>
    </Button>
  </ProjectContainer>
)

return <div>{Main}</div>
