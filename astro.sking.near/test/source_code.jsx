const experiment = useCache(
  () =>
    asyncFetch("data:text/plain,experiment").then(() => {
      const obj = {
        1: "one",
      };
      setTimeout(() => {
        console.log("obj", obj)
      }, 5000);
      return obj;
    }),
  "Experiment"
);

experiment.hi = "hi";

return experiment;
