const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const isDebug = props.isDebug;

const tagItemCss =
  "me-1 text-primary bg-primary bg-opacity-10 position-relative fw-normal badge border border-primary text-decoration-none";
return (
  <>
    {props.tags &&
      props.tags.map((tag) => (
        <a
          key={tag}
          href={
            isDebug
              ? `/#/${authorForWidget}/widget/SayALot_ArticlesByTag?tag=${tag}&isDebug=true`
              : `/#/${authorForWidget}/widget/SayALot_ArticlesByTag?tag=${tag}`
          }
          className={tagItemCss}
        >
          #{tag}
        </a>
      ))}
  </>
);
