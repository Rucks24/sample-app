# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Make sure to install all packages. You can install the package with `npm` or `yarn`:

```sh
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Components available

### CorrelationGraph

This component is responsible for generating correlation graphs when provided with valid JSON data.
The attribute `graphData` accepts a valid JSON object. Make sure that this JSON object has keys `nodes` and `edges` with an array of objects as values. The each object inside this array represents each node/edge.

```js
<CorrelationGraph graphData={nodes:[], edges:[]} />
```

### ContextMenu

This component provides custom context menu, when user right-clicks on any node. It will be called from `CorrelationGraph` component. 
The component requires following attributes -
* `x, y`: x, y coordinate of canvas, where user has right-clicked. These attributes collectively provides the location of the context menu to get open.
* `isOpen`: `boolean` value to notify whether to keep open or close the menu.
* `handleClose`: is a method called to close the menu, when user clicks away on the canvas.
* `deleNode`: method called to delete the selected node.
* `detacNode`: method called to detach the selected node.
* `handleListKeyDown`: method called to handle navigation through options, with the help of keyboard.

```js
<CorrelationGraph 
    x={canvas.x} 
    y={canvas.y} 
    isOpen={showPopUp} 
    handleClose={handleClose}
    deleteNode={deleteNode}
    detachNode={detachNode}
    handleListKeyDown={handleListKeyDown}
/>
```

## Operation that can be performed on Graph

### Delete Node

User can delete a Node from the graph.
Steps:
* Right click on the Node.
* Click/select `Delete Node` option from context menu.

### Detach Node

User can detach a Node from the graph.
Steps:
* Right click on the Node.
* Click/select `Detach Node` option from context menu.

### Create Node

User can Creat a Node from the graph.
Steps:
* Double click on anywhere on the canvas. This creates a new detached node.

### Download Graph

User can dowload the graph displayed on the screen in local machine.
Steps:
* Go to `Save` option on App Bar displayed at top of the window.
* Select `Download Graph` option.

### Save current version of Graph

User can save current version of the graph displayed on screen.
Steps:
* Go to `Save` option on App Bar displayed at top of the window.
* Select `Save Version` option.

### Switch to specific version of Graph

User can switch or load specific saved version of the graph.
Steps:
* Go to `Select Version` option on App Bar displayed at top of the window.
* Select the version we needed from dropdown.

## Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
