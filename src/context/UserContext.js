import React, { Component, createContext } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      this.setState({ user: userAuth});
      if(userAuth){
        localStorage.setItem('user',this.state.user.uid);
        
      }
       else{ localStorage.removeItem('user')
       localStorage.removeItem("health-status")
      }
    });
  };

  render(){

  return (
    <UserContext.Provider value={this.state.user}>{this.props.children}</UserContext.Provider>
  );
};
};

export default UserContext;
export { UserProvider };