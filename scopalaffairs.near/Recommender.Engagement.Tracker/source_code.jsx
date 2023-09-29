const dataplane = "https://neardanieossax.dataplane.rudderstack.com"; //test
// const dataplane = "https://near.dataplane.rudderstack.com"; //prod
const uri = "/v1/track";
const api_url = `${dataplane}${uri}`;
const auth = "Basic MlVvMlBYSE9UdzJjUWRucThJUWJQTG9DOG5mOg=="; //test
// const auth = "Basic MlVub3dMd2lXRnc3YzM1QU11RUVkREVJa2RvOg=="; //prod
const currentTimeStamp = new Date().toISOString();

// since we already have rudderstack in near, we should be abe to pass the js object to any analysics trackign


const trackEngagement = () => {
  console.log("trackEngagement", props);
  const payload = {
    event: eventType,
    properties: {
      targetSignerId: props.targetSigner,
      rank: props.rank,
      component: context.widgetSrc,
  
    },
    timestamp: new Date().toISOString(),
  };

  asyncFetch(api_url, {
    body: JSON.stringify({ payload }),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error:", error));
};

props.onClick ? trackEngagement(props) : null

return <>{props.children}</>;
