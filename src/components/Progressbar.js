import React from 'react'
import Alerts from './Alerts'

export default function Progressbar(props) {
    return (
        <div>
            <div className={`progress my-2 ${props.progress === 0 ? 'd-none' : ''}`}>
                <div
                    className="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={props.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: props.progress + "%" }}
                >
                    {props.progress}%

                </div>
            </div>
            {(props.progress === 100) ? (
                <>
                    <Alerts msg={props.msg} alerttype={props.alerttype} />

                </>

            ) : ""}
        </div>
    )
}
