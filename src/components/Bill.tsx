import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Bill = ({rates, base, date}: any) => {  

  // const [base, setBase] = useState(0);
  // let [rates,setRates] = useState()
  // const [date, setDate] = useState('')

  const getCurrency = (currency: string) => {
    return Math.floor(base * rates[currency])
  }

  // useEffect(() => {
  //   const key = process.env.REACT_APP_FIXER;

  //   fetch(
  //     `http://data.fixer.io/api/latest?access_key=${key}&symbols=KZT,USD,EUR`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {              
  //       setRates(res.rates)
  //       setDate(res.date)
        
  //       setBase(10000 / (res.rates!["KZT"] / res.rates!["EUR"]));
  //     });
  // }, []);  

  const getCurrencySymbol = (value:any,currency: any) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency
    }).format(value)
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

                {rates && Object.keys(rates).map((rate: any,index:number) => (
                  <p className="currency-line" key={index}>
                    <span>{getCurrencySymbol(getCurrency(rate),rate)}</span>
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
                    {rates && Object.keys(rates).map((rate:any, index:number) => (
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

export default Bill