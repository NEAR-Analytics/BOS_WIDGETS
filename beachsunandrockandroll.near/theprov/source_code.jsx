const { Tailwind } = VM.require("uiisnear.near/widget/tailwind");

const myTheme = {
  background: "0 0% 100%",
  foreground: "240 10% 3.9%",
  card: "0 0% 100%",
  "card-foreground": "240 10% 3.9%",
  popover: "0 0% 100%",
  "popover-foreground": "240 10% 3.9%",
  "uin-primary": "142.1 76.2% 36.3%",
  "primary-foreground": "355.7 100% 97.3%",
  "uin-secondary": "240 4.8% 95.9%",
  "secondary-foreground": "240 5.9% 10%",
  muted: "240 4.8% 95.9%",
  "muted-foreground": "240 3.8% 46.1%",
  accent: "240 4.8% 95.9%",
  "accent-foreground": "240 5.9% 10%",
  destructive: "0 84.2% 60.2%",
  "destructive-foreground": "0 0% 98%",
  border: "240 5.9% 90%",
  input: "240 5.9% 90%",
  ring: "142.1 76.2% 36.3%",
  radius: "0.5rem",
};

const ThemeProvider = ({ children }) => (
  <Tailwind theme={myTheme}>{children}</Tailwind>
);
