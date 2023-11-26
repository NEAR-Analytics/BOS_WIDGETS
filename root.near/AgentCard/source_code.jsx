const [accountId, unused, agentName] = props.src.split("/");
const blockHeight = props.blockHeight ?? "final";
const data = 
    props.data ?? 
    Social.get(`${accountId}/agent/${agentName}/**`, blockHeight) ?? 
    {};
const tags = props.tags 
    ? Object.keys(props.data.tags || {})
    : Object.keys(data.tags || {});

const detailsUrl = `/root.near/widget/AgentChat?src=${accountId}/agent/${agentName}`;
const accountUrl = `/near/widget/ProfilePage?accountId=${accountId}`;

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
`;

const TextLink = styled("Link")`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;

  i {
    margin-right: 3px;
  }
`;

const Wrapper = styled.div`
.message {
  border-radius: 2rem;  
  border: 1px solid rgb(222, 226, 230);
  padding: 1em;
  margin-bottom: 1em;

  &.system {
    margin-right: 5em;
  }

  &.system:before {
    content: "AI";
    color: #999;
  }

  &.user {
    margin-left: 5em;
  }


  p:last-child {
    margin-bottom: 0;
  }
}
`;

console.log(data);

return (<Wrapper>
    <Card>
        <TextLink href={detailsUrl} bold ellipsis>
            {data.name || agentName}
        </TextLink>

        <TextLink small href={accountUrl} ellipsis>
            @{accountId}
        </TextLink>

        <Text bold ellipsis>
            {data.description}
        </Text>
    </Card>
</Wrapper>);