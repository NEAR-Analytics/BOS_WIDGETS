const splitTexts = (input, separatorArr) => {
  var placeholder = "[{[separator]}]";

  separatorArr.map((separator) => {
    input = input.replaceAll(separator, placeholder);
  });

  return input.split(placeholder).map((e) => {
    return e.replaceAll(placeholder, "");
  });
};

const defaultSeparators = [" ", ",", "_", ",", "/", "-", ".", "\n"];

function convertStandard(input, textSeparators, elemFunc, wordSperator) {
  var texts = splitTexts(input, textSeparators);
  texts = texts.map((elem, i) => {
    return elemFunc(elem, i);
  });
  return texts.join(wordSperator);
}

function lowercaseFirstLetter(string) {
  if (string.length === 0) {
    return string;
  }

  return string.charAt(0).toLowerCase() + string.slice(1);
}

function uppercaseFirstLetter(string) {
  if (string.length === 0) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

const inputChange = (event) => {
  State.update({ inputText: event.target.value });
};

const convert = (format) => {
  var input = state.inputText;
  var output = "";

  switch (format) {
    case "lowercase":
      output = input.toLowerCase();
      break;
    case "UPPERCASE":
      output = input.toUpperCase();
      break;
    case "camelCase":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return i == 0
            ? lowercaseFirstLetter(elem)
            : uppercaseFirstLetter(elem);
        },
        ""
      );
      break;
    case "CapitalCase":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return uppercaseFirstLetter(elem);
        },
        " "
      );
      break;
    case "CONSTANT_CASE":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return elem.toUpperCase();
        },
        "_"
      );
      break;
    case "dot.case":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return elem.toLowerCase();
        },
        "."
      );
      break;
    case "Header-Case":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return uppercaseFirstLetter(elem);
        },
        "-"
      );
      break;
    case "param-case":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return elem.toLowerCase();
        },
        "-"
      );
      break;
    case "PascalCase":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return uppercaseFirstLetter(elem);
        },
        ""
      );
      break;
    case "path/case":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return elem.toLowerCase();
        },
        "/"
      );
      break;
    case "Sentence case":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return i == 0
            ? uppercaseFirstLetter(elem)
            : lowercaseFirstLetter(elem);
        },
        " "
      );
      break;
    case "snake_case":
      output = convertStandard(
        input,
        defaultSeparators,
        (elem, i) => {
          return elem.toLowerCase();
        },
        "_"
      );
      break;
    case "sWAP cASE":
      output = convertStandard(
        input,
        [" "],
        (elem, i) => {
          return lowercaseFirstLetter(elem.toUpperCase());
        },
        " "
      );
      break;
    case "Title Case":
      output = convertStandard(
        input,
        [" ", "\n"],
        (elem, i) => {
          return i == 0 ? uppercaseFirstLetter(elem) : elem;
        },
        " "
      );
      break;
  }

  State.update({ outputText: output });
};

const clearBtn = () => {
  State.update({ outputText: "" });
  State.update({ inputText: "" });
};

return (
  <div className="container">
    <h1>Case Converter</h1>
    <div className="col-12  mb-3">
      <label className="form-label">Input String</label>
      <textarea
        className="form-control"
        rows="4"
        cols="50"
        value={state.inputText}
        onChange={inputChange}
      ></textarea>
    </div>
    <div className="col-12 mb-1">
      <div className="d-flex justify-content-between">
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("lowercase")}
          >
            lowercase
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("UPPERCASE")}
          >
            UPPERCASE
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("camelCase")}
          >
            camelCase
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("CapitalCase")}
          >
            Capital Case
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("CONSTANT_CASE")}
          >
            CONSTANT_CASE
          </button>
        </div>
      </div>
    </div>
    <div className="col-12 mb-1">
      <div className="d-flex justify-content-between">
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("dot.case")}
          >
            dot.case
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("Header-Case")}
          >
            Header-Case
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("param-case")}
          >
            param-case
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("PascalCase")}
          >
            PascalCase
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("path/case")}
          >
            path/case
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("Sentence case")}
          >
            Sentence case
          </button>
        </div>
      </div>
    </div>
    <div className="col-12 mb-3">
      <div className="d-flex justify-content-between">
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("snake_case")}
          >
            snake_case
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("sWAP cASE")}
          >
            sWAP cASE
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => convert("Title Case")}
          >
            Title Case
          </button>
        </div>
      </div>
    </div>
    <div className="col-12  mb-3">
      <label for="outputText" className="form-label">
        Output String
      </label>
      <textarea
        className="form-control"
        rows="4"
        cols="50"
        value={state.outputText}
      ></textarea>
    </div>
    <div className="col-12 mb-3">
      <button className="btn btn-danger btn-sm" onClick={() => clearBtn()}>
        Clear
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          clipboard.writeText(state.outputText);
          State.update({ copied: true });
          setTimeout(() => {
            State.update({ copied: false });
          }, 2000);
        }}
      >
        {state.copied ? "Copied" : "Copy"}
      </button>
    </div>
  </div>
);
