import React from "react";

export const Planning = () => {    
  return (
    <>
      <div className="page-title">
        <h3>Планирование</h3>
        <h4>12 212</h4>
      </div>

      <section>
        <div>
          <p>
            <strong>Девушка:</strong>
            12 122 из 14 0000
          </p>
          <div className="progress">
            <div className="determinate green" style={{ width: "40%" }}></div>
          </div>
        </div>
      </section>
    </>
  );
};
