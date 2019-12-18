import React from 'react';
import '../style/loader.css';

const refreshLoader = () => (
  <div className="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default refreshLoader;
