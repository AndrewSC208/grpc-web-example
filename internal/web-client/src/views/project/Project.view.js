import React, { Component } from 'react';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarGroup
} from "@blueprintjs/core";

export default class ProjectView extends Component {
    renderNavBar = () => {
        return (
            <Navbar className="navViewport">
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button
                        className={Classes.MINIMAL}
                        text="Create Project" />
                </NavbarGroup>
            </Navbar>
        )
    }

    render() {
        return (
            // todo -> add a grid system blueprint does not come with one so it would be a good idea
            // to create one or import one to use
            <div className="rootProjectView">
                <div className="secondaryNavBar">
                    {this.renderNavBar()}
                </div>
            </div>
        );
    }
}
