window.addEventListener("load", readTextFile);
const thetext = [];
function readTextFile() {
  const chinesewordstxt = new XMLHttpRequest();
  chinesewordstxt.open("GET", "chinesewords.txt", true);
  if (chinesewordstxt.readyState == XMLHttpRequest.DONE) {
  if (chinesewordstxt.status == 200) {thetext.push(chinesewordstxt.responseText); postload()}
    else if (chinesewordstxt.status == 400) {console.log('There was an error 400');}
    else {console.log('something else other than 200 was returned');};
  };
xmlhttp.open("GET", location.href, true);
xmlhttp.send();
};
function postload(){
  console.log(thetext);
}
