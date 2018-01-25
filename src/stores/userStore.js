import { observable, action, computed } from "mobx";
let testUsers=[
  {
    id:0,
    name:'Tommi',
    password:'Tommi',
    logged: false,
  },
  {
    id:1,
    name:'Rommi',
    password:'Rommi',
    logged: false,
  }
];
class UserStore{
  @observable users = testUsers;
  @observable user = testUser[0];
  @action
  setUser = (user) =>{
    this.user = note
  }
}
const userStore = new UserStore();
//the store
export default userStore;
//the class
export { UserStore };
