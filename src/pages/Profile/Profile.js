import React, { useRef, useState } from "react";
import LoadingButton from "../../components/LoadingButton";
import { connect } from "react-redux";
import "../../components/styles/css/plugins/jasny/jasny-bootstrap.min.css";
import "../../components/styles/css/plugins/bootstrapSocial/bootstrap-social.css";
import { setLoad, updateProfile } from "../../actions/actionCreator";

const Profile = ({
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
  apto,
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
      street,
      between,
      municipality,
      province,
      building,
      apto,

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
      password: null,
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
    setState({
      globalState: {
        ...state.globalState,
        photo: file,
      },
    });
  };
  return (
    <React.Fragment>
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
              <i style={{ fontSize: "150px" }} className="fa fa-user-circle" />
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
                    <i style={{ fontSize: "20px" }} className="fa fa-camera" />
                  </span>
                  <span className="fileinput-exists">
                    <i style={{ fontSize: "20px" }} className="fa fa-camera" />
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
                    "http://www.twitter.com/" + state.globalState.twitter || ""
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
                    "http://www.instagram.com/" + state.globalState.instagram ||
                    ""
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
                    name="apto"
                    value={state.globalState.apto || ""}
                    placeholder="Apartament no."
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
                    <i className="fa fa-facebook">acebook</i>
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
            <form className="form-inline col-12">
              <label className="col-4">Change password:</label>
              <input
                onChange={(event) => handleChange(event)}
                name="password"
                type="password"
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
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state?.globalState[0]?.username,
    photo: state?.globalState[0]?.photo,
    first_name: state?.globalState[0]?.first_name,
    last_name: state?.globalState[0]?.last_name,
    birth_date: state?.globalState[0]?.birth_date,
    status_message: state?.globalState[0]?.status_message,
    phone: state?.globalState[0]?.phone,
    email: state?.globalState[0]?.email,
    load: state.load,

    street: state?.globalState[0]?.address[0]?.street,
    between: state?.globalState[0]?.address[0]?.between,
    building: state?.globalState[0]?.address[0]?.building,
    apto: state?.globalState[0]?.address[0]?.number,
    municipality: state?.globalState[0]?.address[0]?.municipality,
    province: state?.globalState[0]?.address[0]?.province,

    facebook: JSON.parse(localStorage.getItem("store"))?.globalState[0]
      ?.socialNet[0]?.facebook,
    twitter: JSON.parse(localStorage.getItem("store"))?.globalState[0]
      ?.socialNet[0]?.twitter,
    instagram: JSON.parse(localStorage.getItem("store"))?.globalState[0]
      ?.socialNet[0]?.instagram,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleProfile(profile) {
      setTimeout(() => {
        dispatch(updateProfile(profile));
      }, 5000);
    },
    setLoad(load) {
      dispatch(setLoad(load));
    },
    // handleAddress(event) {
    //   dispatch(updateAddress({ [event.target.name]: event.target.value }));
    // },
    // handleSocialNet(event) {
    //   dispatch(updateSocialNet({ [event.target.name]: event.target.value }));
    // },
    // handleSubmit(event) {
    //   event.preventDefault();
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
