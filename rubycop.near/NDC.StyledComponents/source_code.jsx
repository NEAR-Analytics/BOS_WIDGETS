const { Button } = props;

const StyledButton = styled.button`
  padding: ${(props) => (props.size === "sm" ? "4px 12px" : "8px 20px")};
  font-size: ${(props) => (props.size === "sm" ? "12px" : "14px")};
  border-radius: 10px;
  font-weight: 500;
  line-height: 24px;
  border: 0;

  &.primary {
    background: #FFD50D;

    &.dark {
      color: #fff;
      background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid #FFD50D;
  }

  &:disabled {
    background: rgb(255 234 119);
  }

  i {
    margin: 0 0 0 5px;
    &:before { vertical-align: -0.2rem; }
  }
`;

const Container = styled.div`
  button {
    margin-bottom:10px;
  }
`;

const RenderButton = (props) => (
  <StyledButton
    size={props.size}
    className={`align-items-center d-flex ${props.className ?? "primary"}`}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <div>{props.text}</div>
    {props.icon && (
      <div className={`${props.size === "sm" ? "fs-7" : "fs-5"}`}>
        {props.icon}
      </div>
    )}
  </StyledButton>
);

if (Button)
  return (
    <RenderButton
      size={Button.size}
      className={Button.className}
      onClick={Button.onClick}
      disabled={Button.disabled}
      text={Button.text}
      icon={Button.icon}
    />
  );

return (
  <Container>
    <h4>Buttons</h4>
    <RenderButton text="Primary" />
    <RenderButton
      text="Primary with Icon"
      icon={<i class="bi bi-check-lg"></i>}
    />
    <RenderButton disabled={true} text="Primary disabled" />
    <RenderButton size="sm" text="Primary small" />

    <RenderButton className="secondary" text="Secondary" />
    <RenderButton
      className="secondary"
      text="Secondary with Icon"
      icon={<i class="bi bi-check-lg"></i>}
    />
    <RenderButton
      className="secondary"
      disabled={true}
      text="Secondary disabled"
    />
    <RenderButton className="secondary" size="sm" text="Secondary small" />
  </Container>
);
