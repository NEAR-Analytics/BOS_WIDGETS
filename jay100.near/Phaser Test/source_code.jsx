const GameContainer = () => {
  const code = `
<head>
 <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no, minimal-ui">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="full-screen" content="yes" />
        <meta name="screen-orientation" content="portrait" />
<script src="//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
</head>
<style>
  body{
    margin: 0;
    padding: 0;
    overflow: hidden;
    ;
  }
</style>
<body>
</body>
<script>
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{

    this.load.image('sky', 'https://cdn2.vectorstock.com/i/1000x1000/12/86/sky-day-game-background-vector-21861286.jpg');
}

function create ()
{
    this.add.image(400, 300, 'sky');
}

function update ()
{
}
</script>
  `;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="mx-auto"
    >
      <iframe className="w-100 h-100" srcDoc={code} />
    </div>
  );
};

return (
  <div style={{ width: "100%", height: "100%", background: "blue" }}>
    <GameContainer />
  </div>
);
