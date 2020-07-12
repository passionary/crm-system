import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { stat } from "fs";
import { translate } from "../filters/translate";

const DetailRecord = ({ record, user }: any) => {
  console.log(record);

  return (
    <div>
      <div className="breadcrumb-wrap">
        <NavLink to="/history" className="breadcrumb">
        {translate(user.language,'Menu_History')}
        </NavLink>
        <a className="breadcrumb">
        {translate(user.language,record.type === "income" ? "Income" : "Outcome")}
        </a>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className={`card ${record.type === "income" ? "green" : "red"}`}>
            <div className="card-content white-text">
              <p>{translate(user.language,'Description')}: {record.description}</p>
              <p>{translate(user.language,'Amount')}: {record.amount}</p>
              <p>{translate(user.language,'Category')}: {record.category && record.category.name}</p>

              <small>{record.created_at}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state:any) => ({user: state.user}), null)(DetailRecord)