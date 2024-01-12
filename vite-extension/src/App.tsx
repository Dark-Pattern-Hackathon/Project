function App() {

  const handleRedirect = () => {
    const targetUrl = 'http://localhost:3000/form'; // Replace with your desired URL
    chrome.tabs.update({ url: targetUrl });
  };

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

        console.log(textToCopy)

        const apiUrl = 'http://localhost:8000/api/data/detect';
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
            console.log(responseData["Res"])




          } else {
            alert('Error sending text to the server.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Catch');
        }
      }
    });

  }

  return (
    <div className='flex flex-col items-center w-[300px] bg-gray-800 h-[200px] border-[#989494] border-[2px]'>

      <div className="flex justify-between mt-5 pb-2 border-b-[0.5px] border-[#b1adad] w-full">

      <button type="button" onClick={handleRedirect} className="w-[130px] ml-7 h-[35px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Dark Pattern</button>
      <button type="button" className=" w-[80px] mr-4 h-[35px] text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Feedback</button>

      </div>
      <div className="mt-9 mb-3">
        <button onClick={handleClick} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Check for Dark Patterns
        </span>
        </button>
      </div>
    </div>
  )
}

export default App
