import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {
  signup,
  memberSignup,
} from '../../api';

import { Message, TextField, GoogleButton } from '../../components';
import { getError, GOOGLE_NUMBER } from '../../utils';
import { socialLogin } from '../../store/actions/auth';
import { patchNames } from '../../api/patch';

import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import RegularButton from '../../kit-components/CustomButtons/Button';

import './styles.scss';

const SellerForm: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [error, setError] = React.useState('');
  const data = useSelector((store: any) => store);
  const dispatch = useDispatch();

  const onSellerSignup = () => {
    if (data?.auth?.user?.isLogin)
      memberSignup(true, false, phone, address).then(
        (res3: any) => {
          if (res3?.status === 201)
            console.log('SELLER SIGNUP DONE:', res3);
        }
      );

    else {
      if (!firstname && !lastname) {
        setError('Please fill out both name fields')
        return
      }
      signup(email, password, confirmPassword).then(
        (res: any) => {
          if (res?.status === 201) {
            console.log('SIGNUP DONE:', res);

            patchNames(firstname, lastname).then(() => {
              dispatch(socialLogin());
              if (phone || address)
                memberSignup(true, false, phone, address).then(
                  (res2: any) => {
                    if (res2?.status === 201) {
                      dispatch(socialLogin());
                      window.location.reload();
                      setMsg('Thanks for joining! We will be reaching out shortly')
                      console.log('SELLER SIGNUP DONE:', res2);
                    }
                    else {
                      console.log('ERROR2:', res2.data)
                      setError(getError(res2.data));
                    }
                  }
                );
              else
                setMsg('Thanks for signing in! Please complete the form to get started crafting a solution for your property')
            });
          }
        }
      );
    }
  };

  const isLogin = data?.auth?.user?.isLogin
  const isMember = data?.auth?.user?.user?.member_data
  const displayMsg = error !== '' ? error : msg

  // TODO: Fix form alignment on smaller screens
  // TODO: Improve spacing between form elements
  return (
    <div className="home-form-conatiner">
      <GridContainer>
        <GridItem lg={6} >
          <div className="home-form-container-text-data">
            <div className="home-page-form-heading">
              We Buy Houses
            </div>
            <div className="home-page-form-heading">
              Chicago, IL
            </div>

            <p className="home-fee-contatiner-data">
              <span style={{ color: '#fff' }}>
                <em>
                  <b>No</b>
                  <span>Fees</span>
                  <b>No</b>
                  <span>Hassles</span>. Put more cash in your pocket
                </em>
              </span>
            </p>

            <h3 className="home-pay-heading-container">
              Get a fair, as-is, cash offer. We pay cash. We pay all the costs.
            </h3>

            <p className="short-form-heading">
              Fill out the short form or sign in with Google below!
            </p>
          </div>
        </GridItem>
        <GridItem lg={6}>
          <div className="how-we-help-form-container">
            <GridContainer>

              {!isLogin ? (
                <div className={'sign-in-container-social'}>
                  <GridItem lg={12}>
                    <GoogleButton />
                  </GridItem>
                </div>) : null}
              <div className="sign-in-container">
                {!isLogin ? (
                  <>
                    <Message severity={error ? 'error' : 'success'} message={displayMsg} />
                    <GridItem lg={12}>
                      <TextField
                        value={email}
                        id="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>

                    <GridItem lg={12}>
                      <TextField
                        value={firstname}
                        id="firstname"
                        placeholder="First name"
                        autoComplete="firstname"
                        type="name"
                        onChange={(e) => setFirstname(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>

                    <GridItem lg={12}>
                      <TextField
                        value={lastname}
                        id="lastname"
                        placeholder="Last Name"
                        autoComplete="lastname"
                        type="name"
                        onChange={(e) => setLastname(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>

                    <GridItem lg={12}>
                      <TextField
                        value={password}
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>

                    <GridItem lg={12}>
                      <TextField
                        value={confirmPassword}
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>
                    <GridItem lg={12}>
                      <div className="address-form-cash-btn-container">
                        <RegularButton onClick={onSellerSignup} className='how-we-help-get-your-best-btn'>
                          <div>Register</div>
                        </RegularButton>

                      </div>
                      <div className="can-call-us-text">
                        <h4>
                          Or Call Us At {GOOGLE_NUMBER}
                        </h4>
                      </div>
                    </GridItem>
                  </>
                ) :
                  <Message severity={'success'} message={'Thanks for joining! We will be reaching out shortly'} />
                }
                {isLogin && !isMember ? (
                  <>
                    <GridItem lg={12}>
                      <TextField
                        value={phone}
                        id="phone"
                        placeholder="Phone Number"
                        autoComplete="phone"
                        type="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>

                    <GridItem lg={12}>
                      <TextField
                        value={address}
                        id="address"
                        placeholder="Property Address"
                        autoComplete="address"
                        type="address"
                        onChange={(e) => setAddress(e.target.value)}
                        handleSubmit={onSellerSignup}
                      />
                    </GridItem>

                    <GridItem lg={12}>
                      <div className="address-form-cash-btn-container">
                        <RegularButton onClick={onSellerSignup} className='how-we-help-get-your-best-btn'>
                          <div>Get My Fair Cash Offer</div>
                        </RegularButton>

                      </div>
                      <div className="can-call-us-text">
                        <h4>
                          Or Call Us At {GOOGLE_NUMBER}
                        </h4>
                      </div>
                    </GridItem>
                  </>
                ) : null}
              </div>

            </GridContainer>
          </div>
        </GridItem >
      </GridContainer >
    </div >

  );
};

export default SellerForm;
