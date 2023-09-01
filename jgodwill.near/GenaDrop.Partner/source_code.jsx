const url = "https://docs.google.com/forms/d/e/1FAIpQLSexslat5Sca-I0M0Tmrq0HFNo8Z4JXDKfeMUIJ7kcaWoQvzBA/formResponse?embedded=true";
const Main = styled.div`
height: 100%;
`;
return (
  <Main>
    <iframe
      src={url}
      style={{width: "100%", height: "100%"}}
    />
  </Main>
);
