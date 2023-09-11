const Owner = "socializer.near";
const themeColor = props.themeColor;

const queryHashes = [
  { id: 1, hash: "148bbf87-cccb-4eb0-8f48-9fe5ae090631" },
  { id: 2, hash: "d18e6a5c-0dae-43d0-a718-0cfc84f60961" },
  { id: 3, hash: "52275624-3e5b-4a92-bcf4-5d9cffeb95e8" },
  { id: 4, hash: "2d64082a-11c1-46df-a59d-586083139870" },
  { id: 5, hash: "64936084-6069-4a6e-ad74-9e80914bedde" },
];

State.init({
  light: true,
  data: [
    {
      user: "test1",
      avatar: "",
      social: "Have you seen our monthly stats? With over 45 clien...",
      endsin: "Ends in 1hr 10m 50s",
      reward: "Ends in 1hr 10m 50s",
      total_reward: "10 Near",
      status: "live",
      engage: "link",
    },
  ],
  isLoading: true,
  error: [],
  tab: "first",
});

// api code start
// const handleData = () => {
//   const data = {};
//   const errors = [];
//   queryHashes.forEach(({ hash, id }) => {
//     const result = fetchData(hash);
//     if (result.error) errors.push(`hash${id} : ${result.error}`);
//     data[`hash${id}`] = {
//       ...result,
//       id,
//     };
//   });
//   console.log(data, "==>data");
//   if (Object.values(data).every((d) => !d.isLoading)) {
//     State.update({
//       data: data,
//       error: [...state.error, ...errors],
//       isLoading: false,
//     });
//   }
// };

const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};

// if (state.isLoading) {
//   handleData();
// }

if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}
// api code finish

const Container = styled.div`
  &&{text-align:center};
`;

return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div>
        <div className="content">
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="shadow-sm rounded-2 overflow-auto"
          >
            <Widget
              src={`${Owner}/widget/table-pagination`}
              props={{
                themeColor: { table_pagination: themeColor.table_pagination },
                data: state.data,
                columns: [
                  {
                    title: "Project/User",
                    key: "project",
                    description:
                      "The Near address of top Nominee (based on number of Nomination)",
                  },
                  {
                    title: "Near Social  Post",
                    key: "social",
                    description: "House Of Merit Nomination",
                  },
                  {
                    title: "Ends In",
                    key: "endsin",
                    description: "Transparency Commission Nomination",
                  },
                  {
                    title: "Reward",
                    key: "reward",
                    description: "Council Of Advisors Nomination",
                  },
                  {
                    title: "Total Rewards",
                    key: "total_reward",
                    description: "Total Nomination",
                  },
                  {
                    title: "Status",
                    key: "status",
                    description: "Nomination Not Revoked",
                  },
                  {
                    title: "Engage Link",
                    key: "engage",
                    description: "Nomination Revoked",
                  },
                ],
                rowsCount: 5,
              }}
            />
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        {state.error.length > 0 &&
          state.error.map((er) => (
            <div
              className="toast show align-items-center text-bg-danger border-0"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">{er}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

// const props = {
//   themeColor: {
//     dynamic_header: {
//       afterbrandcolor: "#789efb",
//       color1brand: "#000",
//       color2brand: "#806ce1",
//       colordescription: "#806ce1",
//       background:
//         "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
//     },
//     tab_sbt: {
//       backgroundColor: "rgb(49,62,89)",
//       textColor: "#fff",
//       headerColor: "#806ce1",
//       numberColor: "#fff",
//     },
//     sbt_area: {
//       section_bg: "rgba(25,33,80)",
//       card_bg: "rgb(49, 62, 89)",
//       card_title_color: "#806ce1",
//     },
//   },
// };
