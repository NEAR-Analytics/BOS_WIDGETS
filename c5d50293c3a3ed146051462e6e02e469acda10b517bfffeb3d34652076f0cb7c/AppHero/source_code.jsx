const AppSectionStyle = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 840px;
  height: 224px;
  max-width: 840px;
  flex-direction: row;
`;

const UserSectionStyle = styled.div`
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  width: 590px;
  height: 224px;
`;

function Hero({ address }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppSectionStyle>
        <Widget
          src="c5d50293c3a3ed146051462e6e02e469acda10b517bfffeb3d34652076f0cb7c/widget/Yaypeg"
          props={{
            width: "224px",
            height: "224px",
            address,
            gif: true,
          }}
        />
        <UserSectionStyle></UserSectionStyle>
      </AppSectionStyle>
    </>
  );
}

return <Hero {...props} />;
