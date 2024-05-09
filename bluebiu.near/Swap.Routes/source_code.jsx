const routes = props.routes || [];

let str = "";

if (routes.length === 0) return;
routes[0].routes.forEach((route, i) => {
  if (i === 0) {
    str += route.token0.symbol + " > " + route.token1.symbol;
  } else {
    str += " > " + route.token1.symbol;
  }
});

return str;
