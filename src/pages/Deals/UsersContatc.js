import React from "react";
import { connect } from "react-redux";
import Contact from "../../components/Contact/Contact";
import Paging from "../../components/Paging/Paging";

const Deals = ({ users }) => {
  return (
      <Paging data={users} Component={Contact} />    
  );
};

const mapStateToProps = (state) => {
  return {
    users: Object.values(
      JSON.parse(localStorage.getItem("store"))?.users
    )?.filter(
      (x) =>
        x.id !== JSON.parse(localStorage.getItem("store"))?.globalState[0]?.id
    ),
  };
};
export default connect(mapStateToProps)(Deals);
