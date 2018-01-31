## Sprint 0: Getting Started

Now let's create the react app. We're going to be using the library `react-router-dom` for this, so we will need to install that as well.

```bash
$ create-react-app my-react-todo
$ cd my-react-todo
$ npm install react-router-dom
$ npm start
```

Now, if we navigate to [`localhost:3000`](http://localhost:3000) we will see the boilerplate create-react-app React application.

### First Step - Hello World

#### Get rid of things we won't use

Let's remove the following files from the `src` folder:

```bash
$ rm src/App.css
$ rm src/App.test.js
$ rm src/logo.svg
```

> you could also remove the favicon, just make sure you remove the reference to it from `index.html` as well

Then replace the return block inside `src/App.js` with a header of Hello World. The whole file should look like this:

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
```

> Hooray for automatic rerendering on save! If we just switch over to our browser we'll automatically see our updates.
