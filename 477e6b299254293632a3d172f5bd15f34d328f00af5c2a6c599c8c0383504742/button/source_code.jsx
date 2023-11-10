const Wrapper = styled.div`.btn {
  font-size: 30px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-home {
  background-color: #4CAF50;
}

.btn-label {
  background-color: #2196F3;
}

.btn-client {
  background-color: #f44336;
}

.btn:hover {
  background-color: #555;
}` 
return 
<Wrapper>
<header>
  <button class="btn btn-home">Home</button>
  <button class="btn btn-label">Label</button>
  <button class="btn btn-client">Client</button>
</header>
</Wrapper>