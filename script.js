window.addEventListener("load", readTextFile);
function readTextFile() {
  const chinesewordstxt = new XMLHttpRequest();
  chinesewordstxt.open("GET", "chinesewords.txt", true);
  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
  if (xmlhttp.status == 200) {console.log(chinesewordstxt)}
    else if (xmlhttp.status == 400) {console.log('There was an error 400');}
    else {console.log('something else other than 200 was returned');};
  };
};
