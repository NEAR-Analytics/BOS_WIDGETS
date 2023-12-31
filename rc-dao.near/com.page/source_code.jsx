const accountId = context.accountId;
const orgId = props.orgId ?? "rc-dao.near";

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 85px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  max-width: 700px;

  span {
    display: inline-block;
    background: #62C6F2;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;
    max-width: 500px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    font-size: 50px;
    max-width: 80%;
      line-height: 1.2;


    span {
      border-radius: 10px;
      svg {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 15px;
      }
    }
  }
`;

const Text = styled.p`
  align-items: center,
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 15;
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};
`;

const Container = styled.div`
  display: flex;
  max-width: 80%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;

  @media (max-width: 480px) {
    max-width: 80%;
  }
`;

return (
  <Container center>
    <Flex
      gap="23px"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <H1>
        Regional Communities
        <span>
          DAO{" "}
          <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
            <path
              d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
              fill="#4D63EC"
            />
          </svg>
        </span>
      </H1>

      <Text
        size="29px"
        weight="555"
        style={{ textAlign: "center", maxWidth: "80%" }}
      >
        Opening the
        <br />
        <a
          href="https://humans.nearverselabs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          World Wide Web
        </a>
      </Text>
      {!accountId ? (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://near.org/signup",
            label: "Create Account",
            variant: "outline-dark",
            size: "large",
          }}
        />
      ) : (
        <div>
          {!profile ? (
            <Flex gap="12px" direction="column" alignItems="center">
              <Widget src="hack.near/widget/pro.editor" />
            </Flex>
          ) : (
            <Flex gap="12px" direction="column" alignItems="center">
              <div style={{ maxWidth: "70%" }}>
                <Widget
                  src="rc-dao.near/widget/rc.profile.card"
                  props={{
                    accountId: "rc-dao.sputnik-dao.near",
                  }}
                />
              </div>
              <br />
              <Text
                size="23px"
                weight="555"
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Contributors
              </Text>
              <Widget
                src="james.near/widget/dao.connections"
                props={{
                  accountId: orgId,
                }}
              />
            </Flex>
          )}
        </div>
      )}
    </Flex>
    <hr />
    <Widget src="hack.near/widget/dev.Badge" />
  </Container>
);
