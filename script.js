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
  const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
  const randomline = lines[Math.floor(Math.random() * lines.length)];
  if(document.getElementById("outputchars").checked && document.getElementById("outputdefs").checked)
  {document.getElementById("characters").innerHTML = randomline.split(" ")[0]+randomline.split(";")[1];
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
      if(document.getElementById("textbox").value == randomline.split("-")[1].split(";")[0]){postenter()}
      else{postwrong()};
     }
   });
  };
  if(document.getElementById("outputchars").checked && document.getElementById("outputdefs").checked == false)
  {document.getElementById("characters").innerHTML = randomline.split(" ")[0];
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
      if(document.getElementById("textbox").value == randomline.split("-")[1].split(";")[0]){postenter()}
      else{postwrong()};
     }
   });
  };
  if(document.getElementById("outputpinyin").checked && document.getElementById("outputdefs").checked == false)
  {document.getElementById("characters").innerHTML = randomline.split("-")[1].split(" ")[0];
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
       if(document.getElementById("textbox").value == randomline.split(" ")[0]){postenter()}
       else{postwrong()};
     }
   });
  };
  if(document.getElementById("outputpinyin").checked && document.getElementById("outputdefs").checked)
  {document.getElementById("characters").innerHTML = randomline.split("-")[1];
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
       if(document.getElementById("textbox").value == randomline.split(" ")[0]){postenter()}
       else{postwrong()};
     }
   });
  };
  if(document.getElementById("inputpinyin").checked && document.getElementById("outputchars").checked == false && document.getElementById("outputdefs").checked)
  {document.getElementById("characters").innerHTML = randomline.split(";")[1];
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
       if(document.getElementById("textbox").value == randomline.split("-")[1].split(";")[0]){postenter()}
       else{postwrong(); console.log(randomline.split("-")[1].split(";")[0])};
     }
   });
  };
  if(document.getElementById("inputchars").checked && document.getElementById("outputpinyin").checked == false && document.getElementById("outputdefs").checked)
  {document.getElementById("characters").innerHTML = randomline.split(";")[1];
   document.getElementById("textbox").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
       if(document.getElementById("textbox").value == randomline.split(" ")[0]){postenter()}
       else{postwrong(); console.log(randomline.split(" ")[0])};
     }
   });
  };
}
function postenter(){
  postweb();
  document.getElementById("textbox").value = "";
  numright = numright+1;
  console.log(numright/(numright+numwrong));
}
function postwrong(){
  document.getElementById("textbox").value = "";
  numwrong = numwrong+1;
  console.log(numright/(numright+numwrong));
}
