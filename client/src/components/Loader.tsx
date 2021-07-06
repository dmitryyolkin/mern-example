import React from "react";
import "materialize-css";

export const Loader: React.FC = () => {
  return (
    <div className="loading-wrapper valign-wrapper center-align">
      <div className="row">
        <div className="col s6 offset-s6">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
