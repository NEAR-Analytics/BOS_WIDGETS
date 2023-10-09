const data = Social.keys("*/widget", "final");

if (!data) {
  return "Loading...";
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  a {
    width: 3em;
    height: 3em;
    display: inline-block;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const builders = new Set([...Object.keys(data)]);

const accounts = Object.keys(data)
  .filter((accountId) => builders.has(accountId))
  .map((accountId) => (
    <a
      title={accountId}
      href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
    >
      <img
        loading="lazy"
        src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${accountId}`}
        alt={accountId}
      />
    </a>
  ));

return (
  <Wrapper>
    <h3>{accounts.length} Builders</h3>
    <div>{accounts}</div>
  </Wrapper>
);
