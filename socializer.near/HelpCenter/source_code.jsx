const HelpComponent = styled.div`
  display: flex;
  padding : 18px;
  width: 188px;
  height: 248px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  border: 0;
  color: white;
  background-color: #1e1e1e;
`;

return (
  <HelpComponent>
    <p>Suggestions</p>
    <p style={{ fontSize: 12, textAlign: "center", letterSpacing: "-0.24px" }}>
      Having Trouble in Learning. Please contact us for more questions.
    </p>
  </HelpComponent>
);
