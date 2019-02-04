import React, { Component } from 'react';

export class ImageCell extends Component {
    render() {
        const imgSrc = this.props.dataItem[this.props.field];
        const imgWidth = undefined !== this.props.width ? this.props.width : "100px;";
        const imgHeight = undefined !== this.props.height ? this.props.height : "100px;";
        return (
            <td>
                <img src={imgSrc} alt="Uh-oh!" width={imgWidth} height={imgHeight}></img>
            </td>
        )
    }
}