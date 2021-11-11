import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ViewportView from './Viewport.view';

// bind state in the store to the home view
const mapStateToProps = state => {
    return {};
};

// bind action methods to component view props
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            toHome: () => push("/"),
            toCounter: () => push("/counter"),
            toProject: () => push("/project")
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ViewportView)