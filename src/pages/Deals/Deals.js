import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Contact from "../../components/Contact/Contact";
import dataToPages from "../../js/dataToPages";

const Deals = ({ users, id }) => {
  const [state, setState] = useState({
    searchField: "",
    show: 8,
    page: 0,
  });
  let filtered = Object.values(users).filter(
    (x) =>
      (x?.first_name
        ?.toUpperCase()
        ?.indexOf(state.searchField.toUpperCase()) !== -1 ||
        x?.last_name
          ?.toUpperCase()
          ?.indexOf(state.searchField.toUpperCase()) !== -1 ||
        x?.email?.toUpperCase()?.indexOf(state.searchField.toUpperCase()) !==
          -1 ||
        x?.username?.toUpperCase()?.indexOf(state.searchField.toUpperCase()) !==
          -1) &&
      x.id !== id
  );

  const FORMATED = dataToPages(filtered, state.show, state.page);
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
  if (Object.values(FORMATED).filter((x) => x.id !== id).length && !users.error) 
  {return (
    <React.Fragment>
      <div className="ibox-content col-12 form-inline">
        <div className=" form-inline col-8">
          <label className="col-1">Search</label>
          <input
            type="text"
            name="searchField"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-4">
          <Link
            className="btn btn-outline-primary btn-lg pull-right col-12"
            to="/home/deals/0"
          >
            Someone else
          </Link>
        </div>
      </div>
      <span className="label label-primary float-right col-12 text-center">
        {Object.values(filtered).length + " Users"}{" "}
      </span>
      <div className="wrapper wrapper-content col-12">
        <div className="row">
          {Array.from(
            Object.values(FORMATED).filter((x) => x.id !== id),
            (x, index) => (
              <Contact
                key={index}
                first_name={x.first_name}
                last_name={x.last_name}
                status_message={x.status_message}
                street={x.address[0].street}
                between={x.address[0].between}
                number={x.address[0].number}
                building={x.address[0].building}
                apto={x.address[0].apto}
                municipality={x.address[0].municipality}
                province={x.address[0].province}
                phone={x.phone}
                email={x.email}
                id={x.id}
                photo={x.photo}
              />
            )
          )}
        </div>
      </div>
      <div className="ibox ibox-content col-12">
        <button
          onClick={() =>
            state.page > 0 ? setState({ ...state, page: state.page - 1 }) : null
          }
          className="btn btn-outline-primary"
          disabled={state.page === 0}
        >
          <i className="fa fa-backward" /> Prev
        </button>
        {xmPages().reverse()}
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
          Next <i className="fa fa-forward" />
        </button>
      </div>
    </React.Fragment>
  )} else {
  return(
      <div className="ibox ibox-content">
          Not Users !
      </div>
  ) }
};

const mapStateToProps = (state) => {
  return {
    users: state?.users,
    id: state?.globalState[0].id,
  };
};
export default connect(mapStateToProps)(Deals);
