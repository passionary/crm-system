import React from "react";
import { connect } from "react-redux";

const Planning = ({ categories, bill }: any) => {
  console.log(categories);
  console.log(bill);
  
  const total = (array:any) => {
    let sum = 0

    array.forEach((i:any) => i.type === 'outcome' ? sum += parseInt(i.amount) : sum-=parseInt(i.amount))
    return sum
  }
  return (
    <>
      <div className="page-title">
        <h3>Планирование</h3>
        <h4>{bill && bill.bill}</h4>
      </div>

      <section>
        {categories.map((cat: any) => (
          <div>
            <p>
              <strong>{cat.name}:</strong>
              {total(cat.records)} из {cat.limit}
            </p>
            <div className="progress">
              <div className="determinate green" style={{ width: "40%" }}></div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default connect((state:any) => ({bill:state.bill}),null)(Planning)