const chartMaxHeight = 340;
const yInnerMaxHeight = 290;
const ySingleUnit = yInnerMaxHeight/10;
const freeTierCount = 20000;
const tier1Count = 100000;
const tier2Count = 500000;

const devGraphStyles = {
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "5px",
        margin: "-15px",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        margin: "0px",
    },
    column2: {
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        margin: "0px",
        width: "15%",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        fontSize: "2rem",
    },
    body: {
        width: "100%",
        margin: "10px",
        padding: "10px",
    },
    textLayout: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "5px",
        margin: "0px",
    },
    svgWrapper: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    svgStyle: {
        width: "800",
        height: chartMaxHeight,
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
    },
    lineStyle1: {
        fill: "none",
        stroke: "blue",
        strokeWidth: "3",
    },
    lineStyle2: {
        fill: "none",
        stroke: "red",
        strokeWidth: "3",
    },
    lineStyle3: {
        fill: "none",
        stroke: "green",
        strokeWidth: "3",
    },
    lineStyle4: {
        fill: "none",
        stroke: "orange",
        strokeWidth: "3",
    },
    lineStyle5: {
        fill: "none",
        stroke: "purple",
        strokeWidth: "3",
    },
    axisStyleMain: {
        fill: "none",
        stroke: "black",
        shapeRendering: "crispEdges",
        strokeWidth: "2",
    },
    axisStyleCross: {
        fill: "none",
        stroke: "black",
        shapeRendering: "crispEdges",
        strokeWidth: ".5",
    },
    freeTierBack: {
        fill: "lightgreen",
        stroke: "none",
        opacity: ".5",
        width: "700px",
    },
    tierOneBack: {
        fill: "lightblue",
        stroke: "none",
        opacity: ".5",
        width: "700px",
    },
    tiertwoBack: {
        fill: "purple",
        stroke: "none",
        opacity: ".25",
        width: "700px",
    },
    freeTierSquare: {
        fill: "lightgreen",
        stroke: "none",
        opacity: ".5",
        width: "30px",
        height: "30px",
    },
    tierOneSquare: {
        fill: "lightblue",
        stroke: "none",
        opacity: ".5",
        width: "30px",
        height: "30px",
    },
    tiertwoSquare: {
        fill: "purple",
        stroke: "none",
        opacity: ".25",
        width: "30px",
        height: "30px",
    },
    textStyle: {
        fontSize: "12px",
    },
    textStyle1: {
        fontSize: "14px",
        stroke: "blue",
    },
    textStyle2: {
        fontSize: "14px",
        stroke: "red",
    },
    textStyle3: {
        fontSize: "14px",
        stroke: "green",
    },
    textStyle4: {
        fontSize: "14px",
        stroke: "orange",
    },
    textStyle5: {
        fontSize: "14px",
        stroke: "purple",
    },
    textStyle6: {
        fontSize: "12px",
        fontWeight: "bold",
    },
    textStyleUnderGraph: {
        fontSize: "12px",
        fontStyle: "italic",
        fontWeight: "bold",
    },
    circleStyle: {
        fill: "black",
    },
    svg: {
        height: "30px",
    }
  };

  function nearestRoundUp(number) {
    const magnitude = Math.pow(10, Math.floor(Math.log10(number))); // Find the nearest power of 10

    let roundedUp;
    if (number < 10) {
        roundedUp = Math.ceil(number / 10) * 10; // If it's a single digit, round up to nearest 10s
    } else {
        const firstTwoDigits = Math.ceil(number / magnitude); // Get the first two digits
        roundedUp = Math.ceil(firstTwoDigits) * magnitude; // Round up and multiply back by the magnitude
    }

    return roundedUp;
};

function abstractNumber(number) {
    if (number < 1000) {
        return number.toString(); // If number is less than 1000, return as is
    } else if (number < 1000000) {
        const rounded = Math.round(number / 100) / 10; // Round to one decimal place
        return (rounded % 1 === 0 ? rounded.toFixed(0) : rounded) + 'k'; // Convert to thousands (k)
    } else if (number < 1000000000) {
        const rounded = Math.round(number / 100000) / 10; // Round to one decimal place
        return (rounded % 1 === 0 ? rounded.toFixed(0) : rounded) + 'M'; // Convert to millions (M)
    } else {
        const rounded = Math.round(number / 100000000) / 10; // Round to one decimal place
        return (rounded % 1 === 0 ? rounded.toFixed(0) : rounded) + 'B'; // Convert to billions (B)
    }
};

