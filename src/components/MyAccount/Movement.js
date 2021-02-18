import React, {useEffect} from "react"
import {Link} from "react-router-dom";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";

const Movement = (props) => {
    const ID = props.match.params.id;
    useEffect(() => {
        send({token: authHelper()}, "/api/movement/" + ID + "/", "get")
            .then((r) => {
                console.log(r)
                store.dispatch({
                    type: "GET_MOVEMENTS",
                    movements: r
                })
            });
    }, [ID])
    return (
        <React.Fragment>
            <div className="ibox-content" id="ibox-content">

                <div id="vertical-timeline" className="vertical-container dark-timeline ">
                    <div className="vertical-timeline-block">
                        <div className="vertical-timeline-icon navy-bg">
                            <i className="fa fa-briefcase"/>
                        </div>

                        <div className="vertical-timeline-content">
                            <h2>Meeting</h2>
                            <p>Conference on the sales results for the previous year. Monica please examine sales trends
                                in marketing and products. Below please find the current status of the sale.
                            </p>
                            <Link to={"/home/movement_detail/"} className="btn btn-sm btn-primary"> More
                                info</Link>
                            <span className="vertical-date">
                                        Today <br/>
                                        <small>Dec 24</small>
                                    </span>
                        </div>
                    </div>

                    {/*<div className="vertical-timeline-block">*/}
                    {/*    <div className="vertical-timeline-icon blue-bg">*/}
                    {/*        <i className="fa fa-file-text"></i>*/}
                    {/*    </div>*/}

                    {/*    <div className="vertical-timeline-content">*/}
                    {/*        <h2>Send documents to Mike</h2>*/}
                    {/*        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum*/}
                    {/*            has been the industry's standard dummy text ever since.</p>*/}
                    {/*        <a href="#" className="btn btn-sm btn-success"> Download document </a>*/}
                    {/*        <span className="vertical-date">*/}
                    {/*                    Today <br/>*/}
                    {/*                    <small>Dec 24</small>*/}
                    {/*                </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="vertical-timeline-block">*/}
                    {/*    <div className="vertical-timeline-icon lazur-bg">*/}
                    {/*        <i className="fa fa-coffee"></i>*/}
                    {/*    </div>*/}

                    {/*    <div className="vertical-timeline-content">*/}
                    {/*        <h2>Coffee Break</h2>*/}
                    {/*        <p>Go to shop and find some products. Lorem Ipsum is simply dummy text of the printing and*/}
                    {/*            typesetting industry. Lorem Ipsum has been the industry's. </p>*/}
                    {/*        <a href="#" className="btn btn-sm btn-info">Read more</a>*/}
                    {/*        <span className="vertical-date"> Yesterday <br/><small>Dec 23</small></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="vertical-timeline-block">*/}
                    {/*    <div className="vertical-timeline-icon yellow-bg">*/}
                    {/*        <i className="fa fa-phone"></i>*/}
                    {/*    </div>*/}

                    {/*    <div className="vertical-timeline-content">*/}
                    {/*        <h2>Phone with Jeronimo</h2>*/}
                    {/*        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident*/}
                    {/*            rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste*/}
                    {/*            voluptatibus minus veritatis qui ut.</p>*/}
                    {/*        <span className="vertical-date">Yesterday <br/><small>Dec 23</small></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="vertical-timeline-block">*/}
                    {/*    <div className="vertical-timeline-icon lazur-bg">*/}
                    {/*        <i className="fa fa-user-md"></i>*/}
                    {/*    </div>*/}

                    {/*    <div className="vertical-timeline-content">*/}
                    {/*        <h2>Go to the doctor dr Smith</h2>*/}
                    {/*        <p>Find some issue and go to doctor. Lorem Ipsum is simply dummy text of the printing and*/}
                    {/*            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since*/}
                    {/*            the 1500s. </p>*/}
                    {/*        <span className="vertical-date">Yesterday <br/><small>Dec 23</small></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="vertical-timeline-block">*/}
                    {/*    <div className="vertical-timeline-icon navy-bg">*/}
                    {/*        <i className="fa fa-comments"></i>*/}
                    {/*    </div>*/}

                    {/*    <div className="vertical-timeline-content">*/}
                    {/*        <h2>Chat with Monica and Sandra</h2>*/}
                    {/*        <p>Web sites still in their infancy. Various versions have evolved over the years, sometimes*/}
                    {/*            by accident, sometimes on purpose (injected humour and the like). </p>*/}
                    {/*        <span className="vertical-date">Yesterday <br/><small>Dec 23</small></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

            </div>
        </React.Fragment>
    )
}
export default Movement