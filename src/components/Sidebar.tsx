
import { Col, Layout, Row } from 'antd';
import React, { FunctionComponent, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { GiEvilMinion } from 'react-icons/gi';
import styled from 'styled-components';

const { Sider } = Layout;

const SideBarContainer = styled(Sider) <{ align: string }>`
    position: fixed;
    top: 0px;
    ${props => props.align === 'right' ? 'right' : 'left'}: 0px;
    z-index: 1;
    height: 100%;
    opacity: 0.96;
`;

const CollapseHandler = ({ isMonster }: { isMonster: boolean }) => {
    const render = isMonster ? <><GiEvilMinion size={40} style={{ padding: 5 }} /></> : <BsPersonFill style={{ padding: 5 }} size={40} />
    return render;
}

const Sidebar: FunctionComponent<any> = ({ align, children, isMonster }) => {
    const [collapsed, setCollapsed] = useState(true);
    return (<SideBarContainer
        width={'80%'}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        defaultCollapsed={true}
        trigger={<CollapseHandler isMonster={isMonster} />}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{}}
        align={align}
        reverseArrow={align === 'right'}>
        {!collapsed && <Row style={{ height: '100%' }}>
            <Col style={{ height: '100%', width: '100%', overflow: 'auto', margin: 20 }}>{children}</Col>
        </Row>}
    </SideBarContainer>);
};

export default Sidebar;