import './App.css';
import CorrelationGraph from './components/CorrelationGraph';

function App() {
  const info = `{
    "nodes": [
      {
        "id": "/api/3/indicators/8914d9f6-bade-4f59-97d1-ac1b9049bb4c",
        "moduleType": "indicators",
        "group": "indicators",
        "title": "49424",
        "label": "49424",
        "color": "#6a9169"
      },
      {
        "id": "/api/3/indicators/aff51511-0537-4d8c-9702-e534578fbda0",
        "moduleType": "indicators",
        "group": "indicators",
        "title": "4444",
        "label": "4444",
        "color": "#6a9169"
      },
      {
        "id": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af72c7668f",
        "moduleType": "alerts",
        "group": "alerts",
        "title": "Metasploit Meterpreter Connection Attempt",
        "label": "Metasploit Meterpret...",
        "color": "#e31b1d"
      },
      {
        "id": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af789c7668f",
        "moduleType": "alerts",
        "group": "alerts",
        "title": "Metasploit Meterpreter Connection Attempt",
        "label": "Node_1",
        "color": "#e31b1d"
      },
      {
        "id": "/api/3/alerts/949d4fe7-adeb-4333-8fed-47af72c7668f",
        "moduleType": "alerts",
        "group": "alerts",
        "title": "Metasploit Meterpreter Connection Attempt",
        "label": "Node_2",
        "color": "#e31b1d"
      },
      {
        "id": "/api/3/alerts/949d4fe7-adeb-4383-8fed-47af72c7668f",
        "moduleType": "alerts",
        "group": "alerts",
        "title": "Metasploit Meterpreter Connection Attempt",
        "label": "Node_3",
        "color": "#e31b1d"
      },
      {
        "id": "/api/3/incidents/c279bf4c-e565-4544-87b4-9681490ab072",
        "size": 30,
        "title": "Metasploit Meterpreter Connection Attempt",
        "label": "Metasploit Meterpret...",
        "color": "#D2AC1A",
        "moduleType": "incidents",
        "group": "incidents",
        "adjacencies": []
      }
    ],
    "edges": [
      {
        "from": "/api/3/incidents/c279bf4c-e565-4544-87b4-9681490ab072",
        "to": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af72c7668f"
      },
      {
        "from": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af72c7668f",
        "to": "/api/3/indicators/8914d9f6-bade-4f59-97d1-ac1b9049bb4c"
      },
      {
        "from": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af72c7668f",
        "to": "/api/3/indicators/aff51511-0537-4d8c-9702-e534578fbda0"
      },
      {
        "from": "/api/3/incidents/c279bf4c-e565-4544-87b4-9681490ab072",
        "to": "/api/3/indicators/8914d9f6-bade-4f59-97d1-ac1b9049bb4c"
      },
      {
        "from": "/api/3/incidents/c279bf4c-e565-4544-87b4-9681490ab072",
        "to": "/api/3/indicators/aff51511-0537-4d8c-9702-e534578fbda0"
      },
      {
        "from": "/api/3/alerts/949d4fe7-adeb-4333-8fed-47af72c7668f",
        "to": "/api/3/indicators/aff51511-0537-4d8c-9702-e534578fbda0"
      },
      {
        "from": "/api/3/alerts/949d4fe7-adeb-4383-8fed-47af72c7668f",
        "to": "/api/3/incidents/c279bf4c-e565-4544-87b4-9681490ab072"
      },
      {
        "from": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af789c7668f",
        "to": "/api/3/alerts/949d4fe7-adeb-4333-8fed-43af72c7668f"
      }
    ]
  }`
  return (
    <div className="App" style={{ height: '100%', width: '100%' }}>
      <CorrelationGraph graphData={JSON.parse(info)} />
    </div>
  );
}

export default App;
