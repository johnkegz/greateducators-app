// import React, {Component} from 'react';
// import {Text, View} from 'react-native';
// import {WebView} from 'react-native-webview';

// export class WebViewComponent extends Component {
//   state = {
//     loading: true,
//   };

//   render() {
//     const {loading} = this.state;
//     return (
//       <View style={{flex: 1}}>
//         {loading ? (
//           <Text>Loading ............</Text>
//         ) : (
//           <Text style={{marginTop: -20}} />
//         )}
//         <WebView
//           onLoad={() => {
//             return this.setState({loading: false});
//           }}
//           source={{uri: 'http://greateducatorsug.org/'}}
//         />
//       </View>
//     );
//   }
// }

// export default WebViewComponent;

/**
 * Rich Editor Example
 * @author tangzehua
 * @since 2019-06-24 14:52
 */
import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import ImagePicker from 'react-native-image-picker';
var CryptoJS = require('crypto-js');
import {Form, Field} from 'react-native-validate-form';

const initHTML = '<br/></br>';

const required = value => (value ? undefined : 'This is a required field.');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
    ? 'Please provide a valid email address.'
    : undefined;

class WebViewComponent extends React.Component {
  initialState = {
    email: '',
    password: '',
  };
  state = this.initialState;
  save = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    alert(html);
  };

  onPressAddImage = () => {
    // insert URL
    this.richText.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
    );
    // insert base64
    // this.richText.insertImage(`data:${image.mime};base64,${image.data}`);
    this.richText.blurContentEditor();
  };

  onHome = () => {
    this.props.navigation.push('index');
  };

  handleImagePicker() {
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      alert(JSON.stringify(response));
      this.uploadImage(response);
    });
    // return true
  }

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
            customStyle={{width: 100}}
          />
          <Field
            required
            component={InputField}
            validations={[required]}
            name="password"
            value={this.state.password}
            onChangeText={val => this.setState({password: val})}
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

  uploadImage(response) {
    let timestamp = ((Date.now() / 1000) | 0).toString();
    let api_key = '493371531433662';
    let api_secret = 'lkfb2Lho8PskN5AraYHe3W1gR6E';
    // let cloud = 'dar5ymd2m';
    let hash_string = 'timestamp=' + timestamp + api_secret;
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/dar5ymd2m/upload';
    // let imageType = 'image/jpg' || 'image/jpeg' || 'image/png';

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      console.log(xhr);
    };
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        alert(xhr.responseText);
      }
    };
    let formdata = new FormData();
    formdata.append('file', {
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    });
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }

  render() {
    let that = this;
    const {password} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text> CreatePostScreen </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LogOut')}>
            <Text>Log out</Text>
          </TouchableOpacity>
          {/* <MarkdownEditor /> */}
          <View>
            <Button
              onPress={() => this.handleImagePicker()}
              title="Choose image"
            />
          </View>
        </View>

      {/**title */}
        <View>{this.displayForm(email, password)}</View>
      {/**end of title */}


        <View style={styles.nav}>
          <Button title="Save" onPress={that.save} />
        </View>
        <ScrollView style={styles.scroll}>
          <RichEditor
            ref={rf => (that.richText = rf)}
            initialContentHTML={initHTML}
            style={styles.rich}
          />
        </ScrollView>
        <KeyboardAvoidingView>
          <RichToolbar
            style={styles.richBar}
            getEditor={() => that.richText}
            iconTint={'#000033'}
            selectedIconTint={'#2095F2'}
            selectedButtonStyle={{backgroundColor: 'transparent'}}
            onPressAddImage={that.onPressAddImage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
});

export default WebViewComponent;



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
