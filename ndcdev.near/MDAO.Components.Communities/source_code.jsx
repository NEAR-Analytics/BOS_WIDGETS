const maxLimit = props.limit || 1000;
const darkTheme = props.theme === "dark";

const STATUS = {
  GOOD: ["Yes", "Approved", "Yes, include in special request"],
  BAD: ["No"],
};

const Item = styled.div`
  width: 350px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${(props) =>
    darkTheme
      ? "#f0ddce"
      : STATUS.GOOD.includes(props.status)
      ? "rgb(89 230 146 / 50%)"
      : STATUS.BAD.includes(props.status)
      ? "rgb(255 121 121 / 50%)"
      : "rgb(136 0 255 / 14%)"};
  box-shadow: 0px 30px 80px 0px rgba(0, 0, 0, 0.1);

  .color-text {
    background: ${darkTheme
      ? "linear-gradient(270deg, #efdcd1 -1.69%, #e0c6f7 43.78%, #adc3fb 99.83%)"
      : "linear-gradient(270deg, rgb(161 54 255) -1.69%, rgb(45 56 208) 99.83%)"};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    margin: 0;
  }

  @media screen and (max-width: 786px) {
    width: 100%;
  }
`;

const Badge = styled.div`
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 14px;
  width: max-content;
  background: ${(props) =>
    STATUS.GOOD.includes(props.status)
      ? "rgb(89, 230, 146)"
      : STATUS.BAD.includes(props.status)
      ? "rgb(255, 121, 121)"
      : "rgb(236 226 254)"};
  color: ${(props) =>
    STATUS.GOOD.includes(props.status)
      ? "rgb(9, 52, 46)"
      : STATUS.BAD.includes(props.status)
      ? "rgb(52, 9, 9)"
      : "rgb(138 79 255)"};
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const [communities, setCommunities] = useState([]);

const fetchCommunities = () => {
  const sheetId = "1HxWjHWwtHFtyo2GIUgpe7Oru4CVz2EWyuuvf3wT9Ghg";
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = "Overall Data";
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;
  const resp = fetch(url);

  if (resp?.body) {
    let jsonString = resp.body.match(/(?<="table":).*(?=}\);)/g)[0];
    let json = JSON.parse(jsonString);

    setCommunities(json.rows.map((item) => item.c));
  }
};

fetchCommunities();

if (communities.length === 0)
  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Widget src="flashui.near/widget/Loading" /> <b>Loading communities...</b>
    </div>
  );

const Connect = ({ item }) => (
  <Item
    status={item[4].v}
    className="d-flex flex-column gap-2 justify-content-between align-items-center"
  >
    <Img src={item[5].v} />
    <h4 className="bold color-text px-4 pt-4 text-center">{item[1].v}</h4>
    <Badge status={item[4].v}>{item[4].v || "No status yet"}</Badge>
    <div className="pt-2 pb-4 text-center">
      <div className="mb-2">Created at: {item[3].f}</div>
      <a href={item[2].v} className="color-text">
        <span className="mr-4">Learn More</span>
        <i className="bi bi-chevron-right" />
      </a>
    </div>
  </Item>
);

console.log(communities);

return (
  <div className="d-flex flex-wrap gap-5 justify-content-center">
    {communities
      .reverse()
      .slice(0, maxLimit)
      .map((item) => (
        <Connect item={item} />
      ))}
  </div>
);
