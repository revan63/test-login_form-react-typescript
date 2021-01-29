import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import Form from "./components/Form";

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <div className="wrapper">
                    <Form />
                </div>
            </div>
        </Router>
    );
}

export default App;
