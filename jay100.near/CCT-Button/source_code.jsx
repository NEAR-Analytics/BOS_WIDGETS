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
        }

        body {
	        text-align: center;
	        padding: 30px;
            font-family: sans-serif;
	        max-width: 1000px;
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
        <a class="eightbit-btn">Play Game</a>
    </body>
    <script>
        window.addEventListener("message", (event) => {
            const title = event.data.data.title;
            const description = event.data.data.description;

            const descriptionHeader = $("<h4></h4>").text(title).addClass("title");
            const gameDescription = $("<p></p>").text(description).addClass("description");

            $(".gameDescription").append(descriptionHeader, gameDescription);
        });
    </script> 
`;
  const data = props;
  return (
    <div>
      <div style={{ backgroundColor: "white" }} className="d-flex">
        <iframe
          style={{ height: "30vh", width: "100%" }}
          srcDoc={code}
          message={{ data: data || "No Data" }}
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
