import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import {
	createUser,
	clearUserErrors
} from '../actions/userActions';

class AuthEntry extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newUserData: {
				firstName: '',
				lastName: '',
				address: '',
				zipcode: '',
				city: '',
				phone: '',
				passwordVerify: ''
			},
			businessData: {
				businessName: '',
				fax: '',
				website: ''
			},
			loginData: {
				username: '',
				password: ''
			},
			showBusinessInputs: false,
			createUserError: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.validateNewUser = this.validateNewUser.bind(this);
		this.login = this.login.bind(this);
		this.handleBusinessChange = this.handleBusinessChange.bind(this);
	}

	handleChange(field, value) {
		const obj = this.state.newUserData;
		obj[field] = value;
		this.setState({
			newUserData: obj
		});
	}

	handleBusinessChange(field, value) {
		const obj = this.state.businessData;
		obj[field] = value;
		this.setState({
			businessData: obj
		});
	}

	handleLoginChange(field, value) {
		const obj = this.state.formData;
		obj[field] = value;
		this.setState({
			formData: obj
		});
	}

	validateNewUser() {
		
		let errors = [];
		this.props.clearUserErrors();

		Object.entries(this.state.newUserData).forEach(([key, value]) => {
			if (!value) {
				errors.push(`${key} is a required field.`);
			}
		});

		if (this.state.newUserData.password !== this.state.newUserData.passwordVerify) {
			errors.push('Passwords do not match.');
		}

		if (this.state.newUserData.password && (this.state.newUserData.password.length < 6 || this.state.newUserData.password.length > 12 )) {
			errors.push('Password length must be between 6 and 12 characters.');
		}

		if (this.state.showBusinessInputs) {
			Object.entries(this.state.businessData).forEach(([key, value]) => {
				if (key !== 'fax' && !value) {
					errors.push(`${key} is a required field.`);
				}
			});
		}

		this.setState({
			createUserError: errors
		});

		if (errors.length === 0) {
			this.props.createUser(Object.assign(this.state.newUserData, this.state.businessData));
		}
	}

	login() {

	}

	componentWillUnmount() {
		this.props.clearUserErrors();
	}

	render() {
		return (
			<Layout>
				<div className='c-auth'>
					<div className='c-auth__signup'>
						<h2>Sign up!</h2>
						{this.props.userId ? <p className='o-success-msg'>Account was created successfully. Login to continue.</p> : null}
						<form>
							<label>
								First Name
								<input type='text' onChange={(evt) => this.handleChange('firstName', evt.target.value )} />
							</label>
							<label>
								Last Name
								<input type='text' onChange={(evt) => this.handleChange('lastName', evt.target.value )} />
							</label>
							<label>
								Address
								<input type='text' onChange={(evt) => this.handleChange('address', evt.target.value )} />
							</label>
							<label>
								City
								<input type='text' onChange={(evt) => this.handleChange('city', evt.target.value )} />
							</label>
							<label>
								Zipcode
								<input type='text' onChange={(evt) => this.handleChange('zipcode', evt.target.value )} />
							</label>
							<label>
								Phone
								<input type='tel' onChange={(evt) => this.handleChange('phone', evt.target.value )} />
							</label>
							<label>
								Email
								<input type='email' onChange={(evt) => this.handleChange('email', evt.target.value )} />
							</label>
							<label>
								Password
								<input type='password' onChange={(evt) => this.handleChange('password', evt.target.value )} />
							</label>
							<label>
								Re-enter password
								<input type='password' onChange={(evt) => this.handleChange('passwordVerify', evt.target.value )} />
							</label>
							<label>
								<strong>Is this a business account?</strong>
								<input type='checkbox' onChange={(evt) => this.setState({ showBusinessInputs: evt.target.checked })} />
							</label>
						</form>
						{this.state.showBusinessInputs ? (
							<>
								<label>
									Business Name
									<input type='text' onChange={(evt) => this.handleBusinessChange('businessName', evt.target.value )} />
								</label>
								<label>
									Fax
									<input type='text' onChange={(evt) => this.handleBusinessChange('fax', evt.target.value )} />
								</label>
								<label>
									Website
									<input type='text' onChange={(evt) => this.handleBusinessChange('website', evt.target.value )} />
								</label>
							</>
						) : null}
						<button type='button' onClick={this.validateNewUser}>Sign up</button>
						{this.state.createUserError.map((error, idx) => <p className='o-error-msg' key={idx}>{error}</p>)}
						<p className='o-error-msg'>{this.props.error ? `Error: ${this.props.error}` : null}</p>
					</div>
					<div className='c-auth__login'>
						<label>
							Email
							<input type='text' onChange={(evt) => this.handleLoginChange('email', evt.target.value )} />
						</label>
						<label>
							Password
							<input type='password' onChange={(evt) => this.handleLoginChange('password', evt.target.value )} />
						</label>
						<button type='button' onClick={this.login}>Login</button>
						<p>{this.state.loginError ? `Error: ${this.state.loginError}` : null}</p>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	error: state.user.error,
	userId: state.user.newUser
});

export default connect(mapStateToProps, {
	createUser,
	clearUserErrors
})(AuthEntry);