class User {
  constructor(props){
    console.log(props)
  }

  createUser(){
    const body = {user: {username: this.username, password: this.password, height: this.height, weight: this.weight, age: this.gender}}
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