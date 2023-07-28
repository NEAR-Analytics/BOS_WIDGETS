const path = props.path;
const blockHeight = props.blockHeight || "final";

// const jThing = Social.get(path, blockHeight);
// const thing = JSON.parse(jThing);

// const jType = Social.get(thing.type, "final");

// const jWidget = Social.get(thing.template.src, "final");

const files = {
  THING: {
    path: "efiz.near/thing/core",
    language: "json",
    code: '{"data":{"name":"elliot\'s","tagline":"everything","isUnderConstruction":"false","views":[]},"template":{"src":"efiz.near/widget/fun.template"},"type":"every.near/type/core"}',
  },
  TYPE: {
    path: "every.near/type/core",
    language: "json",
    code: '{"properties":[{"name":"name","type":"string","required":true},{"name":"tagline","type":"string"},{"name":"isUnderConstruction","type":"boolean","isMulti":false},{"name":"views","type":"efiz.near/type/core.view","isMulti":"true"}],"widgets":{"view":"efiz.near/widget/view"}}',
  },
  WIDGET: {
    path: "efiz.near/widget/view",
    language: "javascript",
    code: 'const data = props.data;\nconst path = props.path;\n\nconst Header = styled.div`\n  height: 40px;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n`;\n\nconst Container = styled.div`\n  width: 100%;\n  height: 30vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(0,212,255);\nbackground: radial-gradient(circle, rgba(0,212,255,1) 31%, rgba(9,9,121,1) 93%, rgba(11,17,18,1) 95%);\n\n  @media (max-width: 767px) {\n    justify-content: flex-start;\n  }\n`;\n\nconst InnerContainer = styled.div`\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 535px;\n\n  @media (max-width: 767px) {\n    width: 100%;\n  }\n`;\n\nconst Row = styled.div`\n  display: flex;\n  flex-direction: row;\n  width: 100%;  \n//   border: 2px solid orange;\n\n  @media (max-width: 767px) {\n    flex-direction: column;\n  }\n`;\n\nconst Column = styled.div`\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n//   border: 2px solid green;\n  padding: 20px;\n\n  @media (max-width: 767px) {\n    border-top: none;\n    padding: 10px;\n  }\n`;\n\nconst IconBox = styled.div`\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 10px;\n  \n\n  svg {\n    width: 50px;\n    height: 50px;\n  }\n\n  @media (max-width: 767px) {\n    margin-top: 0;\n    svg {\n      width: 40px;\n      height: 40px;\n    }\n  }\n`;\n\nconst ActionButton = styled.button`\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n`;\n\nconst Button = styled.button`\n  text-transform: lowercase !important;\n`;\n\nconst ButtonRow = styled.div`\n    display: flex;\n    flex-direction: row;\n    gap: 8px;\n`;\n\nconst Link = styled.a`\n  text-decoration: none;\n  color: inherit;\n  cursor: pointer;\n`;\n\nconst SubjectField = styled.input`\n  font-size: 4em;\n  line-height: 1.25;\n  font-weight: 400;\n  cursor: pointer;\n  border: none;\n  outline: none;\n  background: none;\n  width: 100%;\n\n  @media (max-width: 767px) {\n    font-size: 1.5em;\n  }\n`;\n\nconst Title = styled.p`\n  line-height: 1.25;\n  font-weight: 400;\n  font-size: 4em;\n  margin-bottom: 0;\n`;\n\nconst Subtitle = styled.p`\n  line-height: 1.25;\n  font-weight: 400;\n  font-size: 2em;\n  margin-left: 70px;\n`;\n\nconst Text = styled.p`\n  line-height: 1.25;\n  font-weight: 400;\n  font-size: 2em;\n`;\n\nconst Subtext = styled.p`\n  line-height: 1.25;\n  font-weight: 400;\n  font-size: 1em;\n`;\n\nfunction Thing() {\n  if (state.thingSrc) {\n    return (\n      <>\n        <Widget\n          src={"every.near/widget/every.thing.view"}\n          props={{ path: state.thingSrc }}\n        />\n      </>\n    );\n  }\n}\n\n// how can we have this be custom?\n// settings/every/subject\n\nfunction handleInputChange(e) {\n  State.update({\n    path: e.target.value,\n  });\n}\n\nconst Grid = styled.div`\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n\n  @media (hover: none) {\n    grid-template-columns: repeat(1, 1fr);\n  }\n  padding: 20px;\n`;\n\nfunction Edges() {\n  const edges = Social.index("edge", path);\n\n  if (!edges) {\n    return <></>;\n  }\n\n  return (\n    <>\n      {edges?.map((it) => {\n        const parts = it.value.path?.split("/");\n        if (!["core.feed", "community"].includes(parts[2])) {\n          return (\n            <Button onClick={() => State.update({ thingSrc: it.value.path })}>\n              {parts[2]}\n            </Button>\n          );\n        }\n      })}\n    </>\n  );\n}\n\nreturn (\n  <>\n    <Container>\n      <InnerContainer>\n        <Row>\n          <Column>\n            <Title>{data.name}</Title>\n            <Subtitle>{data.tagline}</Subtitle>\n          </Column>\n        </Row>\n      </InnerContainer>\n    </Container>\n    {data.isUnderConstruction === "true" ? (\n      <Widget\n        src="efiz.near/widget/Every.Thing.View"\n        props={{ path: "efiz.near/thing/under.construction" }}\n      />\n    ) : null}\n    <ButtonRow>\n      <Edges />\n    </ButtonRow>\n    <>\n      <Thing />\n    </>\n  </>\n);',
  },
};

State.init({
  view: "THING",
});

const Button = styled.button``;

function onChange(e) {
  State.update({
    code: e.target.value,
  });
}

const parts = state.path.split("/");

return (
  <div>
    <div>
      <Button onClick={() => State.update({ view: "THING" })}>thing</Button>
      <Button onClick={() => State.update({ view: "TYPE" })}>type</Button>
      <Button onClick={() => State.update({ view: "WIDGET" })}>widget</Button>
    </div>
    <Widget
      src={"efiz.near/widget/MonacoEditor"}
      props={{
        path: files[state.view].path,
        language: files[state.view].language,
        code: files[state.view].code,
        onChange: onChange,
      }}
    />
  </div>
);
