const link =
  props.link ??
  "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fneardefi%2Fbos-gateway-template&build-command=pnpm%20run%20build";

return (
  <div>
    <a href={link} target="_blank">
      <img src="https://vercel.com/button" alt="Deploy with Vercel" />
    </a>
  </div>
);
