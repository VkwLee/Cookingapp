import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
require('../scss/style.scss');


ReactDOM.render(
	
		<div className='c-app'>
			<App/>
		</div>, document.getElementById('app')
);
