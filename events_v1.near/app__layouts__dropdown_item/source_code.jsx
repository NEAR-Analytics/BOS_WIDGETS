const key = props.key || props.component.src;

return (
  <li className="nav-item" key={idx}>
    <Widget src={props.component.src} props={props.component.props} />
  </li>
);
