import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {register} from '../../redux/actions/actions';
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
import {register} from './Auth/Api';
import {auth} from './Auth/auth';
import {AsyncStorage} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const required = value => (value ? undefined : 'This is a required field.');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}\s*$/i.test(value)
    ? 'Please provide a valid email address.'
    : undefined;

class RegisterScreen extends Component {
  initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  state = this.initialState;

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('jwtToken');
    return userToken;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.prop.register(this.state);
    this.setState(this.initialState);
  };

  submitForm() {
    let submitResults = this.myForm.validate();

    let errors = [];

    submitResults.forEach(item => {
      errors.push({field: item.fieldName, error: item.error});
    });

    this.setState({errors: errors});
  }

  checkPassword() {
    if (this.state.password === this.state.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  submitSuccess() {
    if (this.checkPassword() === true) {
      return this.props.register(this.state, this.props.navigation);
    } else {
      return alert('passwords do not match')
    }

    // this.setState(this.initialState);
  }

  submitFailed() {
    console.log('Submit Faield!');
  }
  displayForm(email, password) {
    return (
      <ScrollView>
        <View>
          <Text>Register</Text>
        </View>
        <View>
          <Form
            ref={ref => (this.myForm = ref)}
            validate={true}
            submit={this.submitSuccess.bind(this)}
            failed={this.submitFailed.bind(this)}
            errors={this.state.errors}>
            <Field
              required
              component={InputField}
              validations={[required]}
              name="firstName"
              value={this.state.firstName}
              onChangeText={val => this.setState({firstName: val})}
              customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20}}
              placeholder={'First name'}
            />
            <Field
              required
              component={InputField}
              validations={[required]}
              name="lastName"
              value={this.state.lastName}
              onChangeText={val => this.setState({lastName: val})}
              customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20}}
              placeholder={'Last name'}
            />
            <Field
              required
              component={InputField}
              validations={[required, email]}
              name="email"
              value={this.state.email}
              onChangeText={val => this.setState({email: val})}
              customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20}}
              placeholder={'Email'}
            />
            <Field
              required
              component={InputField}
              validations={[required]}
              name="password"
              value={this.state.password}
              onChangeText={val => this.setState({password: val})}
              customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20}}
              secureTextEntry={true}
              placeholder={'Password'}
            />
            <Field
              required
              component={InputField}
              validations={[required]}
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChangeText={val => this.setState({confirmPassword: val})}
              customStyle={{backgroundColor: '#F5FCFF', marginVertical: 20}}
              secureTextEntry={true}
              placeholder={'Confirm password'}
            />
          </Form>
          <View style={styles.submitButton}>
            <Button title="SUBMIT" onPress={this.submitForm.bind(this)} />
          </View>
        </View>
      </ScrollView>
    );
  }
  render() {
    const {password} = this.state;
    return (
      <View style={styles.container}>{this.displayForm(email, password)}</View>
    );
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
            <Text style={{color: 'red'}}>{item.error}</Text>
          ) : (
            <View />
          ),
        )}
    </View>
  );
};
function mapStateToProps(state) {
  return {
    registerData: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (data, navigation) => {
      register(data).then(res => {
        if (res.data === 'Registration successful') {
          alert('Registration successful');
          navigation.navigate('Login');
        } else if (res.data === 'email already exists') {
          alert('email already exists please use another email');
        }
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  submitButton: {
    marginVertical: 40,
  },
});
