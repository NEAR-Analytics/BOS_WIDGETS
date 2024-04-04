State.init({
  textSave: `Save`,
  isOpenParametersSave: false,
  parametersSave: ["Publish", "Commit to origin"],
});
const SelectedMutationEditorWrapper = styled.div`
display: flex;
flex-direction: column;
    position: absolute;
    top: 100px;
    left: 50%;
 transform: translateX(-50%);
padding: 20px;
gap: 20px;
border-radius: 10px;
border: 1px solid #02193A;
background: #F8F9FF;
width: 400px;
max-height: 646px;
`;

const HeaderEditor = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(2, 25, 58, 1);
    font-family: Roboto;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.09px;
    text-align: left;
    svg{
      margin-left: auto;
    }
`;
const ButtonsBlock = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonsRevert = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(226, 226, 229, 1);
    color: rgba(2, 25, 58, 1);
    width: 175px;
    height:42px;
    border-radius: 10px;
      font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20.86px;
text-align: center;
    `;
const ButtonsSave = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
      width: 175px;
    height:42px;
    border-radius: 10px;
    background: rgba(56, 75, 255, 1);
    color:#fff;
    font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20.86px;
text-align: center;
position: relative;

    `;
const TextSave = styled.div`
    display: inline-block;
    overflow: hidden;
    word-wrap: no-wrap;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0 10px;
    text-align: center;
    `;
const ArrowWrapper = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    margin-left: auto;
    .rotateIcon{
        transform: rotate(180deg);
    }
`;

const SaveChanges = styled.div`
position:absolute;
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
right: 0;
top:52px;
width: 179px;
height: 112px;
padding: 10px;
gap: 10px;
border-radius: 10px;
background:rgba(231, 236, 239, 1);
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20.86px;
text-align: center;
color: rgba(34, 34, 34, 1);

`;

const SaveChangesItem = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    width: 159px;
height:41px;
border-radius: 4px ; 
&:hover{
   background:rgba(217, 222, 225, 1); 
}
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

const arrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
  >
    <path
      d="M1 1L7 7L13 1"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
console.log(props.apps);
return (
  <div>
    <SelectedMutationEditorWrapper>
      <HeaderEditor>
        {props.mutationName}
        {closeIcon}
      </HeaderEditor>
      <div>
        {props.apps && props.apps.length
          ? props.apps.map((app, i) => (
              <Widget
                key={i}
                src="bos.dapplets.near/widget/ApplicationCard"
                props={{
                  src: app,
                }}
              />
            ))
          : null}
      </div>
      <ButtonsBlock>
        <ButtonsRevert>Revert changes</ButtonsRevert>
        <ButtonsSave>
          <TextSave>{state.textSave}</TextSave>
          <ArrowWrapper
            style={{
              transform: state.isOpenParametersSave
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
            onClick={() =>
              State.update({
                isOpenParametersSave: !state.isOpenParametersSave,
              })
            }
          >
            {arrow}
          </ArrowWrapper>
          {state.isOpenParametersSave ? (
            <SaveChanges>
              {state.parametersSave.map((x, i) => (
                <SaveChangesItem
                  onClick={() =>
                    State.update({
                      isOpenParametersSave: !state.isOpenParametersSave,
                      textSave: x,
                    })
                  }
                  key={i}
                >
                  {x}
                </SaveChangesItem>
              ))}
            </SaveChanges>
          ) : null}
        </ButtonsSave>
      </ButtonsBlock>
    </SelectedMutationEditorWrapper>
  </div>
);
