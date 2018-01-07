# MyReads
App to track books I've read, am reading, or want to read. 

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

Overview the structure of the app.


