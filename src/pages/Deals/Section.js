import React from "react";
import { connect } from "react-redux";

const Section = ({ match, users }) => {
  const ID = +match.params.id;
  const USER_STATE = Object.values(users).find(x=>x.id === ID);
  
  return <div>Works!</div>;
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(Section);
