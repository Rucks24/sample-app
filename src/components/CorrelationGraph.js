
import Graph from "react-graph-vis";
import React, { useEffect, useState, useRef } from "react";
import ContextMenu from "./ContextMenu";
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import TabField from "./TabField";
// import { getData, updateData } from "../APIs/Actions";

// Object provided to <Graph /> for providing instructions about visual representation of graph.
const options = {
	layout: {
		hierarchical: false
	},
	edges: {
		// length: 300,
		color: "white",
		// width: 2,
		arrows: {to: {
			type: "bar"
		},
		from: {
			type: "bar"
		}}
	},
	nodes: {
			shape: "circle"
	},
	physics: {
		hierarchicalRepulsion: {
			springConstant: 0,
			springLength: 600
		},
		repulsion: {
			springConstant: 0,
			springLength: 600
		}
	}
};
  
function randomColor() {
	const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
	const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
	const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
	return `#${red}${green}${blue}`;
}

const CorrelationGraph = ({graphData}) => {

	// saves selected Nodes DOM location
  	const [dom, setDom] = useState(null);

	// saves the canvas coordinates where user has initiated right-click event
	const [canvas, setCanvas] = useState(null);

	// passed to <Graph /> component when a new nodes is created. Setting this key enables graph to reload.
	const [key, setKey] = useState(uuidv4().toString());

	const anchorRef = useRef(null);
	const [showPopUp, setShowPopUp] = useState(false);

	const [graphs, setGraphs] = useState([
		{
			name: 'version 1',
			graph: graphData
		}
	]);

	// The state gives every requires information for the graph.
	const [state, setState] = useState({
		graph: graphData, // containes information about the nodes and edges
		events: {
			select: (event) => {
				setDom(null);
				setShowPopUp(false);
			},
			doubleClick: ({ pointer: { canvas } }) => {
				// double click creates a new node.
				createNode(canvas.x, canvas.y);
			},
			oncontext: (event) => {
				event.event.preventDefault();
				setDom(event.pointer.DOM); // setSelected Node's Location
				setCanvas({
					x: `${event.event.pageX}px`,
					y: `${event.event.pageY}px`
				});
				setShowPopUp(true);
			}
		},
		network: null
	});

	// For creating node at the canvas location, where doubleClick event has been initiated
	const createNode = (x, y) => {
		const color = randomColor();
		setState(({ graph: { nodes, edges }, ...rest }) => {
			const id = uuidv4().toString();
			setKey(id);
			return {
				graph: {
					nodes: [
						...nodes,
						{ id, label: `newNode`, color, x, y, size: 5 }
					],
					edges: [
						...edges
					]
				},
				...rest
			}
		});
	}

	// To delete a selected Node
	const deleteNode = () => {
		const selectedNodeId = network.getNodeAt(dom);
		const newState = {...state};
		let newNodes = newState.graph.nodes;
		let newEdges = newState.graph.edges;
		newNodes = newNodes.filter((node) => {
			return node.id !== selectedNodeId;
		});
		newEdges = newEdges.filter((edge) => {
			return edge.to !== selectedNodeId && edge.from !== selectedNodeId;
		});
		setState(({ graph, ...rest }) => {
			return {
				graph: {
					nodes: newNodes,
					edges: newEdges
				},
				...rest
			}
		});
		setShowPopUp(false);
	}

	// To detach a selected Node (i.e. Remove all connections originated from this node)
	const detachNode = () => {
		const selectedNodeId = network.getNodeAt(dom);
		const newState = {...state};
		let newEdges = newState.graph.edges;
		newEdges = newEdges.map((edge) => {
			let newEdge = {
				...edge
			}
			if( edge.to === selectedNodeId || edge.from === selectedNodeId) {
				newEdge.dashes = true;
			}
			return newEdge;
		});
		console.log(newEdges);

		setState(({ graph: {nodes}, ...rest }) => {
			return {
				graph: {
					nodes: [
						...nodes
					],
					edges: newEdges
				},
				...rest
			}
		});
		setShowPopUp(false);
		console.log('inside detach node end');
	}

	

	// will be called when user selects a existing version of graph from list
	// it will display that version of graph
	const loadVersionOfGraph = (versionName) => {
		const newState = {...state};
		console.log('Version Name = ', versionName)
		const version = graphs.find((obj) => obj.name === versionName);
		console.log('Selected version = ', version);
		newState.graph = version.graph;
		setState(newState);

		const id = uuidv4().toString();
		setKey(id);
	}

	// save current changed graph to list of versions i.e. save the json data of graph
	const saveCurrentVersionOfGraph = () => {
		const newGrpahs = [...graphs];
		const newData = {
			name: `version ${graphs.length+1}`,
			graph: state.graph
		}
		console.log('Saving the new version == ', newData);
		newGrpahs.push(newData);
		setGraphs(newGrpahs);
		console.log('NewGraphs == ', newGrpahs);
	}

	// close context menu when user clicks on an empty canvas space
  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setShowPopUp(false);
  };

	// navigate through context menu with keyboard
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setShowPopUp(false);
    } else if (event.key === 'Escape') {
      setShowPopUp(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(showPopUp);
  useEffect(() => {
    if (prevOpen.current === true && showPopUp === false) {
      anchorRef.current && anchorRef.current.focus();
    }

    prevOpen.current = showPopUp;
  }, [showPopUp]);
    
  const { graph, events, network } = state;
  const downloadGraph = async (e) => {
	console.log('Downloading Image...');
	let screenImage = document.getElementById('canvasImg');
	const canvas = await html2canvas(screenImage);
	const image = canvas.toDataURL("image/png", 1.0);
	const fakeLink = window.document.createElement("a");
	fakeLink.style = "display:none;";
	fakeLink.download = 'downloadedImageGraph';

	fakeLink.href = image;

	document.body.appendChild(fakeLink);
	fakeLink.click();
	document.body.removeChild(fakeLink);

	fakeLink.remove();

	// network.once("afterDrawing", function(ctx) {
	// 	var dataURL = ctx.canvas.toDataURL("image/png", 1.0);
	// 	// window.location.href = dataURL;
	// 	console.log('Downloading graph...');
	// 	// document.getElementById('canvasImg').href = dataURL;

	// 	const fakeLink = window.document.createElement("a");
	// 	fakeLink.style = "display:none;";
	// 	fakeLink.download = 'downloadedImageGraph';

	// 	fakeLink.href = dataURL;

	// 	document.body.appendChild(fakeLink);
	// 	fakeLink.click();
	// 	document.body.removeChild(fakeLink);

	// 	fakeLink.remove();
	// });
  }

	return (
		<div style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
			<TabField
				saveCurrentVersionOfGraph={saveCurrentVersionOfGraph}
				downloadGraph={downloadGraph}
				loadVersionOfGraph={loadVersionOfGraph}
				graphs={graphs}
			/>
			<div style={{ height: '100%', width: '100%', backgroundColor: 'black' }} id="canvasImg">
				<Graph 
					key={key}
					graph={graph} 
					options={options} 
					events={events} 
					getNetwork={(nt) => {
						setState({...state, network: nt});
					}}
					style={{ height: '100vh' }}
				/>
			</div>
			{showPopUp ? 
				<ContextMenu 
					x={canvas.x} 
					y={canvas.y} 
					isOpen={showPopUp} 
					handleClose={handleClose}
					deleteNode={deleteNode}
					detachNode={detachNode}
					handleListKeyDown={handleListKeyDown}
				/> : null
			}
		</div>
	);
}

export default CorrelationGraph;