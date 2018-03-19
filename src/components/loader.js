import React from "react";
import LoaderImg from './loaderImg.svg';

const Loader = props => (
    <div className="loadingCenter">
        <img src={LoaderImg} alt="logo" />
    </div>
    
);

export default Loader;