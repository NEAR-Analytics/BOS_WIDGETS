const PlayerDashboard = async () => {
  let playerData = Near.view("pixeltoken.near", "ctt_get_player_data", {
    account_id: context.accountId,
  });
  let units_ids = playerData.playerdata.unit_ids.map((id) => {
    return id;
  });

  let units_data = Near.view("pixeltoken.near", "ctt_get_units_by_ids", {
    token_ids: units_ids,
  });

  let PXTDecimalPlace = Near.view(
    "pixeltoken.near",
    "ft_metadata",
    {}
  ).decimals;

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

    .troop-details {
        display: flex;
        flex-direction: column;
        padding: 5px;
        width: 300px;
        height: 200px;
        margin: 2rem 0 2rem 0;
    }

    .troop-details-list {
        padding: 0.2rem;
    }

    .troop-details ul.troop-details-list li.troop-details-item {
        list-style: square inside url("data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIOlI+py+0Po5y02ouzPgUAOw==");
        font-size: .8rem;
        padding: .2rem;
    }

    .troop-details ul.troop-details-list li.troop-details-item.selected {
        list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAABoUlEQVR42mJg2MHAICGh8Z9BQkLj/4IDB/4DAAAA//9iZNjBwMDAwMDAtIDjwH8GBgYGAAAAAP//YpCQ0Pj/4ccPOGZk2MHAIJGgAZFlYGAAAAAA//9igJuyg4GBYQcDA4qWihkz/jNWzJjxX0NDg+HGjRsMHQoZjHAtMG0AAAAA//+C21vxAKKyIiIDbvyLBTcYmSQSNP4v4DjwX0NDg4GBgYGhY8UMBmTAwsDAwFARkcGQ0FCAIvFiwQ1GBgYGBkYJCWQ3YwIAAAAA//+CuwHmOZhODI/C/FUxY8Z/FF9UzJjxn4GBgaEiIQHDeA0FAwbGDz9+/N9w4gRc8MaNGwwLGiYgvLnhxAmGGzduYOiGuYUFJomsCNmhWKKHATMk8YUDQAzweNyB8PKCAwdQohQlvtEw3AkvFtxglEjQ+N+xYgZDgIUF3HzkEEAGFREZDC8W3GBkkUjQ+H/jwQWGjgUL/mus0MBQGGBhwYArpOCJAR1gsxWW1OAhuAAaihISGv/RUxI2sKBhApZ0giUMsBmGSzNRyZUQwEjOuBIELjnAADXE07fDV16dAAAAAElFTkSuQmCC");
    }

    .troop-details.ff {
        background-color: #282880;
        box-shadow: 0 0 0 1px #c8e0e0, 0 0 0 2px #808080, 0 0 0 3px #283030, inset 0 0 0 1px #303088;
        border-radius: 5px;
        height: 100%;
    }

    .troopdata {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>

<body>
    <div id="balance">
    </div>
    <div id="troopdata" class="troopdata container-fluid row">
    </div>
</body>
<script>
    window.addEventListener("message", (event) => {
        const data = event.data.data;
        const decimalPlace = data[3];
        const balances = data[0].balance;
        const troops = data[1];
        const playerId = data[2];
        const pixeltokens = $("<p></p>").text("PixelTokens:");
        const tokens = $("<p></p>").text("Units:");
        const player = $("<p></p>").text("Player:");
        pixeltokens.append((parseInt(balances.pixeltoken)/1000000).toFixed(decimalPlace));
        tokens.append(balances.tokens);
        player.append(playerId);
        $("#balance").append(player, pixeltokens, tokens);
        troops.map((troop) => {
            const meta_data = troop.metadata;
            const dataContainer = $("<div></div>").addClass("troop-details ff");
            const dataList = $("<ul></ul>").addClass("troop-details-list");
            const troopDetails = {
                name: meta_data.title.split("|")[0].split("-")[1].trim(),
                power: meta_data.title.split("|")[1].trim()
            }
            const troopid = $("<li></li>").text("ID: ").append(troop.token_id).addClass("troop-details-item");
            const unit_type = $("<li></li>").text("Type: ").append(troop.unit_type).addClass("troop-details-item");
            const health_mod = $("<li></li>").text("Health Mod: ").append(troop.health_mod).addClass("troop-details-item");
            const damage_mod = $("<li></li>").text("Damage Mod: ").append(troop.damage_mod).addClass("troop-details-item");
            const speed_mod = $("<li></li>").text("Speed Mod: ").append(troop.speed_mod).addClass("troop-details-item");
            const price = $("<li></li>").text("Price: ").append(troop.price).addClass("troop-details-item");
            const title = $("<li></li>").text("Class: ").append(troopDetails.name).addClass("troop-details-item");
            const power = $("<li></li>").text(troopDetails.power).addClass("troop-details-item");
            // const image = $("<img />").attr("src", meta_data.media);
            dataList.append(troopid, unit_type, health_mod, damage_mod, speed_mod, price, title, power);
            dataContainer.append(dataList);
            $("#troopdata").append(dataContainer);
        })
    });
</script> `;
  return (
    <div>
      <div style={{ backgroundColor: "white" }} className="d-flex">
        <iframe
          style={{ height: "70vh", width: "100%" }}
          srcDoc={code}
          message={{
            data:
              [playerData, units_data, context.accountId, PXTDecimalPlace] ||
              "No Player Data",
          }}
        />
      </div>
    </div>
  );
};

return (
  <>
    <PlayerDashboard />
  </>
);
