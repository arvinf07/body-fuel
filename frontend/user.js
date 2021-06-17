class User {
  constructor(props){

  }

  static loginUser(){
    
  }

  static createUser(){
    const body = {user: {username, password, height, weight, gender}}
    console.log(body)
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }; 
    fetch(`http://127.0.0.1:3000/users`, configObject)
    .then(resp => resp.json())
    .then(userObj => User.new(userObj))
    .catch( error => console.log(error)) //can errors be sent through json
  }

}