function calculateYPoint(point, yMax) {
    // Calculate the y-coordinate point based on the data point and maximum value
    const raw = yInnerMaxHeight - Math.round((point / yMax) * yInnerMaxHeight);

    // Clamp the raw value to ensure it stays within the chart's boundaries
    return Math.min(Math.max(raw, 5), yInnerMaxHeight - 5);
}

function textToNumber(text) {
    const multiplier = {
        k: 1000,
        m: 1000000,
        b: 1000000000
    };

    const numberString = text.toLowerCase().replace(/[^\d.kmb]/g, ''); // Extract numbers, k, m, b

    const suffix = numberString.slice(-1);
    const numberPart = parseFloat(numberString);

    if (multiplier.hasOwnProperty(suffix)) {
        return numberPart * multiplier[suffix];
    } else {
        return numberPart;
    }
}

const {
    phase1,
    phase2,
    phase3,
    phase4,
    phase5,
} = props.developerProfile;

const point1 = textToNumber(phase1);
const point2 = textToNumber(phase2);
const point3 = textToNumber(phase3);
const point4 = textToNumber(phase4);
const point5 = textToNumber(phase5);

const yMax = nearestRoundUp(Math.max(point1, point2, point3, point4, point5));

// Scaling
const yPoint1 = calculateYPoint(point1, yMax);
const yPoint2 = calculateYPoint(point2, yMax);
const yPoint3 = calculateYPoint(point3, yMax);
const yPoint4 = calculateYPoint(point4, yMax);
const yPoint5 = calculateYPoint(point5, yMax);

const renderBackgroundLines = () => {
    const elements = [];
    const labelSpacing = yInnerMaxHeight / 10;

    for (let i = 0; i < 10; i++) {
        const y = labelSpacing * i;

        // Ensure labels are within the visible area of the chart
        const yPos = Math.min(Math.max(y, 10), yInnerMaxHeight - 10);

        // text push
        elements.push(<text key={`${i}_y_label`} x="15" y={yPos + 5} style={devGraphStyles.textStyle}>{abstractNumber(yMax - (yMax / 10 * i))}</text>);
        // line push
        elements.push(<line key={`${i}_y_line`} x1="50" y1={yPos} x2="750" y2={yPos} style={devGraphStyles.axisStyleCross}></line>);
    }
    return elements;
};
    
function calculateTierHeight(currentTierCount, previousTierCount, style) {
    const previousY = calculateYPoint(previousTierCount, yMax);
    const currentY = calculateYPoint(currentTierCount, yMax);

    // Calculate the height of the tier relative to y-axis lines
    const height = previousY - currentY;

    // meaning that tier is too high so skip render
    if (!height) {
        return null;
    }

    // Calculate the y-position of the tier based on y-axis lines
    const yPosition = Math.min(previousY - height, yInnerMaxHeight - 5);

    // if too small, barely render
    if (yInnerMaxHeight - ySingleUnit < yPosition) {
        return <rect x="50" y={previousY + 1} style={style} height={1}></rect>;
    }


    return <rect x="50" y={yPosition} style={style} height={Math.max(height, 29)}></rect>;
}

