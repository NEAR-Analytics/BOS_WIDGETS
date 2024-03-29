const CalloutArrowIcon = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.25195 15.6491L19.0683 1.77606L19.0683 36.0052L4.26223 22.2284C2.35353 20.4524 2.34881 17.4311 4.25195 15.6491Z"
      fill="#FFFFFE"
      stroke="#02193A"
    />
    <path
      d="M22.0636 34.8717L18.5687 34.8717L17.5687 33.8717L17.5687 3.87175L18.5687 2.87175L22.0636 2.87175L22.0636 34.8717Z"
      fill="#FFFFFE"
    />
  </svg>
);

const overlay = (
  <DappletCallout arrow={<CalloutArrowIcon />}>
    <Callout>
      <CalloutTitle>It's a sandbox story first</CalloutTitle>
      <CalloutDescription>
        We are now in a sandbox mutation. Through it, we can suspendisse mattis
        interdum auctor volutpat nisl quis. Scelerisque morbi eget volutpat
        aliquet vitae curabitur non.
      </CalloutDescription>
    </Callout>
  </DappletCallout>
);

const child = props.children.filter(
  (c) => typeof c !== "string" || !!c.trim()
)[0];

return (
  <OverlayTrigger placement="right" overlay={overlay}>
    {child}
  </OverlayTrigger>
);
