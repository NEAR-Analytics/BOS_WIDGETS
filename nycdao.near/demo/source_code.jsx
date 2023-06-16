if (context.loading) {
  return "";
}

const H1 = styled.h1`
  color: #11181C;
  font-size: 32px;
  font-weight: 600;
`;
const H6 = styled.h6`
  color: #687076;
  font-size: 20px;
  font-weight: 400
`;
const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  margin-top: 15px;
`;
const Flex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;
const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

return (
  <div class="container-fluid py-3 mb-5">
    <H1>NEAR NYC Demo Day</H1>
    <Actions>
      {context.accountId ? (
        <Widget
          src="nycdao.near/widget/nyc.subscribe"
          props={{ accountId, daoId }}
        />
      ) : (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://shard.dog/go?url=https://near.social",
            label: "Create Account",
            variant: "outline-secondary",
            size: "small",
          }}
        />
      )}
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "#/nycdao.near/widget/nyc.dao",
          label: "Explore Community",
          variant: "outline-secondary",
          size: "small",
        }}
      />
    </Actions>
    <br />
    <h4>🔥 Community Choice Award</h4>
    <H6>Upvote any of the projects you like!</H6>
    <hr />
    <div class="mt-5">
      <Widget src="nycdao.near/widget/projects" />
    </div>
    <hr />
    <br />
    <Flex>
      <Text
        size="14px"
        weight="600"
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.17em",
          textAlign: "center",
        }}
      >
        Made Possible by Collaboration
      </Text>
      <Widget src="hack.near/widget/dev.Badge" />
    </Flex>
  </div>
);
