const [data, setData] = useState({});

const path = props.path;
console.log(path);
function fetchPost(path) {
  const res = fetch(path);
 setData(res)
  
  return res.body;
}
console.log(data)
useEffect(() => {
  fetchPost(path);
}, []);

return <div>{path}</div>;
