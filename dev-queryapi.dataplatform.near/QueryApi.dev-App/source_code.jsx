const GRAPHQL_ENDPOINT = "https://query-api-graphql-vcqilefdcq-uc.a.run.app";
const APP_OWNER = "dev-queryapi.dataplatform.near";
const EXTERNAL_APP_URL = "https://queryapi-frontend-vcqilefdcq-ew.a.run.app";
const REGISTRY_CONTRACT_ID = "dev-queryapi.dataplatform.near";
return (
  <Widget
    src={`${APP_OWNER}/widget/QueryApi.Dashboard`}
    props={{
      GRAPHQL_ENDPOINT,
      APP_OWNER,
      EXTERNAL_APP_URL,
      REGISTRY_CONTRACT_ID,
    }}
  />
);
