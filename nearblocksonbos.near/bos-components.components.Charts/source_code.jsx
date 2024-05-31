/**
 * Component: Charts
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Charts component for Near Charts & Statistics
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [chartTypes] - Type of chart to be shown, available options are (price, blocks, txns etc)
 * @param {boolean} [poweredBy] - Powered by attribution
 * @param {string} ownerId - The identifier of the owner of the component.
 */










/* INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Skeleton = (props) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-black-200 rounded shadow-sm animate-pulse ${props.className}`}
    ></div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
/* INCLUDE COMPONENT: "includes/icons/Question.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Question = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 011-1 1.5 1.5 0 10-1.471-1.794l-1.962-.393A3.501 3.501 0 1113 13.355z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/Question.jsx" */


function MainComponent(props) {
  const { t, ownerId, network, chartTypes, poweredBy, theme } = props;
  const { getConfig, handleRateLimit, yoctoToNear } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );
  const [data, setData] = useState([]);
  const [chartConfig, setChartConfig] = useState(null);
  const [chartInfo, setChartInfo] = useState({
    title: '',
    description: '',
  });
  const [logView, setLogView] = useState(false);

  const handleToggle = () => {
    setLogView((prevState) => !prevState);
  };

  const config = getConfig && getConfig(network);

  const charts = [
    {
      link: '/charts/near-price',
      text: t ? t('charts:nearPrice.heading') : 'Near Daily Price (USD) Chart',
      image: `/images/charts/near-price.svg`,
      image_dark: `/images/charts/near-price_dark.svg`,
      exclude: `${network}` === 'testnet',
    },
    {
      link: '/charts/market-cap',
      text: t
        ? t('charts:marketCap.heading')
        : 'Near Market Capitalization Chart',
      image: `/images/charts/market-cap.svg`,
      image_dark: `/images/charts/market-cap_dark.svg`,
      exclude: `${network}` === 'testnet',
    },
    {
      link: '/charts/near-supply',
      text: t ? t('charts:nearSupply.heading') : 'Near Supply Growth Chart',
      image: `/images/charts/near-supply.svg`,
      image_dark: `/images/charts/near-supply_dark.svg`,
      exclude: false,
    },
    {
      link: '/charts/txns',
      text: t ? t('charts:txns.heading') : 'Near Daily Transactions Chart',
      image: `/images/charts/txns.svg`,
      image_dark: `/images/charts/txns_dark.svg`,
      exclude: false,
    },
    {
      link: '/charts/blocks',
      text: t ? t('charts:blocks.heading') : 'New Blocks',
      image: `/images/charts/blocks.svg`,
      image_dark: `/images/charts/blocks_dark.svg`,
      exclude: false,
    },
    {
      link: '/charts/addresses',
      text: t ? t('charts:addresses.heading') : 'Near Unique Accounts Chart',
      image: `/images/charts/addresses.svg`,
      image_dark: `/images/charts/addresses_dark.svg`,
      exclude: false,
    },
    {
      link: '/charts/txn-fee',
      text: t ? t('charts:txnFee.heading') : 'Transaction Fee Chart',
      image: `/images/charts/txn-fee.svg`,
      image_dark: `/images/charts/txn-fee_dark.svg`,
      exclude: `${network}` === 'testnet',
    },
    {
      link: '/charts/txn-volume',
      text: t ? t('charts:txnVolume.heading') : 'Transaction Volume Chart',
      image: `/images/charts/txn-volume.svg`,
      image_dark: `/images/charts/txn-volume_dark.svg`,
      exclude: `${network}` === 'testnet',
    },
    {
      link: '/charts/tps',
      text: 'Near Transactions per Second Chart',
      image: `/images/charts/tps.svg`,
      image_dark: `/images/charts/tps_dark.svg`,
      exclude: false,
    },
  ];

  const chartData = useMemo(() => {
    try {
      const chartTypeMappings = {
        txns: (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.txns),
          date: stat.date,
          blocks: stat.blocks,
          addresses: stat.active_accounts,
        }),
        'market-cap': (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.market_cap),
          date: stat.date,
          price: Number(stat.near_price),
        }),
        'near-supply': (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(yoctoToNear(stat.total_supply, false)),
          date: stat.date,
        }),
        blocks: (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.blocks),
          date: stat.date,
        }),
        addresses: (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.active_accounts),
          date: stat.date,
          addresses: stat.active_accounts,
        }),
        'txn-fee': (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.txn_fee_usd),
          date: stat.date,
          fee: stat.txn_fee,
        }),
        'txn-volume': (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.txn_volume_usd),
          date: stat.date,
          volume: stat.txn_volume,
        }),
        'near-price': (stat) => ({
          x: new Date(stat.date).valueOf(),
          y: Number(stat.near_price),
          date: stat.date,
        }),
      };

      const mappingFunction =
        chartTypeMappings[chartTypes ];
      if (mappingFunction) {
        return data.map(mappingFunction);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, chartTypes]);

  const replaceWithNull = chartData.map((item) => ({
    ...item,
    y: item.y === 0 ? null : item.y,
  }));

  useEffect(() => {
    function fetchChartData() {
      asyncFetch(`${config.backendUrl}charts`).then(
        (res) => {
          if (res.status === 200) {
            if (res?.body) {
              setData(res.body?.charts );
            }
          } else {
            handleRateLimit(res, fetchChartData);
          }
        },
      );
    }
    if (config?.backendUrl) {
      fetchChartData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.backendUrl]);

  useEffect(() => {
    const fetchData = () => {
      let titleText = '';
      let yLabel = '';
      let description = '';
      switch (chartTypes) {
        case 'market-cap':
          titleText = 'Near Market Capitalization Chart';
          yLabel = 'Near Market Cap (USD)';
          description =
            'Near Market Capitalization chart shows the historical breakdown of Near daily market capitalization and price.';
          break;
        case 'txns':
          titleText = 'Near Daily Transactions Chart';
          yLabel = 'Transactions per Day';
          description =
            'Near Supply Growth Chart shows a breakdown of daily and the total Near supply.';
          break;
        case 'near-supply':
          titleText = 'Near Supply Growth Chart';
          yLabel = 'Near Supply';
          description =
            'Near Supply Growth Chart shows a breakdown of daily and the total Near supply.';
          break;
        case 'blocks':
          titleText = 'New Blocks';
          yLabel = 'Blocks per Day';
          description =
            'New Blocks Chart shows the historical number of blocks produced daily on Near blockchain.';
          break;
        case 'addresses':
          titleText = 'Near Unique Accounts Chart';
          yLabel = 'Accounts per Day';
          description =
            'The chart shows the total distinct numbers of accounts on Near blockchain and the increase in the number of account daily.';
          break;
        case 'txn-fee':
          titleText = 'Transaction Fee Chart';
          yLabel = 'Transaction Fee (USD)';
          description =
            'The chart shows the daily amount in USD spent per transaction on Near blockchain.';
          break;
        case 'txn-volume':
          titleText = 'Transaction Volume Chart';
          yLabel = 'Transaction Volume (USD)';
          description =
            'The chart shows the daily amount in USD spent per transaction on Near blockchain.            ';
          break;
        case 'near-price':
          titleText = 'Near Daily Price (USD) Chart';
          yLabel = 'Near Price (USD)';
          description =
            'Near Daily Price (USD) chart shows the daily historical price for Near in USD.';
          break;
        default:
      }
      setChartInfo({
        title: titleText,
        description: description,
      });

      const fetchedData = {
        chart: {
          height: 430,
          zoomType: 'x',
          backgroundColor: 'transparent',
        },
        title: {
          text: titleText,
          style: {
            color: theme === 'dark' ? '#e0e0e0' : '#333333',
          },
        },
        subtitle: {
          text: 'Source: NearBlocks.io',
        },
        xAxis: {
          type: 'datetime',
          lineColor: theme === 'dark' ? '#e0e0e0' : '#333333',
          labels: {
            style: {
              color: theme === 'dark' ? '#e0e0e0' : '#333333',
            },
          },
        },
        yAxis: {
          title: {
            text: yLabel,
          },
          lineColor: theme === 'dark' ? '#e0e0e0' : '#333333',
          labels: {
            style: {
              color: theme === 'dark' ? '#e0e0e0' : '#333333',
            },
          },
          gridLineColor: theme === 'dark' ? '#1F2228' : '#e6e6e6',
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            type: 'area',
            data: chartData,
            color: 'rgba(3, 63, 64, 1)',
          },
        ],
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            connectNulls: false,
          },
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, 'rgba(3, 63, 64, 0.8)'],
                [1, 'rgba(3, 63, 64, 0)'],
              ],
            },
            marker: {
              enabled: false,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
            turboThreshold: 3650,
          },
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                'viewFullscreen',
                'printChart',
                'separator',
                'downloadPNG',
                'downloadJPEG',
                'downloadPDF',
                'downloadSVG',
                'separator',
                'embed',
              ],
            },
          },
        },
      };
      setChartConfig(fetchedData);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, chartTypes, theme]);

  const iframeSrc = `
  <html>
    <head>
      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.4"></script>
      <script src="https://cdn.jsdelivr.net/npm/numeral@2.0.6/numeral.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/big.js@5.2.2"></script>
    <style>
      body {
        background-color: ${theme === 'dark' ? '#0d0d0d' : '#ffffff'};
        margin: 0;
        padding: 0;
      }
      html{

        background-color: ${theme === 'dark' ? '#0d0d0d' : '#ffffff'};
      }
    </style>
    </head>
    <body >
      <div id="chart-container" style="width: 100%; height: 100%;"></div>
      ${
        poweredBy
          ? '<p style="text-align: center; color: #000; font-size: 0.75rem; padding-top: 1rem; padding-bottom: 1rem; font-family: sans-serif;">Powered by <a href="https://beta.nearblocks.io/?utm_source=bos_widget&utm_medium=Charts" target="_blank" style="font-weight: 600; font-family: sans-serif; color: #000; text-decoration: none;">NearBlocks</a></p>'
          : ''
      }
      <script type="text/javascript">
        const chartConfig = ${JSON.stringify(chartConfig)};
        if (${logView}) {
          chartConfig.yAxis.type = 'logarithmic';
          chartConfig.series[0].data = ${JSON.stringify(replaceWithNull)};
          chartConfig.plotOptions.series.connectNulls = ${true};
        }
        chartConfig.tooltip = {
          formatter: function () {
            const item= this.point;
            function dollarFormat(value) {
              return numeral(value).format('0,0.00');
            }

            function yoctoToNear(yocto, format) {
              const YOCTO_PER_NEAR = Big(10).pow(24).toString();
              const near = Big(yocto).div(YOCTO_PER_NEAR).toString();
              return format ? dollarFormat(near) : near;
            }

            let tooltipContent = "";

            switch ("${chartTypes}") {
              case "market-cap":
                tooltipContent = \`
                  \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                  Market Cap: <strong>$\${dollarFormat(item.y)}</strong><br/>
                  Near Price: <strong>$\${dollarFormat(item.price)}</strong>
                \`;
                break;
                case "txns":
                  tooltipContent = \`
                    \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                    Total Transactions: <strong>\${dollarFormat(item.y)}</strong><br/>
                    Total Blocks Count: <strong>\${dollarFormat(item.blocks)}</strong><br/>
                    New Addresses Seen: <strong>\${dollarFormat(item.addresses)}</strong>
                  \`;
                  break;
                case "near-supply":
                    tooltipContent = \`
                      \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                      Total Supply: <strong>\${dollarFormat(item.y)} Ⓝ</strong>
                    \`;
                  break;
                case "blocks":
                    tooltipContent = \`
                      \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                      Total Blocks: <strong>\${dollarFormat(item.y)}</strong><br/>\`;
                  break;
                case "addresses":
                    tooltipContent = \`
                      \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                      Total Unique Addresses: <strong>\${dollarFormat(item.y)}</strong>\`;
                  break;
                  case "txn-fee":
                    tooltipContent = \`
                      \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                      Txn Fee: <strong>$\${dollarFormat(item.y)}</strong><br/>
                      Txn Fee (Ⓝ): <strong>\${yoctoToNear(item.fee,true)} Ⓝ</strong><br/>
                      \`;
                  break;
                case "txn-volume":
                    tooltipContent = \`
                      \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                      Txn Fee: <strong>$\${dollarFormat(item.y)}</strong><br/>
                      Txn Fee (Ⓝ): <strong>\${yoctoToNear(item.volume,true)} Ⓝ</strong><br/>
                      \`;
                  break;
                case "near-price":
                    tooltipContent = \`
                      \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                      Near Price: <strong>$\${dollarFormat(item.y)}</strong>
                      \`;
                  break;
              default:
                // Handle other cases or set a default tooltip content
                tooltipContent = \`
                  \${dayjs(item.date).format('dddd, MMMM DD, YYYY')}<br/>
                  \${item.y}
                \`;
            }

            return tooltipContent;
          }
        };
        Highcharts.chart('chart-container', chartConfig);
      </script>
    </body>
  </html>
`;

  return (
    <div>
      {chartTypes && (
        <>
          <div
            className="block bg-white dark:bg-black-600 dark:border-black-200 border soft-shadow rounded-xl overflow-hidden mb-10"
            style={{ height: 580 }}
          >
            <div className="border-b dark:border-black-200 flex justify-between items-center text-center">
              <p className="leading-7 px-4 text-sm py-4 text-nearblue-600 dark:text-neargray-10">
                {chartInfo?.description}
              </p>
              {chartData?.length > 0 && (
                <div className="flex items-center text-nearblue-600 dark:text-neargray-10">
                  <OverlayTrigger
                    placement="top-start"
                    delay={{ show: 500, hide: 0 }}
                    overlay={
                      <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                        {
                          'Toggle between Log View and Normal View. Log View uses logarithmic scale.'
                        }
                      </Tooltip>
                    }
                  >
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </OverlayTrigger>
                  <div className="w-6 flex">
                    <Switch.Root
                      className="w-[24px] h-[14px] bg-neargray-50 dark:bg-neargray-600 rounded-full data-[state=checked]:bg-teal-800 dark:data-[state=checked]:bg-green-250 outline-none cursor-pointer"
                      id="airplane-mode"
                      style={{
                        '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
                      }}
                      onCheckedChange={handleToggle}
                      checked={logView}
                    >
                      <Switch.Thumb className="block w-[10px] h-[10px] bg-neargray-10 dark:bg-neargray-10 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[13px]" />
                    </Switch.Root>
                  </div>
                  <label className="text-nearblue-600 dark:text-neargray-10 text-sm leading-none pr-[15px] px-2">
                    {'Log View'}
                  </label>
                </div>
              )}
            </div>
            <div className="pl-2 pr-2 py-8 h-full ">
              {chartData?.length ? (
                <iframe
                  srcDoc={iframeSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: theme === 'dark' ? '#0D0D0D' : '#FFFF',
                  }}
                />
              ) : (
                <Skeleton className="h-[93%] w-full" />
              )}
            </div>
          </div>
          <h2 className="mb-4 px-2 text-lg text-gray-700 dark:text-neargray-10">
            {t('charts:otherHeading')}
          </h2>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {charts?.map(
          (chart, index) =>
            chart?.exclude === false && (
              <div
                key={index}
                className="block bg-white dark:bg-black-600 dark:border-black-200 border soft-shadow rounded-xl overflow-hidden"
              >
                <Link
                  href={chart?.link}
                  className="block leading-7 p-3 text-sm text-nearblue-600 dark:text-neargray-10 border-b dark:border-black-200 truncate"
                >
                  <h2>{chart?.text}</h2>
                </Link>
                <div className="pl-2 pr-4 py-6">
                  <Link href={chart?.link}>
                    <img
                      src={theme === 'dark' ? chart?.image_dark : chart?.image}
                      alt={chart?.text}
                      width={600}
                      height={550}
                    />
                  </Link>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

return MainComponent(props, context);