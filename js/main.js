(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var store={get:function(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
var naira=function(n){return'₦'+Number(n).toLocaleString('en-NG')};
var toastT;function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show')},2200)}

/* car illustration (layered SVG) */
function carSVG(c,o){o=o||{};var rim=o.rim||'#d8d8dc',tint=o.tint==null?.75:o.tint,id='g'+Math.random().toString(36).slice(2,7);
return '<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>'
+'<ellipse cx="210" cy="160" rx="170" ry="10" fill="#000" opacity=".4"/>'
+(o.spoiler?'<path d="M32 78h46l-2 8H30z" fill="#111"/><rect x="40" y="86" width="4" height="12" fill="#111"/>':'')
+'<path d="M24 124l6-26c2-8 10-14 22-16l62-10 38-30c10-8 26-12 52-12 34 0 58 8 74 24l22 18 52 12c14 4 22 12 24 26l2 14z" fill="'+c+'"/>'
+'<path d="M24 124l6-26c2-8 10-14 22-16l62-10 38-30c10-8 26-12 52-12 34 0 58 8 74 24l22 18 52 12c14 4 22 12 24 26l2 14z" fill="url(#'+id+')"/>'
+'<path d="M132 74l32-24c8-6 20-8 40-8 28 0 48 6 62 18l16 14z" fill="#0b0d10" opacity="'+tint+'"/><path d="M212 42v46" stroke="'+c+'" stroke-width="4"/>'
+(o.kit?'<path d="M30 124h360v8H30z" fill="#111"/><path d="M60 120h300" stroke="#ff6a13" stroke-width="2"/>':'')
+'<rect x="378" y="96" width="22" height="9" rx="4" fill="#ffd9a8"/><rect x="26" y="98" width="16" height="8" rx="3" fill="#ff3b30"/>'
+[96,320].map(function(x){return'<circle cx="'+x+'" cy="132" r="30" fill="#111"/><circle cx="'+x+'" cy="132" r="19" fill="'+rim+'"/><circle cx="'+x+'" cy="132" r="7" fill="#222"/>'+(o.wheel==='forged'?'<path d="M'+x+' 113v38M'+(x-19)+' 132h38M'+(x-13)+' 119l26 26M'+(x+13)+' 119l-26 26" stroke="#222" stroke-width="3"/>':o.wheel==='sport'?'<path d="M'+x+' 113v38M'+(x-19)+' 132h38" stroke="#222" stroke-width="3"/>':'')}).join('')+'</svg>'}

/* photos: real images from assets/cars/<slug>.jpg, with an illustrated fallback when a file is missing */
function slug(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function photo(n,col){return'<img class="photo" loading="lazy" decoding="async" src="assets/cars/'+slug(n)+'.jpg" alt="'+n+'" width="1600" height="1000" data-col="'+col+'">'}
document.addEventListener('error',function(e){var i=e.target;if(!i||i.tagName!=='IMG'||!i.classList.contains('photo'))return;var d=document.createElement('div');d.innerHTML=i.dataset.hero?carSVG('#f2f2f2',{rim:'#ff6a13',spoiler:1,kit:1}):carSVG(i.dataset.col||'#999');i.replaceWith(d.firstChild)},true);
/* data */
var CARS=[
{id:1,n:'Toyota Camry XLE',b:'Toyota',y:2019,m:48000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Lagos',p:14500000,col:'#c9ced6',feat:1},
{id:2,n:'Lexus RX 350',b:'Lexus',y:2020,m:36000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Abuja',p:38500000,col:'#2f3340',feat:1},
{id:3,n:'Mercedes-Benz C300',b:'Mercedes-Benz',y:2021,m:29000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Lagos',p:42000000,col:'#7e8794',feat:1},
{id:4,n:'BMW X5 xDrive40i',b:'BMW',y:2020,m:41000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Port Harcourt',p:52000000,col:'#1f4ea8',feat:1},
{id:5,n:'Honda Accord Sport',b:'Honda',y:2018,m:62000,t:'Automatic',f:'Petrol',c:'Nigerian used',l:'Benin City',p:9800000,col:'#b3262d'},
{id:6,n:'Range Rover Velar',b:'Range Rover',y:2021,m:24000,t:'Automatic',f:'Diesel',c:'Foreign used',l:'Abuja',p:78000000,col:'#e8e6df',feat:1},
{id:7,n:'Toyota Corolla LE',b:'Toyota',y:2017,m:78000,t:'Automatic',f:'Petrol',c:'Nigerian used',l:'Benin City',p:7200000,col:'#9aa0a8'},
{id:8,n:'Ford Explorer XLT',b:'Ford',y:2019,m:55000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Ibadan',p:19500000,col:'#222831'},
{id:9,n:'Hyundai Elantra',b:'Hyundai',y:2022,m:12000,t:'Automatic',f:'Petrol',c:'Brand new',l:'Lagos',p:21000000,col:'#d9541e',feat:1},
{id:10,n:'Toyota Hilux Revo',b:'Toyota',y:2020,m:58000,t:'Manual',f:'Diesel',c:'Nigerian used',l:'Kano',p:29500000,col:'#e1e3e6'},
{id:11,n:'Mercedes-Benz GLE 450',b:'Mercedes-Benz',y:2023,m:9000,t:'Automatic',f:'Petrol',c:'Brand new',l:'Lagos',p:96000000,col:'#101113',feat:1},
{id:12,n:'Lexus ES 350',b:'Lexus',y:2018,m:67000,t:'Automatic',f:'Petrol',c:'Nigerian used',l:'Enugu',p:16800000,col:'#5a2d2f'}];
var NEW=[{id:13,n:'BMW 330i M Sport',b:'BMW',y:2024,m:3000,t:'Automatic',f:'Petrol',c:'Brand new',l:'Lagos',p:68000000,col:'#c8ccd2'},
{id:14,n:'Honda CR-V Touring',b:'Honda',y:2022,m:21000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Benin City',p:27500000,col:'#2c5d4a'},
{id:15,n:'Toyota Land Cruiser V8',b:'Toyota',y:2022,m:18000,t:'Automatic',f:'Petrol',c:'Foreign used',l:'Abuja',p:112000000,col:'#0e0f11'},
{id:16,n:'Hyundai Tucson',b:'Hyundai',y:2023,m:8000,t:'Automatic',f:'Petrol',c:'Brand new',l:'Port Harcourt',p:34000000,col:'#8a929c'}];
var ALL=CARS.concat(NEW);
var favs=store.get('ah_favs',[]),cmp=store.get('ah_cmp',[]),cart=store.get('ah_cart',[]);
var F={q:'',b:'',p:'',y:'',s:'feat'};

/* hero + selects */
$('#heroCar').innerHTML='<img class="photo" src="assets/images/hero.jpg" alt="Premium sports car" width="1600" height="1000" fetchpriority="high" data-hero="1">';
var brands=[];ALL.forEach(function(c){if(brands.indexOf(c.b)<0)brands.push(c.b)});
$('#fb').innerHTML+=brands.map(function(b){return'<option>'+b+'</option>'}).join('');
$('#brandChips').innerHTML='<button class="chip on" data-b="">All brands</button>'+brands.map(function(b){return'<button class="chip" data-b="'+b+'">'+b+'</button>'}).join('');

/* car cards */
function card(c,tag){var f=favs.indexOf(c.id)>-1,k=cmp.indexOf(c.id)>-1;
return'<article class="card"><div class="pic">'+(tag?'<span class="tag">'+tag+'</span>':'')+'<button class="fav'+(f?' on':'')+'" data-fav="'+c.id+'" aria-label="Favourite '+c.n+'" aria-pressed="'+f+'">'+(f?'♥':'♡')+'</button>'+photo(c.n,c.col)+'</div><div class="info"><h3>'+c.n+'</h3><div class="price">'+naira(c.p)+'</div><div class="meta"><span>'+c.y+'</span><span>'+c.m.toLocaleString()+' km</span><span>'+c.t+'</span><span>'+c.f+'</span><span>'+c.c+'</span></div><div class="loc">📍 '+c.l+', Nigeria</div><div class="acts"><a class="btn ghost" href="car-details.html?id='+c.id+'">Details</a><button class="btn ghost'+(k?' on':'')+'" data-cmp="'+c.id+'">'+(k?'Added':'Compare')+'</button></div></div></article>'}
function renderFeatured(){var r=CARS.filter(function(c){var q=F.q.toLowerCase();return(!q||(c.n+c.b+c.l).toLowerCase().indexOf(q)>-1)&&(!F.b||c.b===F.b)&&(!F.p||c.p<=+F.p)&&(!F.y||c.y>=+F.y)});
var s={pa:function(a,b){return a.p-b.p},pd:function(a,b){return b.p-a.p},yn:function(a,b){return b.y-a.y},ml:function(a,b){return a.m-b.m}}[F.s];if(s)r.sort(s);
$('#featured').innerHTML=r.length?r.map(function(c){return card(c,c.feat?'Featured':'')}).join(''):'<div class="empty">No cars match these filters. Clear a filter or choose another brand.</div>'}
function renderLatest(){$('#latestGrid').innerHTML=NEW.map(function(c){return card(c,'New')}).join('')}
function renderAll(){renderFeatured();renderLatest();bar()}
function bar(){var b=$('#cbar');$('#cbtxt').textContent=cmp.length+' of 3 cars selected';b.classList.toggle('show',cmp.length>0)}
document.addEventListener('click',function(e){var t=e.target.closest('[data-fav],[data-cmp],[data-b]');if(!t)return;
if(t.dataset.fav){var id=+t.dataset.fav,i=favs.indexOf(id);i>-1?favs.splice(i,1):favs.push(id);store.set('ah_favs',favs);toast(i>-1?'Removed from favourites':'Saved to favourites');renderAll()}
else if(t.dataset.cmp){var id2=+t.dataset.cmp,j=cmp.indexOf(id2);if(j>-1)cmp.splice(j,1);else if(cmp.length>=3){toast('You can compare up to 3 cars');return}else cmp.push(id2);store.set('ah_cmp',cmp);renderAll()}
else if(t.dataset.b!==undefined&&t.classList.contains('chip')&&t.parentNode.id==='brandChips'){F.b=t.dataset.b;$('#fb').value=F.b;$$('#brandChips .chip').forEach(function(c){c.classList.toggle('on',c===t)});renderFeatured();$('#buy').scrollIntoView()}});
$('#cclear').onclick=function(){cmp=[];store.set('ah_cmp',cmp);renderAll()};
$('#navCompare').onclick=function(e){if(!cmp.length){toast('Tap Compare on up to 3 cars first')}};
$('#sort').onchange=function(){F.s=this.value;renderFeatured()};
$('#searchForm').onsubmit=function(e){e.preventDefault();F.q=$('#q').value.trim();F.b=$('#fb').value;F.p=$('#fp').value;F.y=$('#fy').value;$$('#brandChips .chip').forEach(function(c){c.classList.toggle('on',c.dataset.b===F.b)});renderFeatured();$('#buy').scrollIntoView()};
renderAll();

/* customization */
var PAINT=[['Pearl white','#f1f1f1'],['Orange blaze','#ff6a13'],['Midnight','#15171c'],['Racing red','#c4161c'],['Steel blue','#2f5fa8'],['Titanium','#8d939d']];
var WH={std:['Standard',0,'#d8d8dc'],sport:['Sport',350000,'#9aa0a8'],forged:['Forged',900000,'#ff6a13']},KIT={none:['Stock',0],spoiler:['Spoiler',250000],full:['Full body kit',780000]},TINT={none:['None',0,.9],light:['Light',80000,.75],dark:['Dark',120000,.45]};
var base={paint:0,wheel:'std',kit:'none',tint:'none'},cfg=store.get('ah_cfg',null)||JSON.parse(JSON.stringify(base));
function seg(id,obj,key){$(id).innerHTML=Object.keys(obj).map(function(k){return'<button class="chip'+(cfg[key]===k?' on':'')+'" data-k="'+k+'">'+obj[k][0]+(obj[k][1]?' +'+naira(obj[k][1]):'')+'</button>'}).join('');$$('button',$(id)).forEach(function(b){b.onclick=function(){cfg[key]=b.dataset.k;drawC()}})}
function drawC(){$('#paint').innerHTML=PAINT.map(function(p,i){return'<button style="background:'+p[1]+'" class="'+(cfg.paint===i?'on':'')+'" aria-label="'+p[0]+'" title="'+p[0]+'"></button>'}).join('');$$('#paint button').forEach(function(b,i){b.onclick=function(){cfg.paint=i;drawC()}});
seg('#wheels',WH,'wheel');seg('#kit',KIT,'kit');seg('#tint',TINT,'tint');
$('#custCar').innerHTML=carSVG(PAINT[cfg.paint][1],{rim:WH[cfg.wheel][2],wheel:cfg.wheel==='std'?'':cfg.wheel,spoiler:cfg.kit!=='none',kit:cfg.kit==='full',tint:TINT[cfg.tint][2]});
$('#custTotal').textContent=naira((cfg.paint?150000:0)+WH[cfg.wheel][1]+KIT[cfg.kit][1]+TINT[cfg.tint][1])}
$('#custReset').onclick=function(){cfg=JSON.parse(JSON.stringify(base));store.set('ah_cfg',cfg);drawC();toast('Setup reset')};
$('#custSave').onclick=function(){store.set('ah_cfg',cfg);toast('Setup saved')};drawC();

/* tracking simulation */
var path=[[5,85],[14,70],[24,48],[38,38],[50,46],[60,58],[72,46],[82,28],[92,12]],pi=0,tm=null,al=['Movement detected','Speed limit reached (simulated)','Left geofence area','Re-entered geofence area'];
function alertAdd(m){var li=document.createElement('li');li.textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})+' – '+m;$('#alerts').prepend(li)}
function tick(){pi=(pi+1)%path.length;var p=path[pi];$('#dot').style.left=p[0]+'%';$('#dot').style.top=p[1]+'%';$('#spd').textContent=Math.round(35+Math.random()*50);$('#fuel').textContent=Math.max(5,78-pi*2)+'%';$('#bat').textContent=(92-Math.floor(pi/3))+'%';$('#coord').textContent=(6.335+p[1]/1000).toFixed(4)+'° N, '+(5.6037+p[0]/1000).toFixed(4)+'° E';if(pi%3===0)alertAdd(al[Math.floor(Math.random()*al.length)])}
function tStat(on){$('#tstat').classList.toggle('on',on);$('#tstat span').textContent=on?'Tracking active (simulated)':'Tracking stopped'}
$('#tStart').onclick=function(){if(tm)return;tStat(1);alertAdd('Tracking started');tm=setInterval(tick,1200)};
$('#tStop').onclick=function(){clearInterval(tm);tm=null;tStat(0);$('#spd').textContent='0';alertAdd('Tracking stopped')};
$('#tv').onchange=function(){alertAdd('Switched to '+this.value.split(' – ')[0])};

/* parts */
var PARTS=[['⚙️','Engine components','Pistons, gaskets, filters',85000],['🛞','Tyres and rims','Run-flat and alloy sets',420000],['🔋','Batteries','12V maintenance-free',95000],['🛑','Brake systems','Pads, discs, calipers',68000],['💡','Headlights','LED and xenon units',145000],['🪑','Interior and exterior accessories','Mats, covers, trims',32000],['📻','Car electronics','Android head units, cameras',120000],['🛢️','Oils and lubricants','Synthetic 5W-30 and more',28000]];
$('#pgrid').innerHTML=PARTS.map(function(p,i){return'<div class="part glass"><div class="ic">'+p[0]+'</div><h3 style="font-size:1rem">'+p[1]+'</h3><p>'+p[2]+'</p><div class="price">from '+naira(p[3])+'</div><button class="btn" data-add="'+i+'" style="padding:.5rem 1rem;margin-top:.3rem;justify-content:center">Add to cart</button></div>'}).join('');
function cartN(){$('#cartN').textContent=cart.reduce(function(a,c){return a+c.q},0)}
$('#pgrid').onclick=function(e){var b=e.target.closest('[data-add]');if(!b)return;var i=+b.dataset.add,x=cart.filter(function(c){return c.i===i})[0];x?x.q++:cart.push({i:i,q:1});store.set('ah_cart',cart);cartN();toast(PARTS[i][1]+' added to cart')};
$('#cartBtn').onclick=function(){if(!cart.length){toast('Your cart is empty');return}var t=cart.reduce(function(a,c){return a+PARTS[c.i][3]*c.q},0);toast(cart.length+' item type(s) · '+naira(t)+' · open Spare Parts to check out')};cartN();

/* rentals */
var RENT=[['Toyota Camry','#c9ced6','Economy sedan',45000],['Lexus RX 350','#2f3340','Premium SUV',120000],['Mercedes-Benz E-Class','#101113','Executive',180000]];
$('#rgrid').innerHTML=RENT.map(function(r,i){return'<article class="card"><div class="pic">'+photo(r[0],r[1])+'</div><div class="info"><h3>'+r[0]+'</h3><div class="loc">'+r[2]+'</div><div class="price">'+naira(r[3])+' <small style="font:400 .8rem var(--b);color:var(--mute)">per day</small></div><div class="acts"><button class="btn" data-rent="'+i+'">Book now</button></div></div></article>'}).join('');
$('#rgrid').onclick=function(e){var b=e.target.closest('[data-rent]');if(!b)return;var o=store.get('ah_rent',[]);o.push({car:RENT[+b.dataset.rent][0],at:Date.now()});store.set('ah_rent',o);toast('Demo reservation saved')};

/* financing */
$('#fcalc').onclick=function(){var P=+$('#fprice').value,n=Math.min(60,Math.max(1,+$('#fmo').value||24)),r=.18/12;if(!P){$('#fout').textContent='Enter a car price in Naira first.';return}var m=P*r/(1-Math.pow(1+r,-n));$('#fout').textContent='About '+naira(Math.round(m))+' a month for '+n+' months (estimate).'};

/* auth modal (frontend demo) */
var D=$('#authD'),mode='Login';
$('#loginBtn').onclick=function(){D.showModal()};$('#aclose').onclick=function(){D.close()};
$$('.tabs .chip').forEach(function(t){t.onclick=function(){mode=t.dataset.m;$$('.tabs .chip').forEach(function(c){c.classList.toggle('on',c===t)});$('#nameRow').hidden=mode!=='Register';$('#asub').textContent=mode}});
$('#authF').onsubmit=function(){store.set('ah_user',{email:$('#ae').value,name:$('#an').value||'Guest'});toast(mode==='Login'?'Logged in (demo)':'Account created (demo)');$('#loginBtn').textContent='Account'};
if(store.get('ah_user',0))$('#loginBtn').textContent='Account';
$('#news').onsubmit=function(e){e.preventDefault();toast('Subscribed (demo)');e.target.reset()};

/* nav + reveal */
$('#burger').onclick=function(){var o=$('#links').classList.toggle('open');this.setAttribute('aria-expanded',o)};
$$('#links a').forEach(function(a){a.addEventListener('click',function(){$('#links').classList.remove('open')})});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});$$('.rev').forEach(function(el){io.observe(el)})}else $$('.rev').forEach(function(el){el.classList.add('in')});
})();
