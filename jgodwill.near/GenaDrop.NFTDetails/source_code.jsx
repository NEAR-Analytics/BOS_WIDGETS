const Main = styled.div`
  .button{
    padding: .75em 2em;
    border-radius: .7em;
    color: var(--main-color);
    border: 1px solid transparent;
    transition: all .3s;
    cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
  @media screen and (max-width: 540px){
      padding: .5em 2em;    
      }
  }
`;
return (
  <Main>
    Hello World
    <button className="button">Click me</button>
  </Main>
);
