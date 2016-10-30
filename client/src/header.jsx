import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';

export const Header = (props) => {
    return (
        <Row>
            <Col md={12}>
                <PageHeader>{props.text}<small>{props.smallText}</small></PageHeader>
            </Col>
        </Row>
    )
}