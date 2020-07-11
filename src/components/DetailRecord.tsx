import React from "react";
import { NavLink } from "react-router-dom";

export const DetailRecord = ({ record }: any) => {
  console.log(record);

  return (
    <div>
      <div className="breadcrumb-wrap">
        <NavLink to="/history" className="breadcrumb">
          История
        </NavLink>
        <a className="breadcrumb">
          {record.type === "income" ? "Доход" : "Расход"}
        </a>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className={`card ${record.type === 'income' ? 'green' : 'red'}`}>
            <div className="card-content white-text">
  <p>Описание: {record.description}</p>
  <p>Сумма: {record.amount}</p>
              <p>Категория: {record.category}</p>

  <small>{record.created_at}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
