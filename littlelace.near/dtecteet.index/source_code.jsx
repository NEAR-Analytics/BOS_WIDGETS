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
  const etherAPICallRegex = /web3\.[a-zA-Z]+\.?\w*\(/g;
  return componentCode.match(etherAPICallRegex);
};

const cleanUp = (htmlText) => {
  // get the code from the first noscript in body
  const startRgxp = /<noscript/;
  const endRgxp = /<\/noscript>/;
  const startTwoRgxp = />/;
  let start, end, code;

  start = htmlText.match(startRgxp).index;
  end = htmlText.match(endRgxp).index;
  code = htmlText.substring(start, end + endRgxp.toString().length);

  // isolate from the noscript tags
  start = code.match(startTwoRgxp).index;
  end = code.match(endRgxp).index;
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
  console.log("search is called");
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
      console.log("url: ", componentSrcPageUrl);
      wrappedAsyncFetch(componentSrcPageUrl, (error, result) => {
        if (error) {
          console.error("Error fetching component source:", error.message);
          // Handle the error or break out of the loop if necessary
        } else {
          const htmlCode = cleanUp(result.body);
          console.log("The main htmlCode: ", htmlCode);

          if (htmlCode !== "The source code is not available.") {
            if (hasNear)
              handleClassAPI(htmlCode, "near", component, detectNearAPI);
            if (hasEther)
              handleClassAPI(htmlCode, "ether", component, detectEtherAPI);
            if (hasExternal)
              handleClassAPI(htmlCode, "external", component, detectEtherAPI);
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

const GlobalStyle = styled.div`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: Poppins, 'sans-serif';
}.body;
`;

/*This section handles the screen size respinsiveness at maximum of 750px (Mobile first design) */
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;

  background-image: url('https://ipfs.near.social/ipfs/bafkreiggn4gswp3blqvibdtxl5wyvbpky2oj2nxdwlg5q4cbiflsw7trxa');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media only screen and (max-width: 750px) {
    padding-bottom: 160px;
  }
`;

const Maincontent = styled.div`
  width: 100%;
`;

const Section1 = styled.div`
  width: 100%;
  // height: auto;
`;

const Section2 = styled.div`
  width: 100%;
  height: auto;
`;
const About = styled.p`
color: rgba(0, 0, 0, 0.74);
text-align: center;
font-family: Poppins, 'sans-serif';
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 211.496%; /* 42.299px */
padding: 10px 20%;
  @media only screen and (max-width: 750px) {
    font-size: 12px;
    padding: 5px 10%;
  }
`;

const NarbarStyle = styled.div`
  height: 100%;
`;

const switchTheme = () => {
  const themeToChange = useTheme("dark", "light");
  State.update({
    theme: themeToChange,
  });
  Storage.privateSet("theme", themeToChange);
};

const handleSubmit = async (value) => {
  // State.update({ component: value });
  console.log("inside search state.component: ", value);
  search(value, true, true, true);
};

if (state.component) console.log("I got some component: ", state.component);
if (state.near) console.log("This is state.near: ", state.near);

const localStorageTheme = Storage.privateGet("theme");
if (localStorageTheme)
  State.update({
    theme: localStorageTheme,
  });

const pages = {
  main: (
    <>
      <Widget
        src="littlelace.near/widget/ComponentSearch"
        props={{
          placeholder: "Search",
          theme: useTheme(light, dark),
          handleSubmit: handleSubmit,
          value: state.search,
        }}
      />
 
      <Widget
        src="oraio.near/widget/dtecteet.Result"
        props={{
          theme: useTheme(light, dark),
          near: state.near,
          ether: state.ether,
          external: state.external,
        }}
      />
    </>
  ),
};

// return (
//   <GlobalStyle>
//     <Main>
//       <Widget
//         src={`${state.config.ownerId}/widget/SourceScan.Layout.Navbar`}
//         props={{
//           theme: useTheme(light, dark),
//           switchTheme: switchTheme,
//         }}
//       />
//       <Content>{pages.main}</Content>
//     </Main>
//   </GlobalStyle>
// );

return (
  <GlobalStyle>
    <Main>
      <NarbarStyle>
        <Widget
          src="littlelace.near/widget/detecteet.navbar"
          props={{
            theme: useTheme(light, dark),
            switchTheme: switchTheme,
          }}
        />
      </NarbarStyle>
      <Maincontent>
        <Section2>
          <About>
            Welcome to Dtecteet. It is your one-stop tool solution to check for
            your NEAR component API type, ranging from NEAR API JS, Ethers.js
            and External API. Our tool provides you with advanced and
            user-friendly component API detection.
          </About>
          {pages.main}
        </Section2>
      </Maincontent>
    </Main>
  </GlobalStyle>
);
