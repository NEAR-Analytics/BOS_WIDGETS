const title = props.title;
const isActive = props.isActive;
const mode = Storage.get("mode") || props.mode;

const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);

const Container = styled.div`
  display: flex;
  margin-left: 8px;
  align-items: center;
  div {
    transition: all 500ms ease-in-out;
  }
  span {
    ${typographyClasses["p-med-130"]}
    color: ${(props) => (props.mode === "dark" ? "#fff" : "")} !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  > div {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    color: ${(props) => (props.mode === "dark" ? "white" : "black")};
    white-space: nowrap;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    cursor: pointer;
    :focus {
      /* blue-300 blue-100 bg-blue-300-15 g-blue-100-35 */
      box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow, 0 0 #0000);
    }
  }
  .active {
    background: ${`var(--mb-red-${(props) =>
      props.mode === "dark" ? "15" : "35"})`};
    color: var(--mb-red);
    :focus {
      --tw-ring-color: rgba(255, 36, 36, var(--tw-ring-opacity));
    }
  }
  :hover {
    > div {
      background: ${(props) =>
        props.mode === "dark" ? "var(--blue-100-15)" : "var(--blue-300-15)"};
      div {
        div {
          rotate: 180deg;
        }
      }
    }
  }
`;

const iconStyles = `
    display: flex; 
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    transition-duration: 500ms; 
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
    --transform-rotate: 0; 
`;

const MbArrowMenu = (props) => {
  return (
    <Wrapper mode={props.mode}>
      <div className={props.isActive ? "active" : ""}>
        <Container mode={mode}>
          <span>{props.title}</span>
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              name: "arrow_drop_down",
              cutomStyle: iconStyles,
              color: `black dark:text-white group-hover:text-blue-300 dark:group-hover:text-blue-100`,
              size: "16px",
              mode: props.mode,
            }}
          />
        </Container>
      </div>
    </Wrapper>
  );
};

return { MbArrowMenu };
