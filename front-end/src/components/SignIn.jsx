import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Error from './Error';

const redBox = { boxShadow: '3px 4px 0px 1px red' };
const eyeIcon = 'show';
const eyeSlashIcon = 'hied';

// FormGroup component
function FormGroup ({ type = 'text', value, id, label, attributes, onEyeClick }) {
  return (
    <div className='form_group'>
      <label className='sub_title' htmlFor={id}>{label}</label>
      <div className='input_container'>
        <input
          required
          placeholder={`Enter ${label}`}
          className='form_style'
          id={id}
          name={id}
          type={type}
          value={value}
          {...attributes}
        />
        {onEyeClick && (
          <span className='eye_icon-hied' onClick={onEyeClick}>
            {type === 'password' ? eyeIcon : eyeSlashIcon}
          </span>
        )}
      </div>
    </div>
  );
}

FormGroup.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  onEyeClick: PropTypes.func
};

export default function SignIn (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState({ action: 'hideError', msg: '', inputError: {} });
  const [pwdError, setPwdError] = useState({ action: 'hideError', msg: '', inputError: {} });
  const [btnState, setBtnState] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  function onLoginSuccess (user, token, page) {
    localStorage.setItem(user + 'Token', token);
    location.href = '/' + page;
  }

  async function logIn (e) {
    e.preventDefault();
    setBtnState('disabled');

    try {
      const response = await fetch(props.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(props.user, data.token, props.page);
      } else {
        if (data.email) {
          setEmailError({ action: 'showError', msg: data.error, inputError: redBox });
          setPwdError({ action: 'hideError', msg: '', inputError: {} });
        } else if (data.password) {
          setPwdError({ action: 'showError', msg: data.error, inputError: redBox });
          setEmailError({ action: 'hideError', msg: '', inputError: {} });
        } else {
          setEmailError({ action: 'hideError', msg: '', inputError: {} });
          setPwdError({ action: 'hideError', msg: '', inputError: {} });
          alert(data.error);
        }
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setBtnState('');
    }
  }

  return (
    <form onSubmit={logIn}>
      <div className='formContainer2'>
        <FormGroup
          id='email'
          label='Email'
          value={email}
          attributes={{
            style: emailError.inputError,
            onChange: (e) => { setEmail(e.target.value); setEmailError({ action: 'hideError', msg: '', inputError: {} }); }
          }}
        />
        <Error action={emailError.action} errMsg={emailError.msg} />
        <FormGroup
           type={showPassword ? 'text' : 'password'}
          id='password'
          label='Password'
          value={password}
          onEyeClick={togglePasswordVisibility}
          attributes={{
            style: pwdError.inputError,
            onChange: (e) => { setPassword(e.target.value); setPwdError({ action: 'hideError', msg: '', inputError: {} }); }
          }}
        />
        <Error action={pwdError.action} errMsg={pwdError.msg} />
      </div>
      <div>
        <input disabled={btnState} type='submit' className='signUpbtn' value='SIGN In' />
        <p id='question'>Do Not Have an Account? <a className='link' href='/signup'>Create Here!</a></p>
      </div>
    </form>
  );
}

SignIn.propTypes = {
  user: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired
};
