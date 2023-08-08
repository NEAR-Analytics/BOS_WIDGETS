const daoId = "marmaj-research.sputnik-dao.near"; // restrict posting to members of a DAO (Optional)
const groupId = "community" && "hackers"; // which group can post?

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const hashtags = [{ name: "bacinc", required: true }];

return (
  <Widget
    src="efiz.near/widget/Community.Posts"
    props={{
      communityHashtags: hashtags,
      communityDomain: "bac-inc.near",
      communityMembers: group[0],
      exclusive: true,
      allowPublicPosting: true,
    }}
  />
);
