const StyledPre = styled.pre`
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: 0.6em;
  max-width: 100%;
  display: flex;
  word-wrap: break-word;
  height: 50vh;
  max-width: 80vw;
  margin: auto;
  max-height: 80vh;
  min-height: 20vh;
  position: relative;
`;

const StyleContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;

  /* Responsive container */
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const PreComponent = ({ children }) => {
    return <StyledPre>{children}</StyledPre>;
  };
  const explanation = props;
  const componentType = props.componentType;
  const Explanation = 
  `<!DOCTYPE html>

  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://prismjs.com/themes/prism-okaidia.css" />

      <style>
        /* Style the scrollbar */
        ::-webkit-scrollbar {
          width: 3px;
        }
  
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #a4adb3;
        }
  
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #a4adb3;
          border-radius: 4px;
        }
  
        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
  
        .accordion {
          background-color: #f7f8f9;
          color: #007bff;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          border: none;
          border-bottom: 1px solid #dcdfe1;
          border-radius: 5px;
          text-align: left;
          outline: none;
          font-size: 15px;
          transition: 0.4s;
        }
  
        .main-accordion {
          margin-bottom: 10px;
        }
  
        .sub-accordion {
          margin-left: 20px;
          margin-bottom: 10px;
        }
  
        .active,
        .accordion:hover {
          background-color: #eef0f1;
          color: #004a99;
        }
  
        .accordion:after {
          content: "+";
          color: #b7bec2;
          font-weight: bold;
          float: right;
          margin-left: 5px;
        }
  
        .accordion:after:hover {
          background-color: #a4adb3;
        }
  
        .active:after {
          content: "-";
        }
  
        .panel {
          padding: 0 18px;
          background-color: white;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
  
        .panel-spacing {
          margin-bottom: 50px;
        }
  
        .code {
          background-color: #272822;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          margin: 10px;
          position: relative;
        }
        
      </style>
    </head>
    <body>
      <h2>Props</h2>
      <p>More Props of the ${componentType} component are also available.</p>
  
      <!-- Container for accordion items -->
      <div id="accordionContainer"></div>
  
      <script>
        // Define accordion items
        const accordionItems = ${JSON.stringify(explanation)};
        console.log(accordionItems);
        // Function to dynamically create accordion elements
        function createAccordionItem(
          title,
          required, 
          content,
          code,
          children,
          accordionContainer
        ) {
  
          // Create accordion button
          const accordionButton = document.createElement("button");
          accordionButton.className = "accordion main-accordion";
  
          if (required == "true") {
            accordionButton.textContent = title + " (* required)";
          } else {
            accordionButton.textContent = title;
          }
  
          // Create accordion panel
          const accordionPanel = document.createElement("div");
          accordionPanel.className = "panel";
          const panelContent = document.createElement("p");
          panelContent.textContent = content;
  
          if (code && code.length > 0) {
            const codeDiv = document.createElement("div");
            codeDiv.className = "code";
  
            const preTag = document.createElement("pre");
  
            const codeContent = document.createElement("code");
            codeContent.className = "language-js";
            codeContent.textContent = code;
  
            preTag.appendChild(codeContent);
  
            codeDiv.appendChild(preTag);
  
            accordionPanel.appendChild(panelContent);
  
            accordionPanel.appendChild(preTag);
          } else {
            accordionPanel.appendChild(panelContent);
          }
  
          // Append button and panel to container
          accordionContainer.appendChild(accordionButton);
          accordionContainer.appendChild(accordionPanel);
  
          // Add click event listener to toggle visibility
          accordionButton.addEventListener("click", function () {
            this.classList.toggle("active");
            if (accordionPanel.style.maxHeight) {
              accordionPanel.style.maxHeight = null;
            } else {
              accordionPanel.style.maxHeight = "100%";
            }
          });
  
          // Create child accordions recursively
          if (children && children.length > 0) {
            const childContainer = document.createElement("div");
            accordionPanel.appendChild(childContainer);
  
            children.forEach((child) => {
              createAccordionItem(
                child.title,
                child.required,
                child.content,
                child.code,
                child.children,
                childContainer
              );
            });
          }
        }
  
        // Create accordion items dynamically
        accordionItems.forEach((item) => {
          createAccordionItem(
            item.title,
            item.required,
            item.content,
            item.code,
            item.children,
            document.getElementById("accordionContainer")
          );
        });
      </script>
  
      <script src="https://prismjs.com/components/prism-core.min.js"></script>
      <script>
  document.addEventListener('DOMContentLoaded', function () {
    Prism.highlightAll();
  });
</script>
      <script src="https://prismjs.com/plugins/autoloader/prism-autoloader.min.js"></script>
    </body>
  </html>
  
  ` ;


return (
    <>
     <div className="card">
            <StyleContainer>
          <PreComponent>
         
             
              <iframe
                srcDoc={Explanation}
                style={{
                  width: "100vw",
                  top: "0",
                  zIndex: 1,
                }}
              />   
           
          
          </PreComponent>
          </StyleContainer>
        </div>
    </>
);