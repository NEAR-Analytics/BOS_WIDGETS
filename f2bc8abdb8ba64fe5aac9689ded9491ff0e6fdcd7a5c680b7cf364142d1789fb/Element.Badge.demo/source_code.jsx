const { RenderBadges } = VM.require(
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Element.Badge"
);

const sizes = ["sm", "md", "lg"];
const variants = [
  "primary",
  "secondary",
  "danger",
  "success",
  "info",
  "white",
  "black",
  "disabled",
];

return (
  <div className="d-flex flex-column gap-4 py-4">
    {variants.map((variant) => (
      <div className="d-flex flex-column gap-2">
        {sizes.map((size) => (
          <div className="d-flex flex-row gap-1">
            {RenderBadges({
              children: (
                <>
                  <span>4 {variant}</span>
                </>
              ),
              variant: `${variant} openSans cursorPointer`,
              size,
              onClick: () => {
                console.log("Click");
              },
              icon: "bi-hand-thumbs-up",
            })}
          </div>
        ))}
      </div>
    ))}
  </div>
);
