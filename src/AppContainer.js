import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state, ownProps) => {
  return {
    informationDetails: state.form.information,
    addressDetails: state.form.address
  }
}

const AppContainer = connect(
  mapStateToProps,
  null
)(App);

export default AppContainer