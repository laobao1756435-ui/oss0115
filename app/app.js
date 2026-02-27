const state = {
  tab: 'home',
  activeCategory: '全部',
  products: [
    { id: 1, name: '草莓云朵', category: '生日蛋糕', flavor: '草莓奶油', style: '少女', size: '6寸', people: '4-6人', hot: true },
    { id: 2, name: '榛果可可', category: '下午茶', flavor: '巧克力', style: '复古', size: '8寸', people: '8-10人', hot: true },
    { id: 3, name: '节日麋鹿', category: '节日限定', flavor: '香草', style: '节庆', size: '6寸', people: '4-6人', hot: false },
    { id: 4, name: '企业庆典塔', category: '定制款', flavor: '伯爵茶', style: '商务', size: '10寸', people: '12-16人', hot: false }
  ],
  categories: ['全部', '生日蛋糕', '甜品/小食', '下午茶', '定制款', '节日限定'],
  aiWorks: [],
  favorites: { products: [1], ai: [] },
  cases: [
    { id: 1, type: '儿童', title: '海洋小王子' },
    { id: 2, type: '婚礼', title: '白纱花园' },
    { id: 3, type: '企业', title: '品牌发布会' }
  ],
  caseType: '全部',
  chats: [{ from: 'shop', text: '您好，欢迎咨询蛋糕定制～' }]
};

const tabs = [
  ['home', '首页'], ['catalog', '图册'], ['ai', 'AI设计'],
  ['cases', '案例'], ['consult', '咨询'], ['favorites', '收藏']
];

const $ = (s) => document.querySelector(s);

function renderTabs() {
  $('#tabs').innerHTML = tabs.map(([key, label]) => `<button class="${state.tab===key?'active':''}" data-tab="${key}">${label}</button>`).join('');
}

function productCard(p) {
  const fav = state.favorites.products.includes(p.id);
  return `<article class="item"><h4>${p.name}</h4><p>${p.category}｜${p.flavor}</p><p>${p.size}｜${p.people}</p><button data-fav="${p.id}">${fav?'★ 已收藏':'☆ 收藏'}</button></article>`;
}

function renderHome() {
  const tpl = $('#home-template').content.cloneNode(true);
  $('#view').append(tpl);
  $('#banner-list').innerHTML = ['新品上市', 'AI 定制季', '节日限定推荐'].map(t => `<div class="banner">${t}</div>`).join('');
  $('#quick-categories').innerHTML = state.categories.slice(1).map(c=>`<button data-to-catalog="${c}">${c}</button>`).join('');
  $('#hot-products').innerHTML = state.products.filter(p=>p.hot).map(productCard).join('');
}

function renderCatalog() {
  $('#view').append($('#catalog-template').content.cloneNode(true));
  $('#filter-categories').innerHTML = state.categories.map(c=>`<button data-cat="${c}">${c}</button>`).join('');
  const draw = () => {
    const q = $('#search').value?.trim() || '';
    $('#catalog-list').innerHTML = state.products.filter(p =>
      (state.activeCategory==='全部' || p.category===state.activeCategory) &&
      `${p.name}${p.flavor}${p.style}`.includes(q)
    ).map(productCard).join('');
  };
  $('#search').addEventListener('input', draw);
  draw();
}

function renderAI() {
  $('#view').append($('#ai-template').content.cloneNode(true));
  const drawAI = () => {
    $('#ai-images').innerHTML = state.aiWorks.filter(w=>w.type==='image').map((w, i)=>`<article class="item"><h4>${w.title}</h4><p>${w.prompt}</p><button data-save-ai="${i}">收藏方案</button></article>`).join('');
    $('#ai-videos').innerHTML = state.aiWorks.filter(w=>w.type==='video').map(v=>`<li>${v.title}（可保存/分享/咨询）</li>`).join('');
  };
  $('#gen-image').onclick = () => {
    const prompt = [$('#ai-style').value, $('#ai-color').value, $('#ai-theme').value, $('#ai-people').value].filter(Boolean).join(' / ');
    state.aiWorks.unshift({ type: 'image', title: `AI 方案 #${Date.now()%10000}`, prompt: prompt || '默认奶油生日款' });
    drawAI();
  };
  $('#gen-video').onclick = () => {
    state.aiWorks.unshift({ type:'video', title:`视频 #${Date.now()%10000}` });
    drawAI();
  };
  drawAI();
}

function renderCases() {
  $('#view').append($('#cases-template').content.cloneNode(true));
  const types = ['全部', '儿童', '祝寿', '婚礼', '网红', '企业'];
  $('#case-categories').innerHTML = types.map(t=>`<button data-case="${t}">${t}</button>`).join('');
  const draw = () => {
    $('#case-list').innerHTML = state.cases.filter(c=>state.caseType==='全部'||c.type===state.caseType).map(c=>`<article class="item"><h4>${c.title}</h4><p>${c.type}</p><button>咨询同款</button></article>`).join('');
  };
  draw();
}

function renderConsult() {
  $('#view').append($('#consult-template').content.cloneNode(true));
  const draw = () => { $('#chat-log').innerHTML = state.chats.map(m=>`<div class="msg ${m.from==='me'?'me':''}">${m.from==='me'?'我':'商家'}：${m.text}</div>`).join(''); };
  $('#chat-send').onclick = () => {
    const txt = $('#chat-input').value.trim();
    if (!txt) return;
    state.chats.push({ from:'me', text: txt });
    state.chats.push({ from:'shop', text: '已收到，设计师稍后回复您。' });
    $('#chat-input').value = '';
    draw();
  };
  draw();
}

function renderFavorites() {
  $('#view').append($('#favorites-template').content.cloneNode(true));
  $('#fav-products').innerHTML = state.products.filter(p=>state.favorites.products.includes(p.id)).map(productCard).join('') || '<p>暂无收藏款式</p>';
  $('#fav-ai').innerHTML = state.favorites.ai.map(a=>`<li>${a}</li>`).join('') || '<li>暂无收藏 AI 方案</li>';
}

function render() {
  renderTabs();
  $('#view').innerHTML = '';
  ({ home:renderHome, catalog:renderCatalog, ai:renderAI, cases:renderCases, consult:renderConsult, favorites:renderFavorites }[state.tab])();
}

document.body.addEventListener('click', (e) => {
  const tab = e.target.dataset.tab;
  if (tab) { state.tab = tab; render(); }
  const cat = e.target.dataset.cat;
  if (cat) { state.activeCategory = cat; render(); state.tab='catalog'; }
  const toCat = e.target.dataset.toCatalog;
  if (toCat) { state.tab='catalog'; state.activeCategory = toCat; render(); }
  if (e.target.dataset.nav==='ai') { state.tab='ai'; render(); }
  const favId = Number(e.target.dataset.fav);
  if (favId) {
    const i = state.favorites.products.indexOf(favId);
    i >= 0 ? state.favorites.products.splice(i,1) : state.favorites.products.push(favId);
    render();
  }
  const saveAi = e.target.dataset.saveAi;
  if (saveAi !== undefined) {
    const images = state.aiWorks.filter(w=>w.type==='image');
    const work = images[Number(saveAi)];
    if (work) state.favorites.ai.push(work.title);
    render();
  }
  const caseType = e.target.dataset.case;
  if (caseType) { state.caseType = caseType; render(); }
});

render();
