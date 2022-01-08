// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.command == "get") {
//         fetch(request.url)
//             .then(response => response.text())
//             .then(response => sendResponse(response))
//             .catch(e => sendResponse("Error: " + e))
//         return true;
//     }
// });