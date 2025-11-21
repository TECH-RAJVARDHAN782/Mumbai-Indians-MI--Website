// ===== Team Meta =====
const TEAM = {
  name: 'Mumbai Indians',
  captain: 'Hardik Pandya',
  coach: 'Mahela Jayawardene',
  venue: 'Wankhede Stadium',
  championships: 5
};

// ===== Players =====
const players = [
  {name:'Rohit Sharma',role:'Batsman',number:45,img:'Rohit.jpg'},
  {name:'Hardik Pandya',role:'All-rounder',number:33,img:'Hardik.jpg'},
  {name:'Jasprit Bumrah',role:'Bowler',number:93,img:'Bumrah.webp'},
  {name:'Suryakumar Yadav',role:'Batsman',number:63,img:'Suryakumar.jpg'},
  {name:'Tilak Varma',role:'Batsman',number:27,img:'Tilak.webp'},
  {name:'Trent Boult',role:'Bowler',number:10,img:'Trent Boult.webp'},
  {name:'Mitchell Santner',role:'All-rounder',number:3,img:'Mitchell Santner.webp'},
  {name:'Jonny Bairstow',role:'Wicketkeeper',number:51,img:'Jonny Bairstow.webp'},
  {name:'Richard Gleeson',role:'Bowler',number:88,img:'Richard Gleeson.webp'},
  {name:'Charith Asalanka',role:'Batsman',number:17,img:'Charith Asalanka.webp'},
  {name:'Corbin Bosch',role:'All-rounder',number:24,img:'Corbin Bosch.webp'},
  {name:'Will Jacks',role:'All-rounder',number:20,img:'Will Jacks.webp'},
  {name:'Ryan Rickelton',role:'Wicketkeeper',number:99,img:'Ryan Rickelton.webp'},
  {name:'Ashwani Kumar',role:'Bowler',number:66,img:'Ashwani Kumar.webp'},
  {name:'Raghu Sharma',role:'Bowler',number:77,img:'Raghu Sharma.webp'}
];

// ===== Schedule =====
const schedule = [
  {date:'2025-03-23',opponent:'CSK',venue:'MA Chidambaram Stadium',result:'L - 4 wkts'},
  {date:'2025-03-29',opponent:'GT',venue:'Wankhede Stadium',result:'W - 160/6'},
  {date:'2025-04-02',opponent:'LSG',venue:'Wankhede Stadium',result:'W - 228/5'},
  {date:'2025-04-09',opponent:'RCB',venue:'Chennai',result:'W - 177/1'},
];

// ===== News =====
const news = [
  {title:'Mumbai Indians sign Jonny Bairstow, Richard Gleeson and Charith Asalanka',src:'Mumbai Indians',date:'20 May 2025',snippet:'MI announced replacement signings ahead of playoffs.'},
  {title:'Mumbai eliminate Gujarat to keep alive IPL final hopes',src:'Reuters',date:'30 May 2025',snippet:'Mumbai beat Gujarat in the eliminator to progress.'}
];

// ===== Stats =====
const stats = [
  {title:'Championships',value:TEAM.championships},
  {title:'Home Ground',value:TEAM.venue},
  {title:'Captain',value:TEAM.captain}
];

// ====== Render functions ======
document.getElementById('captain').textContent = TEAM.captain;
document.getElementById('coach').textContent = TEAM.coach;

function renderSchedule(){
  const tbody = document.querySelector('#scheduleTable tbody'); 
  tbody.innerHTML='';
  schedule.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.date}</td><td>${s.opponent}</td><td>${s.venue}</td><td>${s.result}</td>`;
    tbody.appendChild(tr);
  });
}

function renderPlayers(){
  const grid = document.getElementById('playersGrid');
  grid.innerHTML='';
  players.forEach((p,i)=>{
    const d = document.createElement('div');
    d.className='player';
    d.innerHTML = `
      <img src='${p.img}' alt='${p.name}'>
      <div>
        <strong>${p.name}</strong>
        <div style='color:var(--muted)'>${p.role} · #${p.number}</div>
        <div style='margin-top:8px'><button class='btn' onclick='showProfile(${i})'>View</button></div>
      </div>
    `;
    grid.appendChild(d);
  });
}

function renderStats(){
  const box = document.getElementById('statsGrid');
  box.innerHTML='';
  stats.forEach(s=>{
    const el=document.createElement('div');
    el.className='stat';
    el.innerHTML=`<h3 style='margin:0'>${s.value}</h3><p style='margin:6px 0 0;color:var(--muted)'>${s.title}</p>`;
    box.appendChild(el);
  });
}

function renderNews(){
  const box = document.getElementById('newsList');
  box.innerHTML='';
  news.forEach(n=>{
    const item=document.createElement('div');
    item.className='news-item';
    item.innerHTML=`
      <img src='https://picsum.photos/200/120?random=${Math.floor(Math.random()*100)}'>
      <div>
        <strong>${n.title}</strong>
        <div style='color:var(--muted);font-size:13px;margin-top:6px'>
          ${n.snippet}
          <span style='display:block;margin-top:6px;font-size:12px;color:var(--muted)'>${n.src} · ${n.date}</span>
        </div>
      </div>
    `;
    box.appendChild(item);
  });
}

function showProfile(i){
  const p=players[i];
  alert(`${p.name} — ${p.role}\nJersey #${p.number}`);
}

