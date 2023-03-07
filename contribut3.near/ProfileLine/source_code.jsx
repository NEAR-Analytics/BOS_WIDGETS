const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const additionalText = props.additionalText;
const additionalRow = props.additionalRow;
const alignment = additionalRow ? "start" : "center";
const additionalColumn = props.additionalColumn;
const imageSize = props.imageSize;
const linkNavigate = () =>
  props.update({
    tab: isEntity ? "entity" : "contributor",
    accountId,
    content: "",
    search: "",
  });

State.init({
  data: null,
});

Near.asyncView(
  ownerId,
  isEntity ? "get_entity" : "get_contributor",
  { account_id: accountId },
  "final"
).then((data) => State.update({ data }));

const profile = Social.getr(`${accountId}/profile`);

const fullName = profile.name || state.data.name || accountId;
const href = `/#/${ownerId}/widget/Index?tab=${isEntity ? "entity" : "contributor"
  }&accountId=${accountId}`;

const ImageContainer = styled.div`
  margin: 0.5em;
`;

const ImageLink = styled.a`
  color: #667085;

  span {
    color: #687076;
    margin: 0 0.25em;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: between;
  align-items: flex-start;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: between;
  align-items: flex-start;
  flex-grow: 1;
`;

if (state.data || profile) {
  return (
    <div
      className={`d-flex flex-row justify-content-start align-items-${alignment}`}
    >
      <ImageLink href={href} onClick={linkNavigate}>
        <ImageContainer>
          <Widget
            src={`${ownerId}/widget/ProfileCircle`}
            props={{ accountId, size: imageSize, isEntity }}
          />
        </ImageContainer>
      </ImageLink>
      <Column>
        <Row>
          <div>
            <ImageLink href={href} onClick={linkNavigate}>
              <b>{fullName}</b>
              <span>@{accountId}</span>
            </ImageLink>
            {additionalText}
          </div>
        </Row>
        {additionalRow}
      </Column>
      {additionalColumn}
    </div>
  );
}
