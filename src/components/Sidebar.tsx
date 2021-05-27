
import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { Button, Row, Col, Input, Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const SideBarContainer = styled(Sider) <{ align: string }>`
    position: fixed;
    top: 0px;
    ${props => props.align === 'right' ? 'right' : 'left'}: 0px;
    z-index: 1;
    height: 100%;
    opacity: 0.9;
`;


const Sidebar: FunctionComponent<any> = ({ align, children }) => {
    const [collapsed, setCollapsed] = useState(true);
    return (<SideBarContainer
        width={'80%'}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        defaultCollapsed={true}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{}}
        align={align}
        reverseArrow={align === 'right'}>
        {!collapsed && <Row style={{ height: '100%', backgroundColor: 'white' }}>
            <Col style={{ height: '100%', width: '100%', overflow: 'auto' }}>{children}</Col>
        </Row>}
    </SideBarContainer>);
};

export default Sidebar;