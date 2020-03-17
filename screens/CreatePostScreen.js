import React from 'react';
import {
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
import CustomHeader from './Utils/customHeader';

import ImagePicker from 'react-native-image-picker';
var CryptoJS = require('crypto-js');
import {Form, Field} from 'react-native-validate-form';
import {submitStory} from './Auth/Api';
import {connect} from 'react-redux';

import Reactotron from 'reactotron-react-native';

const initHTML =
  '<b/></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>';

const required = value => (value ? undefined : 'This is a required field.');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
    ? 'Please provide a valid email address.'
    : undefined;

class CreatePostScreen extends React.Component {
  initialState = {
    title: '',
    picUrl: '',
    UserId: this.props.loginData.id,
    fileName: 'Choose image for story',
    imageUploadStatus: false,
    focusStatus: false,
  };
  state = this.initialState;

  static getDerivedStateFromProps(props, state) {
    Reactotron.log('oppopop>>>>', state);
    if (!props.loginData.id) {
      // return props.navigation.navigate('Login');
    }
    return null;
  }

  onHome = () => {
    this.props.navigation.push('index');
  };

  handleImagePicker() {
    this.setState({focusStatus: false});
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      this.setState({fileName: response.fileName});
      this.uploadImage(response);
    });
  }

  handleFocus = () => {
    this.setState({
      focusStatus: !this.state.focusStatus,
    });
  };

  submitForm() {
    let submitResults = this.myForm.validate();

    let errors = [];

    submitResults.forEach(item => {
      errors.push({field: item.fieldName, error: item.error});
    });

    this.setState({errors: errors});
  }

  async submitSuccess() {
    let html = await this.richText.getContentHtml();
    const {title, picUrl, UserId} = this.state;
    const data = {
      title: title,
      feed: html,
      picUrl: picUrl,
      UserId: UserId,
    };
    submitStory(data);
    this.setState(this.initialState);
  }

  submitFailed() {
    console.log('Submit Faield!');
  }
  displayForm() {
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
            validations={[required]}
            name="title"
            value={this.state.title}
            onChangeText={val => this.setState({title: val})}
            customStyle={this.state.focusStatus ? styles.title : styles.title2}
            placeholder={'enter title'}
            maxLength={111}
          />
        </Form>
      </View>
    );
  }
  uploadImage(response) {
    if (response.didCancel) {
      return null;
    } else {
      this.setState({imageUploadStatus: true});
      let timestamp = ((Date.now() / 1000) | 0).toString();
      let api_key = '493371531433662';
      let api_secret = 'lkfb2Lho8PskN5AraYHe3W1gR6E';
      let hash_string = 'timestamp=' + timestamp + api_secret;
      let signature = CryptoJS.SHA1(hash_string).toString();
      let upload_url = 'https://api.cloudinary.com/v1_1/dar5ymd2m/upload';

      let xhr = new XMLHttpRequest();
      xhr.open('POST', upload_url);
      xhr.onload = () => {
        const data = JSON.parse(xhr._response);
        const pic = data.secure_url;
        this.setState({picUrl: pic, imageUploadStatus: false});
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
  }

  render() {
    let that = this;
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title={this.state.focusStatus ? 'Done' : 'create post'}
          navigation={this.props.navigation}
          handleFocus={this.handleFocus}
        />
        <View style={styles.containerBody}>
          <View style={styles.logOut}>
            <View style={styles.upperButtons}>
              <TouchableOpacity
                disabled={this.state.imageUploadStatus ? true : false}
                onPress={() => this.handleImagePicker()}>
                <View
                  style={
                    this.state.focusStatus ? styles.upload2 : styles.upload
                  }>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {this.state.fileName === undefined
                      ? 'Choose image for story'
                      : this.state.fileName}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.state.imageUploadStatus ? true : false}
                onPress={this.submitForm.bind(this)}>
                <View
                  style={this.state.focusStatus ? styles.save2 : styles.save}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    save
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>{this.displayForm()}</View>
          {/**end of title */}

          <ScrollView style={styles.scroll}>
            <RichEditor
              ref={rf => {
                return (that.richText = rf);
              }}
              initialContentHTML={initHTML}
              style={styles.rich}
              handleFocus={this.handleFocus}
            />
          </ScrollView>
          <KeyboardAvoidingView>
            <RichToolbar
              style={styles.richBar}
              getEditor={() => that.richText}
              iconTint={'#000033'}
              selectedButtonStyle={{backgroundColor: 'transparent'}}
            />
          </KeyboardAvoidingView>
          {/* </View> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  upload: {
    height: 30,
    borderWidth: 1,
    borderColor: 'red',
    marginRight: 90,
    borderRadius: 15,

    width: 150,
    borderWidth: 0.5,
    borderColor: '#0393B6',
    backgroundColor: '#00CDFF',
  },
  upload2: {
    display: 'none',
  },
  save: {
    width: 70,
    height: 30,
    borderWidth: 0.5,
    borderColor: '#0C8826',
    borderRadius: 15,
    backgroundColor: '#03B629',
  },
  save2: {
    display: 'none',
  },
  savetext: {textAlign: 'center', color: 'blue', backgroundColor: 'red'},
  title: {
    backgroundColor: 'red',
    display: 'none',
    marginBottom: 5,
  },
  title2: {
    backgroundColor: '#F5FCFF',
    marginBottom: 5,
    marginTop: 5,
  },
  upperButtons: {
    flexDirection: 'row',
  },
  uploadButtom: {
    marginVertical: 5,
  },
  logOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  rich: {
    minHeight: 320,
    flex: 1,
  },
  richBar: {
    height: 35,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  // title: {
  //   marginBottom: 5,
  // },
});

// export default CreatePostScreen;
function mapStateToProps(state) {
  return {
    loginData: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);

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
  maxLength,
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
        maxLength={maxLength ? maxLength : null}
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
