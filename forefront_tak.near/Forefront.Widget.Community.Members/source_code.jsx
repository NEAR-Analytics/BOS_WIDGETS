const themeColor = props.themeColor;

const projecttheme = {
  height: "130px",
  align: "center",
  description: " ",
  brand: "Community",
  fontsize: "40px",
  fontweight: "40px",
  afterbrand: "Board",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const projectthemes = {
  height: "130px",
  align: "center",
  description:
    "Feel free to share your thoughts with us. You can support us by donating and sending along a message with your contribution.",
  brand: "Your voice ",
  fontsize: "35px",
  fontweight: "40px",
  afterbrand: "matters",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const queryHashes = [
  { id: 1, hash: "df1506b2-17b5-44cf-b6d7-f05191d0d4fa" }, //leaderboard
  { id: 2, hash: "ae038dd1-f663-4661-8e91-bf2499a7f4a4" }, // massage
];

State.init({
  light: true,
  data: [],
  isLoading: true,
  error: [],
});

const formatNumber = (num) => {
  if ((num ?? NaN) === NaN) return "-";
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toFixed(4);
};

const handleData = () => {
  const data = {};
  const errors = [];
  queryHashes.forEach(({ hash, id }) => {
    const result = fetchData(hash);
    if (result.error) errors.push(`hash${id} : ${result.error}`);
    data[`hash${id}`] = {
      ...result,
      id,
    };
  });

  if (Object.values(data).every((d) => !d.isLoading)) {
    State.update({
      data: data,
      error: [...state.error, ...errors],
      isLoading: false,
    });
  }
};

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

if (state.isLoading) {
  handleData();
}

if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

return (
  <div className="container-fluid py-2">
    <div className="pl-2">
      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={projecttheme} />
        <div className="row g-4 w-100 pb-2 mx-0">
          <div className="col-12">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash1?.data,
                  columns: [
                    { title: "User", key: "Donor" },
                    { title: "Twitter", key: "TWITTER" },
                    { title: "Telegram", key: "TELEGRAM" },
                    { title: "Role", key: "ROLE" },
                    { title: "Discord", key: "DISCORD_HANDLE" },
                    {
                      title: "Donated (near)",
                      key: "Donated (near)",
                      description:
                        "the amount of near token donated to Forefront tak 👉  matched donation[Public round]",
                    },
                    {
                      title: "Donations",
                      key: "Donations",
                      description:
                        "Number of donations to Forefront tak (transactions) 👉  matched donation[Public round]",
                    },
                    {
                      title: "Current value of donation (USD)",
                      key: "current_usd",
                      description:
                        "Current value of the daonation in USD 👉  matched donation[Public round]",
                    },
                  ],
                  rowsCount: 15,
                }}
              />
            </div>
          </div>
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={projectthemes}
          />

          <div className="col-12">
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className="shadow-sm rounded-2 overflow-auto"
            >
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: { table_pagination: themeColor.table_pagination },
                  data: state.data?.hash2?.data,
                  columns: [
                    { title: "User", key: "Donor" },
                    { title: "Twitter", key: "TWITTER" },
                    { title: "Role", key: "ROLE" },
                    { title: "Message", key: "message" },
                    {
                      title: "Donated (near)[Public round]",
                      key: "Donated (near)",
                    },
                  ],
                  rowsCount: 15,
                }}
              />
            </div>
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
