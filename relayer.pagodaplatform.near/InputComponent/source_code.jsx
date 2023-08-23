const InputBar = styled.input`
display: flex;
width: 100%;
height: 60px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 8px;
background:none;
border: none;
border-radius: 8px;
background: var(--textcolourstyle, #E6DDF8);
outline: none;
padding: 8px;

::placeholder{
color: rgba(15, 22, 15, 0.70);
font-family: Open Sans;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 2;
}
`;

const InputLabel = styled.label`
color: red;

/* Bold text base semi bold */
font-family: Open Sans;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 22px; /* 137.5% */
`;

const InputContainer = styled.div`
  display:flex;
  flex-direction: column;
  gap:8px;
  
`;
console.log("props:", props);
console.log("props:");
const { key, value } = props;
return (
  <div>
    <InputLabel>{key}</InputLabel>
    <InputBar placeholder={value} />{" "}
  </div>
);
