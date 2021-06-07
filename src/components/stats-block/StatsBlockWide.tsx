import React, { useEffect, useRef, useState } from 'react';
import IMonster from '../../models/Monster';
import StyledStatsContainer from './StatsBlockWideStyled';
import { StatsSectionLeft } from './StatsSectionLeft';
import { StatsSectionRight } from './StatsSectionRight';

export interface IStasBlockWideProps {
    monster?: IMonster;
}

export default function StatsBlockWide({ monster }: IStasBlockWideProps) {
    const refEl = useRef<HTMLElement>();
    const [widthHeight, setWidthHeight] = useState<number[]>([0, 0])
    useEffect(() => {
        const bounds = refEl.current?.getBoundingClientRect() as any || {};
        setWidthHeight([bounds.width, bounds.height]);
    }, [monster]);
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
                <div style={{ marginTop: 20, textDecoration: 'italic' }}>
                    Content from the <a 
                        target="_blank"
                        rel="noreferrer"
                        href="https://dnd.wizards.com/articles/features/systems-reference-document-srd">SRD</a> and
                        published
                under
                the <a
                        target="_blank"
                        rel="noreferrer"
                        href="./opengaminglicense.pdf">Open Gaming License</a>.
                </div>
                <hr className="orange-border bottom" />
            </div>
        </StyledStatsContainer>
    </div>
    );
}
