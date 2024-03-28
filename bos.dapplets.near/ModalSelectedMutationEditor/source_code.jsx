const SelectedMutationEditorWrapper = styled.div`
display: flex;
flex-direction: column;
top: 217px;
left: 760px;
padding: 20px;
gap: 20px;
border-radius: 10px;
border: 1px solid #02193A;
background: #F8F9FF;
width: 400px;
max-height: 646px;
`;

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M21 9L9 21"
      stroke="#02193A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 9L21 21"
      stroke="#02193A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const iconEdit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 18H19"
      stroke="#7A818B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.2504 5.47176C15.5524 5.1697 15.9621 5 16.3893 5C16.6008 5 16.8103 5.04166 17.0057 5.12261C17.2011 5.20355 17.3787 5.32219 17.5282 5.47176C17.6778 5.62133 17.7964 5.79889 17.8774 5.99431C17.9583 6.18972 18 6.39917 18 6.61069C18 6.82221 17.9583 7.03166 17.8774 7.22708C17.7964 7.42249 17.6778 7.60006 17.5282 7.74962L8.03715 17.2407L5 18L5.75929 14.9629L15.2504 5.47176Z"
      stroke="#7A818B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
return (
  <div>
    <SelectedMutationEditorWrapper>
      <div>
        Some Mutation Name
        {closeIcon}
      </div>
      <div>search</div>
      <div>buttons</div>
    </SelectedMutationEditorWrapper>
  </div>
);
