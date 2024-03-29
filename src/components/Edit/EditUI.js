import React, {useRef} from "react";
import {connect} from "react-redux";
import Select from "react-select";

const Edit = ({
                  handleSubmit,
                  _public,
                  price_cost,
                  category_id,
                  sales_price,
                  description,
                  name,
                  handleChange,
                  image,
                  categories,
                  handleFile,
                  handlePublic,
                  handleSelect,
              }) => {
    const img = useRef("img");
    const file = useRef("file");
    const label = useRef("label");

    return (
        <div className="wrapper wrapper-content animated fadeInRight ecommerce">
            <form
                action=""
                onSubmit={(event) => handleSubmit(event)}
                encType="multipart/form-data"
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tabs-container">
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane active">
                                    <div className="panel-body">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Name:</label>
                                            <div className="col-sm-10">
                                                <input
                                                    name="name"
                                                    value={name || ""}
                                                    onChange={(e) => handleChange(e)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Product name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Price:</label>
                                            <div className="col-sm-4">
                                                <input
                                                    name="price_cost"
                                                    value={price_cost || 0}
                                                    onChange={(e) => handleChange(e)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ex. $160.00"
                                                />
                                            </div>
                                            <label className="col-sm-2 col-form-label">Sales price:</label>
                                            <div className="col-sm-4">
                                                <input
                                                    name="sales_price"
                                                    value={sales_price || 0}
                                                    onChange={(e) => handleChange(e)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ex. $160.00"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                Description:
                                            </label>
                                            <textarea
                                                name="description"
                                                placeholder="Your description."
                                                value={description || ""}
                                                rows="6"
                                                onChange={(e) => handleChange(e)}
                                                className="col-sm-10 form-control"
                                            />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                Category
                                            </label>
                                            <div className="col-sm-10">
                                                <Select
                                                    options={Object.values(categories).map((x) => ({
                                                        value: x.id,
                                                        label: x.name,
                                                    }))}
                                                    default={category_id}
                                                    isClearable={true}
                                                    placeholder="Seleccione"
                                                    name="category"
                                                    onChange={(e) => handleSelect(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                Is Public.
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => handlePublic(e)}
                                                    checked={_public}
                                                    className=""
                                                    name="_public"
                                                />{" "}
                                                Public
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Image</label>
                                            <div className="col-sm-10">
                                                <img
                                                    ref={img}
                                                    width="300px"
                                                    height="300px"
                                                    src={typeof image === "string" ? image : (image?.size ? URL.createObjectURL(image) : "")}
                                                    alt=""
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                Change image
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    ref={file}
                                                    name="image"
                                                    id="logo"
                                                    type="file"
                                                    onChange={() => {
                                                        if (file.current.files[0])
                                                        {
                                                            // if (file.current.files[0].size > 30000)
                                                            //     toastr.warning("You should set a picture that size is bellow 30 kb.")
                                                            // else {
                                                                handleFile(file.current.files[0]);
                                                                //   if(file.current.files[0].size)
                                                                // img.current.src = URL.createObjectURL(
                                                                //   file.current.files[0]
                                                                // )
                                                                // else
                                                                // img.current.src = image;
                                                                label.current.childNodes[0].textContent =
                                                                    file.current.files[0].name;
                                                            // }
                                                        } else {
                                                            img.current.src = "";
                                                            label.current.childNodes[0].textContent =
                                                                "Choose file...";
                                                            handleFile(null);
                                                        }
                                                    }}
                                                    accept="image/jpg"
                                                    className="custom-file-input"
                                                />
                                                <label
                                                    ref={label}
                                                    htmlFor="logo"
                                                    className="custom-file-label"
                                                >
                                                    Choose file...
                                                </label>
                                            </div>
                                            <div className="hr-line-dashed"/>
                                            <label className="col-sm-2 col-form-label"/>
                                            <div className="col-sm-10" style={{display: "content"}}>
                                                <input
                                                    type="submit"
                                                    className="btn btn-primary col-lg-auto"
                                                    style={{marginTop: "20px"}}
                                                    value="Save"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};
export default connect(mapStateToProps)(Edit);
