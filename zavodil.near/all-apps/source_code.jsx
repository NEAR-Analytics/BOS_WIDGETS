let allWidgets = Social.get("*/widget/**", "final");

let devsRating = {};
let widgetsCount = 0;

Object.keys(allWidgets).reduce((prev, dev) => {
  const widgets = allWidgets[dev]?.widget ?? {};
  devsRating[dev] = Object.keys(widgets).length;
  widgetsCount += Object.keys(widgets).length;
  return prev + Object.keys(widgets).length;
}, 0);

const keyValueArray = Object.entries(devsRating);
keyValueArray.sort((a, b) => b[1] - a[1]);
const sortedDevs = Object.fromEntries(keyValueArray);

const Code = styled.div`
    font-family: 'Courier New', Courier, monospace;    
`;

return (
  <div>
    <div>B.O.S. devs count: {Object.keys(allWidgets).length}</div>
    <div>B.O.S. app count: {widgetsCount}</div>
    <div class="mt-3 border">
      <Code>
        {Object.keys(sortedDevs).map((dev) => {
          return Object.keys(allWidgets[dev]?.widget ?? {}).map((widget) => {
            return (
              <div>
                <div>[[repo]]</div>
                <div>
                  url =
                  {`"https://near.org/near/widget/ComponentDetailsPage?src=${dev}/widget/${widget}&tab=source"`}
                </div>
                {Object.keys(
                  allWidgets[dev]?.widget?.[widget]?.metadata?.tags ?? {}
                ).filter((tag) => tag !== "app").length ? (
                  <div>
                    {" "}
                    tags ={" "}
                    {JSON.stringify(
                      Object.keys(
                        allWidgets[dev]?.widget?.[widget]?.metadata?.tags ?? {}
                      ).filter((tag) => tag !== "app")
                    )}
                  </div>
                ) : (
                  ""
                )}
                <br />
              </div>
            );
          });
        })}
      </Code>
    </div>
  </div>
);
