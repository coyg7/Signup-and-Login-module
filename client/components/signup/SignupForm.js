import React from "react";
import timezones from "../../data/timezones";
import axios from "axios";
import classnames from "classnames";
import validateInput from "../../../server/shared/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";
import { browserHistory } from 'react-router';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      timezone: "",
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        .userSignupRequest(this.state)
        .then(
          () => {
            browserHistory.push('/');
            this.props.addFlashMessage({
              type: 'success',
              text: 'you have signed up successfully'
            })
          },
          ({ data }) => this.setState({ errors: data, isLoading: false })
        );
    }
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if(val !== '') {
      this.props.isUserExists(val).then( res => {
        let errors = this.state.errors;
        let invalid;
        if(res.data.user) {
          errors[field] = 'There is a user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }


  render() {
    const { errors } = this.state;
    const options = Object.keys(timezones).map(key => {
      return (
        <option key={timezones[key]} value={timezones[key]}>
          {key}
        </option>
      );
    });

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Confirm password"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

       
        <div
          className={classnames("form-group", { "has-error": errors.timezone })}
        >
          <label className="control-label">Timezone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>
              Choose your timezone
            </option>
            {options}
          </select>
          {errors.passwordConfirmation && (
            <span className="help-block">{errors.timezone}</span>
          )}
        </div>

        <div className="form-group">
          <button
            disabled={this.state.isLoading || this.state.invalid}
            className="btn btn-primary btn-lg"
          >
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

export default SignupForm;
