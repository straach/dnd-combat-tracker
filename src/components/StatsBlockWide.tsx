import * as React from 'react';
import StyledStatsContainer from './StatsBlockWideStyled';

export interface IAppProps {
}

export default function App(props: IAppProps) {
    return (
        <StyledStatsContainer>
            <div className="stat-block wide">
                <hr className="orange-border" />
                <div className="section-left">
                    <div className="creature-heading">
                        <h1>Animated Armor</h1>
                        <h2>Medium construct, unaligned</h2>
                    </div>
                    <svg height="5" width="100%" className="tapered-rule">
                        <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <div className="top-stats">
                        <div className="property-line first">
                            <h4>Armor Class</h4>
                            <p>18 (natural armor)</p>
                        </div>
                        <div className="property-line">
                            <h4>Hit Points</h4>
                            <p>33 (6d8 + 6)</p>
                        </div>
                        <div className="property-line last">
                            <h4>Speed</h4>
                            <p>25ft.</p>
                        </div>
                        <svg height="5" width="100%" className="tapered-rule">
                            <polyline points="0,0 400,2.5 0,5"></polyline>
                        </svg>
                        <div className="abilities">
                            <div className="ability-strength">
                                <h4>STR</h4>
                                <p>14 (+2)</p>
                            </div>
                            <div className="ability-dexterity">
                                <h4>DEX</h4>
                                <p>11 (+0)</p>
                            </div>
                            <div className="ability-constitution">
                                <h4>CON</h4>
                                <p>13 (+1)</p>
                            </div>
                            <div className="ability-intelligence">
                                <h4>INT</h4>
                                <p>1 (-5)</p>
                            </div>
                            <div className="ability-wisdom">
                                <h4>WIS</h4>
                                <p>3 (-4)</p>
                            </div>
                            <div className="ability-charisma">
                                <h4>CHA</h4>
                                <p>1 (-5)</p>
                            </div>
                        </div>
                        <svg height="5" width="100%" className="tapered-rule">
                            <polyline points="0,0 400,2.5 0,5"></polyline>
                        </svg>
                        <div className="property-line first">
                            <h4>Damage Immunities</h4>
                            <p>poison, psychic</p>
                        </div>
                        <div className="property-line">
                            <h4>Condition Immunities</h4>
                            <p>blinded, charmed, deafened, exhaustion, frightened,
						petrified, poisoned</p>
                        </div>
                        <div className="property-line">
                            <h4>Senses</h4>
                            <p>blindsight 60ft. (blind beyond this radius), passive Perception 6</p>
                        </div>
                        <div className="property-line">
                            <h4>Languages</h4>
                            <p>&mdash;</p>
                        </div>
                        <div className="property-line last">
                            <h4>Challenge</h4>
                            <p>1 (200 XP)</p>
                        </div>
                    </div>
                    <svg height="5" width="100%" className="tapered-rule">
                        <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <div className="property-block">
                        <h4>Antimagic Suceptibility.</h4>
                        <p>The armor is incapacitated while in the area of an <i>antimagic
	        field</i>.  If targeted by <i>dispel magic</i>, the armor must succeed
	        on a Constitution saving throw against the caster’s spell save DC or
	        fall unconscious for 1 minute.</p>
                    </div>
                    <div className="property-block">
                        <h4>False Appearance.</h4>
                        <p>While the armor remains motionless, it is indistinguishable from a
	        normal suit of armor.</p>
                    </div>
                </div>
                <div className="section-right">
                    <div className="actions">
                        <h3>Actions</h3>
                        <div className="property-block">
                            <h4>Multiattack.</h4>
                            <p>The armor makes two melee attacks.</p>
                        </div>
                        <div className="property-block">
                            <h4>Slam.</h4>
                            <p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
                        </div>
                    </div>
                    <div className="actions">
                        <h3>Legendary Actions</h3>
                        <div className="property-block">
                            <h4>Multiattack.</h4>
                            <p>The armor makes two melee attacks.</p>
                        </div>
                        <div className="property-block">
                            <h4>Slam.</h4>
                            <p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
                        </div>
                    </div>
                </div>
                <hr className="orange-border bottom" />
            </div>
        </StyledStatsContainer>
    );
}
