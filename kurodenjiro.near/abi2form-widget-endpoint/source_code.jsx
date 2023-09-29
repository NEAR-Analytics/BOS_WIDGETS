const user = "kurodenjiro.near";
const props = {
  schema_version: "0.3.0",
  address: "trustcore.near",
  metadata: {
    name: "hello_near",
    version: "1.0.0",
    authors: [],
    build: {
      compiler: "tsc 4.7.4",
      builder: "near-sdk-js 1.0.0",
    },
  },
  body: {
    functions: [
      {
        name: "getUrl",
        kind: "view",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "name",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
        result: {
          serialization_type: "json",
          type_schema: {
            type: "string",
          },
        },
      },
      {
        name: "didParticipate",
        kind: "view",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "user",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
        result: {
          serialization_type: "json",
          type_schema: {
            type: "boolean",
          },
        },
      },
      {
        name: "participateArray",
        kind: "view",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
        result: {
          serialization_type: "json",
          type_schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      {
        name: "getAllPrompts",
        kind: "view",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [],
        },
        result: {
          serialization_type: "json",
          type_schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      {
        name: "getVotes",
        kind: "view",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
        result: {
          serialization_type: "json",
          type_schema: {
            type: "array",
            items: {
              type: "number",
            },
          },
        },
      },
      {
        name: "getCandidatePair",
        kind: "view",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
        result: {
          serialization_type: "json",
          type_schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      {
        name: "addCandidatePair",
        kind: "call",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "name1",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "name2",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "url1",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "url2",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
      },
      {
        name: "initializeVotes",
        kind: "call",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
      },
      {
        name: "addToPromptArray",
        kind: "call",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
      },
      {
        name: "clearPromptArray",
        kind: "call",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [],
        },
      },
      {
        name: "addVote",
        kind: "call",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "index",
              type_schema: {
                type: "number",
              },
            },
          ],
        },
      },
      {
        name: "recordUser",
        kind: "call",
        modifiers: [],
        params: {
          serialization_type: "json",
          args: [
            {
              name: "prompt",
              type_schema: {
                type: "string",
              },
            },
            {
              name: "user",
              type_schema: {
                type: "string",
              },
            },
          ],
        },
      },
    ],
    root_schema: {
      type: "object",
      additionalProperties: false,
      patternProperties: {
        "^[0-9]+$": {
          type: "string",
        },
      },
      $schema: "http://json-schema.org/draft-07/schema#",
    },
  },
};

return (
  <>
    <Widget src={`${user}/widget/abi2form-widget`} props={props} />
  </>
);
