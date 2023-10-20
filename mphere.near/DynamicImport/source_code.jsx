const [momentLib, setMomentLib] = useState(null);

const importMoment = async () => {
  try {
    const momentDyn = await import("https://esm.sh/moment@2.29.4");
    setMomentLib(momentDyn);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  importMoment();
}, []);

return (
  <div>
    {!momentLib ? "Loading" : momentLib.default().format("[Today is] dddd")}
  </div>
);
