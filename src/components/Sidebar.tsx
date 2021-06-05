
import { Col, Layout, Row, Typography } from 'antd';
import React, { FunctionComponent } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { GiEvilMinion } from 'react-icons/gi';
import styled from 'styled-components';
const { Title } = Typography;

const { Sider } = Layout;
const Content = styled.div`
display: flex;
flex-direction: column;
`;
const SideBarContainer = styled(Sider) <{ align: string }>`
    position: fixed;
    top: 0px;
    ${props => props.align === 'right' ? 'right' : 'left'}: 0px;
    z-index: 1;
    height: 100%;
    opacity: 0.96;
    background-color: white;
`;

const CollapseHandler = ({ isMonster }: { isMonster: boolean }) => {
    const render = isMonster ? <><GiEvilMinion size={40} style={{ padding: 5 }} /></> : <BsPersonFill style={{ padding: 5 }} size={40} />
    return render;
}

const Sidebar: FunctionComponent<any> = ({ collapsed, onCollapsedChange, align, children, isMonster, title }) => {
    return (<SideBarContainer
        width={'80%'}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapsedChange}
        defaultCollapsed={true}
        trigger={<CollapseHandler isMonster={isMonster} />}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{}}
        align={align}
        reverseArrow={align === 'right'}>
        {!collapsed &&
            <Content style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: '0 1 40px', alignSelf: 'auto', width: '100%' }}>
                    <Row style={{ height: '100%' }}>
                        <Col offset={1} span={22} style={{ height: '100%' }}>
                            <Title>{title}</Title>
                        </Col>
                    </Row>
                </div>
                <div style={{ flex: '1 1 auto', alignSelf: 'auto', width: '100%', overflow: 'auto' }}>
                    {children}
                </div>
            </Content>
        }
    </SideBarContainer>);
};

export default Sidebar;