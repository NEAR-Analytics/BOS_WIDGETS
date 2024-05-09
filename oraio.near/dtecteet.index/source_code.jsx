const font = fetch(
  "https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
).body;

if (!font) {
  return null;
}

State.init({
  theme: Storage.privateGet("theme") || "light",
  component: null,
  near: null,
  ether: null,
  external: null,
});

const detectExternalAPI = (componentCode) => {
  const externalAPICallRegex =
    /fetch\(|asyncFetch\(|useCache\(|State\.[a-zA-Z]+\.?\w*\(|Social\.[a-zA-Z]+\.?\w*\(|Storage\.[a-zA-Z]+\.?\w*\(|clipboard\.[a-zA-Z]+\.?\w*\(/g;
  return componentCode.match(externalAPICallRegex);
};

const detectNearAPI = (componentCode) => {
  const nearAPICallRegex = /Near\.[a-zA-Z]+\.?\w*\(/g;
  return componentCode.match(nearAPICallRegex);
};

const detectEtherAPI = (componentCode) => {
  const etherAPICallRegex = /ethers\.[a-zA-Z]+\.?\w*\(/g;
  return componentCode.match(etherAPICallRegex);
};

const cleanUp = (htmlText) => {
  // get the code from the first noscript in body
  const startRgx = /<noscript/;
  const endRgx = /<\/noscript>/;
  const startTwoRgx = />/;
  let start, end, code;

  start = htmlText.match(startRgx).index;
  end = htmlText.match(endRgx).index;
  code = htmlText.substring(start, end + endRgx.toString().length);

  // isolate from the noscript tags
  start = code.match(startTwoRgx).index;
  end = code.match(endRgx).index;
  code = code.substring(start + 1, end);

  return code;
};

const getDependencyComponents = (htmlCode) => {
  const srcValues = [];
  const regex = /&lt;Widget\s*src\s*=\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(htmlCode)) !== null) srcValues.push(match[1]);

  return srcValues;
};

const wrappedAsyncFetch = (url, callback) => {
  asyncFetch(url)
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const search = (component, hasNear, hasEther, hasExternal) => {
  const urlPrefix = "https://near.social/mob.near/widget/WidgetSource?src=";
  const response = {
    external: {},
    near: {},
    ether: {},
  };
  const componentSrcQueue = [component];

  const handleClassAPI = (htmlCode, apiClass, component, apiDetector) => {
    const classAPICalls = apiDetector(htmlCode);
    const classMap = response[apiClass];

    if (classAPICalls.length) {
      if (component in classMap) classMap[component].push(...classAPICalls);
      else classMap[component] = [...classAPICalls];
    }
  };

  const processComponentQueue = (index) => {
    if (index < componentSrcQueue.length) {
      const componentSrcPageUrl = urlPrefix + componentSrcQueue[index];

      wrappedAsyncFetch(componentSrcPageUrl, (error, result) => {
        if (error) {
          console.error("Error fetching component source:", error.message);
        } else {
          const htmlCode = cleanUp(result.body);

          if (htmlCode !== "The source code is not available.") {
            if (hasNear)
              handleClassAPI(
                htmlCode,
                "near",
                componentSrcQueue[index],
                detectNearAPI
              );
            if (hasEther)
              handleClassAPI(
                htmlCode,
                "ether",
                componentSrcQueue[index],
                detectEtherAPI
              );
            if (hasExternal)
              handleClassAPI(
                htmlCode,
                "external",
                componentSrcQueue[index],
                detectExternalAPI
              );
          }

          // Enqueue all dependency component src
          componentSrcQueue.push(...getDependencyComponents(htmlCode));

          // Continue processing the queue recursively
          processComponentQueue(index + 1);
        }
      });
    } else {
      // Finished processing the queue
      const { near, ether, external } = response;
      State.update({
        near,
        ether,
        external,
      });
    }
  };

  // Start processing the queue from index 0
  processComponentQueue(0);
};

const dark = {
  name: "dark",
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
  hover: {
    bg: "#39393c",
    border: "#4e5460",
  },
  text: {
    fontSize: "16px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
  },
};

const light = {
  name: "light",
  bg: "#e3e8ef",
  color: "#1b202b",
  border: "#748094",
  hover: {
    bg: "#eef2f6",
    border: "#d8dfe7",
  },
  text: {
    fontSize: "16px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
  },
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const switchTheme = () => {
  const themeToChange = useTheme("dark", "light");
  State.update({
    theme: themeToChange,
  });
  Storage.privateSet("theme", themeToChange);
};

const localStorageTheme = Storage.privateGet("theme");
if (localStorageTheme)
  State.update({
    theme: localStorageTheme,
  });

const GlobalStyle = styled.div`
  * {
    font-family: "Source Code Pro", cursive;
  }
  ${font}
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)};
  overflow-y: auto;
  padding-bottom: 80px;
  min-height: 100vh;

  @media only screen and (max-width: 750px) {
    padding-bottom: 160px;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SearchStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Content = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
const handleSubmit = (value) => {
  search(value, true, true, true);
};

const pages = {
  main: (
    <>
      <SearchStack>
        <Widget
          src="oraio.near/widget/dtecteet.ComponentSearch"
          props={{
            placeholder: "Account ID",
            theme: useTheme(light, dark),
            handleSubmit: handleSubmit,
          }}
        />
      </SearchStack>
      <Widget
        src="oraio.near/widget/dTecteet.Result"
        props={{
          theme: useTheme(light, dark),
          near: state.near,
          ether: state.ether,
          external: state.external,
        }}
      />
    </>
  ),

  blog: <a href="#"></a>,
  docs: (
    <Widget
      src="oraio.near/widget/dTecteet.Docs"
      props={{
        theme: useTheme(light, dark),
      }}
    />
  ),
};

return (
  <GlobalStyle>
    <Main>
      <Widget
        src="oraio.near/widget/dTecteet.Navbar"
        props={{
          theme: useTheme(light, dark),
          switchTheme: switchTheme,
        }}
      />
      <Content>{pages[props.page] ? pages[props.page] : pages.main}</Content>
    </Main>
  </GlobalStyle>
);
