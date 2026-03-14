import * as React from "react";

import { ToastContainer } from "react-toastify";
import { getUser, login, logout } from "../helpers/auth_helper";

import EquipmentContent from "./EquipmentContent";
import EmployersContent from "./EmployersContent";
import DepartmentsContent from "./DepartmentsContent";

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.shouldCancel = false;
    }

    componentDidMount() {
        this.loadUser();
    }

    componentWillUnmount() {
        this.shouldCancel = true;
    }

    loadUser = () => {

        getUser().then(user => {

            if (!this.shouldCancel) {
                this.setState({ user });
            }

        });

    };

    renderContent = () => {

        if (!this.state.user) {
            return <p>Please login</p>;
        }

        switch (this.props.page) {

            case "equipment":
                return <EquipmentContent />;

            case "employers":
                return <EmployersContent />;

            case "departments":
                return <DepartmentsContent />;

            default:
                return null;
        }

    };

    render() {

        return (
            <>
                <ToastContainer />

                {this.renderContent()}
            </>
        );
    }
}