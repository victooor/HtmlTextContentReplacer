var locationUrl = location.href;
var urlregex;

chrome.storage.sync.get(
    ['replacementData']
    ,
    function(data) {
        if(data.replacementData != null && data.replacementData.urlToBeApplied != null) {
            var urlregex = new RegExp(escapeRegexSpecialChars(data.replacementData.urlToBeApplied), "g");
            if(locationUrl.match(urlregex) != null) {
                    var replacementDetails;
                    replacementDetails = data.replacementData.replacements;
                    replaceValuesInHtmlDocumentTextContent(document.body, replacementDetails);
                    
            }
        }
    }
);

function escapeRegexSpecialChars(textToEscape)
{
    return textToEscape.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function replaceValuesInHtmlDocumentTextContent(node, replacementDetails) {
 
    var nodeList = node.childNodes;

    for (var x = 0; x < nodeList.length; x++) {
        // text node, search directly
        if (nodeList[x].nodeType == 3) {
            Object.keys(replacementDetails).forEach((key) => {
                nodeList[x].textContent = nodeList[x].textContent.replace(new RegExp(replacementDetails[key].search, "gi"), replacementDetails[key].replace);
            });
        }
        else 
            replaceValuesInHtmlDocumentTextContent(nodeList[x], replacementDetails);
    }

}