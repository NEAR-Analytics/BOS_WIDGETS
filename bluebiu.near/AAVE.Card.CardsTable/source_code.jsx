const { headers, data, config, noDivider } = props;

if (!headers || !data) {
  return null;
}

const CardsTable = styled.div`
  margin-top: 20px;
  padding: 0 20px;

  width: 100%;

  table {
    width: 100%;
    text-align: left;
  }

  thead {
    color: var(--agg-primary-color, #777790);
    font-size: 14px;
    font-weight: normal;
    th {
      padding: 10px 8px;
      font-size: 16px;
      font-weight: normal;
      color: #6f6f6f;
    }
  }
  tbody {
    border: 1px solid var(--agg-border-color, transparent);
    tr {
      border-bottom: 1px solid var(--agg-border-color, transparent);
      &:hover {
        background-color: var(--agg-hover-color, transparent);
      }
      &:last-child {
        border-bottom: none;
      }
      td {
        padding: 14px 8px;
        color: var(--agg-primary-color, #fff);
      }
    }
  }

  display: none;
  @media (min-width: 640px) {
    display: table;
  }
`;
return (
  <>
    {noDivider ? null : (
      <Widget src={`${config.ownerId}/widget/AAVE.Card.Divider`} />
    )}

    <CardsTable>
      <table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rows, idx) => (
            <tr key={idx}>
              {rows.map((data, idx) => (
                <td key={idx}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </CardsTable>
  </>
);
