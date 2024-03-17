const pattern = props.pattern ?? "*/profile/cities/*";
const placeholder =
  props.placeholder ??
  "input the name of your city here (try not to duplicate)";
const initialCitiesObject = props.initialCitiesObject || {};

const citiesObject = Social.keys(pattern, "final");

if (citiesObject === null) {
  return "Loading...";
}

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

const processObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processObject(kv[1]);
    } else {
      const city = normalizeCity(kv[0]);
      citiesCount[city] = (citiesCount[city] || 0) + 1;
    }
  });
};

const getCities = () => {
  processObject(citiesObject);
  const cities = Object.entries(citiesCount);
  cities.sort((a, b) => b[1] - a[1]);
  return cities.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allCities) {
  initState({
    allCities: getCities(),
    cities: Object.keys(initialCitiesObject).map((city) => ({
      name: normalizeCity(city),
    })),
    originalCities: Object.fromEntries(
      Object.keys(initialCitiesObject).map((city) => [city, null])
    ),
    id: `city-selector-${Date.now()}`,
  });
}

const setCities = (selectedCity) => {
  const normalizedCity = normalizeCity(selectedCity.name);
  const updatedCities = {
    ...state.originalCities,
    [normalizedCity]: "",
  };

  if (props.setCitiesObject) {
    props.setCitiesObject(updatedCities);
  }
};

return (
  <>
    <Typeahead
      id={state.id}
      labelKey="name"
      onChange={(selected) => setCities(selected[0])}
      options={state.allCities}
      placeholder={placeholder}
      selected={state.cities ? [state.cities] : []}
      positionFixed
      allowNew
    />
  </>
);
