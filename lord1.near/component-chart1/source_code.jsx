const themeColor = props.themeColor;

const firsttheme = {
  height: "110px",
  align: "center",
  description: `Track the activity of Users in BOS development process`,
  brand: "Component Scan",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "",
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

const no_data = {
  height: "90px",
  align: "center",
  description: "",
  brand: "No data",
  fontsize: "75",
  fontweight: "25px",
  afterbrand: "available",
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

const getMixProps = (data, dateKey, serieses, colors, chartOption) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [d[dateKey] * 1000, d[series.key]]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },
    overrideOptions: {
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const groupedData = {};
  for (const item of data) {
    const keyValue = item[key];
    const valueValue = item[value];

    if (groupedData[keyValue]) {
      groupedData[keyValue] += valueValue;
    } else {
      groupedData[keyValue] = valueValue;
    }
  }

  const dataFormat = Object.entries(groupedData).map(
    ([groupKey, groupValue]) => [groupKey, groupValue]
  );

  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const noData = <div className="w-100 py-4 text-center"> No data available</div>;

let third = (
  <div className=" col-12 col-md-12">
    <span className=" col-12 col-md-4">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        >
          <i>Activity of User</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            props.secondData,
            ["name", "total"],
            themeColor.chartColor,
            {
              title: "",
              type: "pie",
              connector: true,
              legend: true,
            }
          )}
        />
      </div>
    </span>
    <div className="py-2"></div>
    <span className=" col-12 col-md-8">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            props.thirdData,
            "date",
            [
              {
                key: "total_trxs",
                seriesName: "Daily Transaction",
                type: "column",
                id: 1,
              },
              {
                key: "build_trxs",
                seriesName: "Daily Build Transaction",
                type: "column",
                id: 1,
              },
              {
                key: "update_trxs",
                seriesName: "Daily Update Transaction",
                type: "column",
                id: 1,
              },
              {
                key: "widget",
                seriesName: "Components",
                type: "column",
                id: 1,
              },
              {
                key: "cum_total_trxs",
                seriesName: "Total Transactions",
                type: "column",
                id: 2,
              },
              {
                key: "cum_update_trxs",
                seriesName: "Total Update Transaction",
                type: "column",
                id: 2,
              },
              {
                key: "cum_build_trxs",
                seriesName: "Total Build Transaction",
                type: "spline",
                id: 2,
              },
              {
                key: "cum_widget",
                seriesName: "Total Components",
                type: "spline",
                id: 2,
              },
            ],
            themeColor.chartColor,
            {
              title: "Daily Dev Activity",
              subtitle: `Number of daily transactions `,
              stacking: "normal",
            }
          )}
        />
      </div>
    </span>
  </div>
);

let second = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={firsttheme} />
    <div className="p-2 rounded-4 overflow-auto">
      {props.secondData.length > 0 ? (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: props.secondData,
            rowsCount: 10,
            columns: [
              { title: "Number", key: "rank", colors: "#806ce1" },
              {
                title: "Status",
                key: "status",
              },
              { title: "Timestamp", key: "date" },
              {
                title: "Signer",
                key: "SINGER",
                link: "yes",
                beforehref:
                  "https://near.social/mob.near/widget/ProfilePage?accountId=",
                hyperlink: "yes",
              },
              { title: "Component ", key: "name" },
              {
                title: "Conponent Link",
                key: "name",
                link: "yes",
                beforehref: `https://bos.flipsidecrypto.xyz/${state.SIGNER}/widget/`,
                afterhref: "",
                hyperlink: "yes",
              },
              { title: "Fee(Near)", key: "fee" },

              {
                title: "Hash",
                key: "hash",
                link: "yes",
                beforehref: "https://nearblocks.io/txns/",
                afterhref: "",
              },
            ],
          }}
        />
      ) : (
        noData
      )}
    </div>
  </div>
);

return (
  <div
    style={{ backgroundColor: themeColor?.search_sbt?.table_bg }}
    className="table-responsive"
  >
    {props.thirdData.length > 0 && props.secondData.length > 0 ? (
      <div className="">
        {third}
        <div className="w-100 py-2"></div>
        {second}
      </div>
    ) : (
      <Widget src="lord1.near/widget/header-dynamic" props={no_data} />
    )}
  </div>
);
