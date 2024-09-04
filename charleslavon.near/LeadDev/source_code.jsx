const { theme } = props || dark;
const accountId = "charleslavon.near";

const AVAILABLE_THEMES = {
  default: "Default",
  dark: "Dark",
  gold: "Gold",
  blossom: "Blossom",
  vibrant: "Vibrant",
  aqua: "Aqua",
  neon: "Neon",
  vintage: "Vintage",
  eclectic: "Eclectic",
};

const slide_links = {
  "Decentralized web3 UIs vs web2": {
    "their differences": "https://docs.near.org/build/web3-apps/frontend",
    "DapDap - a popular multichain defi app built on VM 1.0":
      "https://dapdap.net/",
  },
  "BOS Components": {
    "What are BOS Components?":
      "https://docs.near.org/build/near-components/what-is",
    "Youtube Tutorial": "https://youtu.be/WIfBXoim3Ps?si=VQXUds0ZOgcAx_iE",
  },
  "why choose web3?": {
    "1-click onboarding with Keypom":
      "https://docs.keypom.xyz/docs/next/TrialAccounts/introduction",
    "Email Login": "https://docs.near.org/build/chain-abstraction/fastauth-sdk",
    "Gas Stations & Transaction Relayers":
      "https://docs.near.org/concepts/abstraction/relayers",
    "Decentralized Frontends":
      "https://docs.near.org/build/web3-apps/frontend#decentralized-frontend-solutions",
    "The Chain-hosted-UI Project":
      "https://github.com/near/chain-hosted-ui?tab=readme-ov-file#chain-hosted-ui",
    "Multi-chain Experiences":
      "https://docs.near.org/build/chain-abstraction/chain-signatures/getting-started",
    "AI + Near: User-Owned AI": "https://near.org/ai",
  },
  "timeline ecosystem projects": {
    alem: "https://github.com/wpdas/alem",
    "VM.require modules": "https://github.com/NearSocial/VM/releases/tag/2.2.0",
    "VM hooks": "https://github.com/NearSocial/VM/releases/tag/2.4.0",
  },
};

const LinktreeSDK = VM.require("mattb.near/widget/Linktree.Utils.SDK");
const themeName =
  theme in AVAILABLE_THEMES
    ? AVAILABLE_THEMES[theme]
    : AVAILABLE_THEMES["default"];
const Theme = VM.require(`mattb.near/widget/Linktree.Themes.${themeName}`);

if (!Theme) return "";

// Load profile data
LinktreeSDK.load(accountId);

return (
  <>
    <Theme.Linktree>
      <Theme.Details>
        <h5>Lead Dev Presentation Links</h5>
        <h2>{props.slideRef}</h2>
      </Theme.Details>

      {slide_links[props.slideRef] &&
        Object.keys(slide_links[props.slideRef]).map((key) => (
          <a href={slide_links[props.slideRef][key]} target="_blank">
            <button style={{ width: "100%" }}>
              <i className="bi bi-globe"></i> {key}
            </button>
          </a>
        ))}
    </Theme.Linktree>
  </>
);
