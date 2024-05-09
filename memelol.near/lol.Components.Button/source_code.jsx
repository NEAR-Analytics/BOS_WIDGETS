const Button = styled.div`
  border-radius: 10px;
  border: 3px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  background: rgb(148 255 192);
  font-size: 24px;
  font-weight: 800;
  padding: 15px 25px 15px 70px;
  width: 300px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #000;
    text-decoration: none;
  }

  a {
    color: inherit;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;

    &:hover {
      color: inherit;
      background: #ccc;
    }
  }

  @media screen and (max-width: 786px) {
    width: 100%;
    padding: 15px 25px 15px 50px;
  }
`;

return { Button };
