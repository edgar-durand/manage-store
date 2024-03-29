import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faShoppingCart,
    faShoppingBasket,
    faCreditCard,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import {uuidv4} from "../../js/uuidv4"; 

const Movement = ({movements}) => {

        return movements.length ? (
            <React.Fragment>
                <div className="ibox-content" id="ibox-content">
                    <div
                        id="vertical-timeline"
                        className="vertical-container center-orientation dark-timeline "
                    >
                        {Object.values(movements).map((movement) => {
                            return (
                                <div key={uuidv4()} className="vertical-timeline-block">
                                    <div
                                        className={`vertical-timeline-icon ${
                                            movement.concept === "OPEN ACCOUNT"
                                                ? "blue-bg"
                                                : movement.concept === "PURCHASE"
                                                ? "yellow-bg"
                                                : movement.concept === "SALE"
                                                    ? "lazur-bg"
                                                    : movement.concept === "TRANSFER"
                                                        ? "navy-bg"
                                                        : "red-bg"
                                        }`}
                                    >
                                        {movement.concept === "OPEN ACCOUNT" ? (
                                            <FontAwesomeIcon
                                                icon={faBoxOpen}
                                                transform="grow-6 down-4"
                                            />
                                        ) : movement.concept === "PURCHASE" ? (
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                                transform="grow-6 down-4"
                                            />
                                        ) : movement.concept === "SALE" ? (
                                            <FontAwesomeIcon
                                                icon={faShoppingBasket}
                                                transform="grow-6 down-4"
                                            />
                                        ) : movement.concept === "TRANSFER" ? (
                                            <FontAwesomeIcon
                                                icon={faCreditCard}
                                                transform="grow-6 down-4"
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faQuestion}
                                                transform="grow-6 down-4"
                                            />
                                        )}
                                    </div>

                                    <div className="vertical-timeline-content">
                                        <h2>{movement.concept}</h2>
                                        <p><span
                                            className="label ml-2 label-warning mr-1">$ {movement.amount}</span> >>> <span
                                            className="label ml-2 label-info ">$ {movement.left}</span></p>
                                        {
                                            movement.concept === "PURCHASE" ? (
                                                <div className="form-inline">
                                                    <h5 className="mr-2">Confirmed:</h5>
                                                    {movement.confirmed}
                                                    <h5 className="ml-3 mr-2">Declined:</h5>
                                                    {movement.declined}
                                                    <h5 className="ml-3 mr-2">Pending:</h5>
                                                    {movement.pending}
                                                </div>
                                            ) : null
                                        }
                                        {
                                            movement.concept === "OPEN ACCOUNT" ? null : movement.concept === "PURCHASE" ? (
                                                <Link
                                                    to={`/home/movement_detail/${localStorage.getItem('account_id')}/${movement.movement_id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    {" "}
                                                    More info
                                                </Link>
                                            ) : null
                                        }

                                        <span
                                            className="vertical-date">{movement.date.substr(0, 19).replace(/T/, " ")}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        ) : (
            <h1>Select Account</h1>
        );

};
const mapStateToProps = (state) => {
    let real = 0,
        stored = [];
    // state.movements.forEach(
    Object.values(state.movements ?? []).forEach(
    // Object.values(JSON.parse(localStorage.getItem('store')).movements).forEach(
        (movement) => {
            real += movement.amount;
            let newObj = {
                left: real.toFixed(2),
                confirmed: movement.confirmed,
                declined: movement.declined,
                pending: movement.pending,
                amount: movement.amount,
                concept: movement.concept,
                date: movement.date,
                movement_id: movement.movement_id,
            };

            stored.push(newObj);
        }
    );
    return {
        movements: stored.reverse(),

    };
};
export default connect(mapStateToProps)(Movement);
