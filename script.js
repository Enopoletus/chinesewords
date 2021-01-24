window.addEventListener("load", readTextFile);
const thetext = [];
function readTextFile() {
  const chinesewordstxt = new XMLHttpRequest();
  if (chinesewordstxt.readyState == XMLHttpRequest.DONE) {
  if (chinesewordstxt.status == 200) {thetext.push(chinesewordstxt.responseText); postload()}
    else {console.log('something else other than 200 was returned');};
  };
chinesewordstxt.open("GET", "chinesewords.txt", true);
chinesewordstxt.send();
console.log(thetext);
};
