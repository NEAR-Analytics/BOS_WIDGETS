function Header() {
  return (
    <div className="header">
      <h1>Welcome to My Website</h1>
    </div>
  );
}

function MainContent() {}

function Footer() {
  return (
    <div className="footer">
      <p>© 2024 My Website</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

return App();
