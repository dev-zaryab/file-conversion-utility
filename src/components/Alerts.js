import React from 'react'

export default function Alerts(props) {
    return (
        <div>
            <div className="my-2 alert alert-warning alert-dismissible text-light fade show" style={{ backgroundColor: props.alerttype }} role="alert">
                <strong>{props.msg}</strong>
            </div>
        </div>
    )
}
