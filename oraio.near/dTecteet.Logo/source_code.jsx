State.init({
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
    hover: {
      bg: "#eef2f6",
    },
  },
});

const DropDown = styled.div`
  .dropbtn {
    font-weight: 600;
    cursor: pointer;
    border: 1px dashed ${state.theme.border};
    background-color: ${state.theme.bg};
    border-radius: 8px;
    width: 122px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${state.theme.color};
    transition: background-color 0.1s ease-in-out;

    :hover {
      background-color: ${state.theme.hover.bg};
    }
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown:hover .dropdown-content {
    display: flex;
  }

  .dropdown:hover .dropbtn {
    background-color: ${state.theme.hover.bg};
  }
`;

return (
  <DropDown>
    <div class="dropdown">
      <button class="dropbtn">dTecteet</button>
    </div>
  </DropDown>
);
