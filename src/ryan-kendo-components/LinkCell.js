import React, { Component } from 'react';

/* Note: This component was created by Ryan */
export class LinkCell extends Component {
    render() {
        const _src    = this.props.dataItem[this.props.field];
        return (
            <td>
                <a href={_src} target="_blank" rel="noopener noreferrer">{_src}</a>
            </td>
        )
    }
}