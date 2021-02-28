import React, { useState } from "react";
import dataToPages from "../../js/dataToPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/fontawesome";

const Paging = ({
  data,
  Component,
  show,
  showingField,
  priceField,
  col,
  action,
}) => {
  const [state, setState] = useState({
    searchField: "",
    match: { active: false, value: 0 },
    page: 0,
    show: +show || 8,
  });
  const { searchField, match } = state;

  let filtered = [];
  !match.active
    ? (filtered = {
        ...Object.values(data).filter(
          (x) =>
            (x?.name &&
              x?.name?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) ||
            (x?.category &&
              x?.category?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) ||
            (x?.first_name &&
              x?.first_name
                ?.toUpperCase()
                .indexOf(searchField.toUpperCase()) !== -1) ||
            (x?.last_name &&
              x?.last_name?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) ||
            (x?.email &&
              x?.email?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) ||
            (x?.username &&
              x?.username?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) ||
            (x?.phone && x?.phone?.toString().indexOf(searchField) !== -1) ||
            (x?.description &&
              x?.description
                ?.toUpperCase()
                .indexOf(searchField.toUpperCase()) !== -1)
        ),
      })
    : (filtered = {
        ...Object.values(data).filter(
          (x) =>
            ((x?.name &&
              x?.name?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) ||
              (x?.category &&
                x?.category
                  ?.toUpperCase()
                  .indexOf(searchField.toUpperCase()) !== -1) ||
              (x?.first_name &&
                x?.first_name
                  ?.toUpperCase()
                  .indexOf(searchField.toUpperCase()) !== -1) ||
              (x?.last_name &&
                x?.last_name
                  ?.toUpperCase()
                  .indexOf(searchField.toUpperCase()) !== -1) ||
              (x?.email &&
                x?.email?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                  -1) ||
              (x?.username &&
                x?.username
                  ?.toUpperCase()
                  .indexOf(searchField.toUpperCase()) !== -1) ||
              (x?.phone && x?.phone?.toString().indexOf(searchField) !== -1) ||
              (x?.description &&
                x?.description
                  ?.toUpperCase()
                  .indexOf(searchField.toUpperCase()) !== -1)) &&
            x?.price_cost <= match.value
        ),
      });
  const FORMATED = dataToPages(filtered, state.show, state.page);

  const handleMatch = (e) => {
    setState({ ...state, match: { ...state.match, value: e.target.value } });
  };
  const handleMatchControl = () => {
    match.active
      ? setState({ ...state, match: { ...state.match, active: false } })
      : setState({ ...state, match: { ...state.match, active: true } });
  };
  const handleChange = (e) => {
    setState({ ...state, page: 0, [e.target.name]: e.target.value });
  };

  const xmPages = () => {
    let gather = [];
    for (
      let page = 1;
      page <= Math.ceil(Object.values(filtered).length / (state.show || 1));
      page++
    ) {
      page !== state.page + 1
        ? gather.push(
            <button
              key={page}
              onClick={() => setState({ ...state, page: --page })}
              className="btn btn-xs btn-outline-success pull-right "
            >
              {page}
            </button>
          )
        : gather.push(
            <button
              key={page}
              onClick={() => setState({ ...state, page: --page })}
              className="btn btn-sm btn-outline-success pull-right"
              style={{ backgroundColor: "blue", color: "white" }}
            >
              {page}
            </button>
          );
    }
    return gather;
  };
  const topPriceFieldSet = () => (
    <React.Fragment>
      <label className="col-1">Top price:</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="checkbox"
        name="matchControl"
        onChange={() => handleMatchControl()}
      />
      <label />
      &nbsp;&nbsp;<FontAwesomeIcon icon={"dollar-sign"} size="2x" />&nbsp;&nbsp;
      <input
        type="number"
        min="0"
        name="match"
        className="form-control col-2"
        disabled={match.active === false}
        onChange={(e) => handleMatch(e)}
      />
    </React.Fragment>
  );

  const showingFieldSet = () => (
    <React.Fragment>
      <label className="col-1">Show:</label>
      <input
        onChange={(event) =>
          setState({ ...state, page: 0, show: +event.target.value || 1 })
        }
        value={state.show}
        className="col-lg-1 form-control"
        type="number"
        min="1"
        max={Object.values(filtered).length}
      />
      &nbsp;&nbsp; / {Object.values(filtered).length}
      <label className="col-1" />
    </React.Fragment>
  );

  if (Object.values(data).length) {
    return (
      <React.Fragment>
        <div className={"col-12"}>
          <div className="ibox-content form-inline ">
            {showingField && showingFieldSet()}

            <label>
              <FontAwesomeIcon icon={"search"} size="2x" />   &nbsp;         
            <input
              type="text"
              name="searchField"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
            </label>

            {priceField && topPriceFieldSet()}
          </div>
        </div>
        <div className={"wrapper wrapper-content col-" + col || 12}>
          <div className="row float-left col-12 ">
            {Object.values(FORMATED).map((x, index) => {
              return (
                <Component {...x} key={index} addToCart={(e) => action(x, e)} />
              );
            })}
            <div className="ibox ibox-content social-footer col-12">
              <button
                onClick={() =>
                  state.page > 0
                    ? setState({ ...state, page: state.page - 1 })
                    : null
                }
                className="btn btn-outline-primary"
                disabled={state.page === 0}
              >
                <FontAwesomeIcon icon="backward" /> Prev
              </button>
              {xmPages()}
              <button
                onClick={() =>
                  state.page < Object.values(filtered).length / state.show - 1
                    ? setState({ ...state, page: state.page + 1 })
                    : null
                }
                className="btn btn-outline-primary"
                disabled={
                  state.page >= Object.values(filtered).length / state.show - 1
                }
              >
                Next <FontAwesomeIcon icon="forward" />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <div className="ibox ibox-content">There is nothing here !</div>;
};

export default Paging;
