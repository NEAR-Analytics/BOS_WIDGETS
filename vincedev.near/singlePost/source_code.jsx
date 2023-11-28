const [data, setData] = useState({});

const path = props.path;

function fetchPost(path) {
  const res = fetch(path);
  console.log(res);
  return res.body;
}
return <div>Hello World</div>;
