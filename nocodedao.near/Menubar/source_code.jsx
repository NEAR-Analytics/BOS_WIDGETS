const Wrapper = styled.div`.menu-bar {
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
}

.menu {
  list-style-type: none;
  display: flex;
  align-items: center;
}

.menu-item {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
  transition: color 0.2s;
}

.menu-item:hover {
  color: #ff5500;
}` 
return 
<Wrapper>
<div class="menu-bar">
  <ul class="menu">
    <li class="menu-item">Home</li>
    <li class="menu-item">About</li>
    <li class="menu-item">Pages</li>
    <li class="menu-item">Contact</li>
  </ul>
</div>
</Wrapper>