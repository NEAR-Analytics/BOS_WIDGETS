const ownerId = "potlock.near";
const registryContractId = "registry.potlock.near";
const donationContractId = "donate.potlock.near";

const CREATE_PROJECT_TAB = "createproject";
const EDIT_PROJECT_TAB = "editproject";
const PROJECTS_LIST_TAB = "projects";
const PROJECT_DETAIL_TAB = "project";
const CART_TAB = "cart";
const FEED_TAB = "feed";

const Theme = styled.div`
  * {
    font-family: "Mona-Sans";
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 400;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Regular.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 500;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Medium.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 600;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-SemiBold.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 700;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Bold.woff) format("woff");
  }
`;

State.init({
  registeredProjects: null,
  cart: null,
  checkoutSuccess: false,
  checkoutSuccessTxHash: null,
  donations: null,
  // previousCart: null,
  nearToUsd: null,
  isCartModalOpen: false,
  isNavMenuOpen: false,
  registryAdmins: null,
  registeredProjects: null,
});

if (!state.nearToUsd) {
  asyncFetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(
    (res) => {
      if (res.ok) {
        State.update({ nearToUsd: res.body.near.usd });
      }
    }
  );
}

// console.log("state in Index: ", state);

if (!state.registeredProjects) {
  State.update({ registeredProjects: Near.view(registryContractId, "get_projects", {}) });
}

if (!state.registeredProjects) return "";

if (!state.donations) {
  State.update({
    donations: Near.view(donationContractId, "get_donations", {}), // TODO: ADD PAGINATION
  });
}

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

if (!state.registeredProjects) {
  Near.asyncView(registryContractId, "get_projects", {})
    .then((projects) => {
      // get social data for each project
      // name
      // description
      // bannerImage
      // profileImage
      // category
      // horizon stuff, e.g. tags
      Near.asyncView("social.near", "get", {
        keys: projects.map((project) => `${project.id}/profile/**`),
      }).then((socialData) => {
        const formattedProjects = projects.map((project) => {
          const profileData = socialData[project.id]?.profile;
          let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
          if (profileData.image) {
            const imageUrl = getImageUrlFromSocialImage(profileData.image);
            if (imageUrl) profileImageUrl = imageUrl;
          }
          // get banner image URL
          let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
          if (profileData.backgroundImage) {
            const imageUrl = getImageUrlFromSocialImage(profileData.backgroundImage);
            if (imageUrl) bannerImageUrl = imageUrl;
          }
          const formatted = {
            id: project.id,
            name: profileData.name ?? "",
            description: profileData.description ?? "",
            bannerImageUrl,
            profileImageUrl,
            status: project.status,
            tags: [profileData.category.text ?? CATEGORY_MAPPINGS[profileData.category] ?? ""], // TODO: change this to get tags from horizon/social
          };
          return formatted;
        });
        State.update({
          registeredProjects: formattedProjects,
        });
      });
    })
    .catch((e) => {
      console.log("error getting projects: ", e);
      State.update({ getRegisteredProjectsError: e });
    });
}

if (state.registryAdmins === null) {
  const registryAdmins = Near.view(registryContractId, "get_admins", {});
  State.update({ registryAdmins });
}

const tabContentWidget = {
  [CREATE_PROJECT_TAB]: "Project.Create",
  [EDIT_PROJECT_TAB]: "Project.Create",
  [PROJECTS_LIST_TAB]: "Project.ListPage",
  [PROJECT_DETAIL_TAB]: "Project.Detail",
  [CART_TAB]: "Cart.Checkout",
  [FEED_TAB]: "Feed",
};

const getWidget = (props) => {
  if (props.tab in tabContentWidget) {
    return tabContentWidget[props.tab];
  }
  // backup (TODO: review)
  return tabContentWidget[PROJECTS_LIST_TAB];
};

const getTabWidget = (tab) => {
  if (tab in tabContentWidget) {
    return tabContentWidget[tab];
  }

  return tabContentWidget[PROJECTS_LIST_TAB];
};

