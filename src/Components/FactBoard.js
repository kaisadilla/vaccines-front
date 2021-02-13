import React from 'react';

class FactBoard extends React.Component {
    state = {  }
    render() {
        console.log(this.props.factMax);
        return (
            <div className="FACT">
                <span className="FACT-name"><img src={this.props.logo} /><span>{this.props.factName}</span></span>
                <span className="FACT-value">{this.props.factValue}</span>
                <span className="FACT-max"><b>{this.props.factMax.name}: </b>{this.props.factMax.value.toLocaleString("en-US")}</span>
            </div>
        );
    }
}

export default FactBoard;