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

                   
                    

                    Object.keys(replacementDetails).forEach((key) => {
                        console.log("search " +  replacementDetails[key].search  + ", replace with " + replacementDetails[key].replace)
                        replaceValuesInHtmlDocumentTextContent(document.body, replacementDetails[key].search, replacementDetails[key].replace);
                        //document.body.innerHTML = document.body.innerHTML.replace(new RegExp(replacementDetails[key].search, "gi"), replacementDetails[key].replace);
                        /*var matches = document.querySelectorAll("*:not(html):not(head):not(script):not(meta):not(link)");
                        console.log(matches);
                        [].forEach.call(matches, function(elem) {
                        var text = ('innerText' in elem) ? 'innerText' : 'textContent';
                        //elem[text] = elem[text].replace(new RegExp(key, "gi"), replacementDetails[key]);
                        elem[text] = elem[text].replace("miloane", replacementDetails[key]);
                        });*/
                    });
            }
        }
    }
);

function escapeRegexSpecialChars(textToEscape)
{
    return textToEscape.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function replaceValuesInHtmlDocumentTextContent(node, search, replace) {
 
    var nodeList = node.childNodes;

    for (var x = 0; x < nodeList.length; x++) {
        // text node, search directly
        if (nodeList[x].nodeType == 3) 
            nodeList[x].textContent = nodeList[x].textContent.replace(new RegExp(search, "gi"), replace);
        else 
            replaceValuesInHtmlDocument(nodeList[x], search, replace);
    }

}