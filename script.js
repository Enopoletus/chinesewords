window.addEventListener("load", readTextFile);
const thetext = [];
function readTextFile() {
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
  if (xmlhttp.status == 200) {thetext.push(xmlhttp.responseText); postload()}
    else if (xmlhttp.status == 400) {console.log('There was an error 400');}
    else {console.log('something else other than 200 was returned');};
  };
};
xmlhttp.open("GET", chinesewords.txt, true);
xmlhttp.send();
};
postload(){
  console.log(thetext);
}
