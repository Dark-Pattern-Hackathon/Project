function detectDarkPattern() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'detect_dark_pattern' });
    });
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'display_result') {
      const detectionResultElement = document.getElementById('detectionResult');
      if (request.detected) {
        detectionResultElement.textContent = 'Dark pattern detected';
        detectionResultElement.style.color = 'red';
      } else {
        detectionResultElement.textContent = 'Dark pattern not detected';
        detectionResultElement.style.color = 'green';
      }
    }
  });
  