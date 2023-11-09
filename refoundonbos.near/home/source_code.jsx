const ownerId = "refoundonbos.near";
const contractId = "refoundjournalism.near";
const CREATE_POST_TAB = "createpost";
const EDIT_POST_TAB = "editpost";
const POSTS_LIST_TAB = "posts";
const POST_DETAIL_TAB = "post";

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
    src:
      local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Regular.woff)
        format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 500;
    src:
      local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Medium.woff)
        format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 600;
    src:
      local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-SemiBold.woff)
        format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 700;
    src:
      local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Bold.woff) format("woff");
  }
`;

State.init({
  cart: null,
  nearToUsd: null,
  series: [],
  seriesIsFetched: false,
  nearToUsd: useCache(
    () =>
      asyncFetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
      ).then((res) => {
        console.log("congecko res body: ", res.body);
        return res.body.near.usd;
      }),
    "nearToUsd",
    { subscribe: false }
  ),
  isCartModalOpen: false,
  registryAdmins: null,
});

if (state.nearToUsd === null) {
  const res = fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
  );
  console.log("coingecko res: ", res);
  State.update({ nearToUsd: res.body.near.usd });
}

console.log("state: ", state);

const tabContentWidget = {
  [CREATE_POST_TAB]: "create",
  [EDIT_POST_TAB]: "create",
  [POSTS_LIST_TAB]: "discover",
  [POST_DETAIL_TAB]: "postdetail",
};

const getWidget = (props) => {
  if (props.tab in tabContentWidget) {
    return tabContentWidget[props.tab];
  }
  // backup (TODO: review)
  return tabContentWidget[POSTS_LIST_TAB];
};

const getTabWidget = (tab) => {
  if (tab in tabContentWidget) {
    return tabContentWidget[tab];
  }

  return tabContentWidget[POSTS_LIST_TAB];
};

const props = {
  ...props,
  ...state,
  addProjectsToCart: (posts) => {
    const cart = state.cart ?? {};
    posts.forEach(({ id, amount, ft, referrerId }) => {
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
  checkoutSuccess: true,
  checkoutSuccessTxHash: true,
  setIsCartModalOpen: (isOpen) => {
    State.update({ isCartModalOpen: isOpen });
  },
};

const CART_KEY = "cart";
const storageCart = Storage.get(CART_KEY);
const DEFAULT_CART = {};

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

if (props.checkoutSuccess && state.cart && Object.keys(state.cart).length > 0) {
  // if checkout was successful, clear cart
  State.update({ cart: {} });
  Storage.set(CART_KEY, JSON.stringify(DEFAULT_CART));
}

if (props.tab === EDIT_POST_TAB) {
  props.edit = true;
}

const tabContent = (
  <Widget src={`${ownerId}/widget/${getTabWidget(props.tab)}`} props={props} />
);

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

const isForm = [CREATE_POST_TAB].includes(props.tab);

if (!state.cart) {
  return "";
}

return (
  <Theme>
    <Widget src={`${ownerId}/widget/nav`} props={props} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
  </Theme>
);
