import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CounterView from './Counter.view';

import {
    Create,
    Read,
    Update,
    Delete} from "../../store/counter"

// bind state in the store to the counter view
const mapStateToProps = state => {
    const {counter} = state;

    return {
        counter
    }
};

// bind action methods to component view props
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createCounter: () => Create(),
      readCounter: () => Read(),
      updateCounter: (counter) => Update(counter),
      deleteCounter: (id) => Delete(id),
      toSignup: () => push("/signup"),
      toLogin: () => push("/login")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CounterView)