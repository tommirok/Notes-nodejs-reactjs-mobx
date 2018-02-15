import { observable, action, computed } from "mobx";
const axios = require("axios");
let testUsers = [
  {
    id: 0,
    name: "Tommi",
    password: "Tommi",
    logged: false
  },
  {
    id: 1,
    name: "Rommi",
    password: "Rommi",
    logged: false
  }
];
class UserStore {
  @observable temp;
  @observable reset;
  @observable success = false;
  @observable username = "";
  @observable password = "";
  @observable logusername = "";
  @observable logpassword = "";
  @observable logged = false;
  @observable passwordconf = "";

  @action
  setUser = event => {
    this.logusername = event.target.value;
    this.username = event.target.value;
  };
  @action
  setPass = event => {
    this.logpassword = event.target.value;
    this.password = event.target.value;
  };
  @action
  setPassConf = event => {

    this.passwordconf = event.target.value;
  };
  @action
  isLogged = () =>{
    axios
    .get("http://localhost:3001/api/logged")
    .then(res =>{
      console.log(res);
      this.logged = true;
    })
    .catch(err =>{
      this.logged = false;
    })
  }
  @action
  regUser = event => {
      this.temp = "";

    var user = {
      username: this.username,
      password: this.password,
      passwordConf: this.passwordconf
    }
    if(this.logpassword!="" && this.logusername != ""){
      user.logusername = this.logusername;
      user.logpassword = this.logusername;
    }
      //request
      axios
        .post("http://localhost:3001/api/user", user)
        .then(res => {
          console.log("OK hyvä");
          this.success = true;
          this.temp = this.reset;
          console.log(res)
          this.username = "";
          this.password = "";
          this.logpassword="";
          this.logusername="";
          this.passwordConf="";
        })
        .catch(err => {
          this.success = false;
          console.log(`ei mee läpi: ${err}`);
        });


  };

}
const userStore = new UserStore();
//the store
export default userStore;
//the class
export { UserStore };
