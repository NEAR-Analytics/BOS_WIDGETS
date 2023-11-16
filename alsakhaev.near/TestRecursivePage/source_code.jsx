return (
  <Widget
    src="alsakhaev.near/widget/TestContainer"
    props={{
      children: (
        <>
          <Widget
            src="alsakhaev.near/widget/TestContainer"
            props={{
              children: (
                <>
                  <Widget
                    src="alsakhaev.near/widget/TestContainer"
                    props={{ children: <>1</> }}
                  />
                  <Widget
                    src="alsakhaev.near/widget/TestContainer"
                    props={{ children: <>2</> }}
                  />
                </>
              ),
            }}
          />
          <Widget
            src="alsakhaev.near/widget/TestContainer"
            props={{
              children: (
                <>
                  <Widget
                    src="alsakhaev.near/widget/TestContainer"
                    props={{ children: <>3</> }}
                  />
                  <Widget
                    src="alsakhaev.near/widget/TestContainer"
                    props={{ children: <>4</> }}
                  />
                </>
              ),
            }}
          />
        </>
      ),
    }}
  />
);
