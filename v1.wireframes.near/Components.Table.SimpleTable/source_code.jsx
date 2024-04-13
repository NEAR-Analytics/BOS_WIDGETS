/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */
/* -------------------------------------------------------------------------- */

const tableWidth = props.style.tableWidth;
const tableBackgroundColor = props.style.tableBackgroundColor;
const tableBorder = props.style.tableBorder;
const tableBorderRadius = props.style.tableBorderRadius;

const tHeadBackgroundColor = props.style.tHeadBackgroundColor;
const tHeadFontColor = props.style.tHeadFontColor;
const tHeadFontSize = props.style.tHeadFontSize;

const tRowBackgroundColor = props.style.tRowBackgroundColor;

const tHeaderPadding = props.style.tHeaderPadding;
const tHeaderTextAlign = props.style.tHeaderTextAlign;
const tHeaderBorder = props.style.tHeaderBorder;
const tHeaderBorderBottom = props.style.tHeaderBorderBottom;

const tCellPadding = props.style.tCellPadding;
const tCellTextAlign = props.style.tCellTextAlign;
const tCellBorderBottom = props.style.tCellBorderBottom;

const tableStyle = props.tableStyle;
const tableHeadStyle = props.tableHeadStyle;
const tableRowStyle = props.tableRowStyle;
const tableHeaderStyle = props.tableHeaderStyle;
const tableBodyRowStyle = props.tableBodyRowStyle;
const tableCellStyle = props.tableCellStyle;

const Table = styled.table`
  width: ${(props) => props.tableWidth || "100%"};
  border-collapse: collapse;
  background-color: ${(props) => props.tableBackgroundColor || "#fff"};
  border: ${(props) => props.tableBorder || "none"};
  border-radius: ${(props) => props.tableBorderRadius || "none"};
`;

const TableHead = styled.thead`
  background-color: ${(props) => props.tHeadBackgroundColor || "#f2f2f2"};
  color: ${(props) => props.tHeadFontColor || "#000"};
  font-size: ${(props) => props.tHeadFontSize || "16px"};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.tRowBackgroundColor || "#f2f2f2"};
  }
`;

const TableHeader = styled.th`
  padding: ${(props) => props.tHeaderPadding || "10px 10px"};
  text-align: ${(props) => props.tHeaderTextAlign || "left"};
  border: ${(props) => props.tHeaderBorder || "none"};
  border-bottom: ${(props) => props.tHeaderBorderBottom || "1px solid #ddd"};
`;

const TableCell = styled.td`
  padding: ${(props) => props.tCellPadding || "8px 10px"};
  text-align: ${(props) => props.tCellTextAlign || "left"};
  border-bottom: ${(props) => props.tCellBorderBottom || "1px solid #ddd"};
`;

const tableData = props.tableData;
return (
  <>
    <Table
      tableWidth={tableWidth}
      tableBorder={tableBorder}
      tableBorderRadius={tableBorderRadius}
      tableBackgroundColor={tableBackgroundColor}
      style={tableStyle}
    >
      <TableHead
        tHeadBackgroundColor={tHeadBackgroundColor}
        tHeadFontColor={tHeadFontColor}
        tHeadFontSize={tHeadFontSize}
        style={tableHeadStyle}
      >
        <TableRow
          tRowBackgroundColor={tRowBackgroundColor}
          style={tableRowStyle}
        >
          {Object.keys(tableData[0]).map((key, index) => (
            <TableHeader
              key={index}
              tHeaderPadding={tHeaderPadding}
              tHeaderTextAlign={tHeaderTextAlign}
              tHeaderBorder={tHeaderBorder}
              tHeaderBorderBottom={tHeaderBorderBottom}
              style={tableHeaderStyle}
            >
              {key}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {tableData.map((row, index) => (
          <TableRow
            key={index}
            tRowBackgroundColor={tRowBackgroundColor}
            style={tableBodyRowStyle}
          >
            {Object.values(row).map((value, index) => (
              <TableCell
                key={index}
                tCellPadding={tCellPadding}
                tCellTextAlign={tCellTextAlign}
                tCellBorderBottom={tCellBorderBottom}
                style={tableCellStyle}
              >
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  </>
);
