const GameDescription = () => {
  console.log(props);
  const code = `
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.7.0.slim.min.js" integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE=" crossorigin="anonymous"></script>
    </head>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

        body {
            padding: 5px;
            background: rgb(14, 14, 30);
            font-family: "Pixel Emulator", "Press Start 2P", Courier new, monospace;
            color: #f8f8f8;
            text-shadow: 2px 0 0 #000, 0 2px 0 #000;
        }

        .gameDescription{
            display: flex;
            flex-direction: column;
        }

        .title{
            text-align: center;
        }

        .description{
            font-size: 0.75rem;
            text-align: justify;
        }
    </style>

    <body>
        <div class="gameDescription">
        </div>
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
          style={{ height: "40vh", width: "100%" }}
          srcDoc={code}
          message={{ data: data || "No Data" }}
        />
      </div>
    </div>
  );
};

return (
  <>
    <GameDescription />
  </>
);
