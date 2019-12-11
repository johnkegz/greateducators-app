import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {login} from '../../redux/actions/actions';
// import {NavLink} from 'react-router-dom';
// import '../Regisiter/register.scss';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {Form, Field} from 'react-native-validate-form';
import {login} from './Auth/Api';
import {auth} from './Auth/auth';
import {AsyncStorage} from 'react-native';

const required = value => (value ? undefined : 'This is a required field.');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}\s*$/i.test(value)
    ? 'Please provide a valid email address'
    : undefined;

class LoginScreen extends Component {
  initialState = {
    email: '',
    password: '',
  };
  state = this.initialState;
  static getDerivedStateFromProps(props, state) {
    if (
      props.loginData !== undefined &&
      Object.keys(props.loginData).length !== 0 &&
      props.loginData.constructor === Object
    ) {
      props.navigation.navigate('CreatePost');
    }
    return null;
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('jwtToken');
    return userToken;
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.login(this.state);
  //   this.setState(this.initialState);
  // };

  submitForm() {
    let submitResults = this.myForm.validate();

    let errors = [];

    submitResults.forEach(item => {
      errors.push({field: item.fieldName, error: item.error});
    });

    this.setState({errors: errors});
  }

  submitSuccess() {
    this.props.login(this.state);
    this.setState(this.initialState);
  }

  submitFailed() {
    console.log('Submit Faield!');
  }
  displayForm(email, password) {
    return (
      <View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login</Text>
      </View>
        <Form
          ref={ref => (this.myForm = ref)}
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
            onChangeText={val => this.setState({email: val})}
            customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20,}}
            placeholder={'Enter email'}
          />
          <Field
            required
            component={InputField}
            validations={[required]}
            name="password"
            value={this.state.password}
            onChangeText={val => this.setState({password: val})}
            customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20,}}
            secureTextEntry={true}
            placeholder={'Enter password'}
          />
        </Form>
        <View style={styles.submitButton}>
          <Button title="SUBMIT" onPress={this.submitForm.bind(this)}></Button>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{color: "#1E90FF"}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const {password} = this.state;
    return <View style={styles.container}>{this.displayForm(email, password)}</View>;
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
        onChangeText={onChangeText ? val => onChangeText(val) : null}
        placeholder={placeholder ? placeholder : ''}
        disabled={disabled}
        style={customStyle ? customStyle : {}}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
      />

      {errors &&
        errors.length > 0 &&
        errors.map((item, index) =>
          item.field === name && item.error ? (
            <Text style={{color: 'red'}} key={index}>
              {item.error}
            </Text>
          ) : (
            <View key={index} />
          ),
        )}
    </View>
  );
};
function mapStateToProps(state) {
  console.log('user state global state__+_+__+_+_+_+_+_+_0000000000000000000', state);
  return {
    loginData: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: data => {
      login(data).then(res => {
        auth(res).then(response => {
          dispatch({type: 'LOGIN', data: response});
        });
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  submitButton: {
    marginVertical: 40,
  },
  register: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
