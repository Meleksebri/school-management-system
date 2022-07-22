import PropTypes from "prop-types";
import merge from "lodash/merge";
import Chart from "react-apexcharts";
// @mui
import { styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// components
import { BaseOptionChart } from "../../../components/chart";
import { PieChart } from "react-minimal-pie-chart";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;

const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  "& .apexcharts-canvas svg": {
    height: CHART_HEIGHT,
  },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppCurrentSubject.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppCurrentSubject({
  title,
  subheader,
  chartData,
  chartColors,
  chartLabels,
  ...other
}) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: "center" },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: chartColors,
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <br />

      <ChartWrapperStyle dir="ltr">
        <PieChart
          data={chartData}
          style={{ height: "80%", fontSize: "5px", textOpacity: "0.6" }}
          label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value}%)`}
          lineWidth={20}
          paddingAngle={18}
          rounded
          radius={42}
          labelPosition={112}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
