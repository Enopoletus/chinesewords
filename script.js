window.addEventListener("load", readTextFile);
const thetext = [];
function readTextFile() {
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
    if (xmlhttp.status == 200) {thetext.push(xmlhttp.responseText); postweb()}
    else if (xmlhttp.status == 400) {console.log('There was an error 400');}
    else {console.log('something else other than 200 was returned');};
  };
};
  xmlhttp.open("GET", "chinesewords.txt", true);
  xmlhttp.send();
}
function postweb(){
  const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
  const randomline = lines[Math.floor(Math.random() * lines.length)];
  document.getElementById("characters").innerHTML = randomline
}
