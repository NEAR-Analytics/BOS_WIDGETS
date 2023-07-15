const { Button } = props;

const StyledButton = styled.button`
  width: max-content;
  padding: ${(props) => (Button.size === "sm" ? "4px 12px" : "8px 20px")};
  height: ${(props) => (Button.size === "sm" ? "28px" : "")};
  font-size: ${(props) => (Button.size === "sm" ? "12px" : "14px")};
  border-radius: 10px;
  font-weight: 500;
  line-height: 24px;
  border: 0;

  &.danger {
    border: 1px solid #C23F38;
    background: #F1D6D5;
    color: #C23F38;
  }

  &.primary {
    background: #FFD50D;

    &:hover {
      background: #E7C211;
    }

    &.dark {
      color: #fff;
      background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);

      &:hover {
        background: linear-gradient(90deg, #792AC0 0%, #423ABD 100%);
      }
    }

    &:disabled {
      background: #C3CACE;
      color: #828688;
      border: 0;
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid;
    border-color: #FFD50D;
    color: #FFD50D;

    &:hover {
      border-color: #E7C211;
      color: #E7C211;
    }

    &.dark {
      color: #4F46E5;
      border-color: #4F46E5;

      &:hover {
        border-color: #2F2A87;
        color: #2F2A87;
      }
    }

    &:disabled {
      border-color: #C3CACE;
      color: #828688;
    }
  }

  i {
    margin: 0 0 0 5px;
    &:before { vertical-align: -0.2rem; }
  }
`;

const Container = styled.div`
  button {
    margin: 5px;
  }
`;

if (Button)
  return (
    <StyledButton
      size={Button.size}
      className={`align-items-center d-flex ${Button.className ?? "primary"}`}
      onClick={Button.onClick}
      disabled={Button.disabled}
    >
      <div>{Button.text}</div>
      {Button.icon && (
        <div className={`${Button.size === "sm" ? "fs-7" : "fs-5"}`}>
          {Button.icon}
        </div>
      )}
    </StyledButton>
  );

const WidgetButton = ({ size, className, disabled, text, icon }) => (
  <Widget
    src={"rubycop.near/widget/NDC.StyledComponents"}
    props={{
      Button: {
        size,
        className,
        disabled,
        text,
        icon,
      },
    }}
  />
);

return (
  <Container>
    <h4>Buttons</h4>
    <div className="d-flex align-items-end flex-wrap">
      <WidgetButton text="Primary" />
      <WidgetButton text="Primary" icon={<i class="bi bi-check-lg"></i>} />
      <WidgetButton
        text="Secondary"
        className="secondary"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton disabled text="Primary" />
      <WidgetButton disabled className="secondary" text="Secondary" />
      <WidgetButton size="sm" text="Primary" />
      <WidgetButton size="sm" className="secondary" text="Secondary" />
    </div>

    <div className="d-flex align-items-end flex-wrap">
      <WidgetButton text="Primary Dark" className="primary dark" />
      <WidgetButton
        text="Primary Dark"
        className="primary dark"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton
        text="Secondary Dark"
        className="secondary dark"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton disabled className="primary dark" text="Primary dark" />
      <WidgetButton disabled className="secondary dark" text="Secondary dark" />
      <WidgetButton size="sm" className="primary dark" text="Primary dark" />
      <WidgetButton
        size="sm"
        className="secondary dark"
        text="Secondary dark"
      />
    </div>

    <div className="d-flex align-items-end flex-wrap">
      <WidgetButton
        text="Danger"
        className="danger"
        icon={<i class="bi bi-trash-fill" />}
      />
    </div>
  </Container>
);
