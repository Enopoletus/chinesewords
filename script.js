
    const done = [];
    const thetext = [];
    let numright = 0;
    let numwrong = 0;
    //REVISED BY "NICK" AT DATA SECRETS LOX
    let _answer = "";
    const weights =[];
    let theindex = 1;
    let intervalId = "";
    window.addEventListener("load", readTextFile);
    function readTextFile() {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) { thetext.push(xmlhttp.responseText); done.push(1); linecreate() }
                else if (xmlhttp.status == 400) { console.log('There was an error 400') }
                else { console.log('something else other than 200 was returned'); };
            };
        };
        //xmlhttp.open("GET", "chinesewords.txt", true);
        xmlhttp.open("GET", "https://raw.githubusercontent.com/Enopoletus/chinesewords/gh-pages/chinesewords.txt", true);
        xmlhttp.send();
        function linecreate(){
          const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
          for (i of lines){weights.push(1)};
        }
    }
    window.addEventListener("load", evListToChecks);
    function evListToChecks() {
        for (let i of document.getElementsByTagName("input")) { if (i.type == "radio" || i.type == "checkbox") { i.addEventListener("click", checkboxTest) } }
    }
    window.addEventListener("load", stoptimefunction);
    function stoptimefunction(){document.getElementById("stoptime").addEventListener("click", stoptimefunctiontwo)};
    function stoptimefunctiontwo(){clearInterval(intervalId);};
    window.addEventListener("load", checkboxTest);
    function checkboxTest() {
        for (let el of document.querySelectorAll("form")[0]) { el.style.display = "inline"; }
        for (let el of document.querySelectorAll("form")[1]) { el.style.display = "inline"; }
        //this needs wholesale revision
        if (document.getElementById("inputchars").checked) { document.getElementById("outputchars").style.display = "none"; };
        if (document.getElementById("outputchars").checked) { document.getElementById("inputchars").style.display = "none"; };
        if (document.getElementById("inputpinyin").checked) { document.getElementById("outputpinyin").style.display = "none"; };
        if (document.getElementById("outputpinyin").checked) { document.getElementById("inputpinyin").style.display = "none"; };
        if (done.length > 0) { postweb() };
    }
    function postweb() {
        clearInterval(intervalId);
        timer();
        document.getElementById("textbox").value = "";
        const lines = thetext[0].split(/\r?\n/).filter(word => word.length > 2);
        const total = weights.reduce(function(x,y){return x+y}, 0);
        const threshold = Math.random()*total;
        let sum = 0;
        function findindex() {for (let i=0; i<weights.length; i++) {
          sum += weights[i];
          if (sum > threshold) {
            return i;
          }
        }}
        theindex = findindex();
        const randomline = lines[theindex];
        const chars = randomline.split(" ")[0];
        const pinyin = randomline.split("-")[1].split(";")[0];
        const pinyinDefs = randomline.split("-")[1];
        const defs = randomline.split("; ")[1];
        postweb2(document.getElementById("outputchars").checked, document.getElementById("outputdefs").checked, 0 == 0,
            chars + defs, pinyin);
        postweb2(document.getElementById("outputchars").checked, document.getElementById("outputdefs").checked == false, 0 == 0,
            chars, pinyin);
        postweb2(document.getElementById("outputpinyin").checked, document.getElementById("outputdefs").checked == false, 0 == 0,
            pinyin, chars);
        postweb2(document.getElementById("outputpinyin").checked, document.getElementById("outputdefs").checked, 0 == 0,
            pinyinDefs, chars);
        postweb2(document.getElementById("inputpinyin").checked, document.getElementById("outputchars").checked == false, document.getElementById("outputdefs").checked,
            defs, pinyin);
        postweb2(document.getElementById("inputchars").checked, document.getElementById("outputpinyin").checked == false, document.getElementById("outputdefs").checked,
            defs, chars);
    }
    function timer(){
      let start = Date.now();
      intervalId = setInterval(function() {
        let delta = Date.now() - start; // milliseconds elapsed since start
        document.getElementById("timer").innerText = (delta / 1000).toFixed(3); // in seconds
      }, 1000); // update about every second
    }
    function postweb2(x1, x2, x3, y1, answer) {
        if (x1 && x2 && x3) {
            document.getElementById("characters").textContent = y1;
            _answer = answer;
        };
    }
    window.addEventListener("load", function(){document.getElementById("textbox").addEventListener("keyup", checkAnswer);});
    function checkAnswer(event) {
        if (event.keyCode === 13) {
            if (document.getElementById("textbox").value == _answer) { postenter();} 
            else { postwrong();};
            score();
        }
    }
    function postenter() {
        numright += 1;
        weights[theindex] = weights[theindex]/2; 
        weights[theindex] = weights[theindex]*(Number(document.getElementById("timer").innerText)/5);
        console.log(weights);
        postweb();
    }
    function postwrong() {
        numwrong += 1;
        weights[theindex] = weights[theindex]*4; 
        alert("wrong");
    }
    function score() {
        let percentScore = (100 * numright / (numright + numwrong)).toFixed(3);
        document.getElementById("scoring").textContent = `${numright} right/${numwrong} wrong ${percentScore}% right`;
    }

