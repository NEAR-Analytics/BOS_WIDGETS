const lookup = (id) =>
  `https://firebasestorage.googleapis.com/v0/b/yaypegsnft.appspot.com/o/illustration%2F${id}.png`;

const getYaypeg = (address) => {
  if (!ethers.utils.isAddress(address)) return null;
  const id =
    ethers.BigNumber.from(
      ethers.utils.keccak256(ethers.utils.arrayify(address))
    )
      .mod(10000)
      .toNumber() + 1;

  return asyncFetch(lookup(id)).then(
    ({ body: { downloadTokens } }) =>
      `https://firebasestorage.googleapis.com/v0/b/yaypegsnft.appspot.com/o/illustration%2F${id}.png?alt=media&firebase=${downloadTokens}`
  );
};

const Yaypeg = ({ address, width, height }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    getYaypeg(address).then((y) => setImg(y));
  }, []);

  if (!img) {
    return <p>Loading...</p>;
  }

  return <img src={img} width={width} height={height} />;
};

return <Yaypeg {...props} />;
