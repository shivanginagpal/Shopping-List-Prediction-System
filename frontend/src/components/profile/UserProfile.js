import React, { Component } from "react";
import { connect } from "react-redux";
import CustomerNavbar from "../customer/CustomerNavbar";
import { getCurrentUser } from "../../actions/userActions";

class UserProfile extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { user = [], loading } = this.props.user;
    console.log(user);

    if (user === null || loading) {
      return (
        <div>
          <CustomerNavbar />
          <div className="container">
            <br />

            <h2>"Loading"</h2>
          </div>
        </div>
      );
    } else {
      /*
      profileImg = isFieldEmpty(profile.customerProfilePicture)
        ? "https://static.change.org/profile-img/default-user-profile.svg"
        : profile.customerProfilePicture;
      */
      let profileImg =
        "https://static.change.org/profile-img/default-user-profile.svg";
      return (
        <div>
          <CustomerNavbar />
          <br />
          <div className="col-md-12">
            <div className="card card-body bg-white text-black mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="card-img-top rounded-circle"
                    src={profileImg}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-right">
                <h1
                  className=""
                  type="text"
                  placeholder="My email"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  value={user.email}
                ></h1>
                <h1 className="text-right profile-text">{user.name}</h1>
                <h1 className="text-right profile-text">{user.email}</h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { getCurrentUser })(UserProfile);
