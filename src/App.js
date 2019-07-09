import React from "react";
import "./App.css";
import axios from "axios";

const testData = [
  {
    name: "Rishi Abee",
    avatar_url: "https://avatars1.githubusercontent.com/u/42680217?v=4",
    company: "",
    location: "Mauritius",
    hireable: false
  }
];

class Form extends React.Component {
  state = {
    userName: ""
  };
  submitFormHandler = async event => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );

    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <input
          type="text"
          placeholder="GitHub username"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required
        />
        <button>Add profile</button>
        <span>{this.state.userName.length} chars</span>
      </form>
    );
  }
}
//Hello
const CardList = props => {
  return props.profiles.map(profile => <Card key={profile.name} {...profile} />);
};

class Card extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.hireable ? "github-profile hireable" : "github-profile"
        }
      >
        <img src={this.props.avatar_url} alt="Avatar" />
        <div className="info">
          <div className="name">{this.props.name}</div>
          <div className="company">{this.props.company}</div>
          <div className="location">{this.props.location}</div>
          <div hidden={!this.props.hireable}>Available for hire! </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: testData
  };

  addNewProfiles = profileData => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfiles} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
