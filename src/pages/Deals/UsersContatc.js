import React from "react";
import {connect} from "react-redux";
import Contact from "../../components/Contact/Contact";
import Paging from "../../components/Paging/Paging";

const Deals = ({users}) => (
    <Paging data={users} Component={Contact} page={JSON.parse(localStorage.getItem("store"))?.paginated.page}
            Paginated="users"/>
);


const mapStateToProps = (state) => {

    return {
        users: Object.values(
            state.paginated_users
        )?.filter(
            (x) =>
                x.id !== state?.globalState?.id
        ),
    };
};
export default connect(mapStateToProps)(Deals);
