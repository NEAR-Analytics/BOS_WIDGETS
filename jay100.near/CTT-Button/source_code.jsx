const GameButton = () => {
  const code = `
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.7.0.slim.min.js" integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE=" crossorigin="anonymous"></script>
    </head>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

        *, *:before, *:after {
	        box-sizing: border-box;
        }

        body {
          padding: 5px;
          background: rgb(14, 14, 30);
          font-family: "Pixel Emulator", "Press Start 2P", Courier new, monospace;
          color: #f8f8f8;
          text-shadow: 2px 0 0 #000, 0 2px 0 #000;
          text-align: center;
	        padding: 20px;
	        max-width: 100%;
	        margin: 0 auto;
	        font-family: 'Maven Pro', sans-serif;
	        text-align: center;
        }

        h1 {
	        font-size: 2.8rem;
	        line-height: 3.4rem;
        }

        h2 {
	        font-size: 2rem;
        }

        h1, h2 {
	        font-family: 'Press Start 2P', cursive;
        }

        p {
	        font-size: 1.25rem;
	        line-height: 1.75rem;
        }

        .eightbit-btn {
	        background: #92cd41;
	        display: inline-block;
	        position: relative;
	        text-align: center;
	        font-size: 1rem;
	        padding: 1rem;
	        font-family: 'Press Start 2P', cursive;
	        text-decoration: none;
	        color: white;
	        box-shadow: inset -4px -4px 0px 0px #4aa52e;
        }

         .eightbit-btn:hover, .eightbit-btn:focus {
	        background: #76c442;
	        box-shadow: inset -6px -6px 0px 0px #4aa52e;
        }

        .eightbit-btn:active {
	        box-shadow: inset 4px 4px 0px 0px #4aa52e;
        }

        .eightbit-btn:before, .eightbit-btn:after {
	        content: '';
	        position: absolute;
	        width: 100%;
	        height: 100%;
	        box-sizing: content-box;
        }

        .eightbit-btn:before {
	        top: -6px;
	        left: 0;
	        border-top: 6px black solid;
	        border-bottom: 6px black solid;
        }
        .eightbit-btn:after {
	        left: -6px;
	        top: 0;
	        border-left: 6px black solid;
	        border-right: 6px black solid;
        }
    </style>

    <body>
        <div class="col main-container">
        </div>
    </body>
    <script>
        window.addEventListener("message", (event) => {
         const button_data = event.data.data;
         const main_container = $(".main-container");

         const send_response = () => {
           event.source.postMessage("THIS IS RESPONSE", "*");
         }

         button_data.forEach((item) => {
            if(item.title === "Play Now"){
                const row = $("<div></div>").addClass("row playnow")
                const link_text = $("<a></a>").addClass("eightbit-btn").append(item.title);

                row.append(link_text);
                main_container.append(row)
            }

            if(item.title === "TestNet"){
                const row = $("<div></div>").addClass("row testnet")
                const link_text = $("<a></a>").addClass("eightbit-btn").append(item.title);

                row.append(link_text);
                main_container.append(row)
            }

            if(item.title === "Wiki"){
                const row = $("<div></div>").addClass("row wiki")
                const link_text = $("<a></a>").addClass("eightbit-btn").append(item.title);

                row.append(link_text);
                main_container.append(row)
            }

            if(item.title === "NFT"){
                const row = $("<div></div>").addClass("row nft")
                const link_text = $("<a></a>").addClass("eightbit-btn").append(item.title);

                row.append(link_text);
                main_container.append(row)
            }

            if(item.title === "Mobile"){
                const row = $("<div></div>").addClass("row mobile")
                const link_text = $("<a></a>").addClass("eightbit-btn").append(item.title);

                row.append(link_text);
                main_container.append(row)
            }
         })

         $(".playnow").on("click", () => {
            console.log(window.parent.location)
         })

        }, false);
    </script> 
`;
  const data = [
    { title: "Play Now", link: "" },
    { title: "TestNet", link: "" },
    { title: "Wiki", link: "" },
    { title: "NFT", link: "" },
    { title: "Mobile", link: "" },
  ];

  return (
    <div>
      <div style={{ backgroundColor: "white" }} className="d-flex">
        <iframe
          style={{ height: "55vh", width: "100%" }}
          srcDoc={code}
          message={{ data: data || "No Data" }}
          onMessage={(response) => {
            console.log(window);
          }}
          sandbox
          sandbox="allow-top-navigation"
        />
      </div>
    </div>
  );
};

return (
  <>
    <GameButton />
  </>
);
