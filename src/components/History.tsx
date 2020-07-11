import React from "react";
import { NavLink } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";

export const History = ({ records, categories }: any) => {
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
        <h3>История записей</h3>
      </div>

      <div className="history-chart">
        <Pie data={data} />
      </div>

      <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Категория</th>
              <th>Тип</th>
              <th>Открыть</th>
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
                <td>{rec.category}</td>
                <td>
                  <span
                    className={`white-text badge ${
                      rec.type === "income" ? "green" : "red"
                    }`}
                  >
                    {rec.type === "income" ? "Доход" : "Расход"}
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