const CART_KEY = "cart";
// const PREVIOUS_CART_KEY = "previousCart";
const storageCart = Storage.get(CART_KEY);
// const storagePreviousCart = Storage.get(PREVIOUS_CART_KEY);
const DEFAULT_CART = {};

const props = {
  ...props,
  ...state,
  addProjectsToCart: (projects) => {
    const cart = state.cart ?? {};
    projects.forEach(({ id, amount, ft, referrerId }) => {
      cart[id] = { amount, ft: ft ?? "NEAR", referrerId }; // default to NEAR
    });
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  removeProjectsFromCart: (projectIds) => {
    const cart = state.cart ?? {};
    projectIds.forEach((projectId) => {
      delete cart[projectId];
    });
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  updateCartItem: (projectId, amount, ft, referrerId) => {
    const cart = state.cart ?? {};
    const updated = {};
    // if (amount === "") updated.amount = "0";
    if (amount || amount === "") updated.amount = amount;
    if (ft) updated.ft = ft;
    if (referrerId) updated.referrerId = referrerId;
    cart[projectId] = updated;
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  clearCart: () => {
    State.update({ cart: {} });
    Storage.set(CART_KEY, JSON.stringify(DEFAULT_CART));
  },
  // checkoutSuccess: (props.tab === CART_TAB && props.transactionHashes),
  // checkoutSuccessTxHash: props.tab === CART_TAB ? props.transactionHashes : "",
  setCheckoutSuccess: (checkoutSuccess) => {
    State.update({ checkoutSuccess });
  },
  setIsCartModalOpen: (isOpen) => {
    State.update({ isCartModalOpen: isOpen });
  },
  setIsNavMenuOpen: (isOpen) => {
    State.update({ isNavMenuOpen: isOpen });
  },
  CATEGORY_MAPPINGS: {
    "social-impact": "Social Impact",
    "non-profit": "NonProfit",
    climate: "Climate",
    "public-good": "Public Good",
    "de-sci": "DeSci",
    "open-source": "Open Source",
    community: "Community",
    education: "Education",
  },
};

if (props.transactionHashes && props.tab === CART_TAB) {
  // if transaction hashes are in URL but haven't been added to props, override state:
  props.checkoutSuccessTxHash = props.transactionHashes;
  props.checkoutSuccess = true;
}

if (state.cart === null && storageCart !== null) {
  // cart hasn't been set on state yet, and storageCart has been fetched
  // if storageCart isn't undefined, set it on state
  // otherwise, set default cart on state
  let cart = DEFAULT_CART;
  if (storageCart) {
    cart = JSON.parse(storageCart);
  }
  State.update({ cart });
}

// if (state.previousCart === null && storagePreviousCart !== null) {
//   // previousCart hasn't been set on state yet, and storagePreviousCart has been fetched
//   // if storagePreviousCart isn't undefined, set it on state
//   if (storagePreviousCart && Object.keys(JSON.parse(storagePreviousCart)).length > 0) {
//     console.log("updating previous cart");
//     State.update({ previousCart: JSON.parse(storagePreviousCart) });
//   }
// }

// console.log("state in Index: ", state);

if (state.checkoutSuccessTxHash && state.cart && Object.keys(state.cart).length > 0) {
  // if checkout was successful after wallet redirect, clear cart
  // store previous cart in local storage to show success message
  // console.log("previous cart: ", state.cart);
  props.clearCart();
}

if (props.tab === EDIT_PROJECT_TAB) {
  props.edit = true;
}

const tabContent = <Widget src={`${ownerId}/widget/${getTabWidget(props.tab)}`} props={props} />;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  // padding: 3em;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  border-top: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--base-white, #fff);

  &.form {
    border: none;
    background: #fafafa;
  }
`;

const isForm = [CREATE_PROJECT_TAB].includes(props.tab);

if (!state.cart || !state.registeredProjects) {
  return "";
}

return (
  <Theme>
    <Widget src={`${ownerId}/widget/Nav`} props={props} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
  </Theme>
);
