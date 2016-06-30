import React from 'react';
import ReactNative from 'react-native';
import Login from '../containers/login/Login';
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');
var MapView = require('react-native-maps');
var styles = require('./style');

var {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  Component,
  TextInput,
  Platform,
  ToolbarAndroid,
  Picker,
  ScrollView,
  ToastAndroid,
  AsyncStorage,
  DrawerLayoutAndroid,
  Modal,
  NativeModules: {
    ImagePickerManager
  }
} = ReactNative;
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 11.566171;
const LONGITUDE = 104.8763978;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
var id = 0
const ACCESS_TOKEN='';
const USER_PROFILE='';

class PropertyWidget extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      startPrice: '',
      endPrice: '',
      userDataResponse: '',
      animated: true,
      modalVisible: false,
      transparent: false,
      mapAnimated: true,
      mapModalVisible: false,
      mapTransparent: false,
      category: '',
      address: '',
      images: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      latitude: '',
      longitude: '',
      polygons: [],
      editing: null,
      initialPosition: 'unknown',
      mapType: 'standard'
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('auth_header', (err, result) => {
      console.log(result)
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        var jsonInitialPosition = JSON.parse(initialPosition);
        this.setState({
          region: {
            latitude: jsonInitialPosition.coords.latitude,
            longitude: jsonInitialPosition.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      }
    );
  }

  componentWillMount() {
    this.props.checkAuth()
  }

  componentWillReceiveProps(nextProps) {
    let { isAuthenticated } = nextProps.auth;
    let { navigator } = nextProps;

    if(!isAuthenticated) {
      navigator.replace({ name: 'Login', component: Login });
    }
  }

  _onChangeMapView(){
    if(this.state.mapType === 'standard'){
      this.setState({
        mapType: 'satellite'
      })
    }else{
      this.setState({
        mapType: 'standard'
      })
    }
  }

  finish() {
    var { polygons, editing } = this.state;
    this.setState({
      polygons: [editing],
      editing: null,
      mapModalVisible: false,
      mapTransparent: false,
      mapAnimated: false
    });
  }

  onPress(e) {
    var { editing } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
        },
      });
    } else {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    }
  }

  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      storageOptions: {
        skipBackup: true,
        path: 'disk',
        savePrivate: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          images: this.state.images.concat([source])
        });
      }
    });
  }

  _createProperty(){
    this.setState({
      transparent: true,
      animated: true,
      modalVisible: true
    });
  }

  openDrawer(){
    this.refs['DRAWER_REF'].openDrawer()
  }
  _onPressProfile(){
    this.refs['DRAWER_REF'].closeDrawer();
    ToastAndroid.show('Comming Soon!', ToastAndroid.LONG);
  }
  _onPressLogout(){
    this.refs['DRAWER_REF'].closeDrawer();
    this.props.signOut()
  }
  _onSubmitLocation(){
    this.setState({
      mapTransparent: false,
      mapAnimated: false,
      mapModalVisible: false
    });
  }
  _onSelectMap(){
    this.setState({
      mapTransparent: true,
      mapAnimated: true,
      mapModalVisible: true
    });
  }
  _setLoadingVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _setModalVisible(visible) {
    this.setState({mapModalVisible: visible})
  }

  render(){
    console.log(this.state.region)
    console.log('Poly :',this.state.polygons);
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#E43F3F',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {padding: 10}
      : null;
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 220, backgroundColor: '#D05939',justifyContent: 'center',alignItems: 'center'}} >
          <Image style={styles.profile_picture} source={require('../../assets/profile_pic.jpg')} />
          <Text style={{fontWeight: 'bold', padding: 2, color: '#fff'}}>
            
          </Text>
          <Text style={{color: '#fff'}}></Text>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5, marginTop: 12}}>
          <Icon name="android-person" style={{ marginLeft: 15, fontSize: 25}}/>
          <TouchableOpacity onPress={this._onPressProfile.bind(this)} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',borderBottomWidth: 1, borderBottomColor: '#dcdcdc'}}>
          <Icon name="log-out" style={{marginLeft: 15, fontSize: 25, color: 'red'}}/>
          <TouchableOpacity onPress={this._onPressLogout.bind(this)} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return(
    <DrawerLayoutAndroid
        ref='DRAWER_REF'
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
      <View style={{flex: 1, backgroundColor: '#E9EBEE'}}>
        <Icon.ToolbarAndroid
           title="Property Evaluation"
           navIconName="android-menu"
           titleColor="white"
           onIconClicked={this.openDrawer.bind(this)}
           style={styles.toolbar}
        />
        <ScrollView>

        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setLoadingVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle,{flexDirection: 'row'}]}>
              <Image source={require('../../assets/loading.gif')} />
              <Text style={{marginLeft: 15, fontFamily: 'serif', fontSize: 16,flex: 1}}>Data uploading ...</Text>
            </View>
          </View>
        </Modal>
          
        <Modal
        animated={this.state.mapAnimated}
        transparent={this.state.mapTransparent}
        visible={this.state.mapModalVisible}
        onRequestClose={() => {this._setModalVisible(false)}}
      >
          <MapView
          ref='MAP_VIEW'
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onPress.bind(this)}
          mapType={this.state.mapType}
          showsUserLocation={true}
        >
          {this.state.polygons.map(polygon => (
            <MapView.Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <MapView.Polygon
              coordinates={this.state.editing.coordinates}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>
        {this.state.editing && (
          <TouchableOpacity style={{borderRadius: 5,marginLeft: 80,alignItems: 'center',height: 40,marginTop: 10,backgroundColor: 'rgba(255,255,255,0.7)',width: 200,paddingHorizontal: 12,alignItems: 'center',marginHorizontal: 10,}} onPress={this.finish.bind(this)} underlayColor='#fff'>
            <Text style={{fontWeight: 'bold',fontSize: 16, marginTop: 10}}>Select this Location</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{position: 'absolute',bottom: 10,right: 10,borderRadius: 5,backgroundColor: 'rgba(255,255,255,0.7)'}} onPress={this._onChangeMapView.bind(this)} underlayColor='#fff'>
          <Text style={{fontWeight: 'bold',fontSize: 16, margin: 10}}>
            {
              this.state.mapType === 'standard' ? 'Satellite' : 'Map'
            }
          </Text>
        </TouchableOpacity>
        </Modal>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              Property name
            </Text>
            <TextInput
              style={styles.formInput}
              placeholder='Enter property name'
              placeholderTextColor='grey'
              onChangeText={(propertyName) => this.setState({propertyName})}
              value={this.state.propertyName} />

            <Text style={styles.formTitle}>
              Property Type
            </Text>
            <Picker
            style={styles.picker}
            selectedValue={this.state.category}
            onValueChange={(cate) => this.setState({category: cate})}>
              <Picker.Item label="Land" value="1" />
              <Picker.Item label="Land" value="2" />
              <Picker.Item label="Land" value="3" />
            </Picker>

            <Text style={styles.formTitle}>
              Choose province
            </Text>
            <Picker
            style={styles.picker}
            selectedValue={this.state.category}
            onValueChange={(cate) => this.setState({category: cate})}>
              <Picker.Item label="Phnom Penh" value="1" />
              <Picker.Item label="Sihanouk province" value="2" />
              <Picker.Item label="Sien Reap" value="3" />
            </Picker>
            <Text style={styles.formTitle}>Price</Text>
            <View style={{flexDirection: 'row', marginBottom: 10}} >
              <View style={{flexDirection: 'column',flex: 1}} >
                <TextInput
                  style={styles.formInput}
                  keyboardType = 'numeric'
                  placeholder='Enter Min price'
                  placeholderTextColor='grey'
                  onChangeText={(startPrice) => this.setState({startPrice})}
                  value={this.state.startPrice} />
              </View>
              <View style={{flexDirection: 'column', flex: 1}} >
                <TextInput
                  style={styles.formInput}
                  keyboardType='numeric'
                  placeholder='Enter Max price'
                  placeholderTextColor='grey'
                  onChangeText={(endPrice) => this.setState({endPrice})}
                  value={this.state.endPrice} />
              </View>
            </View>
            <View style={{borderBottomWidth: 2, borderBottomColor: '#fff',marginTop: 10,marginBottom: 10}}></View>
            <Text style={styles.formTitle}>Address</Text>
            <TextInput
              style={styles.formInput}
              placeholder='e.g: #123, st.45, ....'
              multiline={true}
              placeholderTextColor='grey'
              onChangeText={(address) => this.setState({address})}
              value={this.state.address} />

            <Button 
              onPress={this._onSelectMap.bind(this)}
              containerStyle={[styles.containerButton,{marginTop: 15}]}
              style={{fontSize: 16,fontFamily: 'serif',color: '#fff'}} >
              Select Property Location
            </Button>
            <View style={{flexDirection: 'row', marginBottom: 10}} >
              <View style={{flexDirection: 'column',flex: 1}} >
                <TextInput
                  style={styles.formInput}
                  placeholderTextColor='grey'
                  editable={false}
                  placeholder="latitude"
                  onChangeText={(latitude) => this.setState({latitude})}
                  value={this.state.latitude} />
              </View>
              <View style={{flexDirection: 'column', flex: 1}} >
                <TextInput
                  style={styles.formInput}
                  editable={false}
                  placeholder="longitude"
                  placeholderTextColor='grey'
                  onChangeText={(longitude) => this.setState({longitude})}
                  value={this.state.longitude} />
              </View>
            </View>
            <View style={{borderBottomWidth: 2, borderBottomColor: '#fff',marginTop: 10,marginBottom: 10}}></View>
            <Button 
              onPress={this.selectPhotoTapped.bind(this)}
              containerStyle={[styles.containerButton,{marginTop: 15}]}
              style={{fontSize: 16 ,fontFamily: 'serif',color: '#fff'}} >
              Select Property Photo
            </Button>

            <View style={{flexDirection: 'row',height: 80}} >
              { this.state.images.length <= 0 ? <Text></Text>:
                  this.state.images.map(function(imageselected,key){
                    return(
                      <View key={key} style={[styles.imageContainer, {marginBottom: 20,marginLeft: 10, marginRight: 10}]}>
                        <Image style={styles.image} source={imageselected} />
                      </View>
                    )
                  })
              }
            </View>

            <Button 
              onPress={this._createProperty.bind(this)}
              containerStyle={[styles.containerButtonSave,{marginTop: 15}]}
              style={{fontSize: 16, color: '#fff',fontFamily: 'serif'}} >
              CREAT PROPERTY
            </Button>

          </View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
    )
  }
}

module.exports = PropertyWidget;