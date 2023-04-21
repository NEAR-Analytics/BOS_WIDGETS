const createEvent = (request, response) => {
  asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Everything": "simple",
    },
    body: JSON.stringify({
      query:
        "mutation createEvent($allDay: Boolean = false, $startStr: String, $endStr: String, $source: String, $title: String, $url: String) { events { create(allDay: $allDay, endStr: $endStr, source: $source, startStr: $startStr, title: $title, url: $url) { entities { id } } } }",
      variables: {
        source: context.accountId,
        ...request.payload,
      },
    }),
  }).then((resp) => {
    if (resp.body.errors) {
      response(request).send({ error: resp.body.errors[0].message });
    } else {
      response(request).send({ success: true });
    }
  });
  // ON MACHINA
  //   asyncFetch(
  //     "https://api.testnet.onmachina.io/v1/efiz.testnet/events?format=json",
  //     {
  //       method: "GET",
  //     }
  //   ).then((res) => {
  //     console.log(res);
  //   });
};

return (
  <Widget
    src={"efiz.testnet/widget/Bridge"}
    props={{
      externalAppUrl: "https://event-creator-five.vercel.app",
      type: "efiz.testnet/type/Event",
      createThing: createEvent,
    }}
  />
);
