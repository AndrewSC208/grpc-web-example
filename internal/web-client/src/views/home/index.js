import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeView from './home';

// bind state in the store to the home view
const mapStateToProps = state => {
  return {}
};

// bind action methods to component view props
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      counter: () => push("/counter")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)