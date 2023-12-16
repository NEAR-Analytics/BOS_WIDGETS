return (
  <>
    <Widget
      src="near/widget/DIG.Button"
      props={{
        href: "https://docs.near.org",
        target: "_blank",
        label: "Read Docs",
        variant: "secondary",
        fill: "outline",
        size: "large",
      }}
    />
    <Widget
      src="near/widget/DIG.Button"
      props={{
        href: "/signup",
        label: "Create Account",
        variant: "affirmative",
        size: "large",
      }}
    />
  </>
);
