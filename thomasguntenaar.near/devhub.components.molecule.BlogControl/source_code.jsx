const { className, title, icon, href, onClick } = props;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 4px;
  background: #04a46e;

  color: #f4f4f4;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */

  padding: 0.5rem 1rem;

  text-wrap: nowrap;
  width: auto;

  &:hover {
    background: #555555;
    text-decoration: none !important;
  }

  outline: none;
  border: none;
`;

return (
  <div className={`d-flex flex-row-reverse ${props.className}`}>
    {props.href ? (
      <Link to={props.href} style={{ textDecoration: "none" }}>
        <Button
          className="community-control"
          data-testid={props.testId ? props.testId : ""}
        >
          <i className={props.icon ? props.icon : "bi bi-plus-circle-fill"}></i>
          {props.title}
        </Button>
      </Link>
    ) : (
      <Button
        onClick={props.onClick}
        className="community-control"
        data-testid={props.testId ? props.testId : ""}
      >
        <i className={props.icon ? props.icon : "bi bi-plus-circle-fill"}></i>
        {props.title || "New Blog Post"}
      </Button>
    )}
  </div>
);
