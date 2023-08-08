let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/2122b458-2138-4d4b-b030-efa784fc04d3/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));

let Style = styled.div`

          `;

let nodes = rawData.body || [];

const sub_widget_map = {
  "Play Ember": "https://nearatlas.com/#/y3k.near/widget/WAU_PlayEmber",
};

function formatPercentNew(text) {
  let number = parseFloat(text);
  return <span className="text-white">{number}%</span>;
}

function formatNumber(num) {
  return (
    <span className="text-white">
      {num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </span>
  );
}

function formatNumberDecimal(text) {
  let number = parseInt(text);
  return (
    <span className="text-white">
      {number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </span>
  );
}

function formatCell(text) {
  return (
    <a
      href={
        "https://nearatlas.com/#/y3k.near/widget/NEART.ATLAS.DETAILED_PROJECT_DASHBOARD?project_name=" +
        text
      }
      className="text-warning text-wrap "
    >
      {text}
    </a>
  );
}

function formatText(text) {
  let number = parseFloat(text);
  if (number < 0) {
    return <span className="text-danger">{number}%</span>;
  } else if (number > 0) {
    return <span className="text-success">{number}%</span>;
  } else {
    return <span className="text-warning">{number}%</span>;
  }
}

// const data = {
//   nodes: nodes,
// };

// const COLUMNS = [
//   {
//     label: <p className="text-center text-white text-wrap">Project</p>,
//     renderCell: (item) => formatCell(item["Contract Address"]),
//     sort: { sortKey: "ContractAddress" },
//   },
//   {
//     label: <p className="text-center text-white text-wrap ">Past 30 Days</p>,
//     renderCell: (item) => formatNumber(item["Past 30 Days"]),
//     sort: { sortKey: "Past 30 Days" },
//   },
//   {
//     label: <p className="text-center text-white text-wrap ">Last Month</p>,
//     renderCell: (item) => formatNumber(item["30-60 Days Ago"]),
//     sort: { sortKey: "30-60 Days Ago" },
//   },
//   {
//     label: <p className="text-center text-white text-wrap ">M/M</p>,
//     renderCell: (item) => formatText(item["M/M"]),
//     sort: { sortKey: "M/M" },
//   },
//   {
//     label: <p className="text-center text-white text-wrap ">New MAAs</p>,
//     renderCell: (item) => formatNumber(item["New MAAs"]),
//     sort: { sortKey: "New MAAs" },
//   },
//   {
//     label: <p className="text-center text-white text-wrap ">M2 Retention</p>,
//     renderCell: (item) => formatPercentNew(item["M2 Retention"]),
//     sort: { sortKey: "M2 Retention" },
//   },

//   {
//     label: <p className="text-center text-white text-wrap ">Average DAU</p>,
//     renderCell: (item) => formatNumberDecimal(item["Daily Average"]),
//     sort: { sortKey: "Daily Average" },
//   },

//   {
//     label: <p className="text-center text-white text-wrap ">Stickiness</p>,
//     renderCell: (item) => formatPercentNew(item["DAU / MAU"]),
//     sort: { sortKey: "DAU / MAU" },
//   },
// ];
// const sortFns = {
//   ContractAddress: (array) =>
//     array.sort((a, b) =>
//       a["Contract Address"].localeCompare(b["Contract Address"])
//     ),
//   "Past 30 Days": (array) =>
//     array.sort((a, b) => a["Past 30 Days"] - b["Past 30 Days"]),
//   "30-60 Days Ago": (array) =>
//     array.sort((a, b) => a["30-60 Days Ago"] - b["30-60 Days Ago"]),
//   "M/M": (array) => array.sort((a, b) => a["M/M"] - b["M/M"]),
//   "New MAAs": (array) => array.sort((a, b) => a["New MAAs"] - b["New MAAs"]),
//   "M2 Retention": (array) =>
//     array.sort((a, b) => a["M2 Retention"] - b["M2 Retention"]),
//   "Daily Average": (array) =>
//     array.sort((a, b) => a["Daily Average"] - b["Daily Average"]),
//   "DAU / MAU": (array) => array.sort((a, b) => a["DAU / MAU"] - b["DAU / MAU"]),
// };

const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    Cell: AvatarCell,
    imgAccessor: "imgUrl",
    emailAccessor: "email",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: StatusPill,
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Role",
    accessor: "role",
    Filter: SelectColumnFilter, // new
    filter: "includes",
  },
];

const data = [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: "Active",
    role: "Admin",
    age: 27,
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
    department: "Intranet",
    status: "Inactive",
    role: "Owner",
    age: 43,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Forward Response Developer",
    department: "Directives",
    status: "Active",
    role: "Member",
    age: 32,
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    department: "Program",
    status: "Offline",
    role: "Member",
    age: 29,
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lean Implementation Liaison",
    department: "Mobility",
    status: "Inactive",
    role: "Admin",
    age: 36,
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    title: "Internal Applications Engineer",
    department: "Security",
    status: "Active",
    role: "Member",
    age: 24,
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

return (
  <div className="text-bg-dark rounded-4 mb-12">
    {data !== null ? (
      <div className="bg-dark">
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
              <h1 className="text-xl font-semibold">
                React Table + Tailwind CSS = ❤
              </h1>
            </div>
            <div className="mt-6">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
