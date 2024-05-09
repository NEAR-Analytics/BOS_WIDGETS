const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80vh;
  background-color: #1c1f2a;
`

const Heading = styled.h1`
  margin-top: 30px;
  text-align: center;
  color: #8f73ff;
`

const TableHeading = styled.h2`
  color: #e3e6ec;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 20px;
`

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #e3e6ec;
`

const TableHeader = styled.th`
  border: 1px solid #e3e6ec;
  padding: 8px;
  text-align: center;
  background-color: #161622;
  color: #e3e6ec;
`

const TableData = styled.td`
  border: 1px solid #e3e6ec;
  padding: 8px;
  text-align: center;
  background-color: #161622;
  color: #e3e6ec;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const HorizontalLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e3e6ec;
  margin-bottom: 10px;
`

const FooterText = styled.p`
  font-size: 14px;
  color: #e3e6ec;
`

return (
  <Container>
    <TableContainer>
      <Heading>Admin Panel</Heading>
      <TableHeading>User Data</TableHeading>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Matriculation Nr.</TableHeader>
            <TableHeader>Email</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableData>Frederik Mueller</TableData>
            <TableData>12897646</TableData>
            <TableData>frederik.mueller@tum.de</TableData>
          </tr>
          <tr>
            <TableData>Markus Schmelzner</TableData>
            <TableData>19087679</TableData>
            <TableData>markus.schmelzner@tum.de</TableData>
          </tr>
          <tr>
            <TableData>Pavel Ivanov</TableData>
            <TableData>19867890</TableData>
            <TableData>pavel.ivanov@tum.de</TableData>
          </tr>
          <tr>
            <TableData>Alexander Visitzki</TableData>
            <TableData>10978960</TableData>
            <TableData>alexander.visitzki@tum.de</TableData>
          </tr>
        </tbody>
      </StyledTable>
    </TableContainer>
    <Footer>
      <HorizontalLine />
      <FooterText>With Love from TBC &#x2665;</FooterText>
    </Footer>
  </Container>
)
