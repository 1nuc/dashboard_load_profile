import * as d3 from "d3";
import { useMemo, useRef, useEffect } from "react";

export function PieChart({ data, startDate, endDate }) {
  const pieRef = useRef();

  const pieData = useMemo(() => {
    if (!data || data.length === 0) return null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = start && end
      ? data.filter((d) => d.timestamp >= start && d.timestamp <= end)
      : data;

    const columns = Object.keys(filtered[0] ?? {}).filter(
      (col) => col !== "timestamp"
    );

    return columns.map((col) => ({
      label: col,
      value: filtered.reduce((acc, item) => acc + Number(item[col] || 0), 0),
    }));

  }, [data, startDate, endDate]);

  useEffect(() => {
    if (!pieData || !pieRef.current) return;

    const el = pieRef.current;
    el.innerHTML = "";

    const width = el.clientWidth || 300;
    const height = el.clientHeight || 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(el)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll("path")
      .data(pie(pieData))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke-width", 1.9);

    const total = d3.sum(pieData, (d) => d.value);
    const labelArc = d3.arc().innerRadius(radius * 0.50).outerRadius(radius * 0.75);

    svg.selectAll("text")
      .data(pie(pieData))
      .join("text")
      .filter((d) => (d.endAngle - d.startAngle) > 0.08 * 2 * Math.PI)
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#fff")
      .text((d) => `${d.data.label} ${((d.data.value / total) * 100).toFixed(1)}%`)

  }, [pieData]);

  if (!pieData) return null;

  return <div className="pie-card" ref={pieRef} />;
}
