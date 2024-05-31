const Flex = styled.div`
  position: sticky;
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-a2);
`;
const Box = styled.div``;
const Heading = styled.h1``;
const Text = styled.p``;
const Container = styled.div`
  margin-top: 5px;
  padding-top: 2px;
  padding-left: 4px;
  padding-right: 4px;
  background: var(--gray-a2);
  min-height: 500px;
`;
return (
  <>
    <Flex>
      <Box>
        <Heading>dApp Starter Template</Heading>
      </Box>
      <Box>
        <SuiConnect />
      </Box>
    </Flex>
    <Container>
      <SuiClient
        provides={(props) => (
          <Container my="2">
            <p>{JSON.stringify(props)}</p>
          </Container>
        )}
        query={{
          method: "getOwnedObjects",
          params: { owner: "0x123" },
          options: { gcTime: 10000 },
        }}
      />
    </Container>
  </>
);
