var locationUrl = location.href;
var urlregex;
chrome.storage.sync.get(
    ['replacementData']
    ,
    function(data) {
        var urlregex = new RegExp(escapeRegexSpecialChars(data.replacementData.urlToBeApplied), "g");
        console.log("urlregex: " + urlregex)
        if(locationUrl.match(urlregex) != null) {
            var replacementDetails;
            
                replacementDetails = data.replacementData.replacements;

                Object.keys(replacementDetails).forEach((key) => {
                    console.log("search " +  key  + ", replace with " + replacementDetails[key])
                    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(key, "gi"), replacementDetails[key]);
                    /*var matches = document.querySelectorAll("*:not(html):not(head):not(script):not(meta):not(link)");
                    console.log(matches);
                    [].forEach.call(matches, function(elem) {
                    var text = ('innerText' in elem) ? 'innerText' : 'textContent';
                    //elem[text] = elem[text].replace(new RegExp(key, "gi"), replacementDetails[key]);
                    elem[text] = elem[text].replace("miloane", replacementDetails[key]);
                    });*/
                });
        }
        else console.log("url does not match")
    }
);

function escapeRegexSpecialChars(textToEscape)
{
    return textToEscape.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}