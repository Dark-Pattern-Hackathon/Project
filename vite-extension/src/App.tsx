import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const handleClick= async()=>{
    let [tab]=await chrome.tabs.query({active:true});
    chrome.scripting.executeScript({
      target:{tabId:tab.id!},
      func:async ()=>{
        const textToCopy = document.body.innerText;

        const dummyTextArea = document.createElement('textarea');
        dummyTextArea.value = textToCopy;

        document.body.appendChild(dummyTextArea);
        dummyTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(dummyTextArea);

        alert('Text copied: ' + textToCopy);

        const apiUrl = 'https://your-server-api-endpoint.com';
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textToCopy }),
          });

          if (response.ok) {
            const responseData = await response.json();
            alert('Server Response:\n' + JSON.stringify(responseData, null, 2));
          } else {
            alert('Error sending text to the server.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error sending text to the server.');
        }
      }
    });

  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
        Click
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
