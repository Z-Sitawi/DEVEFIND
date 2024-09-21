import PropTypes from 'prop-types';
import logoOnly from '/public/favicon.png';


export default function Loader (props) {
  return (
    <div style={{ height: props.height }} className='container text-center d-flex justify-content-center align-items-center'>
      <img id='logoOnly' className='col-3' src={logoOnly} alt='DeveFind' />
    </div>
  );
}

Loader.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
