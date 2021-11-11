import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignUpView from './SignUp.view';

// bind state in the store to the home view
const mapStateToProps = state => { return {}};

// bind action methods to component view props
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView)