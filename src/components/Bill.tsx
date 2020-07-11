import React from "react";
import { connect } from "react-redux";
import { getCurrencySymbol } from '../utils/getCurrencySymbol'

const Bill = ({rates, date, bill}: any) => {
  console.log(rates, date, bill);
  
  const base = (bill:any) => (bill / (rates!["KZT"] / rates!["EUR"]))
  const getCurrency = (base:any, currency: string) => {    
    
    return Math.floor(base * rates[currency])
  }

  

  return (
    <div className="app-page">
      <div>
        <div className="page-title">
          <h3>Счет</h3>

          <button className="btn waves-effect waves-light btn-small">
            <i className="material-icons">refresh</i>
          </button>
        </div>

        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card light-blue bill-card">
              <div className="card-content white-text">
                <span className="card-title">Счет в валюте</span>

                {rates && date && bill && Object.keys(rates).map((rate: any,index:number) => (
                  <p className="currency-line" key={index}>
                    <span>{getCurrencySymbol(getCurrency(base(bill.bill),rate),rate)}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="col s12 m6 l8">
            <div className="card orange darken-3 bill-card">
              <div className="card-content white-text">
                <div className="card-header">
                  <span className="card-title">Курс валют</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Валюта</th>
                      <th>Курс</th>
                      <th>Дата</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.keys(rates).map((rate:any, index:number) => (
                    <tr key={index}>
                      <td>{rate}</td>
                    <td>{rates[rate]}</td>
                    <td>{date}</td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state:any) => ({bill:state.bill}),null)(Bill)