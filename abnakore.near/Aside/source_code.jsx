const Wrapper = styled.div`


    .aside {
      background-color: #333;
      padding: 10px;
      color: #fff;
    }

    .aside a {
      color: #fff;
      text-decoration: none;
      margin: 0 10px;
    }
`;

return (
  <Wrapper>
    <div className="aside">
      {/*<div id="tabs">*/}
      {/* Render the objs as links */}
      {props.objs.map((obj) => (
        <a
          key={obj.link}
          href={obj.link}
          className={`tab ${active === obj.link ? "active" : ""}`}
        >
          {obj.name}
        </a>
      ))}
      {/* <Link to='/' className="tab">Vote Page</Link>
                    <Link to='/result' className="tab">Results</Link>
                    <Link to='/' className="tab">Login/Logout</Link> */}
    </div>
    {/*</div>*/}
  </Wrapper>
);
