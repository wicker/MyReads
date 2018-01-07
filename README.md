# MyReads

This React app tracks books I've read, am reading, or want to read. It was created using [Create React App](https://github.com/facebookincubator/create-react-app) and uses files from Udacity's [reactnd-project-myreads-starter](https://github.com/udacity/reactnd-project-myreads-starter). It was the first project for the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).

# Usage

Clone the repository.

```
git clone https://github.com/wicker/MyReads.git
```

Install project dependencies and start the dev server.

```
npm install
npm start
```

# Log

Created environment, grabbed newest node v9.3.0, set up local node. 

```
mkvirtualenv myreads
mkdir MyReads && cd MyReads
curl http://nodejs.org/dist/node-latest.tar.gz | tar xvz
cd node-v*
./configure --prefix=$VIRTUAL_ENV
make install
```

Get Webpack and everything else we need with

```
npm install -g create-react-app
```

Create the React MyReads app.

```
create-react-app myreads
```

Start the development server.

``` 
npm start
```

Set up and start the backend server. 

Overview the structure of the app.



