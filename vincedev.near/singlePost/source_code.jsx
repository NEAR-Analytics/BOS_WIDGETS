const [data, setData] = useState({});

const path = props.path;

function fetchPost(path) {
  const res = fetch(path);
  console.log(res);
  console.log(path);
  return res.body;
}
useEffect(() => {
  fetchPost(path);
}, []);
return <div>Hello WorldMe</div>;
