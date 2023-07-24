const showHeader = props.showHeader ?? true;
return (
  <div>
    {showHeader && (
      <div>
        <h1>
          Deploy{" "}
          <a href="https://github.com/NearSocial/viewer" target="_blank">
            NEAR Social Viewer
          </a>
        </h1>
      </div>
    )}
    <a
      href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnearsocial%2Fviewer&build-command=npm%20run%20build&install-command=npm%20--force%20install&output-directory=dist"
      target="_blank"
    >
      <img src="https://vercel.com/button" alt="Deploy with Vercel" />
    </a>
  </div>
);
