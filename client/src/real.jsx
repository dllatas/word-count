import React from 'react';
import { Treemap } from 'react-d3';
import { Row, Col, Table } from 'react-bootstrap';

const TableReal = (props) => {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr><th>Word</th><th>Count</th></tr>
            </thead>
            <tbody>
                {props.data.map((d, i) => {
                    for (let prop in d) {
                        return (<tr key={i}><td>{prop}</td><td>{d[prop]}</td></tr>)
                    }
                })}
            </tbody>
        </Table>
    )
};

export class Real extends React.Component {
    constructor(props) {
        super(props);
        this.factor = 100;
        this.margin = 5;
        this.margins = this.sliceStream(this.sortStream(this.props.data), this.margin);
        this.state = {
            tm: this.transformStreamToTM(this.props.data),
            trTop: this.margins[0],
            trDown: this.margins[1]
        };
    }

    /*transformStreamToWC(data, factor) {
        var result = {};
        for (var i=0; i<data.length; i++) {
            for (var prop in data[i]) {
                if (data[i].hasOwnProperty(prop)) {
                    result[prop] = (data[i][prop]*factor);
                }
            }
        }
        return result;
    }*/

    transformStreamToTM(data) {
        return data.map((d) => {
            let result = {};
            const keys = Object.keys(d);
            result['label'] = keys[0];
            result['value'] = d[keys[0]];
            return result;
        });
    }

    sortStream(data) {
        return data.sort(function(a, b) {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            return b[keysB] - a[keysA];
        });
    }

    sliceStream(data, margin) {
        const size = data.length;
        if (size >= (margin*2)) {
            return [data.slice(0,margin), data.slice(-margin)];
        }
        else {
            margin = Math.ceil(size/2);
            return [data.slice(0,margin), data.slice(size-margin)];
        }
    }

    componentWillReceiveProps(nextProps) {
        const margins = this.sliceStream(this.sortStream(nextProps.data), this.margin);
        this.setState({
            tm: this.transformStreamToTM(nextProps.data),
            trTop: margins[0],
            trDown: margins[1]
        });
    }

    render() {
        return (
            <div>
            <Row>
                <Col md={12}>
                    <h3>{"Realtime data"}</h3>
                </Col>
            </Row>
            <Row>
                <Col className={"col-centered"} md={12}>
                    <Treemap data={this.state.tm} width={900} height={500}
                    textColor="black" fontSize="16px" title="Word distribution" hoverAnimation={true} />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h4>{"Top common words for current stream"}</h4>
                    <TableReal data={this.state.trTop} />
                </Col>
                <Col md={6}>
                    <h4>{"Top uncommon words for current stream"}</h4>
                    <TableReal data={this.state.trDown} />
                </Col>
            </Row>
            </div>
        )
    }
};