return (
    <div style={devGraphStyles.body}>
        <div style={devGraphStyles.row}>
            <div style={devGraphStyles.column}>
                <div style={devGraphStyles.svgWrapper}>
                    <svg style={devGraphStyles.svgStyle}>
                    {/* Y-axis */}
                    <g height={yInnerMaxHeight}>
                        <line x1="50" y1="5" x2="50" y2="290" style={devGraphStyles.axisStyleMain}></line>
                        {/* Background boxes by tier */}
                        { calculateTierHeight(freeTierCount, 0, devGraphStyles.freeTierBack) }
                        { calculateTierHeight(tier1Count, freeTierCount, devGraphStyles.tierOneBack) }
                        { calculateTierHeight(yMax, tier1Count, devGraphStyles.tiertwoBack) }
                        {/* Veritical Labels & Lines */}
                        <g>
                        {renderBackgroundLines().map((c) => {
                            if (c.type === 'text') {
                                return (<text {...c.props} />);
                            }
                            return <line {...c.props} />;
                        })}
                        </g>
                    </g>

                    {/* X-axis */}
                    <g>
                        <line x1="50" y1="290" x2="750" y2="290" style={devGraphStyles.axisStyleMain}></line>
                        {/* Horizontal Labels */}
                        <text x="100" y="305" style={devGraphStyles.textStyle1}>Phase1</text>
                        <text x="250" y="305" style={devGraphStyles.textStyle2}>Phase2</text>
                        <text x="400" y="305" style={devGraphStyles.textStyle3}>Phase3</text>
                        <text x="550" y="305" style={devGraphStyles.textStyle4}>Phase4</text>
                        <text x="700" y="305" style={devGraphStyles.textStyle5}>Phase5</text>
                    </g>

                    {/* Line Graph */}
                    <polyline points={`50,${yInnerMaxHeight - 5} 115,${yPoint1}`} style={devGraphStyles.lineStyle1}></polyline>
                    <polyline points={`115,${yPoint1} 265,${yPoint2}`} style={devGraphStyles.lineStyle2}></polyline>
                    <polyline points={`265,${yPoint2} 415,${yPoint3}`} style={devGraphStyles.lineStyle3}></polyline>
                    <polyline points={`415,${yPoint3} 565,${yPoint4}`} style={devGraphStyles.lineStyle4}></polyline>
                    <polyline points={`565,${yPoint4} 715,${yPoint5}`} style={devGraphStyles.lineStyle5}></polyline>

                    {/* Data Points */}
                    <circle cx="50" cy={yInnerMaxHeight - 5} r="4" style={devGraphStyles.circleStyle}></circle>
                    <circle cx="115" cy={yPoint1} r="4" style={devGraphStyles.circleStyle}></circle>
                    <circle cx="265" cy={yPoint2} r="4" style={devGraphStyles.circleStyle}></circle>
                    <circle cx="415" cy={yPoint3} r="4" style={devGraphStyles.circleStyle}></circle>
                    <circle cx="565" cy={yPoint4} r="4" style={devGraphStyles.circleStyle}></circle>
                    <circle cx="715" cy={yPoint5} r="4" style={devGraphStyles.circleStyle}></circle>
                    </svg>
                </div>
            </div>
        </div>
        <div style={devGraphStyles.row}>
            <div style={devGraphStyles.column}></div>
            <div style={devGraphStyles.column}>
                <div style={devGraphStyles.center}>
                    <div style={devGraphStyles.textStyleUnderGraph}>Vertical = requests per month. Horizontal = phases of project.</div>
                </div>
            </div>
            <div style={devGraphStyles.column}></div>
        </div>
        <div style={devGraphStyles.row}>
            <div style={devGraphStyles.column2}>
                <svg style={devGraphStyles.svg}>
                    <g>
                        <rect x="0" y="0" style={devGraphStyles.freeTierSquare}></rect>
                        <text x="35" y="20" style={devGraphStyles.textStyle6}>Free Tier</text>
                    </g>
                </svg>
            </div>
            <div style={devGraphStyles.column2}>
            <svg style={devGraphStyles.svg}>
                <g>
                    <rect x="0" y="0" style={devGraphStyles.tierOneSquare}></rect>
                    <text x="35" y="20" style={devGraphStyles.textStyle6}>Tier 1</text>
                </g>
            </svg>
            </div>
            <div style={devGraphStyles.column2}>
            <svg style={devGraphStyles.svg}>
                <g>
                    <rect x="0" y="0" style={devGraphStyles.tiertwoSquare}></rect>
                    <text x="35" y="20" style={devGraphStyles.textStyle6}>Tier 2</text>
                </g>
            </svg>
            </div>
        </div>
    </div>
);
