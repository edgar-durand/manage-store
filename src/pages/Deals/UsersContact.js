import React from "react";
import {connect} from "react-redux";
import Contact from "../../components/Contact/Contact";
import Paging from "../../components/Paging/Paging";

const Deals = ({users,searField}) => (
    <Paging data={users} Component={Contact} searField={searField} page={JSON.parse(localStorage.getItem("store"))?.paginated_users.current_page}
            Paginated="users"/>
);


const mapStateToProps = (state) => {

    return {
        users: Object.values(
            state?.paginated_users?.data
        || [])?.filter(
            (x) =>
                x.id !== state?.globalState?.id
        ),
        searField: state.searField,
    };
};
export default connect(mapStateToProps)(Deals);
