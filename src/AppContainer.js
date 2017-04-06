import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state, ownProps) => {
  return {
    formDetails: state.form.simple
  }
}

const AppContainer = connect(
  mapStateToProps,
  null
)(App);

export default AppContainer