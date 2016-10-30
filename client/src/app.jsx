import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

/* import components */
import { Grid, Row, Col } from 'react-bootstrap';
import { Header } from './header.jsx';
import { Real } from './real.jsx';
import { Hist } from './hist.jsx';

export const App = (props) => {
    return (
        <div className='container'>
            <Grid>
                <Header text={"Unomaly "} smallText={"Word count assignment"} />
                <Real data={props.data} />
                <Hist data={props.data} />
            </Grid>
        </div>
    );
};