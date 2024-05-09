const Elements = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;

    > div {
       margin:10px;
    }
`;

const Button = styled.button`
    border:0;
    outline-style:none;
    background-color: rgba(0,0,0,.05);
    padding:.5rem 1rem;
    font-weight:bold;
    border-radius:10px;
    font-size:.8rem;
    transition: all .2s;
    box-shadow: 0 0 0 0 rgba(0,0,0,.05);
    padding: 10px 15px;
    font-size: var(--font-size-sm);
    border:1px solid var(--border-color);
    border-radius: var(--border-radius-xl);
    cursor: pointer;
    color: var(--color-text-primary);
    box-shadow: 0 0 0 0 rgba(0,0,0, var(--opacity-ultra-light));

    &:hover {
        opacity: var(--opacity-strong);
        transition: all .2s;
        box-shadow: 0 0 0 3px rgba(0,0,0, var(--opacity-ultra-light));
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const Input = styled.input`
  padding: 10px;
  font-size: var(--font-size-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  margin: 10px 0;

  &:focus {
    outline: none;
  }
`;

const Navbar = styled.div`
  width:100%;
  background-color: var(--color-secondary);
  color: var(--color-text-primary);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLogo = styled.div`
  font-weight:bold;
`;

const NavbarContent = styled.div``;

const NavbarLink = styled.a`
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    text-decoration: none;
    margin-left: 20px;

    &:hover {
        text-decoration: underline;
    }
`;


const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin .8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Alert = styled.div`
  width:100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;

  ${({ type }) => type === 'success' && `
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  `}

  ${({ type }) => type === 'danger' && `
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  `}

  ${({ type }) => type === 'warning' && `
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  `}
`;


const Modal = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,.2);
`;

const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 5px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  .switch {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: #2196F3;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    &:checked + .slider:before {
      transform: translateX(26px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
`;

const Card = styled.div`
  width:100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  width:100%;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #ccc;

    &:last-child {
    border-bottom: none;
    }
`;

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => isOpen ? '0%' : '-100%'};
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  z-index: 1000;
`;

const DrawerContent = styled.div`
  padding: 10px;
`;

// Componente opcional para oscurecer el fondo cuando el Drawer está abierto
const DrawerOverlay = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; // Asegúrate de que este valor sea adecuado para tu aplicación
`;

// Componente principal del Drawer
const Drawer = ({ isOpen, children, onClose }) => (
  <>
    <DrawerOverlay isOpen={isOpen} onClick={onClose} />
    <DrawerWrapper isOpen={isOpen}>
      <DrawerContent>{children}</DrawerContent>
    </DrawerWrapper>
  </>
);

const ExampleBox = styled.div`
    display:flex;
    flex-direction:column;
    width:300px;
    height:300px;
    border-radius:20px;
    border:1px solid rgba(0,0,0,.05);
    overflow:hidden;
`;

const ExampleComponent = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:1rem;
    height:60%;
`;

const ExampleDescription = styled.div`
    height:40%;
    background-color:#fff;
    padding:1rem;
    border-top:1px solid rgba(0,0,0,.05);
`;

const ExampleTitle = styled.h1`
    font-size:1.2rem;
    color:#000;
    font-weight:bold;
`;

const ExampleText = styled.p`
    font-size:.8rem;
    padding:.3rem 0;
`;

return <>
    <br/>
    <h2>Future cubes</h2>
    <br/>
    <Elements>
        <ExampleBox>
            <ExampleComponent>
                <Button>Click me</Button>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Button</ExampleTitle>
                <ExampleText>This is the Button cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Input type="text" />
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Input</ExampleTitle>
                <ExampleText>This is the Input cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>
        
        <ExampleBox>
            <ExampleComponent>
                <Spinner/>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Spinner</ExampleTitle>
                <ExampleText>This is the Spinner cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Navbar>
                    <NavbarLogo>Navbar</NavbarLogo>
                    <NavbarContent>
                        <NavbarLink href="#home">Home</NavbarLink>
                    </NavbarContent>
                </Navbar>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Navbar</ExampleTitle>
                <ExampleText>This is the Navbar cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Alert type="warning">An example alert</Alert>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Alert</ExampleTitle>
                <ExampleText>This is the Alert cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Button onClick={() => State.update({ modalIsOpen: true })}>Open Modal</Button>

                <Modal isOpen={state.modalIsOpen}>
                    <ModalContent>
                        This is a modal
                    </ModalContent>
                </Modal>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Modal</ExampleTitle>
                <ExampleText>This is the Modal cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Switch>
                    <input type="checkbox" className="switch" />
                    <div className="slider"></div>
                </Switch>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Switch</ExampleTitle>
                <ExampleText>This is the Switch cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Card>Example card content</Card>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Card</ExampleTitle>
                <ExampleText>This is the Card cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <List>
                    <ListItem>Uno</ListItem>
                    <ListItem>Dos</ListItem>
                    <ListItem>Tres</ListItem>
                </List>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>List</ExampleTitle>
                <ExampleText>This is the List cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>

        <ExampleBox>
            <ExampleComponent>
                <Button onClick={() => State.update({ openDrawer: true })}>Open drawer</Button>

                <Drawer isOpen={state.openDrawer}>
                    <DrawerContent>
                        This is a test
                    </DrawerContent>
                </Drawer>
            </ExampleComponent>
            <ExampleDescription>
                <ExampleTitle>Drawer</ExampleTitle>
                <ExampleText>This is the Drawer cube description</ExampleText>
            </ExampleDescription>
        </ExampleBox>
    </Elements>
</>;