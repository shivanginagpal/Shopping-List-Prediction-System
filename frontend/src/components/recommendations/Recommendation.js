import React, { Component } from "react";
import { connect } from "react-redux";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    if (this.props.auth) {
      console.log("user is", this.props.auth.user.id);
    }
    fetch(
      "http://localhost:5000/get_prediction/user_id=" + this.props.auth.user.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    return <div>"Recommended Products:"</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Recommendation);
