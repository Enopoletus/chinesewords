window.addEventListener("load", readTextFile);
const done =[];
const thetext = [];
let numright = 0;
let numwrong = 0;
function readTextFile() {
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
    if (xmlhttp.status == 200) {thetext.push(xmlhttp.responseText); done.push(1)}
    else if (xmlhttp.status == 400) {console.log('There was an error 400')}
    else {console.log('something else other than 200 was returned');};
  };
};
  xmlhttp.open("GET", "chinesewords.txt", true);
  xmlhttp.send();
}
window.addEventListener("load", checkboxtest);
window.addEventListener("load", evlisttochecks);
function evlisttochecks(){
  for(let i of document.getElementsByTagName("input")){if(i.type == "radio" || i.type == "checkbox"){i.addEventListener("click", checkboxtest)}}
}
function checkboxtest(){
  for (let i of document.querySelectorAll("form")[0]){i.style.display = "inline";}
  for (let i of document.querySelectorAll("form")[1]){i.style.display = "inline";}
  if(document.getElementById("inputchars").checked){document.getElementById("outputchars").style.display = "none";};
  if(document.getElementById("outputchars").checked){document.getElementById("inputchars").style.display = "none";};
  if(document.getElementById("inputpinyin").checked){document.getElementById("outputpinyin").style.display = "none";};
  if(document.getElementById("outputpinyin").checked){document.getElementById("inputpinyin").style.display = "none";};
  if (done.length > 0){postweb()};
  }
function postweb(){
  document.getElementById("textbox").value = "";
  const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
  const randomline = lines[Math.floor(Math.random() * lines.length)];
  postweb2(document.getElementById("inputchars").checked==true, document.getElementById("outputchars").checked == false, document.getElementById("outputdefs").checked==true,
  randomline.split(";")[1],randomline.split("-")[1].split(";")[0);
  postweb2(document.getElementById("inputchars").checked==true, document.getElementById("outputpinyin").checked == false, document.getElementById("outputdefs").checked==true,
  randomline.split(";")[1],randomline.split(" ")[0]);
  console.log(randomline.split(";")[1]+"_"+randomline.split(" ")[0]);
}
function postweb2(x1,x2,x3,y1,y2){
  if(x1 && x2 && x3)
  {document.getElementById("characters").innerHTML = y1;
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13){postenter()};
     });
  };
}
function postenter(){
  postweb();
  numright = numright+1;
  document.getElementById("scoring").innerHTML = numright.toString()+" right/"+numwrong.toString()+" wrong "+(100*numright/(numright+numwrong)).toString() +"% right";
  console.log(numright);
}
function postwrong(){
  alert("wrong");
  numwrong = numwrong+1;
  document.getElementById("scoring").innerHTML = numright.toString()+" right/"+numwrong.toString()+" wrong "+(100*numright/(numright+numwrong)).toString() +"% right";
}
