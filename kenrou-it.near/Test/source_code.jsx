const { accountId } = props;

if (!accountId) {
  return "accountId is not set";
}

const widgets = Social.keys(`${accountId}/widget/*`)[accountId].widget;

return (
  <>
    <h1>{accountId}´s widgets</h1>
    <table>
      <thead>
        <th>
          <td>Widget name</td>
          <td>Is deleted</td>
        </th>
      </thead>
      <tbody>
        {Object.keys(widgets).map((key) => {
          return (
            <tr>
              <td>{key}</td>
              <td>{widgets[key].toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);
