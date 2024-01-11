function detectDarkPatternOnPage() {
    // Implement your logic to detect dark patterns on the webpage here
  
    // For demonstration, simulate detection randomly
    const isDarkPatternDetected = Math.random() < 0.5;
  
    chrome.runtime.sendMessage({ action: 'display_result', detected: isDarkPatternDetected });
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'detect_dark_pattern') {
      detectDarkPatternOnPage();
    }
  });
  