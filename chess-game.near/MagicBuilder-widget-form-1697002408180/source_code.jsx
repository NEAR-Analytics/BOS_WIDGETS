const user = context.accountId;
const props = {
  schema_version: "0.3.0",
  address: "app.chess-game.near",
  metadata: { name: "", version: "0.1.0", authors: [""] },
  body: {
    functions: [
      {
        name: "get_board",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "storage_unregister",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "storage_balance_of",
        kind: "view",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "account_id",
              type_schema: { type: "$ref" },
              value: "app.chess-game.near",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "recent_finished_games",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "get_challenges",
        kind: "view",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "account_id",
              type_schema: { type: "$ref" },
              value: "app.chess-game.near",
            },
            {
              name: "is_challenger",
              type_schema: { type: "boolean" },
              value: true,
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "get_elo_ratings",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "get_elo",
        kind: "view",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "account_id",
              type_schema: { type: "$ref" },
              value: "app.chess-game.near",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "finished_games",
        kind: "view",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "account_id",
              type_schema: { type: "$ref" },
              value: "app.chess-game.near",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "get_challenge",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "cancel",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "storage_balance_bounds",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "game_info",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "get_game_ids",
        kind: "view",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "account_id",
              type_schema: { type: "$ref" },
              value: "app.chess-game.near",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "clear_all_games",
        kind: "call",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "resign",
        kind: "call",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            { name: "game_id", type_schema: { type: "object" }, value: "" },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "render_board",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "reject_challenge",
        kind: "call",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "challenge_id",
              type_schema: { type: "string" },
              value: "",
            },
            {
              name: "is_challenger",
              type_schema: { type: "boolean" },
              value: "",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "accept_challenge",
        kind: "call",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "challenge_id",
              type_schema: { type: "string" },
              value: "",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "migrate",
        kind: "call",
        export: false,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "create_ai_game",
        kind: "call",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            { name: "difficulty", type_schema: { type: "string" }, value: "" },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "play_move",
        kind: "call",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            { name: "game_id", type_schema: { type: "object" }, value: "" },
            { name: "mv", type_schema: { type: "string" }, value: "" },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "challenge",
        kind: "call",
        export: true,
        params: {
          serialization_type: "json",
          args: [
            {
              name: "challenged_id",
              type_schema: { type: "string" },
              value: "",
            },
          ],
        },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "storage_deposit",
        kind: "call",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "ft_on_transfer",
        kind: "view",
        export: false,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "storage_withdraw",
        kind: "view",
        export: true,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
      {
        name: "new",
        kind: "call",
        export: false,
        params: { serialization_type: "json", args: [] },
        deposit: 0,
        gas: 30000000000000,
      },
    ],
  },
};

return (
  <>
    <Widget src={"magicbuild.near/widget/widget"} props={props} />
  </>
);
