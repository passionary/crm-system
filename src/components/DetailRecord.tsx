import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { stat } from "fs";
import { translate } from "../filters/translate";

const DetailRecord = ({ record, language }: any) => {
  console.log(record);

  return (
    <div>
      <div className="breadcrumb-wrap">
        <NavLink to="/history" className="breadcrumb">
        {translate(language,'Menu_History')}
        </NavLink>
        <a className="breadcrumb">
        {translate(language,record.type === "income" ? "Income" : "Outcome")}
        </a>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className={`card ${record.type === "income" ? "green" : "red"}`}>
            <div className="card-content white-text">
              <p>{translate(language,'Description')}: {record.description}</p>
              <p>{translate(language,'Amount')}: {record.amount}</p>
              <p>{translate(language,'Category')}: {record.category && record.category.name}</p>

              <small>{record.created_at}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state:any) => ({language: state.language}), null)(DetailRecord)