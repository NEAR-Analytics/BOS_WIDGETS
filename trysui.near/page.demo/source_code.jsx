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
        <ConnectButton />
      </Box>
    </Flex>
    <Container>
      <SuiClientQuery
        provides={({ account, data, isPending, isError, error }) => {
          if (account) {
            return <Flex>Connected wallet: {account}</Flex>;
          }
          if (error) {
            return <Flex>Error: {error.message}</Flex>;
          }
          if (isPending || !data) {
            return <Flex>Loading...</Flex>;
          }
          return (
            <Flex direction="column" my="2">
              {data.data.length === 0 ? (
                <Text>No objects owned by the connected wallet</Text>
              ) : (
                <Heading size="4">
                  Objects owned by the connected wallet
                </Heading>
              )}
              {data.data.map((object) => (
                <Flex key={object.data?.objectId}>
                  <Text>Object ID: {object.data?.objectId}</Text>
                </Flex>
              ))}
            </Flex>
          );
        }}
        query={{
          method: "getOwnedObjects",
          params: { owner: props.account },
          options: { gcTime: 10000 },
        }}
      />
    </Container>
  </>
);
