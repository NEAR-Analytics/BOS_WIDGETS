let widthCard = props.widthCard ?? "min-content";
let directionCard = props.directionCard ?? "column";
let borderCard = props.borderCard ?? ".1rem solid rgba(0, 0, 0, .3)";
let borderRadiusCard = props.borderRadiusCard ?? null;
let boxShadowCard = props.boxShadowCard ?? "0 .5rem 1rem rgba(0, 0, 0, .1)";
let paddingCard = props.paddingCard ?? null;

let widthImage = props.widthImage ?? "300px";
let heightImage = props.heightImage ?? "170px";
let srcImage = props.srcImage ?? null;
let borderRadiusImage = props.borderRadiusImage ?? null;

let widthContent = props.widthContent ?? "100%";
let paddingContent = props.paddingContent ?? ".5rem";
let marginContent = props.marginContent ?? null;
let backgroundContent = props.backgroundContent ?? null;
let borderContent = props.borderContent ?? null;
let borderRadiusContent = props.borderRadiusContent ?? null;

let contentHeader = props.contentHeader ?? null;
let widthHeader = props.widthHeader ?? "100%";
let paddingHeader = props.paddingHeader ?? ".5rem";
let marginHeader = props.marginHeader ?? null;
let backgroundHeader = props.backgroundHeader ?? null;
let borderHeader = props.borderHeader ?? null;
let borderRadiusHeader = borderRadiusHeader ?? null;
let textAlignHeader = textAlignHeader ?? null;

let contentBody = props.contentBody ?? null;
let widthBody = props.widthBody ?? "100%";
let paddingBody = props.paddingBody ?? ".5rem";
let marginBody = props.marginBody ?? null;
let backgroundBody = props.backgroundBody ?? null;
let borderBody = props.borderBody ?? null;
let borderRadiusBody = borderRadiusBody ?? null;

let contentFooter = props.contentFooter ?? null;
let widthFooter = props.widthFooter ?? "100%";
let paddingFooter = props.paddingFooter ?? ".5rem";
let marginFooter = props.marginFooter ?? null;
let backgroundFooter = props.backgroundFooter ?? null;
let borderFooter = props.borderFooter ?? null;
let borderRadiusFooter = borderRadiusFooter ?? null;
let textAlignFooter = props.textAlignFooter ?? null;
let fontSizeFooter = props.fontSizeFooter ?? "1rem";

const Card = styled.div`
    width: ${widthCard};
    display: flex;
    flex-direction: ${directionCard};
    border: ${borderCard};
    border-radius: ${borderRadiusCard};
    box-shadow: ${boxShadowCard};
    overflow: hidden;
    padding: ${paddingCard};
`;

const CardImage = styled.div`
    width: ${widthImage};
    height: ${heightImage};
    background-image: url(${srcImage});
    background-position: center;
    background-repeat: no-repeat, repeat;
    background-size: contain;
    border-bottom: .1rem solid rgba(0, 0, 0, .3);
    border-radius: ${borderRadiusImage};
`;

const CardContent = styled.div`
    width: ${widthContent};
    padding: ${paddingContent};
    margin: ${marginContent};
    background: ${backgroundContent};
    border: ${borderContent};
    border-radius: ${borderRadiusContent};
`;

const CardHeader = styled.div`
    width: ${widthHeader};
    padding: ${paddingHeader};
    margin: ${marginHeader};
    background: ${backgroundHeader};
    border: ${borderHeader};
    border-radius: ${borderRadiusHeader};
    font-size: 1.5rem;
    text-align: ${textAlignHeader};
    font-weight: bold;
`;

const CardBody = styled.div`
    width: ${widthBody};
    padding: ${paddingBody};
    margin: ${marginBody};
    background: ${backgroundBody};
    border: ${borderBody};
    border-radius: ${borderRadiusBody};
`;

const CardFooter = styled.div`
    width: ${widthFooter};
    padding: ${paddingFooter};
    margin: ${marginFooter};
    background: ${backgroundFooter};
    border: ${borderFooter};
    border-radius: ${borderRadiusFooter};
    font-size: ${fontSizeFooter};
    text-align: ${textAlignFooter};
    font-weight: bold;
`;

return (
  <Card>
    <CardImage />
    <CardContent>
      <CardHeader>{contentHeader}</CardHeader>
      <CardBody>{contentBody}</CardBody>
      <CardFooter>{contentFooter}</CardFooter>
    </CardContent>
  </Card>
);
