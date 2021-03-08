import React, { useRef, useState, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../components/styles/fontawesome";
import "../../components/styles/css/plugins/jasny/jasny-bootstrap.min.css";
import "../../components/styles/css/plugins/bootstrapSocial/bootstrap-social.css";
import { connect } from "react-redux";
import { setLoad, updateProfile } from "../../actions/actionCreator";
import toastr from "toastr";
import getBase64 from "../../js/getBase64";
const LoadingButton = React.lazy(() =>
  import("../../components/LoadingButton")
);

const Profile = ({
  id,
  photo,
  first_name,
  last_name,
  birth_date,
  status_message,
  username,
  email,
  street,
  between,
  building,
  number,
  municipality,
  province,
  phone,
  facebook,
  twitter,
  instagram,
  handleProfile,
  setLoad,
  load,
}) => {
  const [state, setState] = useState({
    globalState: {
      id,
      street,
      between,
      municipality,
      province,
      building,
      number,

      facebook,
      twitter,
      instagram,

      photo,
      first_name,
      last_name,
      birth_date,
      status_message,
      username,
      email,
      phone,
    },
  });
  const imgs = useRef("imgs");
  const file = useRef("file");

  const handleChange = (event) => {
    setState({
      globalState: {
        ...state.globalState,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoad(true);
    handleProfile({ ...state.globalState });
  };

  const handleFile = (file) => {
    if (file.size > 30000) {
      toastr.warning("You should set a picture that size is bellow 30 kb.");
    } else
      getBase64(file).then((res) => {
        setState({
          globalState: {
            ...state.globalState,
            photo: res,
          },
        });
      });
  };
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading</div>}>
        <div className="ibox ibox-content row align-self-xl-center col-12">
          <div className="col-lg-4">
            <div className="widget-head-color-box navy-bg p-lg text-center">
              <div className="m-b-md">
                <h2 className="font-bold no-margins">
                  {state.globalState.first_name +
                    " " +
                    state.globalState.last_name}
                </h2>
                <small>
                  {state.globalState.status_message || "Status message"}
                </small>
              </div>
              <img
                src={
                  state.globalState.photo
                    ? !state.globalState.photo.size
                      ? state.globalState.photo
                      : URL.createObjectURL(state.globalState.photo)
                    : ""
                }
                width={state.globalState.photo ? "150px" : ""}
                height={state.globalState.photo ? "150px" : ""}
                style={{ objectFit: "contain" }}
                ref={imgs}
                className={
                  state.globalState.photo
                    ? "rounded-circle circle-border m-b-md"
                    : ""
                }
                alt=""
              />
              {state.globalState.photo ? null : (
                <FontAwesomeIcon icon={"user-circle"} size="9x" />
              )}

              <div className="form-group col-lg-auto">
                <div
                  className="fileinput fileinput-new"
                  data-provides="fileinput"
                >
                  <span
                    title="Edit"
                    className="btn btn-outline-light btn-circle btn-file"
                  >
                    <span className="fileinput-new">
                      <FontAwesomeIcon
                        icon={"camera"}
                        size="1x"
                        transform="grow-10"
                      />
                    </span>
                    <span className="fileinput-exists">
                      <FontAwesomeIcon icon={"camera"} />
                    </span>
                    <input
                      ref={file}
                      name="photo"
                      type="file"
                      onChange={() => {
                        if (file.current.files[0]) {
                          imgs.current.src = URL.createObjectURL(
                            file.current.files[0]
                          );
                          handleFile(file.current.files[0]);
                        } else {
                          imgs.current.src = null;
                          handleFile(file.current.files[0]);
                        }
                      }}
                      accept="image/*"
                    />
                  </span>
                </div>
              </div>
              <h3>{state.globalState.username || "Username"}</h3>
            </div>
            <div className="widget lazur-bg p-xl">
              <ul className="list-unstyled m-t-md">
                <li>
                  <span className="fa fa-envelope m-r-xs"></span>
                  {state.globalState.email || "email@mail.com"}
                </li>
                <li className="widget">
                  <span className="fa fa-home m-r-xs"></span>
                  {`street: ${state.globalState.street || ""}
                 between: ${state.globalState.between || ""}
                 building: ${state.globalState.building || ""} 
                 apto no.: ${state.globalState.apto || ""} 
                 municipality: ${state.globalState.municipality || ""} 
                 province: ${state.globalState.province || ""}`}
                </li>
                <li>
                  <span className="fa fa-phone m-r-xs"></span>
                  {state.globalState.phone || "phone"}
                </li>

                <li>
                  <a
                    target="blank"
                    href={
                      "http://www.facebook.com/" + state.globalState.facebook ||
                      ""
                    }
                    className="btn btn-social-icon btn-facebook"
                  >
                    <span className="fa fa-facebook"></span>
                  </a>
                  &nbsp;&nbsp;&nbsp; {state.globalState.facebook || ""}
                </li>
                <li>
                  <a
                    target="blank"
                    href={
                      "http://www.twitter.com/" + state.globalState.twitter ||
                      ""
                    }
                    className="btn btn-social-icon btn-twitter"
                  >
                    <span className="fa fa-twitter"></span>
                  </a>
                  &nbsp;&nbsp;&nbsp; {state.globalState.twitter || ""}
                </li>
                <li>
                  <a
                    target="blank"
                    href={
                      "http://www.instagram.com/" +
                        state.globalState.instagram || ""
                    }
                    className="btn btn-social-icon btn-instagram"
                  >
                    <span className="fa fa-instagram"></span>
                  </a>
                  &nbsp;&nbsp;&nbsp; {state.globalState.instagram || ""}
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8 float-right">
            <form
              onSubmit={(event) => handleSubmit(event)}
              className="m-t "
              action="/home/profile"
            >
              <div className="form-group form-inline col-12">
                <input
                  onChange={(event) => handleChange(event)}
                  name="first_name"
                  value={state.globalState.first_name}
                  type="text"
                  className="form-control col-4"
                  placeholder="First Name"
                  required
                />
                <input
                  onChange={(event) => handleChange(event)}
                  name="last_name"
                  value={state.globalState.last_name || ""}
                  type="text"
                  className="form-control col-8"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="col-lg-2 float-left">Birth date</label>
                <input
                  onChange={(event) => handleChange(event)}
                  value={state.globalState.birth_date || ""}
                  name="birth_date"
                  type="date"
                  className="form-control col-lg-4"
                  required
                />
              </div>
              <div className="form-group form-inline col-12">
                <input
                  onChange={(event) => handleChange(event)}
                  name="username"
                  value={state.globalState.username}
                  type="text"
                  className="form-control col-4"
                  placeholder="User"
                  required
                />
                <input
                  onChange={(event) => handleChange(event)}
                  name="status_message"
                  value={state.globalState.status_message || ""}
                  type="text"
                  className="form-control col-8"
                  placeholder="Status message"
                />
              </div>
              <div className="form-group"></div>
              <div className="form-group form-inline col-12">
                <input
                  onChange={(event) => handleChange(event)}
                  name="phone"
                  type="phone"
                  value={state.globalState.phone || ""}
                  className="form-control col-4"
                  placeholder="Phone number"
                  required
                />
                <input
                  onChange={(event) => handleChange(event)}
                  name="email"
                  type="email"
                  value={state.globalState.email || ""}
                  className="form-control col-8"
                  placeholder="Email*"
                  required
                />
              </div>
              <div className="form-group col-12">
                <div className="widget-text-box ">
                  <h4 className="media-heading">Address</h4>
                  <div className="form-inline">
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="street"
                      value={state.globalState.street || ""}
                      placeholder="Street"
                      className="form-control col-4"
                    />
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="between"
                      value={state.globalState.between || ""}
                      placeholder="Between"
                      className="form-control col-8"
                    />
                  </div>
                  <div className="form-inline">
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="building"
                      value={state.globalState.building || ""}
                      placeholder="Building no."
                      className="form-control col-4"
                    />
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="number"
                      value={state.globalState.number || ""}
                      placeholder="Apartament/House no."
                      className="form-control col-8"
                    />
                  </div>
                  <div className="form-inline">
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="municipality"
                      value={state.globalState.municipality || ""}
                      placeholder="Municipality"
                      className="form-control col-4"
                    />
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="province"
                      value={state.globalState.province || ""}
                      placeholder="Province"
                      className="form-control col-8"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-12">
                <div className="widget-text-box ">
                  <h4 className="media-heading">Social</h4>
                  <div className="form-inline">
                    <label className="form-control col-4">
                      <i className="fa fa-facebook">facebook</i>
                    </label>
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="facebook"
                      value={state.globalState.facebook || ""}
                      className="form-control col-8"
                    />
                  </div>
                  <div className="form-inline">
                    <label className="form-control col-4">
                      <i className="fa fa-twitter">twitter</i>
                    </label>
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="twitter"
                      value={state.globalState.twitter || ""}
                      className="form-control col-8"
                    />
                  </div>
                  <div className="form-inline">
                    <label className="form-control col-4">
                      <i className="fa fa-instagram">Instagram</i>
                    </label>
                    <input
                      type="text"
                      onChange={(event) => handleChange(event)}
                      name="instagram"
                      value={state.globalState.instagram || ""}
                      className="form-control col-8"
                    />
                  </div>
                </div>
              </div>
              <LoadingButton
                load={load}
                buttonText="Update Profile"
                disabled={
                  (state.globalState.first_name !== "" &&
                    state.globalState.last_name !== "" &&
                    state.globalState.email !== "" &&
                    state.globalState.phone !== "" &&
                    state.globalState.photo &&
                    state.globalState.username !== "") === false
                }
              />
            </form>
            <div className="form-group form-inline col-12">
              <form
                className="form-inline col-12"
                onSubmit={(event) => handleSubmit(event)}
              >
                <label className="col-4">Change password:</label>
                <input
                  onChange={(event) => handleChange(event)}
                  name="password"
                  type="text"
                  className="form-control col-4"
                  placeholder="Password*"
                  title="Min 5 characters, It must has at least a number, an special character and upperCase. "
                  required
                />
                <button type="submit" className="btn btn-outline-success col-4">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state?.globalState?.username,
    photo: state?.globalState?.photo,
    first_name: state?.globalState?.first_name,
    last_name: state?.globalState?.last_name,
    birth_date: state?.globalState?.birth_date,
    status_message: state?.globalState?.status_message,
    phone: state?.globalState?.phone,
    email: state?.globalState?.email,
    load: state.load,
    id: state?.globalState?.id,

    street: state?.globalState?.street,
    between: state?.globalState?.between,
    building: state?.globalState?.building,
    number: state?.globalState?.number,
    municipality: state?.globalState?.municipality,
    province: state?.globalState?.province,

    facebook: JSON.parse(localStorage.getItem("store"))?.globalState?.facebook,
    twitter: JSON.parse(localStorage.getItem("store"))?.globalState?.twitter,
    instagram: JSON.parse(localStorage.getItem("store"))?.globalState
      ?.instagram,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleProfile(profile) {
      dispatch(updateProfile(profile));
    },
    setLoad(load) {
      dispatch(setLoad(load));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
