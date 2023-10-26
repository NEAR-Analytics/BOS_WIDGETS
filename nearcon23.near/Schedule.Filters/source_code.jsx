const ownerId = "nearcon23.near";

initState({
  filterOn: false,
  state: "",
});

const Filter = styled.div`
  border: 10px solid black;
  width: 100%;
  padding: 10px;
  padding-top:15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr); 
  }
  gap: 10px;
`;

const ShowInMobile = styled.button`
 @media only screen and (min-width: 800px) {
    display:none;
  }
    width: 100%;

  border-width:0px;
  background-color: transparent;
`;

const HideInMobile = styled.div`
 @media only screen and (max-width: 800px) {
    display:none;
}
`;

const allSelected = (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.CheckboxSelect`}
      props={{
        value: state.persona,
        error: state.personaError,
        label: "All Tracks",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            style={{ marginTop: 4 }}
            viewBox="0 0 18 16"
            fill="none"
          >
            <path
              d="M14.875 9.8125C14.2936 9.81332 13.7267 9.99395 13.252 10.3296C12.7773 10.6653 12.418 11.1396 12.2234 11.6875H4.875C4.29484 11.6875 3.73844 11.457 3.3282 11.0468C2.91797 10.6366 2.6875 10.0802 2.6875 9.5C2.6875 8.91984 2.91797 8.36344 3.3282 7.9532C3.73844 7.54297 4.29484 7.3125 4.875 7.3125H12.375C13.2867 7.3125 14.161 6.95034 14.8057 6.30568C15.4503 5.66102 15.8125 4.78668 15.8125 3.875C15.8125 2.96332 15.4503 2.08898 14.8057 1.44432C14.161 0.799664 13.2867 0.4375 12.375 0.4375H4.875C4.62636 0.4375 4.3879 0.536272 4.21209 0.712087C4.03627 0.887903 3.9375 1.12636 3.9375 1.375C3.9375 1.62364 4.03627 1.8621 4.21209 2.03791C4.3879 2.21373 4.62636 2.3125 4.875 2.3125H12.375C12.7894 2.3125 13.1868 2.47712 13.4799 2.77015C13.7729 3.06317 13.9375 3.4606 13.9375 3.875C13.9375 4.2894 13.7729 4.68683 13.4799 4.97985C13.1868 5.27288 12.7894 5.4375 12.375 5.4375H4.875C3.79756 5.4375 2.76425 5.86551 2.00238 6.62738C1.24051 7.38925 0.8125 8.42256 0.8125 9.5C0.8125 10.5774 1.24051 11.6108 2.00238 12.3726C2.76425 13.1345 3.79756 13.5625 4.875 13.5625H12.2234C12.3953 14.0486 12.6975 14.4782 13.097 14.8041C13.4965 15.1301 13.978 15.34 14.4887 15.4108C14.9994 15.4817 15.5198 15.4107 15.993 15.2058C16.4661 15.0008 16.8738 14.6698 17.1715 14.2488C17.4692 13.8278 17.6454 13.333 17.6809 12.8186C17.7164 12.3042 17.6098 11.7899 17.3728 11.332C17.1357 10.8741 16.7774 10.4902 16.3368 10.2222C15.8963 9.95422 15.3906 9.81248 14.875 9.8125ZM14.875 13.5625C14.6896 13.5625 14.5083 13.5075 14.3542 13.4045C14.2 13.3015 14.0798 13.1551 14.0089 12.9838C13.9379 12.8125 13.9193 12.624 13.9555 12.4421C13.9917 12.2602 14.081 12.0932 14.2121 11.9621C14.3432 11.831 14.5102 11.7417 14.6921 11.7055C14.874 11.6693 15.0625 11.6879 15.2338 11.7589C15.4051 11.8298 15.5515 11.95 15.6545 12.1042C15.7575 12.2583 15.8125 12.4396 15.8125 12.625C15.8125 12.8736 15.7137 13.1121 15.5379 13.2879C15.3621 13.4637 15.1236 13.5625 14.875 13.5625Z"
              fill="#868682"
            />
          </svg>
        ),
        options: [
          { id: "developer", label: "Developer", color: "#7269E1" },
          { id: "entrepreneur", label: "Entrepreneur", color: "#0DAEBB" },
          { id: "creative", label: "Creative", color: "#04A46E" },
          { id: "regulator", label: "Regulator", color: "#F44738" },
          { id: "ai", label: "AI is NEAR", color: "#000000" },
        ],
        onChange: (persona) => {
          const objectToSet = Object.entries(persona)
            .filter(([item, item2]) => item2 === true)
            .map(([item]) => item);
          props?.update?.({
            track: objectToSet.length === 0 ? null : objectToSet,
          });
          State.update({ persona });
        },
        validate: () => {
          if (!state.persona) {
            State.update({
              personaError: "Please select a persona",
            });
            return;
          }

          State.update({ personaError: "" });
        },
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.CheckboxSelect`}
      props={{
        value: state.persona,
        error: state.personaError,
        label: "All Venues",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="18"
            viewBox="0 0 21 18"
            fill="none"
          >
            <path
              d="M19.25 15.9375H18.3125V7.50004C18.3125 7.08564 18.1479 6.68821 17.8549 6.39519C17.5618 6.10216 17.1644 5.93754 16.75 5.93754H13.9375V2.50004C13.9374 2.23738 13.8711 1.97899 13.7447 1.74874C13.6183 1.51849 13.4359 1.32381 13.2144 1.18271C12.9928 1.04161 12.7393 0.958637 12.4772 0.941457C12.2151 0.924276 11.9529 0.973445 11.7148 1.08442L3.58984 4.87661C3.32055 5.00276 3.09271 5.20293 2.93293 5.45374C2.77315 5.70454 2.68803 5.99564 2.6875 6.29301V15.9375H1.75C1.50136 15.9375 1.2629 16.0363 1.08709 16.2121C0.911272 16.3879 0.8125 16.6264 0.8125 16.875C0.8125 17.1237 0.911272 17.3621 1.08709 17.538C1.2629 17.7138 1.50136 17.8125 1.75 17.8125H19.25C19.4986 17.8125 19.7371 17.7138 19.9129 17.538C20.0887 17.3621 20.1875 17.1237 20.1875 16.875C20.1875 16.6264 20.0887 16.3879 19.9129 16.2121C19.7371 16.0363 19.4986 15.9375 19.25 15.9375ZM16.4375 7.81254V15.9375H13.9375V7.81254H16.4375ZM4.5625 6.49145L12.0625 2.99223V15.9375H4.5625V6.49145ZM10.8125 8.75004V9.68754C10.8125 9.93618 10.7137 10.1746 10.5379 10.3505C10.3621 10.5263 10.1236 10.625 9.875 10.625C9.62636 10.625 9.3879 10.5263 9.21209 10.3505C9.03627 10.1746 8.9375 9.93618 8.9375 9.68754V8.75004C8.9375 8.5014 9.03627 8.26295 9.21209 8.08713C9.3879 7.91132 9.62636 7.81254 9.875 7.81254C10.1236 7.81254 10.3621 7.91132 10.5379 8.08713C10.7137 8.26295 10.8125 8.5014 10.8125 8.75004ZM7.6875 8.75004V9.68754C7.6875 9.93618 7.58873 10.1746 7.41291 10.3505C7.2371 10.5263 6.99864 10.625 6.75 10.625C6.50136 10.625 6.2629 10.5263 6.08709 10.3505C5.91127 10.1746 5.8125 9.93618 5.8125 9.68754V8.75004C5.8125 8.5014 5.91127 8.26295 6.08709 8.08713C6.2629 7.91132 6.50136 7.81254 6.75 7.81254C6.99864 7.81254 7.2371 7.91132 7.41291 8.08713C7.58873 8.26295 7.6875 8.5014 7.6875 8.75004ZM7.6875 12.8125V13.75C7.6875 13.9987 7.58873 14.2371 7.41291 14.413C7.2371 14.5888 6.99864 14.6875 6.75 14.6875C6.50136 14.6875 6.2629 14.5888 6.08709 14.413C5.91127 14.2371 5.8125 13.9987 5.8125 13.75V12.8125C5.8125 12.5639 5.91127 12.3254 6.08709 12.1496C6.2629 11.9738 6.50136 11.875 6.75 11.875C6.99864 11.875 7.2371 11.9738 7.41291 12.1496C7.58873 12.3254 7.6875 12.5639 7.6875 12.8125ZM10.8125 12.8125V13.75C10.8125 13.9987 10.7137 14.2371 10.5379 14.413C10.3621 14.5888 10.1236 14.6875 9.875 14.6875C9.62636 14.6875 9.3879 14.5888 9.21209 14.413C9.03627 14.2371 8.9375 13.9987 8.9375 13.75V12.8125C8.9375 12.5639 9.03627 12.3254 9.21209 12.1496C9.3879 11.9738 9.62636 11.875 9.875 11.875C10.1236 11.875 10.3621 11.9738 10.5379 12.1496C10.7137 12.3254 10.8125 12.5639 10.8125 12.8125Z"
              fill="#868682"
            />
          </svg>
        ),
        options: (props?.locations ?? []).map((item) => ({
          label: item,
          id: item,
        })),
        onChange: (persona) => {
          const objectToSet = Object.entries(persona)
            .filter(([item, item2]) => item2 === true)
            .map(([item]) => item);
          props?.update?.({
            venue: objectToSet.length === 0 ? null : objectToSet,
          });
          State.update({ persona });
        },
        validate: () => {
          if (!state.persona) {
            State.update({
              personaError: "Please select a persona",
            });
            return;
          }

          State.update({ personaError: "" });
        },
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.CheckboxSelect`}
      props={{
        value: state.persona,
        error: state.personaError,
        label: "All Dates",
        options: [
          { id: "Nov 6", label: "Nov 6" },
          { id: "Nov 7", label: "Nov 7" },
          { id: "Nov 8", label: "Nov 8" },
          { id: "Nov 9", label: "Nov 9" },
          { id: "Nov 10", label: "Nov 10" },
        ],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="18"
            style={{ marginTop: 1 }}
            viewBox="0 0 17 18"
            fill="none"
          >
            <path
              d="M15 2.1875H13.4375V1.875C13.4375 1.62636 13.3387 1.3879 13.1629 1.21209C12.9871 1.03627 12.7486 0.9375 12.5 0.9375C12.2514 0.9375 12.0129 1.03627 11.8371 1.21209C11.6613 1.3879 11.5625 1.62636 11.5625 1.875V2.1875H5.9375V1.875C5.9375 1.62636 5.83873 1.3879 5.66291 1.21209C5.4871 1.03627 5.24864 0.9375 5 0.9375C4.75136 0.9375 4.5129 1.03627 4.33709 1.21209C4.16127 1.3879 4.0625 1.62636 4.0625 1.875V2.1875H2.5C2.0856 2.1875 1.68817 2.35212 1.39515 2.64515C1.10212 2.93817 0.9375 3.3356 0.9375 3.75V16.25C0.9375 16.6644 1.10212 17.0618 1.39515 17.3549C1.68817 17.6479 2.0856 17.8125 2.5 17.8125H15C15.4144 17.8125 15.8118 17.6479 16.1049 17.3549C16.3979 17.0618 16.5625 16.6644 16.5625 16.25V3.75C16.5625 3.3356 16.3979 2.93817 16.1049 2.64515C15.8118 2.35212 15.4144 2.1875 15 2.1875ZM4.0625 4.0625C4.0625 4.31114 4.16127 4.5496 4.33709 4.72541C4.5129 4.90123 4.75136 5 5 5C5.24864 5 5.4871 4.90123 5.66291 4.72541C5.83873 4.5496 5.9375 4.31114 5.9375 4.0625H11.5625C11.5625 4.31114 11.6613 4.5496 11.8371 4.72541C12.0129 4.90123 12.2514 5 12.5 5C12.7486 5 12.9871 4.90123 13.1629 4.72541C13.3387 4.5496 13.4375 4.31114 13.4375 4.0625H14.6875V5.9375H2.8125V4.0625H4.0625ZM2.8125 15.9375V7.8125H14.6875V15.9375H2.8125Z"
              fill="#868682"
            />
          </svg>
        ),
        onChange: (persona) => {
          const objectToSet = Object.entries(persona)
            .filter(([item, item2]) => item2 === true)
            .map(([item]) => item);
          props?.update?.({
            dates: objectToSet.length === 0 ? null : objectToSet,
          });
          State.update({ persona });
        },
        validate: () => {
          if (!state.persona) {
            State.update({
              personaError: "Please select a persona",
            });
            return;
          }

          State.update({ personaError: "" });
        },
      }}
    />
  </>
);

return (
  <div>
    <HideInMobile>
      <Filter>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Widget
            src={`${ownerId}/widget/Inputs.Search`}
            props={{
              placeholder: "Search schedule...",
              value: state.search,
              onChange: (e) => {
                props.update({ search: e });
                State.update({ search: e });
              },
            }}
          />
        </div>
        {allSelected}
      </Filter>
    </HideInMobile>
    <ShowInMobile>
      <Filter style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Widget
            src={`${ownerId}/widget/Inputs.Search`}
            props={{
              placeholder: "Search schedule...",
              value: state.search,
              onChange: (e) => {
                props.update({ search: e });
                State.update({ search: e });
              },
            }}
          />
          <button
            onClick={() => {
              State.update({ filterOn: !state.filterOn });
            }}
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              marginBottom: 6,
            }}
          >
            <Widget src={`${ownerId}/widget/Icons.Filter`} />
          </button>
        </div>
        {state.filterOn ? allSelected : null}
      </Filter>
    </ShowInMobile>
  </div>
);
