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
  for (i of document.querySelectorAll("form")[0]){i.style.display = "none";}
  for (i of document.querySelectorAll("form")[1]){i.style.display = "none";}
  if(document.getElementById("inputchars").checked){document.getElementById("outputchars").style.display=="block";};
  if(document.getElementById("outputchars").checked){document.getElementById("inputchars").style.display=="block";};
  if(document.getElementById("inputpinyin").checked){document.getElementById("outputpinyin").style.display=="block";};
  if(document.getElementById("outputpinyin").checked){document.getElementById("inputpinyin").style.display=="block";};
  }
function postweb(){
  const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
  const randomline = lines[Math.floor(Math.random() * lines.length)];
  document.getElementById("characters").innerHTML = randomline
}
