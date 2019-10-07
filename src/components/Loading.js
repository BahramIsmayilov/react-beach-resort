import React from "react";
import LoadingLogo from "../images/gif/loading-gear.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h4>rooms data loading...</h4>
      <img src={LoadingLogo} alt="loading logo" />
    </div>
  );
}
