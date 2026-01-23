async function call(url, body){
  const loading=document.getElementById('loading');
  const buttons=document.querySelectorAll('button');
  loading.style.display='block';
  buttons.forEach(b=>b.disabled=true);
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const d=await r.json();
  document.getElementById('out').textContent=d.output;
  loading.style.display='none';
  buttons.forEach(b=>b.disabled=false);
}
function scenarios(){call('/scenarios',{text:document.getElementById('text').value});}
function test(){call('/test',{});}
