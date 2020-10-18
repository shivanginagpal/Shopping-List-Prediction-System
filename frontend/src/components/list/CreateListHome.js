import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../../actions/userActions';
import CustomerNavbar from '../customer/CustomerNavbar';
import ShowCurrentList from './ShowCurrentList';
import { Link } from 'react-router-dom';

class CreateListHome extends Component {
    async componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        console.log("in componentDidMount");
        await this.props.getUser();
    }

    render() {

        const { user, loading } = this.props.user;
        console.log(this.props);
        console.log("User is", user);
        let pageContent;
        if (user === null || loading) {
            pageContent = "Loading";
        }
        else if (user.lists.length < 1 || user.lists == undefined) {
            pageContent = (
                <div>
                    <div className="container">
                        <p>Welcome <strong>{user.name}</strong></p>
                        <p>You have not yet created a list</p>
                        <Link to="/createListHome" className="btn btn-lg btn-info">
                            Create Your First List !!
                </Link>
                    </div>
                </div>
            );
        }
        else {
            pageContent = (
                <div>
                    <ShowCurrentList lists={user.lists} />
                </div>
            );
        }

        return (
            <div>
                <CustomerNavbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{pageContent}</div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getUser })(CreateListHome);