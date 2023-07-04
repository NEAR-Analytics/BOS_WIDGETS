const authorForWidget = "sayalot.near";

const isDebbug = props.isDebbug;

const tagItemCss =
  "me-1 text-primary bg-primary bg-opacity-10 position-relative fw-normal badge border border-primary text-decoration-none";
return (
  <>
    {props.tags &&
      props.tags.map((tag) => (
        <a
          key={tag}
          href={
            isDebbug
              ? `/#/${authorForWidget}/widget/SayALot_ArticlesByTag?tag=${tag}&isDebbug=true`
              : `/#/${authorForWidget}/widget/SayALot_ArticlesByTag?tag=${tag}`
          }
          className={tagItemCss}
        >
          #{tag}
        </a>
      ))}
  </>
);
