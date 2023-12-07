const QUESTVERSE_CONTRACT = "v1.questverse.near";
const QUERYAPI_CONTRACT = "queryapi.dataplatform.near";
const API_SIGNER_SERVICE = "https://";

return (
  <>
    <h1>Hello BOS</h1>
    <p>Deploying to bos.questverse.near</p>
    <p>QUESTVERSE_CONTRACT: {QUESTVERSE_CONTRACT}</p>
    <p>QUERYAPI_CONTRACT: {QUERYAPI_CONTRACT}</p>
    <p>API_SIGNER_SERVICE: {API_SIGNER_SERVICE}</p>
    <Widget src="bos.questverse.near/widget/createQuest" />
  </>
);
