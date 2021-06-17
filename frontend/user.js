class User {
  constructor(props){

  }

  static loginUser(){
    console.log('hit')
  }

  static createUser(event){
    event.preventDefault()
    let {username, password, height, weight, gender} = getFormData(event)
    const body = {user: {username, password, height, weight, gender}}
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }; 
    // fetch(`http://127.0.0.1:3000/users`, configObject)
    // .then(resp => resp.json())
    // .then(userObj => User.new(userObj))
    // .catch( error => console.log(error)) //can errors be sent through json
  }

}