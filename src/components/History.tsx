import React from "react";
import { NavLink } from "react-router-dom";

export const History = ({ records }: any) => {  
  
  const dateOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return (
    <>
      <div className="page-title">
        <h3>История записей</h3>
      </div>

      <div className="history-chart">
        <canvas></canvas>
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
            {records.map((rec:any,index:number) => (
              <tr key={rec.id}>
              <td>{index}</td>
              <td>{rec.amount}</td>
            <td>{rec.created_at.replace(rec.created_at.slice(-8),'').replace(/T/," ")}</td>
              <td>{rec.category}</td>
              <td>
                <span className={`white-text badge ${rec.type === 'income' ? 'green' : 'red'}`}>{rec.type === 'income' ? 'Доход' : 'Расход'}</span>
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
