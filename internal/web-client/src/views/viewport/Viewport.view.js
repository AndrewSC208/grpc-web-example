import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarGroup,
    Position,
    Menu,
    MenuDivider,
    MenuItem,
    Popover
} from "@blueprintjs/core";

import HomeView from '../home';
import CounterView from '../counter/Counter.container';
import ProjectView from '../project/Project.container';
import SignUpView from '../signup/SignUp.container';

export default class ViewportView extends Component {
    renderAppMenu = () => {
        return (
            <Menu className={Classes.ELEVATION_1}>
                <MenuDivider title="Applications" />
                <MenuItem icon="lightbulb" text="Counters" label="" onClick={this.props.toCounter}/>
                <MenuItem icon="layers" text="Projects" label="" onClick={this.props.toProject}/>
            </Menu>
        )
    };

    renderNavBar = () => {
        return (
            <Navbar className="navViewport">
                <NavbarGroup align={Alignment.LEFT}>
                    <Button
                        className={Classes.MINIMAL}
                        icon="home"
                        onClick={this.props.toHome} />

                    <Popover content={this.renderAppMenu()} position={Position.BOTTOM_LEFT}>
                        <Button
                            className={Classes.MINIMAL}
                            icon="applications"
                            text="menu" />
                    </Popover>
                </NavbarGroup>

                <NavbarGroup align={Alignment.RIGHT}>
                    <button className="bp3-button bp3-minimal bp3-icon-user" />
                    <button className="bp3-button bp3-minimal bp3-icon-notifications" />
                    <button className="bp3-button bp3-minimal bp3-icon-cog" />
                </NavbarGroup>
            </Navbar>
        )
    };

    renderViewPort = () => {
        return (
            <div className="rootViewport">
                <div className="navBar">
                    {this.renderNavBar()}
                </div>

                <div className="mainViewport">
                    <Switch>
                        <Route exact path="/" render={() => (<HomeView />)} />
                        <Route exact path="/counter" render={() => (<CounterView />)} />
                        <Route exact path="/project" render={() => (<ProjectView />)} />
                        <Route render={() => (<div>404</div>)} />
                    </Switch>
                </div>
            </div>
        )
    };

    renderSignUp = () => {
        return (
            <div className="rootViewport">
                <div className="signUpViewport">
                    <Switch>
                        <Route exact path="/signup" render={() => (<SignUpView />)} />
                    </Switch>
                </div>
            </div>
        )
    };

    render() {
        const { user } = this.props;
        let view;

        if (user) {
            view = this.renderViewPort();
        } else {
            view = this.renderSignUp();
        }

        return (
            <div>
                {view}
            </div>
        );
    }

    handleOpen = () => this.setState({ isOpen: true });
    handleClose = () => this.setState({ isOpen: false });
}
