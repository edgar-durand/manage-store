import React from "react";
import { connect } from "react-redux";

const Section = ({ match, users }) => {
  const ID = +match.params.id;
  const USER_STATE = Object.values(users).find(x=>x.id === ID);
  console.log(USER_STATE);
  return <div>Works! user: {USER_STATE?.username}</div>;
};
const mapStateToProps = () => {
  return {
    users: JSON.parse(localStorage.getItem("store"))?.users,
  };
};
export default connect(mapStateToProps)(Section);
