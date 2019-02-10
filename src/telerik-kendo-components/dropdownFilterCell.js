import React from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';

/* Note: This code was created by Telerik.
** It's used by Telerik here:
** https://www.telerik.com/kendo-react-ui/components/grid/filtering/#toc-custom-filter-cell
** It can be found here:
** https://stackblitz.com/run/?file=app%2FdropdownFilterCell.js */

export default function dropdownFilterCell(data, defaultItem) {
    return class extends React.Component {
        hasValue(value) {
            return value && value !== defaultItem;
        }

        render() {
            return (
                <div className="k-filtercell">
                    <DropDownList
                        data={data}
                        onChange={(event) => {
                            const hasValue = this.hasValue(event.target.value);
                            this.props.onChange({
                                value: hasValue ? event.target.value : '',
                                operator: hasValue ? 'eq' : '',
                                syntheticEvent: event.syntheticEvent
                            });
                        }}
                        value={this.props.value || defaultItem}
                        defaultItem={defaultItem}
                    />
                    <button
                        className="k-button k-button-icon k-clear-button-visible"
                        title="Clear"
                        disabled={!this.hasValue(this.props.value)}
                        onClick={(event) => {
                            event.preventDefault();
                            this.props.onChange({
                                value: '',
                                operator: '',
                                syntheticEvent: event
                            });
                        }}
                    >
                        <span className="k-icon k-i-filter-clear" />
                    </button>
                </div>
            );
        }
    };
}
