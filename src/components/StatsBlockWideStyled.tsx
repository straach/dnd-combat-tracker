import styled from 'styled-components';

const StyledStatsContainer = styled.div`
  .stat-block {
    text-align: left;
    margin: 0px;
    display: inline-block;
    vertical-align: top;
    width: 17%;
    min-width:280px;
    background: #FDF1DC;
    padding: 5px 10px 20px;
    box-shadow: 0 0 1.5em #867453;
  }
  .stat-block.wide{
    width: 560px;
    min-width: 560px;
    text-align: center;
  }
  .stat-block.wide .section-left,
  .stat-block.wide .section-right{
    display: inline-block;
    vertical-align: top;
    width: 48%;
    text-align: left;
  }
  .stat-block.wide .section-left{
    margin-right: 1.5%;
  }
  .stat-block.wide .section-right{
    margin-left: 1.5%;
  }
  @media screen and (max-width: 675px){
    .stat-block.wide{
      min-width: 280px;
    }
    .stat-block.wide .section-left,
    .stat-block.wide .section-right{
      display: block;
      width: 100%;
    }
    .stat-block.wide .section-left{
      margin: 0;
    }
    .stat-block.wide .section-right{
      margin: 0;
    }
  }
  .orange-border{
    display: block;
    background: #E69A28;
    border: 1px solid #000;
    height: 5px;
    padding: 0 10px 0;
    margin: -10px -10px 0;
    box-sizing: initial;
  }
  .orange-border.bottom{
    margin: 15px -10px -20px;
  }
  .tapered-rule{
    display: block;
    width: 100%;
    height: 5px;
    border: none;
    color: #922610;
    fill: #922610;
    stroke: #922610;
  }
  .creature-heading h1{
    font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
    color: #922610;
    font-size: 23px;
    line-height: 1.2em;
    margin: 10px 0 0;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-weight: bold;
  }
  .creature-heading h2{
    font-weight: normal;
    font-style: italic;
    font-size: 12px;
    line-height: 1.2em;
    margin: 0 0 10px;
  }
  .property-line h4,
  .property-line p{
    display: inline;
    margin: 0;
    color: #922610;
    font-size: 13.5px;
    line-height: 1.2em;
  }
  .property-line h4{
    color: #7A200D;
  }
  .property-line{
    text-indent: -1em;
    padding-left: 1.1em;
    line-height: 1.4em;
  }
  .property-line.first{
    margin: 8px 0 0
  }
  .property-line.last{
    margin: 0 0 10px;
  }
  .abilities{
    text-align: center;
    color: #922610;
  }
  .abilities > div{
    display: inline-block;
    vertical-align: middle;
    width: 15.5%;
    min-width: 40px; 
    font-size: 12px;
    line-height: 1em;
  }
  .abilities h4{
    margin: 10px 0 2px;
    font-size: 14px;
    line-height: 1.2em;
    text-transform: uppercase;
    color: #7A200D;
  }
  .abilities p{
    margin: 0 0 10px;
    line-height: 1.2em;
  }
  .property-block h4,
  .property-block p{
    font-size: 13.5px;
    line-height: 1.2em;
    display: inline;
    margin: 0;
  }
  .property-block h4{
    font-style: italic;
  }
  .property-block{
    padding: 10px 2px 0;
  }
  .actions h3{
    border-bottom: 1px solid #7A200D;
    color: #7A200D;
    font-size: 21px;
    font-variant: small-caps;
    font-weight: normal;
    letter-spacing: 1px;
    margin: 20px 0 0;
    padding: 0 0 10px;
    text-indent: 5px;
  }
  .actions{
    margin: 0 0 20px;
  }
  .actions:last-child{
    margin: 0;
  }

`;

export default StyledStatsContainer;