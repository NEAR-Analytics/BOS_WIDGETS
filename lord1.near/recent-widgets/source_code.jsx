State.init({ data: null });
const dataFetch = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/75f440a7-2d00-434c-ada8-93a332f561ec/data/latest"
);
State.update({ data: dataFetch.body });

const onSaveData = (res) => {
  let data = res.data.rows;
  console.log(data, "Data");
};

const onHandelDate = (inputDate) => {
  let date = new Date(inputDate);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let createdAt;
  createdAt = day + " " + month + " " + year;
  return createdAt;
};
const onHandelTitle = (titleInput) => {
  let title;
  if (titleInput.length > 20) {
    return (title = titleInput.substring(0, 20) + "...");
  } else {
    return titleInput;
  }
};
const onHandelId = (id) => {
  let customId = "";
  if (id.length > 15) {
    customId += id.substring(0, 3);
    customId += "...";
    customId += id.substring(id.length - 3);
    return customId;
  } else {
    return id;
  }
};
const TableParent = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  width: 100%;

 td,  th {
  border: none;

  padding: 8px;
  font-size:15px
}
 tr:nth-child(even){background-color:#fff;}

 tr:hover {background-color:rgb(246, 246, 246);;
 transform:scale(1.05);
 transition:1s all;}

 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color:rgb(246, 246, 246);;
  color: white;
}`;
return (
  <div>
    <TableParent>
      {state.data
        ? state.data?.map((data) => {
            return (
              <tr>
                <td>
                  <Link
                    href={`https://near.social/mob.near/widget/ProfilePage?accountId=${data.SIGNER_ID}`}
                  >
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{ accountId: data.SIGNER_ID }}
                    />
                  </Link>
                </td>
                <td>
                  <Link
                    href={`https://near.social/mob.near/widget/ProfilePage?accountId=${data.SIGNER_ID}`}
                  >
                    {onHandelId(data.SIGNER_ID)}
                  </Link>
                </td>
                <td>{onHandelTitle(data.WIDGET_NAME)}</td>
                <td>{onHandelDate(data.DATE)}</td>
                <td>
                  <Link href={data.WIDGET_URL}>
                    <img
                      width={30}
                      src="https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg"
                    />
                  </Link>
                </td>
              </tr>
            );
          })
        : "loading ..."}
    </TableParent>
  </div>
);
