const ErrorAlert = styled.div`
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 20px;
  font-weight: bold;

  :before {
    content: "⚠ "; /* This is a warning sign, but you can use any suitable symbol. */
  }
`;

return <ErrorAlert />;
