import React, { useEffect, useRef, useState } from 'react';
import IMonster from '../../models/IMonster';
import StyledStatsContainer from './StatsBlockWideStyled';
import { StatsSectionLeft } from './StatsSectionLeft';
import { StatsSectionRight } from './StatsSectionRight';
// https://codepen.io/retractedhack/pen/gPLpWe
// https://react-icons.github.io/react-icons/search?q=delete
const TopStatsSeparator = () => {
    return <svg height="5" width="100%" className="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
}
export interface IStasBlockWideProps {
    monster?: IMonster;
}

export default function StatsBlockWide({ monster }: IStasBlockWideProps) {
    const refEl = useRef<HTMLElement>();
    const [widthHeight, setWidthHeight] = useState<number[]>([0, 0])
    useEffect(() => {
        const bounds = refEl.current?.getBoundingClientRect() as any || {};
        setWidthHeight([bounds.width, bounds.height]);
    });
    return (<div style={{ width: widthHeight[0], height: widthHeight[1] }}>
        <StyledStatsContainer ref={refEl as any}>
            <div className="stat-block wide">
                <hr className="orange-border" />
                <div className="section-left">
                    <StatsSectionLeft monster={monster} />
                </div>
                <div className="section-right">
                    <StatsSectionRight monster={monster} />
                </div>
                <hr className="orange-border bottom" />
            </div>
        </StyledStatsContainer>
    </div>
    );
}
