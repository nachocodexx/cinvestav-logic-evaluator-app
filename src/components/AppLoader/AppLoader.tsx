import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useBusReducer } from 'ts-bus/react';
import { HIDE_LOADER, SHOW_LOADER } from '../../events';


const initialState = { show: false, isRequested: false }
function reducer(state: any, event: any) {
    switch (event.type) {
        case SHOW_LOADER:
            return { show: true }
        case HIDE_LOADER:
            return { show: false, isRequested: false }
        default:
            return state

    }

}

export function AppLoader() {
    // const bus = useBus()
    const state = useBusReducer(reducer, initialState)

    // return state.show ? <FontAwesomeIcon className="app-loader" icon={faCircleNotch} spin /> : null;
    function loader() {
        return (
            <div className="app-loader-wrapper">
                <FontAwesomeIcon className="app-loader" icon={faCircleNotch} spin />
                <p className="app-loader-text">LOADING...</p>
            </div>
        )
    }
    return state.show ? loader() : null;

}