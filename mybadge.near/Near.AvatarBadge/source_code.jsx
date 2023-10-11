const size = props.size ?? "small"; // 'small' | 'medium'

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--colors-pure-white, #fff);

    ${
      size === "small"
        ? `
        width: 13px;
        height: 13px;
        border-radius: 13px;
    `
        : ""
    }

    ${
      size === "medium"
        ? `
        width: 32px;
        height: 32px;
        border-radius: 20px;
        border: 2px solid #222;

        > * {
            width: 18px;
            height: 18px;
        }
    `
        : ""
    }
`;

return (
  <IconWrapper>
    <Widget src="mybadge.near/widget/Near.LogoIcon" />
  </IconWrapper>
);
