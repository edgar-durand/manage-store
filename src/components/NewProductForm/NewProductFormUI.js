import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import Select from "react-select";
import toastr from "toastr";
import "../../components/styles/css/plugins/jasny/jasny-bootstrap.min.css";

const NewProductFormUI = ({
  handleSubmit,
  handleSelect,
  price_cost,
  description,
  name,
  category,
  handleChange,
  handleFile,
  handlePublic,
}) => {
  const img = useRef("img");

  return (
    <div className="wrapper wrapper-content animated fadeInRight">
      <div className="row">
        <div className="col-lg-12">
          <div className="ibox ">
            <form
              onSubmit={(event) => handleSubmit(event)}
              encType="multipart/form-data"
            >
              <div className="ibox-title">
                <h2>
                  Add new product{" "}
                  <p style={{ fontSize: "15px" }}>
                    Fill out the fields to add a new product to the store
                  </p>
                </h2>
              </div>
              <div className="ibox-content">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Category</label>
                  <div className="col-sm-10">
                    <Select
                      options={Object.values(category).map((x) => {
                        return {
                          label: x.name,
                          value: x.id,
                        };
                      })}
                      isClearable={true}
                      placeholder="Seleccione"
                      onChange={(e) => handleSelect(e)}
                    />
                  </div>
                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label">Product</label>
                  <div className="col-sm-10">
                    <input
                      name="name"
                      value={name}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <input
                      name="description"
                      value={description}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label">Price</label>
                  <div className="col-sm-10">
                    <input
                      name="price_cost"
                      value={price_cost}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label">Is Public ?</label>
                  <div className="col-sm-10">
                    <input
                      type="checkbox"
                      onChange={(e) => handlePublic(e)}
                      name="_public"
                    />{" "}
                    Public
                  </div>
                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label">Image</label>
                  <div className="form-group col-lg-auto">
                    <div
                      className="fileinput fileinput-new"
                      data-provides="fileinput"
                    >
                      <span
                        title="Load"
                        className="btn btn-outline-info btn-circle btn-file"
                      >
                        <span className="fileinput-new">
                          <FontAwesomeIcon
                            icon={faCamera}
                            size="1x"
                            transform="grow-10"
                          />
                        </span>
                        <span className="fileinput-exists">
                          <FontAwesomeIcon
                            icon={faCamera}
                            size="1x"
                            transform="grow-10"
                          />
                        </span>
                        <input
                          name="photo"
                          type="file"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              if (e.target.files[0].size > 30000)
                                toastr.warning(
                                  "You should set a picture that size is bellow 30 kb."
                                );
                              else {
                                img.current.src = URL.createObjectURL(
                                  e.target.files[0]
                                );
                                handleFile(e.target.files[0]);
                              }
                            } else {
                              img.current.src = null;
                              handleFile(e.target.files[0]);
                            }
                          }}
                          accept="image/*"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label" />
                  <div
                    className="custom-file col-sm-10"
                    style={{
                      height: "auto",
                    }}
                  >
                    <img
                      className="img-thumbnail"
                      ref={img}
                      width="200px"
                      height="200px"
                      name="showImg"
                      alt=""
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="hr-line-dashed" />
                  <label className="col-sm-2 col-form-label" />
                  <div className="col-sm-10" style={{ display: "content" }}>
                    <input
                      type="submit"
                      className="btn btn-primary col-lg-auto float-right"
                      style={{ marginTop: "20px" }}
                      value="Save"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewProductFormUI;
