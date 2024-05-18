import { useEffect, useRef } from "react";
import "./PieChart.scss";

type TProfileStatsGraphProps = {
  dataSlicesColors: string[];
  style?: React.CSSProperties;
  dataSlices: number[];
  className?: string;
  size?: number;
};

export const PieChart = ({
  dataSlicesColors,
  dataSlices,
  className = "",
  style = {},
  size = 500,
}: TProfileStatsGraphProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  let total = 0;

  const getDataSlicesSum = () => {
    let sum = 0;
    for (let i = 0; i < dataSlices.length; i++) {
      sum += dataSlices[i];
    }
    return sum;
  };

  if (getDataSlicesSum() === 0 || dataSlices.length === 0) {
    dataSlices = [1];
  }

  if (dataSlicesColors.length === 0) {
    dataSlicesColors = ["#7350EC"];
  }

  // plot the graph
  useEffect(() => {
    if (canvas.current) {
      let c: any = canvas.current.getContext("2d");
      for (let i = 0; i < dataSlices.length; i++) {
        total += dataSlices[i];
      }

      let prevAngle = 0;
      for (let i = 0; i < dataSlices.length; i++) {
        let fraction = dataSlices[i] / total;
        let angle = prevAngle + fraction * Math.PI * 2;
        c.fillStyle = dataSlicesColors[i];
        c.beginPath();
        c.moveTo(250, 250);
        c.arc(250, 250, 100, prevAngle, angle, false);
        c.fill();
        c.stroke();
        prevAngle = angle;
      }
    }
  });

  return (
    <div
      className={`d-flex align-items-center justify-content-center position-relative shrood-pie-chart-34as ${className}`}
      style={style}
    >
      <canvas width={size} height={size} ref={canvas}></canvas>
      <div className={`shrood-pie-chart-34as__hole`}></div>
    </div>
  );
};
