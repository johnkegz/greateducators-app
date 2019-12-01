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
import {submitStory} from './Auth/Api';
import {connect} from 'react-redux';

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
  };
  state = this.initialState;

  static getDerivedStateFromProps(props, state) {
    if (state.UserId === undefined) {
      return props.navigation.navigate('LogOut');
    }
    return null;
  }

  onHome = () => {
    this.props.navigation.push('index');
  };

  handleImagePicker() {
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      this.setState({fileName: response.fileName});
      this.uploadImage(response);
    });
  }

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
            customStyle={{backgroundColor: '#F5FCFF'}}
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
        <View>
          <Text> Create a Story </Text>
        </View>
        <View style={styles.logOut}>
          <Button
            title="Log out"
            onPress={() => this.props.navigation.navigate('LogOut')}
          />
          <View style={styles.nav}>
            {/* <Button title="Save" onPress={that.save}  onPress={this.submitForm.bind(this)}/> */}
            <Button
              title="Save"
              onPress={this.submitForm.bind(this)}
              disabled={this.state.imageUploadStatus ? true : false}
            />
          </View>
        </View>
        {/* <MarkdownEditor /> */}
        <View style={styles.uploadButtom}>
          <Button
            onPress={() => this.handleImagePicker()}
            title={
              this.state.fileName === undefined
                ? 'Choose image for story'
                : this.state.fileName
            }
            disabled={this.state.imageUploadStatus ? true : false}
          />
        </View>
        {/* </View> */}

        {/**title */}
        <View style={styles.title}>{this.displayForm()}</View>
        {/**end of title */}

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
            // selectedIconTint={'#2095F2'}
            selectedButtonStyle={{backgroundColor: 'transparent'}}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nav: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginHorizontal: 5,
  },
  uploadButtom: {
    marginVertical: 5,
  },
  logOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: ,
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
  title: {
    marginBottom: 5,
  },
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostScreen);

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
