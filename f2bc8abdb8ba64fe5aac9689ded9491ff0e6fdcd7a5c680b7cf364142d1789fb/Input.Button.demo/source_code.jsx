const { RenderButton } = VM.require(
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Input.Button"
);

const sizes = ["sm", "md", "lg"];

return (
  <div className="d-flex flex-column gap-4 py-4">
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({ children: "Button", variant: "", size })}
          {RenderButton({ children: "Button", variant: "soft", size })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "icon rounded",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "soft icon rounded",
            size,
          })}
        </div>
      ))}
    </div>
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({ children: "Button", variant: "primary", size })}
          {RenderButton({
            children: "Button",
            variant: "primary soft",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "primary icon rounded",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "primary soft icon rounded",
            size,
          })}
        </div>
      ))}
    </div>
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({ children: "Button", variant: "secondary", size })}
          {RenderButton({
            children: "Button",
            variant: "secondary soft",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "secondary icon rounded",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "secondary soft icon rounded",
            size,
          })}
        </div>
      ))}
    </div>
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({ children: "Button", variant: "success", size })}
          {RenderButton({
            children: "Button",
            variant: "success soft",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "success icon rounded",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "success soft icon rounded",
            size,
          })}
        </div>
      ))}
    </div>
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({ children: "Button", variant: "info", size })}
          {RenderButton({ children: "Button", variant: "info soft", size })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "info icon rounded",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "info soft icon rounded",
            size,
          })}
        </div>
      ))}
    </div>
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({ children: "Button", variant: "danger", size })}
          {RenderButton({
            children: "Button",
            variant: "danger soft",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "danger icon rounded",
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "danger soft icon rounded",
            size,
          })}
        </div>
      ))}
    </div>
    <div className="d-flex flex-column gap-2">
      {sizes.map((size) => (
        <div className="d-flex flex-row gap-1">
          {RenderButton({
            children: "Button",
            variant: "disabled",
            size,
            disabled: true,
          })}
          {RenderButton({
            children: "Button",
            variant: "disabled soft",
            disabled: true,
            size,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "disabled icon rounded",
            size,
            disabled: true,
          })}
          {RenderButton({
            children: <i className="bi bi-arrow-right" />,
            variant: "disabled soft icon rounded",
            size,
            disabled: true,
          })}
        </div>
      ))}
    </div>
    {RenderButton({
      size: "sm",
      className: "info soft icon",
      children: <i className="bi bi-share"></i>,
      onClick: () =>
        handleShareButton(true, {
          type: "sharedArticleId",
          value: data.id,
        }),
    })}
  </div>
);
