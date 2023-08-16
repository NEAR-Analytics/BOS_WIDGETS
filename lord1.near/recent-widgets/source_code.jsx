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
  if (titleInput.length > 40) {
    return (title = titleInput.substring(0, 40) + "...");
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
background:${props.tabelBackground};
 td,  th {
  border: none;

  padding: 8px;
  font-size:13px
}
 tr:nth-child(even){background-color:${props.evenBackground};}

 tr:hover {background-color:${props.hoverBackground};  
  transform:scale(1.01);
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
                    href={`/mob.near/widget/ProfilePage?accountId=${data.SIGNER_ID}`}
                  >
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{ accountId: data.SIGNER_ID }}
                    />
                  </Link>
                </td>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: props.idColor }}
                    href={`/mob.near/widget/ProfilePage?accountId=${data.SIGNER_ID}`}
                  >
                    {onHandelId(data.SIGNER_ID)}
                  </Link>
                </td>
                <td style={{ color: props.widgetNameColor }}>
                  {onHandelTitle(data.WIDGET_NAME)}
                </td>
                <td style={{ color: props.dateColor }}>
                  {onHandelDate(data.DATE)}
                </td>
                <td>
                  <a href={data.WIDGET_URL}>
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9167 5.25001L12.9167 1.75001M12.9167 1.75001H9.41674M12.9167 1.75001L7.66675 7M6.50008 1.75H5.21675C4.23666 1.75 3.74661 1.75 3.37226 1.94074C3.04298 2.10852 2.77527 2.37623 2.60749 2.70552C2.41675 3.07986 2.41675 3.56991 2.41675 4.55V9.45C2.41675 10.4301 2.41675 10.9201 2.60749 11.2945C2.77527 11.6238 3.04298 11.8915 3.37226 12.0593C3.74661 12.25 4.23666 12.25 5.21675 12.25H10.1167C11.0968 12.25 11.5869 12.25 11.9612 12.0593C12.2905 11.8915 12.5582 11.6238 12.726 11.2945C12.9167 10.9201 12.9167 10.4301 12.9167 9.45V8.16667"
                        stroke="#806ce1"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            );
          })
        : "loading ..."}
    </TableParent>
  </div>
);
