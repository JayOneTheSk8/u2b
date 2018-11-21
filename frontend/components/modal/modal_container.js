import { connect } from 'react-redux';
import Modal from './modal';
import { clearScreen } from '../../actions/ui_actions'; 

// mapStateToProps
// mapDispatchToProps

const mapStateToProps = state => {
  return {
    status: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearScreen: (e) => dispatch(clearScreen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
