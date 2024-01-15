const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding-left: 22px;
  padding-right: 24px;
`;

const { columns } = props;

return (
  <StyledHeader>
    {columns.map((column) => (
      <div key={column.key} style={{ width: column.width }}>
        {column.label}
      </div>
    ))}
  </StyledHeader>
);
