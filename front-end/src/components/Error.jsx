import { PropTypes } from 'prop-types';

export default function Error ({ action, errMsg }) {
  return (
    <label className={'text-danger ' + action}>{errMsg}</label>
  );
}

Error.propTypes = {
  action: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired

};
