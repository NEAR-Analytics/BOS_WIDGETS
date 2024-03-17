const creatorId = props.creatorId ?? "hack.near";
const appId = props.appId ?? "city.app";
const citiesPattern = props.citiesPattern ?? "*/profile/cities/*";

const [cities, setCities] = useState({});
const [allCities, setAllCities] = useState([]);

const getCities = (citiesObject) => {
  let citiesCount = {};
  processCitiesObject(citiesObject, citiesCount);
  return Object.entries(citiesCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
};

const normalizeCity = (city) =>
  city
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const citiesCount = {};

const processCitiesObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processCitiesObject(kv[1]);
    } else {
      const city = normalizeCity(kv[0]);
      citiesCount[city] = (citiesCount[city] || 0) + 1;
    }
  });
};

const handleCitySelection = (selected) => {
  const updatedCities = selected
    .map((city) => ({
      [normalizeCity(city.name)]: "",
    }))
    .reduce((acc, city) => ({ ...acc, ...city }), {});

  setCities(updatedCities);
};

useEffect(() => {
  const citiesObject = Social.keys(citiesPattern, "final");
  if (citiesObject) {
    const processedCities = getCities(citiesObject);
    setAllCities(processedCities);
  }
}, [citiesPattern]);

const composeData = () => {
  const data = {
    profile: {
      cities: cities,
    },
  };
  return data;
};

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 23px;
`;

return (
  <>
    <div className="m-2">
      <div className="m-2">
        <h3 className="m-2 mb-3">Let's build!</h3>
        <div className="m-2">
          <h5>Add Your City / Cities</h5>
          <Typeahead
            id={`city-selector-${Date.now()}`}
            multiple
            labelKey="name"
            onChange={handleCitySelection}
            options={allCities}
            placeholder={placeholder}
            selected={Object.keys(cities).map((name) => ({ name }))}
            positionFixed
            allowNew
          />
        </div>
      </div>
    </div>
    <Footer>
      <a
        className="m-2 btn btn-secondary"
        href={`/${creatorId}/widget/${appId}`}
      >
        Exit
      </a>
      <CommitButton force data={composeData()}>
        Save
      </CommitButton>
    </Footer>
  </>
);
