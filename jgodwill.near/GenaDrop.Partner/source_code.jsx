const url =
  "https://docs.google.com/forms/d/e/1FAIpQLSexslat5Sca-I0M0Tmrq0HFNo8Z4JXDKfeMUIJ7kcaWoQvzBA/formResponse?embedded=true";
const Main = styled.div`
height: 100%;
overflow: unset;
position: absolute;
width: 100%;
z-index: 1;
iframe{
    height: inherit;
}
`;
return (
  <Main>
    <iframe src={url} style={{ width: "100%" }} />
  </Main>
);
