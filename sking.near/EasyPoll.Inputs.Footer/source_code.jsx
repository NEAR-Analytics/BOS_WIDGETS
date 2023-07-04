const hasNext = props.hasNext ?? false;
const hasPrev = props.hasPrev ?? false;
const hasSubmit = props.hasSubmit ?? !hasNext;
const onNext = props.onNext ?? (() => {});
const onPrev = props.onPrev ?? (() => {});
const onSubmit = props.onSubmit ?? (() => {});

return (
  <div className="d-flex gap-4 pt-4">
    {hasPrev && (
      <Widget
        src="rubycop.near/widget/NDC.StyledComponents"
        props={{
          Button: {
            text: "Previous",
            icon: <i className="bi bi-chevron-left" />,
            className: "dark d-flex gap-2 align-items-center flex-row-reverse",
            onClick: onPrev,
          },
        }}
      />
    )}
    {hasNext && (
      <Widget
        src="rubycop.near/widget/NDC.StyledComponents"
        props={{
          Button: {
            text: "Next",
            icon: <i className="bi bi-chevron-right" />,
            className: "primary dark d-flex gap-2 align-items-center ms-auto",
            onClick: onNext,
          },
        }}
      />
    )}
    {hasSubmit && (
      <Widget
        src="rubycop.near/widget/NDC.StyledComponents"
        props={{
          Button: {
            text: "Submit",
            icon: <i className="bi bi-chevron-right" />,
            className: "primary dark d-flex gap-2 align-items-center ms-auto",
            onClick: onSubmit,
          },
        }}
      />
    )}
  </div>
);
