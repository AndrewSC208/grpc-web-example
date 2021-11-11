import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectView from './Project.view';

// todo -> uncomment when read
// import {
//     Create,
//     Read,
//     Update,
//     Delete
// } from "../../store/project"

const mapStateToProps = state => {
    const { project } = state;

    return {
        project
    }
};

// bind action methods to component view props
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            // createProject: () => Create(),
            // readProject: () => Read(),
            // updateProject: (project) => Update(project),
            // deleteProject: (id) => Delete(id),
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)