import React from 'react';
import { LineChart } from 'react-d3';
import { Row, Col, Table } from 'react-bootstrap';

const TableHist = (props) => {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr><th>Word</th><th>Count</th><th>Stream</th></tr>
            </thead>
            <tbody>
                {props.data.map((d, i) => {
                    return (<tr key={i}>
                        <td>{d['word']}</td>
                        <td>{d['stream']}</td>
                        <td>{d['counter']}</td></tr>)
                })}
            </tbody>
        </Table>
    )
};

export class Hist extends React.Component {
    constructor(props) {
        super(props);
        this.counter = 1;
        this.margin = 5;
        this.initialCurrent = this.transformStream(this.counter, this.props.data);
        this.margins = this.getMarginValues(this.initialCurrent, this.margin);
        this.boxObject = { x: 0, y: 0, width: 500, height: 400 };
        this.state = {
            current: this.initialCurrent,
            top: this.margins[0],
            down: this.margins[1],
            tableTop: this.transformCurrentToTable(this.margins[0]),
            tableDown: this.transformCurrentToTable(this.margins[1])};
    }

    componentWillReceiveProps(nextProps) {
        ++this.counter;
        const current = this.updateCurrentWithStream(this.state.current, nextProps.data, this.counter);
        const margins = this.getMarginValues(current, this.margin);
        this.setState({
            current: current,
            top: margins[0],
            down: margins[1],
            tableTop: this.transformCurrentToTable(margins[0]),
            tableDown: this.transformCurrentToTable(margins[1])});
    }

    transformStream(counter, data) {
        return data.map((d) => {
            const values = {}, serie = {};
            const keys = Object.keys(d);
            values['x'] = counter; // stream
            values['y'] = d[keys]; // count
            serie['name'] = keys[0]; // name
            serie['values'] = [values];
            return serie;
        });
    }

    updateCurrentWithStream(current, data, counter) {
        data.map((d) => {
            const keys = Object.keys(d);
            let existing = false;
            for(var i=0;i<current.length;i++){
                if (current[i]['name']===keys[0]) {
                    const size = current[i]['values'].length;
                    current[i]['values'].push({ x: counter, y: current[i]['values'][size-1]['y'] + d[keys[0]] });
                    existing = true;
                }
            }
            if(!existing) {
                current.push({ name: keys[0], values: [{ x: counter, y: d[keys[0]] }] });
            }
        });
        return current;
    }

    getMarginValues(current, margin) {
        current.sort(function(a, b) {
            const sizeA = a['values'].length;
            const sizeB = b['values'].length;
            return b['values'][sizeB-1]['y'] - a['values'][sizeA-1]['y'];
        });
        return [current.slice(0,margin), current.slice(-margin)];
    }

    transformCurrentToTable(current) {
        return current.map((c) => {
            const size = c['values'].length;
            let result = {}
            result['word'] = c['name'];
            result['stream'] = c['values'][size-1]['y'];
            result['counter'] = c['values'][size-1]['x'];
            return result;
        });
    }

    render() {
        return (
            <div>
            <Row>
                <Col md={12}><h3>{"Historical data"}</h3></Col>
            </Row>
            <Row>
                <Col md={6}>
                    <LineChart legend={true} data={this.state.top} width={'100%'} height={400}
                    viewBoxObject={this.boxObject} title="Top 5 most common words"
                    yAxisLabel="Words" xAxisLabel="Stream" gridHorizontal={true} />
                </Col>
                <Col md={6}>
                    <LineChart legend={true} data={this.state.down} width={'100%'} height={400}
                    viewBoxObject={this.boxObject} title="Top 5 most uncommon words"
                    yAxisLabel="Words" xAxisLabel="Stream" gridHorizontal={true} />
                </Col>
            </Row>
            <Row>
                <Col md={12}><h4>{"Historical data tables"}</h4></Col>
            </Row>
            <Row>
                <Col md={6}><TableHist data={this.state.tableTop} /></Col>
                <Col md={6}><TableHist data={this.state.tableDown} /></Col>
            </Row>
            </div>
        )
    }
}