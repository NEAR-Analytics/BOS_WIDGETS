import(["constants"]);

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Pagination = styled.button`
  border: none;
  cursor: pointer;
  padding: 0 8px;
  height: 28px;
  font-size: 14px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffffc0;
  border-radius: 4px;
  background: ${(props) => (props.selected ? "#44444442" : "#191919")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const PageNumberImage = styled.img`
  width: auto;
  height: 10px;
`;

const { current, totalPage, updateCurrentPage } = props;

if (!current || !totalPage) {
  return <div />;
}

function generatePageNumbers(current, totalPage) {
  if (Number(totalPage) <= 3) {
    return [
      "&lt;",
      ...new Array(Number(totalPage))
        .fill(1)
        .map((_, idx) => String(Number(idx) + 1)),
      "&gt;",
    ];
  }
  let pageNumbers = [];
  let prefix = ["&lt;", "1"];
  let suffix = [totalPage, "&gt;"];
  let left = String(Number(current) - 1);
  let right = String(Number(current) + 1);

  pageNumbers.push(...prefix);

  const check = (num) =>
    !pageNumbers.includes(num) &&
    !suffix.includes(num) &&
    Number(num) > Number(pageNumbers[pageNumbers.length - 1]) &&
    Number(num) < suffix[0];

  if (check(left)) {
    if (Number(left) !== Number(pageNumbers[pageNumbers.length - 1]) + 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(left);
  }
  if (check(current)) {
    pageNumbers.push(current);
  }
  if (check(right)) {
    pageNumbers.push(right);
    if (Number(right) !== Number(suffix[0]) - 1) {
      pageNumbers.push("...");
    }
  }
  pageNumbers.push(...suffix);
  return pageNumbers;
}

const pageNumbers = generatePageNumbers(current, totalPage);
return (
  <PaginationContainer>
    {pageNumbers.map((pageNumber) => {
      if (pageNumber === "...") {
        return (
          <Pagination style={{ cursor: "default" }} key={pageNumber}>
            {pageNumber}
          </Pagination>
        );
      }
      if (pageNumber === "&lt;") {
        return (
          <Pagination
            key={pageNumber}
            onClick={() => updateCurrentPage(String(Number(current) - 1))}
            selected={current === pageNumber}
            disabled={Number(current) === 1 || Number(totalPage) === 0}
          >
            <PageNumberImage
              src={`${ipfsPrefix}/bafkreiadbeblhz4umyl7mfboqig5sz5c5etakc2tuivbwwwpng22dl5ylm`}
            />
          </Pagination>
        );
      }
      if (pageNumber === "&gt;") {
        return (
          <Pagination
            key={pageNumber}
            onClick={() => updateCurrentPage(String(Number(current) + 1))}
            selected={current === pageNumber}
            disabled={
              Number(current) === Number(totalPage) || Number(totalPage) === 0
            }
          >
            <PageNumberImage
              src={`${ipfsPrefix}/bafkreig3zoeyz3455dimqrantb5r44c6nmir234wl67v2epdur4fa6a2pa`}
            />
          </Pagination>
        );
      }
      return (
        <Pagination
          key={pageNumber}
          onClick={() => updateCurrentPage(pageNumber)}
          selected={current === pageNumber}
        >
          {pageNumber}
        </Pagination>
      );
    })}
  </PaginationContainer>
);
