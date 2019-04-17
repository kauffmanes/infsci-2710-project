import React, { Component } from 'react';
import Layout from '../components/Layout';

class AuthEntry extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newUserData: {
				firstName: '',
				lastName: '',
				address: '',
				zipcode: '',
				phone: ''
			},
			loginData: {
				username: '',
				password: ''
			},
			showBusinessInputs: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
	}

	handleChange(field, value) {
		const obj = this.state.newUserData;
		obj[field] = value;
		this.setState({
			newUserData: obj
		});
		console.log(this.state.newUserData)
	}

	handleLoginChange(field, value) {
		const obj = this.state.formData;
		obj[field] = value;
		this.setState({
			formData: obj
		});
		console.log(this.state.formData)
	}

	createUser() {

	}

	login() {

	}

	render() {
		return (
			<Layout>
				<div className='c-auth'>
					<div className='c-auth__signup'>
						<h2>Sign up!</h2>
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
								Zipcode
								<input type='text' onChange={(evt) => this.handleChange('zipcode', evt.target.value )} />
							</label>
							<label>
								Phone
								<input type='tel' onChange={(evt) => this.handleChange('phone', evt.target.value )} />
							</label>
							<label>
								Are you creating a business account?
								<input type='checkbox' onChange={(evt) => this.setState({ showBusinessInputs: evt.target.checked })} />
							</label>
						</form>
						{this.state.showBusinessInputs ? (
							<>
								<label>
									Business Name
									<input type='text' onChange={(evt) => this.handleChange('firstName', evt.target.value )} />
								</label>
								<label>
									Fax
									<input type='text' onChange={(evt) => this.handleChange('lastName', evt.target.value )} />
								</label>
								<label>
									Website
									<input type='text' onChange={(evt) => this.handleChange('firstName', evt.target.value )} />
								</label>
							</>
						) : null}
						<button type='button' onClick={this.createUser}>Sign up</button>
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
					</div>
				</div>
			</Layout>
		);
	}
}

export default AuthEntry;