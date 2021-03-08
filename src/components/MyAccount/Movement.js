import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faShoppingCart,
  faShoppingBasket,
  faCreditCard,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { uuidv4 } from "../../js/uuidv4";
import Loading from "../Loading/Loading";
const Movement = ({ id, movements }) => {
  // const ID = props.match?.params?.id;
  console.log(movements);
  useEffect(() => {
    send({ token: authHelper() }, "/api/account/" + id, "get").then((r) => {
      store.dispatch({
        type: "GET_MOVEMENTS",
        movements: r.response?.data,
      });
    });
  }, [id]);
  if (id) {
    return Object.values(movements).length ? (
      <React.Fragment>
        <div className="ibox-content" id="ibox-content">
          <div
            id="vertical-timeline"
            className="vertical-container dark-timeline "
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
                    <p>{`$ ${movement.amount} >>> $ ${movement.left}`}</p>
                    <Link
                      to={`/home/movement_detail/${id}/${movement.date.toString().substr(0,10)}`}
                      className="btn btn-sm btn-primary"
                    >
                      {" "}
                      More info
                    </Link>
                    <span className="vertical-date">{movement.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    ) : (
      <Loading />
    );
  }
  return <div>Select Account.</div>;
};
const mapStateToProps = () => {
  let real = 0,
    stored = [];
  Object.values(JSON.parse(localStorage.getItem("store"))?.movements).forEach(
    (movement) => {
      real += movement.amount;
      let newObj = {
        left: real,
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