// ===== Poll system (localStorage) =====
const pollKey='mi_poll_v1';
const commentsKey='mi_comments_v1';

function renderPoll(){
  const container=document.getElementById('pollOptions');
  container.innerHTML='';
  players.slice(0,6).forEach((p,i)=>{
    const label=document.createElement('label');
    label.style.display='flex';
    label.style.justifyContent='space-between';
    label.style.padding='8px';
    label.style.borderRadius='8px';
    label.style.background='rgba(255,255,255,0.01)';
    label.innerHTML=`
      <span>
        <input type='radio' name='poll' value='${p.name}'> 
        <strong style='margin-left:8px'>${p.name}</strong>
      </span>
      <span style='color:var(--muted)'>#${p.number}</span>
    `;
    container.appendChild(label);
  });
  renderPollResults();
}

function submitPoll(){
  const sel=document.querySelector('input[name="poll"]:checked');
  if(!sel){alert('Pick a player');return;}
  const votes=JSON.parse(localStorage.getItem(pollKey)||'{}');
  votes[sel.value]=(votes[sel.value]||0)+1;
  localStorage.setItem(pollKey,JSON.stringify(votes));
  renderPollResults();
}

function renderPollResults(){
  const area=document.getElementById('pollResults');
  const votes=JSON.parse(localStorage.getItem(pollKey)||'{}');
  const total=Object.values(votes).reduce((a,b)=>a+b,0)||0;

  if(total===0){
    area.textContent='No votes yet — be the first!';
    return;
  }

  area.innerHTML='';
  players.slice(0,6).forEach(p=>{
    const v=votes[p.name]||0;
    const pct=Math.round((v/total)*100)||0;
    const div=document.createElement('div');
    div.innerHTML=`
      <div style='display:flex;justify-content:space-between'>
        <div>${p.name}</div>
        <div>${v} votes (${pct}%)</div>
      </div>
    `;
    area.appendChild(div);
  });
}

// ===== Comments system =====
function loadComments(){
  const arr=JSON.parse(localStorage.getItem(commentsKey)||'[]');
  const box=document.getElementById('comments');
  box.innerHTML='';
  arr.forEach(c=>{
    const d=document.createElement('div');
    d.className='comment';
    d.style.background='rgba(255,255,255,0.01)';
    d.style.padding='8px';
    d.style.borderRadius='8px';
    d.innerHTML=`
      <strong>${c.when}</strong>
      <div style='color:var(--muted);margin-top:6px'>${c.text}</div>
    `;
    box.appendChild(d);
  });
}

function postComment(){
  const txt=document.getElementById('commentInput').value.trim();
  if(!txt){alert('Write something');return;}
  const arr=JSON.parse(localStorage.getItem(commentsKey)||'[]');
  arr.unshift({text:txt,when:new Date().toLocaleString()});
  localStorage.setItem(commentsKey,JSON.stringify(arr));
  document.getElementById('commentInput').value='';
  loadComments();
}

function clearComments(){
  if(confirm('Clear comments?')){
    localStorage.removeItem(commentsKey);
    loadComments();
  }
}

// ===== INIT =====
function init(){
  renderSchedule();
  renderPlayers();
  renderStats();
  renderNews();
  renderPoll();
  loadComments();
}
init();

document.addEventListener('keydown',e=>{
  if(e.key==='k'&&(e.ctrlKey||e.metaKey)){
    document.getElementById('commentInput').focus();
  }
});
