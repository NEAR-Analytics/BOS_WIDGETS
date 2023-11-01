const accountId = props.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;
const hideImage = props.hideImage;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !!props.fast || (!props.profile && accountId);

const name = profile.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

const Wrapper = styled.span`
  display: flex;
  gap: .6rem;
  .name{
     font-size: 16px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 0;
    line-height: 120%; /* 19.2px */
  }
  .address{
     overflow: hidden;
    color: #B0B0B0;
    text-align: justify;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 19.2px */
  }
  `;

const formattedAccountId =
  accountId &&
  `${
    accountId?.endsWith(".near")
      ? `@${
          accountId?.length > 20
            ? `${accountId?.slice(0, 10)}...${accountId?.slice(
                accountId?.length - 4
              )}`
            : `${accountId}`
        }`
      : `@${accountId?.slice(0, 10)}...${accountId?.slice(
          accountId?.length - 4
        )}`
  }`;

let inner = (
  <Wrapper>
    {!hideImage && (
      <Widget
        key="image"
        src="jgodwill.near/widget/CPlanet.MainPage.N.Post.Left"
        props={{
          fast,
          profile,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded-circle w-100 h-100 align-top",
        }}
      />
    )}
    <span>
      {!hideName && (
        <span className="name" key="name">
          {name}
        </span>
      )}
      <br />
      {!hideAccountId && (
        <p key="accountId" className="text-muted address d-block">
          {formattedAccountId}
        </p>
      )}
    </span>
  </Wrapper>
);

inner = link ? (
  <a
    href={
      link !== true
        ? link
        : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
    }
    className="link-dark text-truncate d-inline-flex"
  >
    {inner}
  </a>
) : (
  <span className="text-truncate d-inline-flex">{inner}</span>
);

// if (props.tooltip === true) {
//   return (
//     <Widget
//       src="jgodwill.near/widget/CPlanet.Profile.N.OverlayTrigger"
//       props={{ accountId, children: inner }}
//     />
//   );
// }
// if (tooltip) {
//   inner = (
//     <OverlayTrigger placement="auto" overlay={<Tooltip>{tooltip}</Tooltip>}>
//       {inner}
//     </OverlayTrigger>
//   );
// }

return inner;
