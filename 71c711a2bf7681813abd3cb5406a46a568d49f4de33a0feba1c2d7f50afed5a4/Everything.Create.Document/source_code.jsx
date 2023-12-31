// Repository: https://github.com/near-everything/idea-creator
const externalAppUrl = "document-creator-theta.vercel.app";

/**
 * Initial Path (optional but recommended)
 */
const path = props.path;
/**
 * Initial view height (optional but recommended)
 */
const initialViewHeight = 500;
const initialPayload = {};

/**
 * Request Handlers - Backend.
 *
 * - request: payload sent by External App
 *
 * - response: method to send the answer back to the External App
 *
 * - utils: Utils features like
 *      - promisify: (caller, resolve, reject)
 *      There's no Promisse for some features yet, So this is util for when you need to get cached data using DiscoveryAPI, e.g:
 *      utils.promisify(() => Social.getr(`${context.accountId}/profile`), (res) => console.log(res), (err) => console.log(err))
 *
 * @param {{type: string, payload: {}}} request request with payload sent by External App
 * @param {(request) => {send: () => void}} response send the answer back to the External App
 * @param {{promisify:(caller: () => void, resolve: (data) => void, reject: (error) => void)}} utils Utils features like
 */
const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "create-idea":
      handleCreateIdea(request, response);
      break;
  }
};

const handleCreateIdea = (request, response) => {
  const { payload } = request;
  if (payload) {
    asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Everything": "simple",
      },
      body: JSON.stringify({
        query:
          "mutation createIdea($title: String, $description: String) { ideas { create(name: $title) { entities { id } } appendContentToDescription(value: $description) { entities { id   } } } }",
        variables: payload,
      }),
    }).then((res) => {
      if (res.body.errors) {
        response(request).send(res.body.errors);
      } else {
        Social.set(
          {
            thing: {
              main: JSON.stringify({
                thingId: res.body.data.ideas.create.entities[0].id,
              }),
            },
            index: {
              everything: JSON.stringify({
                key: "main",
                value: {
                  type: "71c711a2bf7681813abd3cb5406a46a568d49f4de33a0feba1c2d7f50afed5a4/type/Document",
                },
              }),
            },
          },
          {
            force: true,
            onCommit: () => {
              response(request).send({ success: true });
            },
            onCancel: () => {
              response(request).send({ error: "the action was canceled" });
            },
          }
        );
        response(request).send(res.body.data);
      }
    });
    return;
  }
  // Error
  response(request).send({
    error: "idea must be provided",
  });
};

return (
  <Widget
    src={"wendersonpires.near/widget/NearSocialBridgeCore"}
    props={{
      externalAppUrl,
      path,
      initialViewHeight,
      initialPayload,
      requestHandler,
    }}
  />
);
