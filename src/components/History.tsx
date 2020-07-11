import React from "react";
import { NavLink } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { translate } from "../filters/translate";

const History = ({ records, categories, language }: any) => {  
  
  const dateOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const data = {
    labels: categories.map((cat: any) => cat.name),
    datasets: [
      {
        label: "Расходы по категориям",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        data: categories.map((cat: any) => {
          const amount = cat.records.reduce((p: any, i: any) => {
            if (i.type === "outcome") return (p += parseInt(i.amount));
            return (p -= parseInt(i.amount));
          }, 0);
          return amount > 0 ? amount : `+${Math.abs(amount)}` 
        }),
      },
    ],
  };
  return (
    <>
      <div className="page-title">
        <h3>{translate(language,'History_Title')}</h3>
      </div>

      <div className="history-chart">
        <Pie data={data} />
      </div>

      <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{translate(language,'Amount')}</th>
              <th>{translate(language,'Date')}</th>
              <th>{translate(language,'Category')}</th>
              <th>{translate(language,'Type')}</th>
              <th>{translate(language,'Open')}</th>
            </tr>
          </thead>

          <tbody>
            {records.map((rec: any, index: number) => (
              <tr key={rec.id}>
                <td>{index + 1}</td>
                <td>{rec.amount}</td>
                <td>
                  {rec.created_at
                    .replace(rec.created_at.slice(-8), "")
                    .replace(/T/, " ")}
                </td>
                <td>{rec.category.name}</td>
                <td>
                  <span
                    className={`white-text badge ${
                      rec.type === "income" ? "green" : "red"
                    }`}
                  >
                    {translate(language,rec.type === "income" ? "Income" : "Outcome")}
                  </span>
                </td>
                <td>
                  <NavLink to={`/record/${rec.id}`} className="btn-small btn">
                    <i className="material-icons">open_in_new</i>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default connect((state:any) => ({language: state.language}),null)(History)
