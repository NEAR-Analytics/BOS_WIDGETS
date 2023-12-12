return (
  <>
    <OverlayTrigger
      key={placement}
      overlay={<Tooltip>{props.tooltipText}</Tooltip>}
    >
      {props.component ?? <></>}
    </OverlayTrigger>
  </>
);
