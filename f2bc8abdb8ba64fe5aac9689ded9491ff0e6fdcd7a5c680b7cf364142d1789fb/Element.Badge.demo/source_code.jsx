const { RenderBadges } = VM.require(
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Element.Badge"
);

const sizes = ["sm", "md", "lg"];
const variants = ["info"];

return (
  <div className="d-flex flex-column gap-4 py-4">
    {variants.map((variant) => (
      <div className="d-flex flex-column gap-2">
        {sizes.map((size) => (
          <div className="d-flex flex-row gap-1">
            {RenderBadges({
              children: (
                <>
                  <i className="bi bi-hand-thumbs-up" />
                  <span>4 {variant}</span>
                </>
              ),
              variant: "info soft openSans cursorPointer",
              size,
              onClick: () => {
                console.log("Click");
              },
            })}
          </div>
        ))}
      </div>
    ))}
  </div>
);
