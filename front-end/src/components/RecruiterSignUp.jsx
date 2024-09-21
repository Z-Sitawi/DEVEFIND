import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Error from './Error';

const redBox = { boxShadow: '3px 4px 0px 1px red' };
const eyeIcon = 'show';
const eyeSlashIcon = 'hied';

// FormGroup component
function FormGroup ({ type = 'text', value, id, label, attributes, onEyeClick, error={cls:"", msg:""} }) {
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
        {
          (type === "email" || type === "password") && (<Error action={error.cls} errMsg={error.msg} />)
        }
        {onEyeClick && (
          <span className={type === 'password' && error.msg ? 'eye_icon-'+eyeIcon : 'eye_icon-'+eyeSlashIcon} onClick={onEyeClick}>
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
  onEyeClick: PropTypes.func,
  error: PropTypes.object,

};

export default function RecruiterSignUp () {
  const [userInfo, setUsrInfo] = useState({ firstName: '', lastName: '', age: '', email: '', password: '', confirmPassword: '' });
  const [emailError, setEmailError] = useState({ action: 'hideError', msg: '', inputError: {} });
  const [pwdError, setPwdError] = useState({ action: 'hideError', msg: '', inputError: {} });
  const [btnState, setBtnState] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  function onSignUpSuccess (msg) {
    alert(msg);
    // location.href = '/signin'+
  }

  async function signUp (e) {
    e.preventDefault();
    setBtnState('disabled');

    try {
      const response = await fetch('http://0.0.0.0:3000/recruiter/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();

      if (response.ok) {
        onSignUpSuccess(data.message);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsrInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={signUp}>
      <div className='formContainer'>
        <FormGroup value={userInfo.firstName} id='firstName' label='First Name' attributes={{ required: 'required', onChange: handleChange }} />
        <FormGroup value={userInfo.lastName} id='lastName' label='Last Name' attributes={{ required: 'required', onChange: handleChange }} />
        <FormGroup value={userInfo.age} id='age' label='Age' type='number' attributes={{ required: 'required', min: 18, max: 65, onChange: handleChange }} />
        <FormGroup 
          value={userInfo.email} 
          id='email' label='Email' 
          type='email' 
          attributes={{ required: 'required', onChange: handleChange, style: emailError.inputError }} 
          error={{cls: emailError.action, msg: emailError.msg}}
        />
        
        <FormGroup 
          value={userInfo.password} 
          id='password' label='Password' 
          type={showPassword ? 'text' : 'password'} 
          attributes={{ required: 'required', onChange: handleChange }} 
        />

        <FormGroup 
          value={userInfo.confirmPassword} 
          id='confirmPassword' 
          label='Confirm Password' 
          type={showPassword ? 'text' : 'password'} 
          attributes={{ required: 'required', onChange: handleChange, style: pwdError.inputError }} 
          onEyeClick={togglePasswordVisibility} 
          error={{cls: pwdError.action, msg: pwdError.msg}}
        />
      </div>

      <div>
        <input disabled={btnState === 'disabled'} type='submit' className='signUpbtn' value='SIGN UP' />
        <p>Have an Account? <a className='link' href='/signin'>Login Here!</a></p>
      </div>
    </form>
  );
}
