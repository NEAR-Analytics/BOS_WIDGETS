// This is a DEV env Widget.
if (!context.accountId || context.accountId !== "wendersonpires.near")
  return null;

/**
 * External App URL (must)
 */
// const externalAppUrl = "https://near-test-app.web.app/";
const externalAppUrl = "https://d11666d64694.ngrok.app/near";

// const externalAppUrl = "http://localhost:3000/near";
const path = props.path;
const initialViewHeight = 809;
const initialPayload = {
  myNiceProp: "me gusta :D",
};

/**
 * Request Handlers.
 */
const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "example":
      exampleHandler(request, response);
      break;
  }
};

const exampleHandler = (request, response) => {
  response(request).send({});
};

return (
  <Widget
    src="wendersonpires.near/widget/NearSocialBridgeWithExternalApp_Test"
    props={{
      externalAppUrl,
      path,
      initialViewHeight,
      initialPayload,
      requestHandler,
    }}
  />
);
