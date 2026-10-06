// Offline Data - No Copyright
const docs=[
 {t:"ISRO", d:"ISRO भारत की अंतरिक्ष एजेंसी है, चंद्रयान और मंगलयान इसका गर्व है।"},
 {t:"Bharat Search", d:"यह 100% Free और Open Source सर्च इंजन है।"},
 {t:"AI", d:"यह Free AI Offline काम करता है, कोई API Key नहीं लगती।"},
 {t:"YouTube", d:"YouTube Video Platform है।"},
 {t:"Privacy", d:"हम Data नहीं चुराते, सब Local रहता है।"}
];

function doSearch(){
 let q=document.getElementById("mainSearch").value.toLowerCase();
 let out=document.getElementById("results");
 if(!q){out.innerHTML="कुछ लिखो...";return;}
 let html="";
 let found=docs.filter(x=>x.t.toLowerCase().includes(q) || x.d.toLowerCase().includes(q));
 if(found.length==0){
   html=`<div class="result-card"><b>Offline में नहीं मिला, पर Online देख सकते हो:</b><br>
   <a href="https://www.youtube.com/results?search_query=${q}" target="_blank">▶️ YouTube पर देखो</a> | 
   <a href="https://www.google.com/search?q=${q}" target="_blank">🔍 Google पर देखो</a></div>`;
 }else{
   found.forEach(f=>{html+=`<div class="result-card"><b>${f.t}</b><br>${f.d}</div>`})
 }
 out.innerHTML=html;
}
function doAI(){
 let q=document.getElementById("mainSearch").value;
 let out=document.getElementById("results");
 if(!q)return;
 out.innerHTML=`<div class="result-card" style="border-left-color:#00ff88"><b>🤖 Bharat AI:</b><br>तुमने पूछा "${q}" <br><br> यह हमारा Free AI है जो बिना Internet के भी जवाब देता है। भविष्य में इसे और स्मार्ट बनाया जाएगा। Contact: sc29297311@gmail.com</div>`;
}

// Tools
function toolCalc(){document.getElementById("toolOutput").innerHTML='<h3>Calculator</h3><input id="calcIn" placeholder="2+2*5"><button onclick="let v=document.getElementById(`calcIn`).value; try{document.getElementById(`calcIn`).value=eval(v)}catch(e){alert(`error`)}">Calculate</button>';}
function toolAge(){document.getElementById("toolOutput").innerHTML='<h3>Age Calculator</h3><input type="date" id="dob"><button onclick="let d=new Date(document.getElementById(`dob`).value); let a=new Date().getFullYear()-d.getFullYear(); document.getElementById(`toolOutput`).innerHTML+=`<p>Age: ${a} Years</p>`">Calculate</button>';}
function toolWord(){document.getElementById("toolOutput").innerHTML='<h3>Word Counter</h3><textarea id="wtext" style="width:100%;height:80px"></textarea><button onclick="let t=document.getElementById(`wtext`).value; alert(`Words: ${t.split(/\\s+/).length} Chars: ${t.length}`)">Count</button>';}
function toolQR(){let q=document.getElementById("mainSearch").value||"Bharat Search"; document.getElementById("toolOutput").innerHTML=`<h3>QR for: ${q}</h3><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${q}">`;}
function toolPass(){let p=Math.random().toString(36).slice(-10)+"@Bharat!"; document.getElementById("toolOutput").innerHTML=`<h3>Strong Password: ${p}</h3>`;}
function toolBMI(){document.getElementById("toolOutput").innerHTML='<h3>BMI</h3>Weight<input id="w" type="number"> Height(cm)<input id="h" type="number"><button onclick="let bmi=document.getElementById(`w`).value/((document.getElementById(`h`).value/100)**2); alert(bmi.toFixed(2))">Check</button>';}
function toolColor(){document.getElementById("toolOutput").innerHTML='<input type="color" oninput="document.body.style.background=this.value"> Color Picker';}
function toolText(){document.getElementById("toolOutput").innerHTML='<textarea id="tc"></textarea><button onclick="document.getElementById(`tc`).value=document.getElementById(`tc`).value.toUpperCase()">UPPER</button><button onclick="document.getElementById(`tc`).value=document.getElementById(`tc`).value.toLowerCase()">lower</button>';}
function toolLoan(){document.getElementById("toolOutput").innerHTML='<h3>EMI</h3>Loan<input id="la"> Rate<input id="ra"> Year<input id="ya"><button onclick="let P=+document.getElementById(`la`).value, r=+document.getElementById(`ra`).value/12/100, n=+document.getElementById(`ya`).value*12; let emi=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); alert(`EMI: ${emi.toFixed(0)}`)">Calc</button>';}
function toolTemp(){document.getElementById("toolOutput").innerHTML='<input id="ct" placeholder="Celsius"><button onclick="alert((+document.getElementById(`ct`).value*9/5+32)+` F`)">To F</button>';}
function toolNote(){document.getElementById("toolOutput").innerHTML='<textarea id="note" style="width:100%;height:100px" placeholder="Notepad..."></textarea><button onclick="localStorage.setItem(`note`,document.getElementById(`note`).value); alert(`Saved`)">Save Local</button>';}
function toolTimer(){document.getElementById("toolOutput").innerHTML='<h3 id="tm">0</h3><button onclick="let s=0; setInterval(()=>{s++; document.getElementById(`tm`).innerText=s},1000)">Start Timer</button>';}

// Auth System - Free LocalStorage
let mode="signup";
const modal=document.getElementById("authModal");
document.getElementById("signupBtn").onclick=()=>{mode="signup"; document.getElementById("authTitle").innerText="Sign Up"; modal.style.display="block";}
document.getElementById("loginBtn").onclick=()=>{mode="login"; document.getElementById("authTitle").innerText="Login"; modal.style.display="block";}
document.querySelector(".close").onclick=()=>modal.style.display="none";
document.getElementById("authAction").onclick=()=>{
 let e=document.getElementById("authEmail").value, p=document.getElementById("authPass").value;
 if(!e||!p){document.getElementById("authMsg").innerText="Email Pass भरो";return;}
 if(mode=="signup"){localStorage.setItem("user_"+e,p); document.getElementById("authMsg").innerText="Account बन गया! अब Login करो";}
 else{if(localStorage.getItem("user_"+e)==p){localStorage.setItem("currentUser",e); checkUser(); modal.style.display="none";}else{document.getElementById("authMsg").innerText="गलत Password या Account नहीं है";}}
};
document.getElementById("forgotLink").onclick=(ev)=>{
 ev.preventDefault();
 let e=document.getElementById("authEmail").value;
 if(!e){alert("पहले Email लिखो");return;}
 let pass=localStorage.getItem("user_"+e);
 if(pass){alert("तुम्हारा Password है: "+pass);}else{alert("Account नहीं मिला");}
};
function checkUser(){
 let u=localStorage.getItem("currentUser");
 if(u){document.getElementById("userName").style.display="inline"; document.getElementById("userName").innerText=u; document.getElementById("loginBtn").style.display="none"; document.getElementById("signupBtn").style.display="none"; document.getElementById("logoutBtn").style.display="inline";}
}
document.getElementById("logoutBtn").onclick=()=>{localStorage.removeItem("currentUser"); location.reload();}
checkUser();