import React from "react";
import Loader from "./loader";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expand: this.props.expand };
        this.divEventClickHandler = this.divEventClickHandler.bind(this);
        this.buttonEventClickHandler = this.buttonEventClickHandler.bind(this);
    }

    divEventClickHandler(event) {
        this.setState({ expand: !this.state.expand });
    }
    buttonEventClickHandler(event) {
        window.location.reload();
    }

    render() {
        return (
            <div onClick={this.divEventClickHandler} className="divBoxIn">
                {this.props.city && <p className="headerDivBox">{this.props.city}, {this.props.country}</p>}
                {this.props.temperature <= 5 && this.props.isLoaded &&<span className={"blueDegree"}> {this.props.temperature}<span className="celsius">º</span></span>}
                {this.props.temperature >= 6 && this.props.isLoaded && this.props.temperature <= 26 && <span className={"orangeDegree"}> {this.props.temperature}<span className="celsius">º</span></span>}
                {this.props.temperature >= 27 && this.props.isLoaded && <span className={"redDegree"}> {this.props.temperature}<span className="celsius">º</span></span>}
                {!this.props.isLoaded && <label>Loading <Loader /></label>}
                {this.props.error && <p className="pError">Something went wrong</p>}
                {this.props.error && <button onClick={this.buttonEventClickHandler}>Try Again</button>}
                <div className="greyFooter">
                    <table>
                        <tbody>
                            {this.state.expand && this.props.isLoaded && this.props.temperature &&
                                <tr>
                                    <th>HUMIDITY</th>
                                    <th>PRESSURE</th>
                                </tr>}
                            {this.state.expand && this.props.isLoaded && this.props.temperature &&
                                <tr>
                                    <td className="boldLetter">{this.props.humidity}%</td>
                                    <td className="boldLetter">{this.props.pressure}<span style={{ fontSize: 12 }}>hPa</span></td>
                                </tr>}
                            <tr>
                                {this.props.isLoaded && this.props.temperature && <td colSpan="2" style={{ fontSize: 11, paddingTop: 8, paddingBottom: 13 }}>Updated at {this.props.updateTime}</td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default Weather;