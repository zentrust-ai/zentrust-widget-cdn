// Zentrust AI — Embeddable Chat Widget
// Version: 4.0 (Production)
// © 2026 Zentrust AI. All rights reserved.
(function(){
  'use strict';

  var CFG = {
    url: 'https://zentrust.app.n8n.cloud/webhook/venue-chat',
    venue: 'Venue Concierge',
    greet: "Hi there! I'm Zeni, your AI concierge at The Grand Manor. How can I help you today?"
  };

  var NS = 'zt-';

  if (!document.querySelector('link[href*="DM+Sans"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }

  var style = document.createElement('style');
  style.setAttribute('data-zentrust', 'widget');
  style.textContent = '#'+NS+'toggle{position:fixed;bottom:20px;right:20px;width:60px;height:60px;background:#1a1a2e;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,0.25);z-index:99999;border:none;outline:none;padding:0;margin:0;-webkit-tap-highlight-color:transparent}#'+NS+'toggle svg{width:28px;height:28px;fill:white}#'+NS+'toggle.open .'+NS+'ic{display:none}#'+NS+'toggle.open .'+NS+'ix{display:block}#'+NS+'toggle .'+NS+'ix{display:none}#'+NS+'window{position:fixed;bottom:90px;right:20px;width:400px;height:580px;background:#fff;border-radius:16px;box-shadow:0 10px 50px rgba(0,0,0,0.2);z-index:99998;display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(0,0,0,0.08);font-family:"DM Sans",-apple-system,BlinkMacSystemFont,sans-serif;line-height:normal;color:#333;font-size:14px;text-align:left}#'+NS+'window *,#'+NS+'window *::before,#'+NS+'window *::after{box-sizing:border-box;margin:0;padding:0}#'+NS+'window.open{display:flex}@keyframes '+NS+'slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}#'+NS+'header{background:#1a1a2e;color:white;padding:18px 20px;display:flex;align-items:center;gap:14px;flex-shrink:0}#'+NS+'avatar{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}#'+NS+'avatar svg{width:24px;height:24px;fill:white}.'+NS+'hd-info h3{font-size:16px;font-weight:600;margin-bottom:2px;color:white}.'+NS+'hd-info span{font-size:12px;opacity:0.85;display:flex;align-items:center;gap:6px;color:white}.'+NS+'hd-info span::before{content:"";width:8px;height:8px;background:#4ade80;border-radius:50%;display:inline-block;flex-shrink:0}#'+NS+'messages{flex:1;overflow-y:auto;padding:20px;background:#f7f7f8;display:flex;flex-direction:column;gap:12px}.'+NS+'msg{max-width:82%;padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.5;word-wrap:break-word;flex-shrink:0}.'+NS+'msg.'+NS+'bot{background:#fff;color:#333;border-bottom-left-radius:6px;align-self:flex-start;box-shadow:0 1px 3px rgba(0,0,0,0.08)}.'+NS+'msg.'+NS+'bot strong{color:#1a1a2e;font-weight:600}.'+NS+'msg.'+NS+'user{background:#1a1a2e;color:white;border-bottom-right-radius:6px;align-self:flex-end}.'+NS+'msg.'+NS+'err{background:#fee;color:#c00;align-self:flex-start;font-size:12px;border-bottom-left-radius:6px}.'+NS+'qr{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start;max-width:90%;flex-shrink:0}.'+NS+'qr button{background:#fff;color:#1a1a2e;border:1.5px solid #1a1a2e;border-radius:20px;padding:8px 16px;font-size:13px;font-family:"DM Sans",sans-serif;font-weight:500;cursor:pointer;transition:all 0.2s;white-space:nowrap;line-height:normal}.'+NS+'qr button:hover{background:#1a1a2e;color:white}.'+NS+'qr button.'+NS+'slot{border-color:#2d6a4f;color:#2d6a4f}.'+NS+'qr button.'+NS+'slot:hover{background:#2d6a4f;color:white}.'+NS+'qr button.'+NS+'cust{border-style:dashed;color:#666;border-color:#999}.'+NS+'qr.'+NS+'used button{pointer-events:none;opacity:0.3}.'+NS+'route-select{display:flex;flex-direction:column;gap:10px;align-self:flex-start;width:88%;flex-shrink:0}.'+NS+'route-select button{background:#fff;color:#1a1a2e;border:1.5px solid #e0e0e0;border-radius:14px;padding:14px 18px;font-size:14px;font-family:"DM Sans",sans-serif;font-weight:500;cursor:pointer;transition:all 0.2s;text-align:left;display:flex;align-items:center;gap:12px;line-height:normal;width:100%}.'+NS+'route-select button:hover{border-color:#1a1a2e;background:#f8f8fa;transform:translateX(2px)}.'+NS+'route-select button .'+NS+'route-icon{font-size:20px;flex-shrink:0}.'+NS+'route-select button .'+NS+'route-text{display:flex;flex-direction:column;gap:2px}.'+NS+'route-select button .'+NS+'route-label{font-weight:600;font-size:14px}.'+NS+'route-select button .'+NS+'route-desc{font-size:12px;color:#888;font-weight:400}.'+NS+'route-select.'+NS+'used button{pointer-events:none;opacity:0.3}.'+NS+'typ{display:flex;gap:5px;padding:12px 16px;background:#fff;border-radius:18px;border-bottom-left-radius:6px;align-self:flex-start;box-shadow:0 1px 3px rgba(0,0,0,0.08);flex-shrink:0}.'+NS+'typ span{width:8px;height:8px;background:#999;border-radius:50%;animation:'+NS+'bn 1.4s infinite ease-in-out}.'+NS+'typ span:nth-child(1){animation-delay:-0.32s}.'+NS+'typ span:nth-child(2){animation-delay:-0.16s}@keyframes '+NS+'bn{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}#'+NS+'input-area{padding:14px 16px;background:#fff;border-top:1px solid #e5e5e5;display:flex;gap:10px;align-items:center;flex-shrink:0}#'+NS+'input{flex:1;padding:12px 18px;border:1px solid #e0e0e0;border-radius:24px;font-size:14px;font-family:"DM Sans",sans-serif;outline:none;background:#fff;color:#333;-webkit-appearance:none;appearance:none;line-height:normal}#'+NS+'input:focus{border-color:#1a1a2e}#'+NS+'input::placeholder{color:#999}#'+NS+'send{width:44px;height:44px;background:#1a1a2e;border:none;border-radius:50%;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:0;outline:none}#'+NS+'send:hover{background:#2d2d44}#'+NS+'send:disabled{background:#ccc;cursor:not-allowed}#'+NS+'send svg{width:20px;height:20px;fill:white}#'+NS+'pby{text-align:center;padding:8px;font-size:11px;color:#999;background:#fff;border-top:1px solid #f0f0f0;flex-shrink:0}#'+NS+'pby a{color:#666;text-decoration:none}@media(max-width:480px){#'+NS+'window{width:calc(100% - 20px);height:calc(100% - 100px);right:10px;left:10px;bottom:80px}#'+NS+'toggle{bottom:15px;right:15px}}';
  document.head.appendChild(style);

  var container = document.createElement('div');
  container.id = NS + 'container';
  container.innerHTML = '<div id="'+NS+'toggle"><svg class="'+NS+'ic" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h10v2H7zm0-3h10v2H7z"/></svg><svg class="'+NS+'ix" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></div><div id="'+NS+'window"><div id="'+NS+'header"><div id="'+NS+'avatar"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div><div class="'+NS+'hd-info"><h3 id="'+NS+'vname">'+CFG.venue+'</h3><span>Online \u00B7 Typically replies instantly</span></div></div><div id="'+NS+'messages"></div><div id="'+NS+'input-area"><input type="text" id="'+NS+'input" placeholder="Type your message..." autocomplete="off"><button id="'+NS+'send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div><div id="'+NS+'pby">Powered by <a href="https://zentrust.ai" target="_blank" rel="noopener">Zentrust AI</a></div></div>';
  document.body.appendChild(container);

  var MO=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var MS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var isOpen=false;
  var sid='session_'+(typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now()+'_'+Math.random().toString(36).substr(2,12)+Math.random().toString(36).substr(2,12));
  var busy=false,currentRoute=null;
  var cState={name:'',email:'',phone:'',guest_count:'',date_interest:'',tour_date:'',budget_range:'',intent_score:0,wants_booking:false,booking_created:false,escalated:false,status:'new'};
  var recent=[];

  function $(id){return document.getElementById(NS+id);}

  $('toggle').addEventListener('click',function(){
    isOpen=!isOpen;
    $('window').classList.toggle('open',isOpen);
    $('toggle').classList.toggle('open',isOpen);
    if(isOpen&&!$('messages').children.length){addMsg(CFG.greet,'bot');showRouteSelection();}
    if(isOpen)setTimeout(function(){$('input').focus();},300);
  });
  $('input').addEventListener('keypress',function(e){if(e.key==='Enter'){e.preventDefault();sendMessage();}});
  $('send').addEventListener('click',sendMessage);

  function showRouteSelection(){
    var d=$('messages'),w=document.createElement('div');w.className=NS+'route-select';
    var b1=document.createElement('button');
    b1.innerHTML='<span class="'+NS+'route-icon">\uD83D\uDCAC</span><span class="'+NS+'route-text"><span class="'+NS+'route-label">I have questions about the venue</span><span class="'+NS+'route-desc">Packages, pricing, menus, capacity & more</span></span>';
    b1.onclick=function(){w.classList.add(NS+'used');currentRoute='faq';addMsg("I have questions about the venue",'user');showFAQTopics();};
    var b2=document.createElement('button');
    b2.innerHTML='<span class="'+NS+'route-icon">\uD83D\uDCC5</span><span class="'+NS+'route-text"><span class="'+NS+'route-label">I\'d like to schedule a tour</span><span class="'+NS+'route-desc">Book a visit to see the venue in person</span></span>';
    b2.onclick=function(){w.classList.add(NS+'used');currentRoute='booking';addMsg("I'd like to schedule a tour",'user');sendWH("I'd like to schedule a tour");};
    w.appendChild(b1);w.appendChild(b2);d.appendChild(w);scr();
  }

  function showFAQTopics(){
    var d=$('messages');
    addMsg("Great! What would you like to know about? Select a topic below, or type your own question.",'bot');
    var w=document.createElement('div');w.className=NS+'route-select';
    var topics=[
      {icon:'\uD83D\uDC8E',label:'Wedding Packages & Pricing',desc:'Pearl, Sapphire & Onyx all-inclusive packages',query:'Tell me about the All Inclusive Pearl Buffet, Sapphire Buffet, and Onyx Buffet wedding packages including Saturday and Friday pricing'},
      {icon:'\uD83C\uDF7D\uFE0F',label:'Catering Menu & Bar Options',desc:'Appetizers, entrees, sides & bar packages',query:'What appetizers, entrees, sides, and bar packages are on the catering menu and what is the per person pricing?'},
      {icon:'\uD83C\uDFDB\uFE0F',label:'Venue Spaces & Capacity',desc:'Ballroom, Secret Garden, Bridal Suite & more',query:'Tell me about the Secret Garden ceremony space, Grand Ballroom reception capacity, Bridal Suite, Grooms Room, and Cocktail Room'},
      {icon:'\u2728',label:'Decorations & Add-Ons',desc:'Centerpieces, photo booth, enhancements',query:'What decoration options and add-on services do you offer including charger plates, centerpieces, chair sashes, photo booth, and dancing on a cloud?'}
    ];
    for(var i=0;i<topics.length;i++)(function(t){
      var b=document.createElement('button');
      b.innerHTML='<span class="'+NS+'route-icon">'+t.icon+'</span><span class="'+NS+'route-text"><span class="'+NS+'route-label">'+t.label+'</span><span class="'+NS+'route-desc">'+t.desc+'</span></span>';
      b.onclick=function(){w.classList.add(NS+'used');addMsg(t.label,'user');sendWH(t.query);};
      w.appendChild(b);
    })(topics[i]);
    d.appendChild(w);scr();
  }

  function addMsg(t,c){
    var d=$('messages'),e=document.createElement('div');
    e.className=NS+'msg '+NS+c;
    if(c==='bot'){
      var html=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      html=html.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
      html=html.replace(/\n/g,'<br>');
      html=html.replace(/<(?!\/?strong>|br>)[^>]*>/gi,'');
      e.innerHTML=html;
    }else{e.textContent=t;}
    d.appendChild(e);d.scrollTop=d.scrollHeight;
  }
  function scr(){var d=$('messages');d.scrollTop=d.scrollHeight;}
  function dis(){
    var x=document.querySelectorAll('.'+NS+'qr:not(.'+NS+'used)');for(var i=0;i<x.length;i++)x[i].classList.add(NS+'used');
    var p=document.querySelectorAll('[data-pk]');for(var j=0;j<p.length;j++){p[j].style.pointerEvents='none';p[j].style.opacity='0.4';}
    var rs=document.querySelectorAll('.'+NS+'route-select:not(.'+NS+'used)');for(var k=0;k<rs.length;k++)rs[k].classList.add(NS+'used');
  }
  function showTyp(){var d=$('messages'),e=document.createElement('div');e.className=NS+'typ';e.id=NS+'typ';e.innerHTML='<span></span><span></span><span></span>';d.appendChild(e);d.scrollTop=d.scrollHeight;}
  function hideTyp(){var e=$('typ');if(e)e.remove();}

  function renderMP(){
    var now=new Date(),yr=now.getFullYear();var w=document.createElement('div');w.setAttribute('data-pk','m');
    w.style.cssText='flex-shrink:0;align-self:flex-start;width:90%;background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);border:1px solid #e8e8ed;margin:4px 0;overflow:visible;';
    function draw(){
      var h='<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:#1a1a2e;color:white;border-radius:13px 13px 0 0;"><button data-d="-1" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:inherit;">&#8249;</button><span style="font-size:15px;font-weight:600;">'+yr+'</span><button data-d="1" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:inherit;">&#8250;</button></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:14px;">';
      for(var i=0;i<12;i++){var past=(yr===now.getFullYear()&&i<now.getMonth());h+='<div data-m="'+i+'" style="padding:10px 4px;text-align:center;border-radius:10px;font-size:13px;font-weight:500;cursor:'+(past?'default':'pointer')+';background:'+(past?'#fafafa':'#f0f0f5')+';color:'+(past?'#ccc':'#1a1a2e')+';transition:all 0.15s;">'+MS[i]+'</div>';}
      h+='</div>';w.innerHTML=h;
      var navs=w.querySelectorAll('button[data-d]');for(var n=0;n<navs.length;n++)(function(b){b.onmouseenter=function(){b.style.background='rgba(255,255,255,0.15)';};b.onmouseleave=function(){b.style.background='none';};b.onclick=function(){yr+=parseInt(b.getAttribute('data-d'));if(yr<now.getFullYear())yr=now.getFullYear();if(yr>now.getFullYear()+4)yr=now.getFullYear()+4;draw();};})(navs[n]);
      var cells=w.querySelectorAll('div[data-m]');for(var j=0;j<cells.length;j++)(function(c){var idx=parseInt(c.getAttribute('data-m'));var isPast=(yr===now.getFullYear()&&idx<now.getMonth());if(!isPast){c.onmouseenter=function(){c.style.background='#1a1a2e';c.style.color='white';c.style.transform='scale(1.04)';};c.onmouseleave=function(){c.style.background='#f0f0f5';c.style.color='#1a1a2e';c.style.transform='';};c.onclick=function(){var val=MO[idx]+' '+yr;w.style.pointerEvents='none';w.style.opacity='0.4';addMsg(val,'user');sendWH(val);};}})(cells[j]);
    }
    draw();$('messages').appendChild(w);scr();
  }

  function renderTP(slots,byDate){
    var w=document.createElement('div');w.setAttribute('data-pk','t');
    w.style.cssText='flex-shrink:0;align-self:flex-start;width:92%;background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.08);border:1px solid #e8e8ed;margin:4px 0;overflow:visible;';
    w.innerHTML='<div style="padding:14px 18px;background:#1a1a2e;color:white;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-radius:13px 13px 0 0;">Select a Date &amp; Time</div><div style="padding:10px 14px 4px;font-size:12px;color:#888;text-align:center;">Tours available Mon\u2013Fri, 9 AM \u2013 3 PM</div><div id="'+NS+'tcal" style="padding:16px;"></div>';
    $('messages').appendChild(w);buildCal(w.querySelector('#'+NS+'tcal'),byDate||{},w);scr();
  }

  function buildCal(con,bd,par){
    var now=new Date(),vm=now.getMonth(),vy=now.getFullYear(),sel=null;
    function draw(){
      var f=new Date(vy,vm,1).getDay(),tot=new Date(vy,vm+1,0).getDate();
      var h='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;"><button data-cn="-1" style="background:none;border:1px solid #e0e0e0;color:#1a1a2e;width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;font-family:inherit;">&#8249;</button><span style="font-size:14px;font-weight:600;color:#1a1a2e;">'+MO[vm]+' '+vy+'</span><button data-cn="1" style="background:none;border:1px solid #e0e0e0;color:#1a1a2e;width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;font-family:inherit;">&#8250;</button></div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center;">';
      var dw=['Su','Mo','Tu','We','Th','Fr','Sa'];for(var d=0;d<7;d++)h+='<div style="font-size:10px;color:#bbb;font-weight:600;padding:4px 0;">'+dw[d]+'</div>';
      for(var e=0;e<f;e++)h+='<div></div>';
      for(var i=1;i<=tot;i++){var dt=new Date(vy,vm,i);var k=dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');var ps=dt<=now,wk=dt.getDay()===0||dt.getDay()===6;var ha=bd[k]&&bd[k].times&&bd[k].times.length>0;var isFW=!ps&&!wk;var off=ps||wk||(isFW?false:!ha);var isSel=sel===k;var bg=isSel?'#1a1a2e':'transparent';var col=isSel?'white':(off?'#ddd':'#1a1a2e');var cur=off?'default':'pointer';var dot=(ha&&!ps&&!wk)?'<div style="width:4px;height:4px;background:#2d6a4f;border-radius:50%;margin:1px auto 0;"></div>':'';h+='<div data-dy="'+(off?'':k)+'" style="padding:7px 2px;font-size:12px;border-radius:8px;cursor:'+cur+';color:'+col+';background:'+bg+';font-weight:500;position:relative;">'+i+dot+'</div>';}
      h+='</div><div id="'+NS+'tms"></div>';con.innerHTML=h;
      var ns=con.querySelectorAll('[data-cn]');for(var n=0;n<ns.length;n++)(function(b){b.onclick=function(){vm+=parseInt(b.getAttribute('data-cn'));if(vm<0){vm=11;vy--;}if(vm>11){vm=0;vy++;}if(vy<now.getFullYear()||(vy===now.getFullYear()&&vm<now.getMonth())){vy=now.getFullYear();vm=now.getMonth();}draw();};})(ns[n]);
      var ds=con.querySelectorAll('[data-dy]');for(var j=0;j<ds.length;j++)(function(c){var dk=c.getAttribute('data-dy');if(!dk)return;c.onmouseenter=function(){if(sel!==dk){c.style.background='#1a1a2e';c.style.color='white';}};c.onmouseleave=function(){if(sel!==dk){c.style.background='';c.style.color='#1a1a2e';}};c.onclick=function(){sel=dk;draw();showTm(dk);scr();};})(ds[j]);
      if(sel)showTm(sel);
    }
    function showTm(dk){
      var sec=con.querySelector('#'+NS+'tms'),info=bd[dk];
      if(!info||!info.times||!info.times.length){var dd=new Date(dk+'T12:00:00');var dn=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dd.getDay()];var dm=MS[dd.getMonth()]+' '+dd.getDate();info={dayName:dn,displayDate:dm,times:['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM']};}
      var all=['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM'];var av={};for(var a=0;a<info.times.length;a++)av[info.times[a]]=true;
      var h='<div style="margin-top:14px;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;margin-bottom:8px;">'+info.dayName+', '+info.displayDate+'</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">';
      for(var t=0;t<all.length;t++){if(av[all[t]]){h+='<div data-tm="'+all[t]+'" style="padding:8px;text-align:center;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:#2d6a4f;background:#eef6f0;transition:all 0.15s;">'+all[t]+'</div>';}else{h+='<div style="padding:8px;text-align:center;border-radius:8px;font-size:12px;font-weight:600;color:#ccc;background:#f8f8f8;text-decoration:line-through;">'+all[t]+'</div>';}}
      h+='</div><button id="'+NS+'cfb" disabled style="width:100%;padding:12px;margin-top:14px;background:#ccc;color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:default;font-family:DM Sans,sans-serif;transition:all 0.2s;">Select a time</button></div>';sec.innerHTML=h;
      var pk=null;var tc=sec.querySelectorAll('[data-tm]');
      for(var u=0;u<tc.length;u++)(function(c){c.onmouseenter=function(){if(c.getAttribute('data-tm')!==pk){c.style.outline='1.5px solid #2d6a4f';c.style.transform='scale(1.04)';}};c.onmouseleave=function(){if(c.getAttribute('data-tm')!==pk){c.style.outline='';c.style.transform='';}};c.onclick=function(){var all2=sec.querySelectorAll('[data-tm]');for(var x=0;x<all2.length;x++){all2[x].style.background='#eef6f0';all2[x].style.color='#2d6a4f';all2[x].style.outline='';all2[x].style.transform='';}c.style.background='#2d6a4f';c.style.color='white';pk=c.getAttribute('data-tm');var b=sec.querySelector('#'+NS+'cfb');b.disabled=false;b.style.background='#1a1a2e';b.style.cursor='pointer';b.textContent='Book '+info.displayDate+' at '+pk;};})(tc[u]);
      var cfb=sec.querySelector('#'+NS+'cfb');if(cfb)cfb.onclick=function(){if(!pk)return;var v=info.dayName+', '+info.displayDate+' at '+pk;par.style.pointerEvents='none';par.style.opacity='0.4';addMsg(v,'user');sendWH(v);};
    }
    draw();
  }

  function addQR(reps){
    if(!reps||!reps.length)return;
    if(cState.booking_created){reps=reps.filter(function(r){return(r.value||r.label||r)!=='__SWITCH_TO_BOOKING__';});if(!reps.length)return;}
    var d=$('messages'),c=document.createElement('div');c.className=NS+'qr';
    for(var i=0;i<reps.length;i++)(function(r){
      var b=document.createElement('button');if(r.type==='slot')b.className=NS+'slot';else if(r.type==='custom')b.className=NS+'cust';b.textContent=r.label||r;
      b.onclick=function(){
        c.classList.add(NS+'used');var val=r.value||r.label||r;
        if(val==='__SWITCH_TO_BOOKING__'){currentRoute='booking';addMsg(r.label||r,'user');sendWH("I'd like to schedule a tour");return;}
        if(val==='__SHOW_FAQ_TOPICS__'){currentRoute='faq';addMsg(r.label||r,'user');showFAQTopics();return;}
        if(val==='__DISMISS__'){addMsg(r.label||r,'user');addMsg("You're all set! If you need anything else, just type a message. We look forward to seeing you! \uD83D\uDE0A",'bot');return;}
        addMsg(r.label||r,'user');sendWH(val);
      };
      c.appendChild(b);
    })(reps[i]);
    d.appendChild(c);scr();
  }

  function sendMessage(){var inp=$('input'),m=inp.value.trim();if(!m||busy)return;if(!currentRoute)currentRoute='faq';dis();addMsg(m,'user');inp.value='';sendWH(m);}

  function sendWH(msg){
    if(!msg||!String(msg).trim()){console.warn('[ZENTRUST] Blocked empty send');return;}
    msg=String(msg).trim();
    if(!sendWH._count)sendWH._count=0;sendWH._count++;
    if(sendWH._count>60){addMsg("You've reached the message limit for this session. Please refresh the page to start a new conversation.",'bot');return;}
    dis();
    var now=Date.now();if(sendWH._last&&(now-sendWH._last)<3000&&sendWH._lastMsg===msg){console.warn('[ZENTRUST] Blocked duplicate send');return;}
    sendWH._last=now;sendWH._lastMsg=msg;
    var sb=$('send');busy=true;sb.disabled=true;showTyp();
    recent.push({role:'user',content:msg,timestamp:new Date().toISOString()});if(recent.length>12)recent=recent.slice(-12);
    var payload={session_id:sid,message:msg,route:currentRoute||'booking',client_state:{name:cState.name,email:cState.email,phone:cState.phone,guest_count:cState.guest_count,date_interest:cState.date_interest,tour_date:cState.tour_date,budget_range:cState.budget_range,intent_score:cState.intent_score,wants_booking:cState.wants_booking,booking_created:cState.booking_created,escalated:cState.escalated,status:cState.status,recent_messages:recent}};
    fetch(CFG.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
    .then(function(data){
      hideTyp();
      if(!data.reply||!data.reply.trim()){busy=false;$('send').disabled=false;if(!sendWH._retrying){sendWH._retrying=true;setTimeout(function(){sendWH._retrying=false;sendWH(msg);},1200);}else{sendWH._retrying=false;}return;}
      sendWH._retrying=false;var reply=data.reply;addMsg(reply,'bot');
      recent.push({role:'assistant',content:reply,timestamp:new Date().toISOString()});if(recent.length>12)recent=recent.slice(-12);
      if(data.switch_route==='booking')currentRoute='booking';
      var justBooked=false;
      if(data.client_state){var cs=data.client_state;if(cs.name)cState.name=cs.name;if(cs.email)cState.email=cs.email;if(cs.phone)cState.phone=cs.phone;if(cs.guest_count)cState.guest_count=cs.guest_count;if(cs.date_interest)cState.date_interest=cs.date_interest;if(cs.tour_date)cState.tour_date=cs.tour_date;if(cs.budget_range)cState.budget_range=cs.budget_range;if(cs.intent_score)cState.intent_score=cs.intent_score;if(cs.wants_booking)cState.wants_booking=true;if(cs.booking_created&&!cState.booking_created)justBooked=true;if(cs.booking_created)cState.booking_created=true;if(cs.escalated)cState.escalated=true;if(cs.status)cState.status=cs.status;}
      var type=data.input_type||'text';
      setTimeout(function(){
        try{
          if(justBooked){addMsg("Before you go \u2014 do you have any questions about the venue?",'bot');addQR([{label:'I have questions about the venue',value:'__SHOW_FAQ_TOPICS__'},{label:"No, I'm all set!",value:'__DISMISS__'}]);}
          else if(type==='month_year'){renderMP();}
          else if(type==='date_time_slots'||type==='date_time_custom'){var sv=[];if(data.quick_replies)for(var i=0;i<data.quick_replies.length;i++)if(data.quick_replies[i].type==='slot')sv.push(data.quick_replies[i].value);renderTP(sv,data.available_by_date||{});}
          else if(data.quick_replies&&data.quick_replies.length>0){addQR(data.quick_replies);}
        }catch(e){addMsg('Error: '+e.message,'err');}
      },200);
      busy=false;sb.disabled=false;$('input').focus();
    })
    .catch(function(e){hideTyp();addMsg('Connection error. Please try again.','err');busy=false;$('send').disabled=false;});
  }
})();
