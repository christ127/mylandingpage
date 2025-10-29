import React from "react";
import "../styles/schedule.css";

/** Example data (you can replace with your own) */
const defaultEntries = [
  {
    date: "1.NOV.25",
    places: ["Pueblo Río Hondo"],
    times: ["11 AM – 2 PM"],
  },
  {
    date: "2.NOV.25",
    places: ["Supermax San Francisco", "Econo Levittown"],
    times: ["11 AM – 2 PM", "11 AM – 2 PM"],
  },
  {
    date: "7.NOV.25",
    places: ["Econo Condado Moderno", "Selectos Guaynabo"],
    times: ["3 PM – 6 PM", "2 PM – 5 PM"],
  },
  {
    date: "8.NOV.25",
    places: ["Selectos Los Prados", "Supermax Caparra"],
    times: ["11 AM – 2 PM", "11 AM – 2 PM"],
  },
  {
    date: "9.NOV.25",
    places: ["Walgreens Caguas", "Amigo Plaza Guaynabo"],
    times: ["11 AM – 2 PM", "11 AM – 2 PM"],
  },
  {
    date: "13.NOV.25",
    places: ["Walgreens Plaza Las Américas", "Ralph's Montehidra"],
    times: ["2 PM – 5 PM", "2 PM – 5 PM"],
  },
  // …add the rest as needed
];

export default function VisitSchedule({ title = "Calendario de visitas", entries = defaultEntries }) {
  return (
    <div className="schedule-wrap">
      {/* Green card */}
      <div className="schedule-card">
        {/* Header with ribbon */}
        <div className="schedule-head">
          <div className="schedule-ribbon">{title}</div>
          {/* Optional logo spot:
          <img src="/starbucks-logo.png" alt="" className="h-12 w-12 hidden md:block" />
          */}
        </div>

        {/* Table */}
        <div className="schedule-table">
          {entries.map((row, idx) => (
            <div className="schedule-row" key={idx}>
              <div className="schedule-date">
                <span className="date-badge">{row.date}</span>
              </div>

              <div className="schedule-places">
                {row.places.map((p, i) => (
                  <div key={i} className="leading-tight">{p}</div>
                ))}
              </div>

              <div className="schedule-times">
                {row.times.map((t, i) => (
                  <div key={i} className="leading-tight">{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}