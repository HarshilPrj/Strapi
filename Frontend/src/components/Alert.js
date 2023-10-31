import React from "react";

const Alert = (props) => {
    return (
        <>
            {props.show === true ? (
                <div
                    className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4 h-14`}
                    role="alert"
                >
                    <strong className="font-bold">{props.titlel}</strong>
                    <span className="block sm:inline">{props.des}</span>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Alert;
