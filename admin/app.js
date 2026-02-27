const products = [
  { name: '草莓云朵', flavor: '草莓奶油', size: '6寸' },
  { name: '榛果可可', flavor: '巧克力', size: '8寸' }
];
const materials = [];
const $ = (s) => document.querySelector(s);

function render() {
  $('#products').innerHTML = products.map((p, i) => `<li>${p.name}｜${p.flavor}｜${p.size} <button data-del="${i}">删除</button></li>`).join('');
  $('#materials').innerHTML = materials.map(m => `<li>${m}</li>`).join('') || '<li>暂无素材</li>';
}

$('#add').onclick = () => {
  const name = $('#name').value.trim();
  const flavor = $('#flavor').value.trim();
  const size = $('#size').value.trim();
  if (!name) return;
  products.push({ name, flavor: flavor || '-', size: size || '-' });
  $('#name').value = $('#flavor').value = $('#size').value = '';
  render();
};

$('#gen-mat').onclick = () => {
  materials.unshift(`AI 素材包 #${Date.now()%100000}（主图+场景图+15s视频）`);
  render();
};

document.body.addEventListener('click', (e) => {
  const idx = e.target.dataset.del;
  if (idx !== undefined) {
    products.splice(Number(idx), 1);
    render();
  }
});

render();
