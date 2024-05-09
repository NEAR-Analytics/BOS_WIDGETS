// Nada.Bot Provilder Simulator Interface - v1.0.0

// Fonts

const monaSansFont = fetch(
  "https://fonts.cdnfonts.com/css/mona-sans?styles=144345,144339,144351,144321"
).body;

const oiFont = fetch(
  "https://fonts.googleapis.com/css2?family=Oi&display=swap"
).body;

if (!monaSansFont) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
                font-family: Mona Sans, Roboto, sans-serif
                ${monaSansFont}
                ${oiFont}
            `,
  });
}

// Styles

const Title = styled.h1`
  font-size: 1.2em;
  text-align: center;
  color: #292929;
`;

const Logo = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #2D6FDB;
  font-family: Oi;
  margin-bottom: 0;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    display: flex;
    margin: 32px;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
`;

const Stack = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleSection = styled.h4`
    margin: 0;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.235;
    font-weight: 700;
    margin-top: 32px;
    text-align: center;
`;

const ShadowContainer = styled.div`
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    box-shadow: 4px 4px 0px 0px #F0F0F0;
    border-radius: 8px;
    border: 3px solid #F0F0F0;
    padding: 16px;
    margin-top: 16px;
`;

const ColumnStack = styled.div`
    display: flex;
    flex-direction: column;
`;

const RowStack = styled.div`
    display: flex;
    flex-direction: row;
`;

const BlueActionButton = styled.button`
    background-color: #2D6FDB;
    color: #fff;
    border-radius: 6px;
    padding: 8px 24px;
    box-shadow: 0px 2.7px 0px 0px #292929;
    border: 2px solid #292929;
    font-weight: 600;
    margin-bottom: 3.7px;
    transition: margin 0.05s, box-shadow 0.05s;

    :hover {
        box-shadow: none;
        margin-top: 3.7px;
        margin-bottom: 0px;
    }
`;

const BeigeActionButton = styled.button`
    background-color: #FEF6EE;
    color: #292929;
    border-radius: 6px;
    padding: 8px 24px;
    box-shadow: 0px 2.7px 0px 0px #292929;
    border: 2px solid #292929;
    font-weight: 600;
    margin-bottom: 3.7px;
    transition: margin 0.05s, box-shadow 0.05s;

    :hover {
        box-shadow: none;
        margin-top: 3.7px;
        margin-bottom: 0px;
    }
`;

const Text = styled.p`
    text-align: center;
`;

const Theme = state.theme;

// Check if user is logged in
const accountId = context.accountId;

if (!accountId) {
  return (
    <Theme>
      <Container>
        <Content>
          <Stack>
            <Logo>Nada.Bot</Logo>
            <Title>Provider Simulator</Title>
          </Stack>
          <TitleSection>Connect your wallet first!</TitleSection>
        </Content>
      </Container>
    </Theme>
  );
}

// It accepts a custom contract id or the default one
const CONTRACT =
  props.contractId || "sybilprovidersimulator-1.staging.nadabot.near";
// 0.01 NEAR
const MIN_NEEDED_YOCTO_NEAR = "10000000000000000000000";

const hasCheck = Near.view(CONTRACT, "has_check", {
  account_id: accountId,
});

if (hasCheck === null) return "Loading";

const getCheck = () => {
  Near.call(CONTRACT, "get_check", undefined, undefined, MIN_NEEDED_YOCTO_NEAR);
};

const removeCheck = () => {
  Near.call(CONTRACT, "remove_check");
};

return (
  <Theme>
    <Container>
      <Content>
        <Stack>
          <Logo>Nada.Bot</Logo>
          <Title>Provider Simulator</Title>
        </Stack>
        <TitleSection>
          {hasCheck ? "You're currently a human" : " You're NOT a human yet"}
        </TitleSection>
        <Text>
          Once you're ready, go back to the Nada.Bot app. Your status is going
          to update automatically.
        </Text>
        {hasCheck ? (
          <ShadowContainer>
            <ColumnStack>
              <p>This is going to remove you from the human list.</p>
              <BeigeActionButton onClick={removeCheck}>
                Set me as NOT a human
              </BeigeActionButton>
            </ColumnStack>
          </ShadowContainer>
        ) : (
          <ShadowContainer>
            <ColumnStack>
              <p>This is going to set you as a human</p>
              <BlueActionButton onClick={getCheck}>
                Set me as a human
              </BlueActionButton>
            </ColumnStack>
          </ShadowContainer>
        )}
      </Content>
    </Container>
  </Theme>
);
