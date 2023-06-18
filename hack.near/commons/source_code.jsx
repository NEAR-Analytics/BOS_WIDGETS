const accountId = context.accountId;

if (!accountId) {
  return <Widget src="mob.near/widget/ProfileOnboarding" />;
}

const data = accountId
  ? Social.get(`${accountId}/settings/dev/library`)
  : undefined;

if (data === null) {
  return "Loading...";
}

console.log(data);

const library = [
  {
    category: "Buttons",
    id: "buttons",
    icon: "bi-egg",
    components: [
      { accountId: "mob.near", widgetName: "CopyButton" },
      { accountId: "mob.near", widgetName: "CommentButton" },
      { accountId: "rubycop.near", widgetName: "NftVotingButton" },
      { accountId: "mob.near", widgetName: "LikeButton" },
      { accountId: "mob.near", widgetName: "LikeButton.Faces" },
      { accountId: "mob.near", widgetName: "FollowButton" },
      { accountId: "mob.near", widgetName: "NotificationButton" },
      { accountId: "mob.near", widgetName: "PokeButton" },
      { accountId: "peechz.near", widgetName: "TwitterFollowButton" },
    ],
  },
  {
    category: "Search",
    icon: "bi-search",
    id: "search",
    components: [
      { accountId: "mob.near", widgetName: "ComponentSearch" },
      { accountId: "mob.near", widgetName: "ComponentSearch.Item" },
      { accountId: "manzanal.near", widgetName: "SerchComponent" },
    ],
  },
  {
    category: "Time and Date",
    id: "time",
    icon: "bi-calendar",
    components: [{ accountId: "mob.near", widgetName: "TimeAgo" }],
  },
  {
    category: "Compose",
    id: "compose",
    icon: "bi-envelope-paper",
    components: [{ accountId: "mob.near", widgetName: "Common.Compose" }],
  },
  {
    category: "Markdown",
    id: "markdown",
    icon: "bi-markdown",
    components: [{ accountId: "mob.near", widgetName: "MarkdownEditorDemo" }],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [{ accountId: "mob.near", widgetName: "MetadataEditor" }],
  },
  {
    category: "Widget Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "mob.near", widgetName: "Explorer" },
      { accountId: "mob.near", widgetName: "WidgetHistory" },
      { accountId: "mob.near", widgetName: "WidgetSource" },
    ],
  },
];

return (
  <>
    <CommitButton data={{ settings: { dev: { library: data } } }}>
      Save
    </CommitButton>
    <hr />
    <p>{data}</p>
    <hr />
    <Widget src="hack.near/widget/dev.library" props={{ data: library }} />
  </>
);
