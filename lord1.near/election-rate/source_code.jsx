const themeColor = props.themeColor;
const generaltheme = {
  height: "160px",
  align: "center",
  description:
    "What percentage of the ballots in each household were converted into votes? For each voter, there are 15 ballots in HOM, 7 ballots in COA, 15 ballots in TC, and 1 ballot in BP.",
  brand: "Participantion Rate",
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
const theme1 = {
  height: "150px",
  align: "center",
  description: "House Of Merit",
  brand: "HOM",
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
const theme2 = {
  height: "150px",
  align: "center",
  description: "Council Of Advisors",
  brand: "COA",
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
const theme3 = {
  height: "150px",
  align: "center",
  description: "Transparency Commission",
  brand: "TC",
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
const theme4 = {
  height: "150px",
  align: "center",
  description: "Budget Package .",
  brand: "BD",
  fontsize: "10",
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

const Right = styled.div`
  padding: 2px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const H5 = styled.h5`
  color:${themeColor.election?.textColor};
  text-align: center;
`;
const ChartContainer = styled.div`
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;
let data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/805aa65d-7ace-401c-8f1b-fb6c82f730bb/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);
const datas = data.body;

const WidgetComponent = ({ label, voted, total }) => (
  <div className="col-md-12">
    <Right className="col">
      <H5>{label}</H5>
      <div className="d-flex justify-content-center">
        <ChartContainer>
          <Widget
            src="lord1.near/widget/pie-percentage"
            props={{
              themeColor,
              voted: `${voted}`,
              total: `${total}`,
              percent: 50,
            }}
          />
        </ChartContainer>
      </div>
    </Right>
  </div>
);

const renderWidgets = (datas, labels) => {
  return labels.map((label) => (
    <div className="col-md-6 col-lg-3">
      <WidgetComponent
        label={label}
        voted={datas[0][`${label.toLowerCase()}`]}
        total={datas[0][`${label.toLowerCase()}_rate`]}
      />
    </div>
  ));
};
55;
const renderHomWidgets = (datas, labels) => {
  return labels.map((label) => (
    <div className="col-md-3 col-xl-2">
      <div className="col-md-12">
        <Right className="col">
          <div className="d-flex justify-content-center">
            <ChartContainer>
              <Widget
                src="lord1.near/widget/pie-percentage"
                props={{
                  themeColor,
                  voted: `${datas[0][`${label.toLowerCase()}`]}`,
                  total: `${datas[0].singers}`,
                  description: `${label.toLowerCase().split("_")[1]}`,
                  percent: 10,
                }}
              />
            </ChartContainer>
          </div>
        </Right>
      </div>
    </div>
  ));
};

const topLabels = ["HOM", "COA", "TC", "BP"];
const homLabels = ["hom_og", "hom_vibes", "hom_regens", "hom_fractal"];
const coaLabels = ["coa_og", "coa_vibes", "coa_regens", "coa_fractal"];
const tcLabels = ["tc_og", "tc_vibes", "tc_regens", "tc_fractal"];
const bpLabels = ["bp_og", "bp_vibes", "bp_regens", "bp_fractal"];

return (
  <div style={{ backgroundColor: themeColor.page_bg }}>
    <div
      style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
      className="shadow-sm rounded-4"
    >
      <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
      <div className="row">{renderWidgets(datas, topLabels)}</div>
    </div>

    <div style={{ width: "100%", height: "85px" }}></div>
    <div
      style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
      className="shadow-sm rounded-4 "
      style={{ "padding-left": "1.5%", "padding-right": "1.5%" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {renderHomWidgets(datas, homLabels)}
            <div className="order-first order-xl-last col-xl-4 ">
              <Widget src="lord1.near/widget/header-dynamic" props={theme1} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
      className="shadow-sm rounded-4 "
      style={{ "padding-left": "1.5%", "padding-right": "1.5%" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {renderHomWidgets(datas, coaLabels)}
            <div className="order-first order-xl-last col-xl-4 ">
              <Widget src="lord1.near/widget/header-dynamic" props={theme2} />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
      className="shadow-sm rounded-4 "
      style={{ "padding-left": "1.5%", "padding-right": "1.5%" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {renderHomWidgets(datas, tcLabels)}
            <div className="order-first order-xl-last col-xl-4 ">
              <Widget src="lord1.near/widget/header-dynamic" props={theme3} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style={{ backgroundColor: themeColor?.sbt_info?.card_bg }}
      className="shadow-sm rounded-4 "
      style={{ padding: "1.5%", "padding-right": "1.5%" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {renderHomWidgets(datas, bpLabels)}
            <div className="order-first order-xl-last col-xl-4 ">
              <Widget src="lord1.near/widget/header-dynamic" props={theme4} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Widget
      src="lord1.near/widget/election-rate-chart"
      props={{ themeColor }}
    />
  </div>
);
