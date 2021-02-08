import React from "react";

const NewAccountFormUI = ({handleSubmit,handleChange}) => (

    <div className="row">

        <div className="col-lg-12">

            <div className="ibox">
                <div className="ibox-title">
                    Add new account.
                </div>
                <div className="ibox-content">

                    <div className="panel panel-default">

                        <div className="panel-body">

                            <div className="row">
                                <div className="col-md-4">
                                    <h2>Summary</h2>

                                    <p className="m-t">
                                        You are about to create a new credit account, this is going to be
                                        a representation of a real cash you shall have in your own. Throughout of
                                        this site you are longer using this credit valance to get new articles
                                        as much as you decide.

                                    </p>
                                    <p>
                                        Notice that according you have credits you will be longer able to get
                                        products in section: "Go for Shopping".
                                    </p>
                                </div>
                                <div className="col-md-8">

                                    <form onSubmit={(e) => handleSubmit(e)} id="payment-form"
                                          name="formPay">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>CARD NUMBER</label>
                                                    <div className="input-group">
                                                        <input onChange={(e)=>handleChange(e)} type="text" className="form-control"
                                                               name="name" placeholder="Valid Card Number"
                                                               required/>
                                                        <span className="input-group-addon"><i
                                                            className="fa fa-credit-card"/></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-12 float-right">
                                                <div className="form-group">
                                                    <label>DESCRIPTION</label>
                                                    <input onChange={(e)=>handleChange(e)} type="text" className="form-control" name="description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>AMOUNT OF CREDIT</label>
                                                    <input onChange={(e)=>handleChange(e)} type="text" className="form-control"
                                                           name="a_amount" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <button className="btn btn-primary col-lg-auto" type="submit">Add
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>


                        </div>

                    </div>


                </div>

            </div>

        </div>

    </div>
)

export default NewAccountFormUI