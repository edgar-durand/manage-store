import React, { useState } from "react";
import dataToPages from "../../js/dataToPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/fontawesome";
import store from "../../store";
import { uuidv4 } from "../../js/uuidv4";
import { setPageNumber } from "../../actions/actionCreator";

const Paging = ({
  data,
  Component,
  show,
  showingField,
  priceField,
  col,
  action,
  page,
}) => {
  const [state, setState] = useState({
    searchField: "",
    match: { active: false, value: 0 },
    page: page || 0,
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
    store.dispatch(setPageNumber(0));
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
              key={uuidv4()}
              onClick={() => {
                store.dispatch(setPageNumber(--page));
                setState({ ...state, page: page });
              }}
              className="btn btn-xs btn-light pull-right "
            >
              {page}
            </button>
          )
        : gather.push(
            <button
              key={uuidv4()}
              onClick={() => {
                store.dispatch(setPageNumber(--page));
                setState({ ...state, page: page });
              }}
              className="btn btn-sm btn-outline-info pull-right"
              style={{ backgroundColor: "white", color: "black" }}
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
      &nbsp;&nbsp;
      <FontAwesomeIcon icon={"dollar-sign"} size="2x" />
      &nbsp;&nbsp;
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
              <FontAwesomeIcon icon={"search"} size="2x" /> &nbsp;
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
                onClick={() =>{
                  if(state.page > 0){
                   setState({...state, page:state.page -1}); 
                   store.dispatch(setPageNumber(state.page - 1));
                  }
                   
                  }
                }
                className="btn btn-light"
                disabled={state.page === 0}
              >
                <FontAwesomeIcon icon="backward" /> Prev
              </button>
              {xmPages()}
              <button
                onClick={() =>{
                  setState({...state, page:state.page +1}); 
                   store.dispatch(setPageNumber(state.page + 1));
                }
                }
                className="btn btn-light"
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
  return (
    <React.Fragment>
      <div className="wrapper wrapper-content">
        <div className="ibox ibox-content">
          <h2>Empty !</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Paging;
