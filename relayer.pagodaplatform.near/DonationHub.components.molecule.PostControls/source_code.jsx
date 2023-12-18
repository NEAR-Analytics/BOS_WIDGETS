const { className, title, icon, href, onClick } = props;

const Button = styled.button`

   display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 15px;
  min-width: 6.5em;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 70px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 750;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.4s ease-in-out;


  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;

`;

return (
  <div className={`d-flex flex-row-reverse ${props.className}`}>
    {props.href ? (
      <Link to={props.href} style={{ textDecoration: "none" }}>
        <Button>
          <i className={props.icon ? props.icon : "bi bi-plus-circle-fill"}></i>
          {props.title}
        </Button>
      </Link>
    ) : (
      <Button onClick={props.onClick}>
        <i className={props.icon ? props.icon : "bi bi-plus-circle-fill"}></i>
        {props.title || "Post"}
      </Button>
    )}
  </div>
);
