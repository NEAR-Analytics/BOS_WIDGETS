const url =
  "https://docs.google.com/forms/d/e/1FAIpQLSexslat5Sca-I0M0Tmrq0HFNo8Z4JXDKfeMUIJ7kcaWoQvzBA/viewform";
const Main = styled.div`
height: 100vh;
overflow: unset;
width: 100%;
iframe{
    height: calc(100vh - 120px);
}
`;
return (
  <Main>
    <iframe src={url} style={{ width: "100%" }} frameborder="0" marginheight="0" marginwidth="0" />
  </Main>
);
