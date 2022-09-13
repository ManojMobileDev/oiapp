import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  splashcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems:'center',
    justifyContent:'center'
  },
  absoluteContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: "rgba(0,0,0,0.1)",
    padding:15,
    justifyContent:'space-between',
    position:'absolute'
  },
  title: {
    color: "#20232a",
    textAlign: "center",
    fontSize: 27,
    fontFamily:'Poppins-Medium',
    // width:windowWidth-100,
  },
  point: {
    color: "#20232a",
    textAlign: "center",
    fontSize: 15,
    fontFamily:'Poppins-Medium',
    marginLeft:10
  },
  question: {
    color: "#20232a",
    textAlign: "left",
    fontSize: 17,
    fontFamily:'Poppins-Medium',
  },
  center: {
    width:windowWidth-30,
    marginVertical:20,
    alignItems:'center'
  },
  
  minititle: {
    color: "#000",
    fontSize: 18,
    fontWeight:'bold',
    fontFamily:'Poppins-Medium',
  },
  subtitle: {
    color: "#686464",
    textAlign: "center",
    fontSize: 15,
    fontFamily:'Poppins-Regular',
    paddingHorizontal:10
  },
  button:{
    backgroundColor:'rgba(0, 0, 0, 0.9)',
    borderRadius:5,
    width:windowWidth/1.5,
    alignSelf:'center',
    paddingHorizontal:10,
    paddingVertical:7, 
    zIndex:1,
    elevation:1 ,
    marginBottom:10,
    marginTop:15  
  },
  buttonText:{
    fontFamily:'Poppins-Regular',
    color:'#fff',
    fontSize:17
  },
  buttonView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'  
  },
  questionView:{
    alignItems:'baseline',
    justifyContent:'flex-start',
    paddingVertical:10 
  },
  menubar:{
    position:'absolute',
    top:0,
    left:0,
    padding:15,
    flexDirection:'row',
    alignItems:'center',
    width:windowWidth,
    justifyContent:'space-between',
    zIndex:1
  },
  circle:{
    backgroundColor:'#ED9939',
    width:windowWidth/3,
    height:windowWidth/3,
    alignSelf:'center',
    borderWidth:windowWidth/40,
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#F9D297'
  },
  circleOut:{
    backgroundColor:'#FDEED7',
    width:windowWidth/2.7,
    height:windowWidth/2.7,
    alignSelf:'center',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    // marginVertical:50
  },
  languages:{
    marginVertical:20,
    marginHorizontal:30
  },
  languagesInner:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:15
  },
  languagesInner2:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  languagesText:{
    fontFamily:'Poppins-Regular',
    fontSize:17,
    paddingLeft:10
  },
  hr:{
    backgroundColor:'gray',
    height:0.7,
    width:windowWidth-60,
    alignSelf:'center'
  },
  inputView: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'gray',
    borderRadius:7,
    alignItems:'center',
    flexDirection:'row',
    zIndex:5,
    marginBottom:0
  },
  input: {
    height: 40,
    paddingLeft:10,
    fontSize:17,
    width:windowWidth-100,
    // backgroundColor:'red'
    // fontFamily:'Poppins-Regular',
  },
  drawerTopView: {
    // height: 100,
    padding: 15,
    alignItems:'center',
    flexDirection:'row',
    zIndex:5,
    marginBottom:0,
    // paddingBottom:15,
    paddingTop:25
  },
  drawerLinearView: {
    height: windowHeight-25,
    flex:1
  },
  codeinput: {
    height: 40,
    width:40,
    borderRadius:5,
    borderWidth:1,
    borderColor:'gray',
    margin:5,
    fontSize:22,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    textAlignVertical:'center'
  },
  phoneCountry: {
    height: 40,
    alignItems:'center',
    flexDirection:'row'
  },
  answerView:{
    width:windowWidth-30,
    marginVertical:10
  },
  linearGradiant:{
    padding:15,
    borderRadius:10
  },
  row:{
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-between',
    // width:windowWidth-50
  },
  terms:{
    fontFamily:'Poppins-Regular',
    fontSize:13,
    paddingLeft:5
  },
  underlineStyleBase: {
    width: 40,
    height: 40,
    borderWidth: 1,
    marginHorizontal:5,
    borderRadius:5,
    fontSize:19,
    color:'black'
  },
  underlineStyleBase2: {
    width: 40,
    height: 40,
    borderWidth: 1,
    marginHorizontal:5,
    borderRadius:5,
    fontSize:19,
    color:'black',
    borderColor:'red'
  },

  underlineStyleHighLighted: {
    borderColor: "#ED9939",
  },
  underlineStyleHighLighted2: {
    borderColor: "red",
  },
  countryCode:{
    
    fontFamily:'Poppins-Regular',
    fontSize:16,
    paddingLeft:5
  },
  panelView:{
    alignItems:'center',
    padding:15
  },
  panelLoadingView:{
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:0,
    right:0,
    width:windowWidth,
    height:'120%',
    backgroundColor:'rgba(255,255,255,0.7)',
    alignSelf:'center',
    zIndex:5
  },
  photoButton:{
    width:windowWidth/3,
    height:windowHeight/4,
    borderWidth:2,
    marginHorizontal:2.5,
    marginTop:10,
    justifyContent:'center',
    borderRadius:5,
    borderColor:"#ED9939"
  },
  linearGradiantFlex:{
    padding:15,
    height:windowHeight,
    alignItems:'center',
    justifyContent:'center'
  },
  chooser:{
    position:'absolute',
    top:0,
    left:0,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%',
    borderRadius:2.5,
    zIndex:3
  },
  camera:{
    width:(windowWidth/3)/3,
    height:(windowWidth/3)/3,
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:50,
    margin:5,
    alignItems:'center',
    justifyContent:'center'
  },
  menu:{
    backgroundColor:'white',
    borderRadius:50,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    borderRadius:2.5,
    zIndex:1
  },  
  username: {
    fontSize:16,
    // fontWeight:'bold',
    fontFamily:'Poppins-Medium',
    color:'black',
    width:windowWidth/1.8
  },
  drawerItem: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding:5,
    paddingHorizontal:15
  },
  drawerText: {
    fontSize:16,
    // fontWeight:'bold',
    fontFamily:'Poppins-Regular',
    color:'black',
    width:windowWidth/1.8,
    paddingLeft:10
  },
  quickmenu:{
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row'
  },
  menuitem:{
    width:(windowWidth-60)/3,
    margin:5,
    // backgroundColor:'red',
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  headermenu:{
    backgroundColor:'white',
    borderRadius:50,
    padding:10,
    alignItems:'center',
    justifyContent:'center'
  },
  innercontainer:{
    marginTop:80
  }
});

export default styles;