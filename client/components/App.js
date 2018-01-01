import React from "react";
import NavigationBar from "./NavigationBar";
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
