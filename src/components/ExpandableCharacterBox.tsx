import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { BsPersonFill } from "react-icons/bs";
import { GiEvilMinion } from "react-icons/gi";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import styled from 'styled-components';

const Box = styled(Row)`
    &:first-child {
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
    }
    &:first-child .ant-col-1 {
        border-top-left-radius: 7px;
    }
    &:last-child {
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
    }
    &:last-child .ant-col-1 {
        border-bottom-left-radius: 7px;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: rgba(255,255,255,0.5);
    margin-top: 6px;
    height: 60px;
    transition: 0.1s ease-in;
`;

export const VerticalCenterContentCol = styled(Col)`
    display: flex;
    align-items: center;
`;

const StyledAttributes = styled(Col)`
    font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
    color: #000;
    font-size: 16px;
    line-height: 1.2em;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-weight: bold;
`;

const HealthBar = styled(Col)`
    min-width: 20px;
    max-width: 20px;
    height: 100%;
`;
interface IHealthStatusProps {
    hasHealthStats: boolean;
    hit_points: number;
    max_hit_points: number;
}
const HealthStatus = ({ hasHealthStats, hit_points, max_hit_points }: IHealthStatusProps) => {
    let healthColor = '';
    const percentageOf = (percentage: number, ofMaximum: number) => {
        return ofMaximum / 100 * percentage;
    }
    if (hasHealthStats) {
        healthColor = (hit_points <= percentageOf(10, max_hit_points) ? '#BB2020' :
            (hit_points <= percentageOf(50, max_hit_points) ? 'yellow'
                : 'green'))
    }
    return <HealthBar span={1}
        style={{
            backgroundColor: hasHealthStats ? healthColor : 'gray'
        }}>
    </HealthBar >;
}

const TypeLogo = ({ isPlayer }: { isPlayer: boolean }) => {
    if (isPlayer) {
        return <BsPersonFill size={40} />
    }
    return <GiEvilMinion size={40} />
}
interface IExpandableCharacterBox extends IHealthStatusProps {
    children: any;
    collapsedArea: any;
    style: any;
    isPlayer: boolean;
}
const CONTENT_HEIGHT = 55;
const ARROW_TOGGLE_HEIGHT = 15;
const COMMENT_HEIGHT = 70;
const ExpandableCharacterBox = ({ isPlayer, hit_points, max_hit_points, children, collapsedArea, style }: IExpandableCharacterBox) => {

    const [showComments, setShowComments] = useState(false);
    return (<Box style={{
        height: showComments ?
            CONTENT_HEIGHT + COMMENT_HEIGHT + ARROW_TOGGLE_HEIGHT :
            CONTENT_HEIGHT + ARROW_TOGGLE_HEIGHT, ...style
    }}>
        <HealthStatus
            hit_points={hit_points}
            max_hit_points={max_hit_points}
            hasHealthStats={!isPlayer}></HealthStatus>
        <StyledAttributes span={23} style={{ height: '100%' }}>
            <Row>
                <VerticalCenterContentCol span={2}>
                    <span style={{ marginLeft: 5 }}><TypeLogo isPlayer={isPlayer} /></span>
                </VerticalCenterContentCol>
                <Col span={22}>
                    <Row style={{ height: CONTENT_HEIGHT }}>
                        {children}
                    </Row>
                </Col>
            </Row>

            {showComments &&
                <Row style={{ height: COMMENT_HEIGHT }}>
                    <Col span={24} style={{ justifyContent: 'center', display: 'flex' }}>{collapsedArea}</Col>
                </Row>}
            <Row style={{ height: ARROW_TOGGLE_HEIGHT }}>
                <Col span={24} style={{ justifyContent: 'center', display: 'flex' }}>
                    <span style={{ cursor: 'pointer' }}>{showComments ?
                        <VscTriangleUp onClick={() => setShowComments(!showComments)} /> :
                        <VscTriangleDown onClick={() => setShowComments(!showComments)} />}</span>
                </Col>
            </Row>
        </StyledAttributes>
    </Box >);

}

export default ExpandableCharacterBox;