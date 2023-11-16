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
                    props={{
                      children: <Widget src="dapplets.near/widget/Cat" />,
                    }}
                  />
                  <Widget
                    src="alsakhaev.near/widget/TestContainer"
                    props={{
                      children: <Widget src="dapplets.near/widget/Cat" />,
                    }}
                  />
                  <Widget src="dapplets.near/widget/Cat" />
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
                    props={{
                      children: <Widget src="dapplets.near/widget/Cat" />,
                    }}
                  />
                  <Widget
                    src="alsakhaev.near/widget/TestContainer"
                    props={{
                      children: <Widget src="dapplets.near/widget/Cat" />,
                    }}
                  />
                  <Widget src="dapplets.near/widget/Cat" />
                </>
              ),
            }}
          />
          <Widget src="dapplets.near/widget/Cat" />
        </>
      ),
    }}
  />
);
