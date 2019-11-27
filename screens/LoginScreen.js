import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {login} from '../../redux/actions/actions';
// import {NavLink} from 'react-router-dom';
// import '../Regisiter/register.scss';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Form, Field} from 'react-native-validate-form';

const required = value => (value ? undefined : 'This is a required field.');
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;

class LoginScreen extends Component {
  initialState = {
    email: '',
    password: '',
  };
  state = this.initialState;
  static getDerivedStateFromProps(props, state) {
    if (props.isAuthenticated) {
      props.navigation.navigate('Post');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
    this.setState(this.initialState);
  };

  submitForm() {
    let submitResults = this.myForm.validate();

    let errors = [];

    submitResults.forEach(item => {
      errors.push({ field: item.fieldName, error: item.error });
    });

    this.setState({ errors: errors });
  }

  submitSuccess() {
    console.log("Submit Success!");
  }

  submitFailed() {
    console.log("Submit Faield!");
  }
  displayForm(email,password) {
    return (
      <View>
        <Form
          ref={(ref) => this.myForm = ref}
          validate={true}
          submit={this.submitSuccess.bind(this)}
          failed={this.submitFailed.bind(this)}
          errors={this.state.errors}>
          <Field
            required
            component={InputField}
            validations={[required, email]}
            name="email"
            value={this.state.email}
            onChangeText={(val) => this.setState({ email: val })}
            customStyle={{width: 100}}
          />
          <Field
            required
            component={InputField}
            validations={[required]}
            name="password"
            value={this.state.password}
            onChangeText={(val) => this.setState({ password: val })}
            customStyle={{width: 100}}
            secureTextEntry={true}
            
          />
        </Form>

        <TouchableOpacity onPress={this.submitForm.bind(this)}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const {password} = this.state;
    console.log('state++++', this.state);
    return <View>{this.displayForm(email,password)}</View>;
  }
}
//input feild
const InputField = ({
  name, // field name - required
  customStyle,
  onChangeText, // event
  value, // field value
  disabled,
  placeholder,
  errors,
  secureTextEntry,
   // this array prop is automatically passed down to this component from <Form />
}) => {
  return (
    <View>
      <TextInput
        value={value && value}
        onChangeText={onChangeText ? (val) => onChangeText(val) : null}
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
        style={customStyle ? customStyle : {}}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
      />

      { errors && errors.length > 0 && errors.map((item, index) =>
          item.field === name && item.error ?
            <Text style={{ color: 'red' }}>
              {item.error}
            </Text>
          : <View />
        )
      }
    </View>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readMore: () => {
      dispatch({type: 'LOGIN', data: false});
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
