window.addEventListener("load", readTextFile);
const thetext = [];
function readTextFile() {
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
    if (xmlhttp.status == 200) {thetext.push(xmlhttp.responseText)}
    else if (xmlhttp.status == 400) {console.log('There was an error 400'); postweb()}
    else {console.log('something else other than 200 was returned');};
  };
};
  xmlhttp.open("GET", "chinesewords.txt", true);
  xmlhttp.send();
}
window.addEventListener("click", checkboxtest);
window.addEventListener("keyup", checkboxtest);
function checkboxtest(){
  if(document.getElementById("inputchars").checked){(document.getElementById("outputchars").remove()};
  if(document.getElementById("outputchars").checked){(document.getElementById("inputchars").remove()};
  if(document.getElementById("inputpinyin").checked){(document.getElementById("outputpinyin").remove()};
  if(document.getElementById("outputpinyin").checked){(document.getElementById("inputpinyin").remove()};
  }
function postweb(){
  const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
  const randomline = lines[Math.floor(Math.random() * lines.length)];
  document.getElementById("characters").innerHTML = randomline
}
