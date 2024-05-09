const themeColor = props.themeColor;

const projecttheme = {
  height: "130px",
  align: "center",
  description: "Based on current month",
  brand: "Member'",
  fontsize: "40px",
  fontweight: "40px",
  afterbrand: "Monthly Status",
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
  description: "community accounts (in total)",
  brand: "Member'",
  fontsize: "40px",
  fontweight: "40px",
  afterbrand: "Status ",
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
  { id: 1, hash: "6e8a7751-4dff-4b7f-9edf-b35aa7ea4b3c" }, //members-30days
  { id: 2, hash: "82762826-ee41-4cb1-8b55-5aef9b48d560" }, //members-total-2
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
                    {
                      title: "Profile",
                      key: "signer",
                      profile: "yes",
                    },
                    {
                      title: "User",
                      key: "signer",
                    },
                    {
                      title: "Role",
                      key: "role",
                      colors: "#8b76f3",
                    },
                    {
                      title: "Community",
                      key: "community",
                      colors: "#8b76f3",
                    },
                    {
                      title: "Active days",
                      key: "active_days",
                      description: "Number of days the user has been active",
                    },
                    {
                      title: "Transactions",
                      key: "transactions",
                      description: "Total number of user' transactions",
                    },
                    {
                      title: "Volume",
                      key: "volume",
                      description: "Total volume of user transactions (Near)",
                    },
                    {
                      title: "Avg Volume",
                      key: "avg_volume_per_trx",
                      description: "Average volume of user transactions (Near)",
                    },
                    {
                      title: "Project",
                      key: "project",
                      description:
                        "The number of projects that the user has interacted with.",
                    },

                    {
                      title: "Social",
                      key: "social",
                      description:
                        "Total number of user' social transactions such as like, post, and etc.",
                    },
                    {
                      title: "Widget",
                      key: "widget",
                      description:
                        "The number of widgets that the user has created.",
                    },
                  ],
                  rowsCount: 10,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="my-4 shadow-sm  rounded-4"
        style={{ background: themeColor?.sbt_area?.section_bg }}
      >
        <Widget src="lord1.near/widget/header-dynamic" props={projectthemes} />
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
                  data: state.data?.hash2?.data,
                  columns: [
                    {
                      title: "Profile",
                      key: "signer",
                      profile: "yes",
                    },
                    {
                      title: "User",
                      key: "signer",
                    },
                    {
                      title: "Role",
                      key: "role",
                      colors: "#8b76f3",
                    },
                    {
                      title: "Community",
                      key: "community",
                      colors: "#8b76f3",
                    },
                    {
                      title: "First date",
                      key: "min_time",
                      description: "first day of activity",
                    },
                    {
                      title: "Last date",
                      key: "max_time",
                      description: "last day of activity",
                    },
                    {
                      title: "Active days",
                      key: "active_days",
                      description: "Number of days the user has been active",
                    },
                    {
                      title: "Active months",
                      key: "active_month",
                      description: "Number of months the user has been active",
                    },
                    {
                      title: "Active years",
                      key: "active_year",
                      description: "Number of years the user has been active",
                    },
                    {
                      title: "Transactions",
                      key: "transactions",
                      description: "Total number of user' transactions",
                      round: "yes",
                    },
                    {
                      title: "Volume",
                      key: "volume",
                      description: "Total volume of user transactions (Near)",
                      round: "yes",
                    },
                    {
                      title: "Avg Volume",
                      key: "avg_volume_per_trx",
                      description: "Average volume of user transactions (Near)",
                    },
                    {
                      title: "Project",
                      key: "project",
                      description:
                        "The number of projects that the user has interacted with.",
                    },

                    {
                      title: "Social",
                      key: "social",
                      description:
                        "Total number of user' social transactions such as like, post, and etc.",
                    },
                    {
                      title: "Widget",
                      key: "widget",
                      description:
                        "The number of widgets that the user has created.",
                    },
                  ],
                  rowsCount: 10,
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
