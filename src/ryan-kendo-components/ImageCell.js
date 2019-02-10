import React, { Component } from 'react';

/* Note: This component was created by Ryan */
export class ImageCell extends Component {
    render() {
        const _src    = this.props.dataItem[this.props.field];
        const _width  = undefined !== this.props.width  ? this.props.width  : "100px;";
        const _height = undefined !== this.props.height ? this.props.height : "100px;";
        const _alt    = undefined !== this.props.alt    ? this.props.alt    : "Uh-oh!;";
        return (
            <td>
                <img src={_src} alt={_alt} width={_width} height={_height}></img>
            </td>
        )
    }
}