const ownerId = "contribut3.near";
const id = props.id ?? "links";
const label = props.label ?? "Input";
const value = props.value ?? {};
const onSave = props.onSave ?? (() => { });

const supportedLinks = [
  {
    name: "github",
    url: "https://github.com/",
  },
  {
    name: "discord",
    url: "https://discord.com/",
  },
  {
    name: "reddit",
    url: "https://reddit.com/u/",
  },
  {
    name: "twitter",
    url: "https://twitter.com/",
  },
  {
    name: "youtube",
    url: "https://youtube.com/",
  },
  {
    name: "website",
    url: "https://",
  },
];

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

const edit = (update, v) => (
  <>{supportedLinks
    .map(({ name, url }) => (
      <Widget src={`${ownerId}/widget/Inputs.Social`} props={{ start: url, value: v[name] ?? "", update: (s) => update({ ...v, [name]: s }) }} />
    ))}
    <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
  </>
);

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Viewable`}
    props={{
      id,
      label,
      value,
      edit,
      view: <Widget src={`${ownerId}/widget/SocialLinks`} props={{ links: value }} />,
    }}
  />
);
