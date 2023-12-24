State.init({ commitLoading: false });

const data = {
  widget: {
    "abi2form-widget-endpoint-export": {
      "": 'const user = context.accountId;\r\nconst props = {\r\n  schema_version: "0.3.0",\r\n  address: "trustcore.near",\r\n  metadata: {\r\n    name: "hello_near",\r\n    version: "1.0.0",\r\n    authors: [],\r\n    build: {\r\n      compiler: "tsc 4.7.4",\r\n      builder: "near-sdk-js 1.0.0",\r\n    },\r\n  },\r\n  body: {\r\n    functions: [\r\n      {\r\n        name: "getUrl",\r\n        kind: "view",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "name",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n        result: {\r\n          serialization_type: "json",\r\n          type_schema: {\r\n            type: "string",\r\n          },\r\n        },\r\n      },\r\n      {\r\n        name: "didParticipate",\r\n        kind: "view",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "user",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n        result: {\r\n          serialization_type: "json",\r\n          type_schema: {\r\n            type: "boolean",\r\n          },\r\n        },\r\n      },\r\n      {\r\n        name: "participateArray",\r\n        kind: "view",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n        result: {\r\n          serialization_type: "json",\r\n          type_schema: {\r\n            type: "array",\r\n            items: {\r\n              type: "string",\r\n            },\r\n          },\r\n        },\r\n      },\r\n      {\r\n        name: "getAllPrompts",\r\n        kind: "view",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [],\r\n        },\r\n        result: {\r\n          serialization_type: "json",\r\n          type_schema: {\r\n            type: "array",\r\n            items: {\r\n              type: "string",\r\n            },\r\n          },\r\n        },\r\n      },\r\n      {\r\n        name: "getVotes",\r\n        kind: "view",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n        result: {\r\n          serialization_type: "json",\r\n          type_schema: {\r\n            type: "array",\r\n            items: {\r\n              type: "number",\r\n            },\r\n          },\r\n        },\r\n      },\r\n      {\r\n        name: "getCandidatePair",\r\n        kind: "view",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n        result: {\r\n          serialization_type: "json",\r\n          type_schema: {\r\n            type: "array",\r\n            items: {\r\n              type: "string",\r\n            },\r\n          },\r\n        },\r\n      },\r\n      {\r\n        name: "addCandidatePair",\r\n        kind: "call",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "name1",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "name2",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "url1",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "url2",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n      },\r\n      {\r\n        name: "initializeVotes",\r\n        kind: "call",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n      },\r\n      {\r\n        name: "addToPromptArray",\r\n        kind: "call",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n      },\r\n      {\r\n        name: "clearPromptArray",\r\n        kind: "call",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [],\r\n        },\r\n      },\r\n      {\r\n        name: "addVote",\r\n        kind: "call",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "index",\r\n              type_schema: {\r\n                type: "number",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n      },\r\n      {\r\n        name: "recordUser",\r\n        kind: "call",\r\n        modifiers: [],\r\n        params: {\r\n          serialization_type: "json",\r\n          args: [\r\n            {\r\n              name: "prompt",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n            {\r\n              name: "user",\r\n              type_schema: {\r\n                type: "string",\r\n              },\r\n            },\r\n          ],\r\n        },\r\n      },\r\n    ],\r\n    root_schema: {\r\n      type: "object",\r\n      additionalProperties: false,\r\n      patternProperties: {\r\n        "^[0-9]+$": {\r\n          type: "string",\r\n        },\r\n      },\r\n      $schema: "http://json-schema.org/draft-07/schema#",\r\n    },\r\n  },\r\n};\r\n\r\nreturn (\r\n  <>\r\n    <Widget src={`${user}/widget/abi2form-widget`} props={props} />\r\n  </>\r\n);\r\n',
    },
  },
};

const form = Social.get(`kurodenjiro.near/widget/abi2form-widget-endpoint`);

console.log("Form:", form);

const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <button
    disabled={state.commitLoading}
    onClick={() => {
      State.update({ commitLoading: true });
      Social.set(data, {
        force: true,
        onCommit: () => {
          State.update({ commitLoading: false });
        },
        onCancel: () => {
          State.update({ commitLoading: false });
        },
      });
    }}
  >
    {state.commitLoading && Loading} Export
  </button>
);
