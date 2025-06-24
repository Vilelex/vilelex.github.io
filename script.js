let zIndex = 1;

function toggleStartMenu() {
  document.getElementById('start-menu').classList.toggle('hidden');
}

function openWindow(app) {
  const container = document.getElementById('windows-container');
  const win = document.createElement('div');
  win.className = 'window';
  win.style.top = '200px';
  win.style.left = '200px';
  win.style.zIndex = ++zIndex;

  win.innerHTML = `
    <div class="window-header" onmousedown="startDrag(event, this.parentElement)">
      ${app.toUpperCase()} <button onclick="this.closest('.window').remove()">✖</button>
    </div>
    <div class="window-content">
      <iframe src="${app}.html" style="width:100%; height:100%; border:none;"></iframe>
    </div>
  `;

  container.appendChild(win);
}

function startDrag(e, windowEl) {
  e.preventDefault();
  let offsetX = e.clientX - windowEl.offsetLeft;
  let offsetY = e.clientY - windowEl.offsetTop;

  function onMouseMove(ev) {
    windowEl.style.left = ev.clientX - offsetX + 'px';
    windowEl.style.top = ev.clientY - offsetY + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// Live Clock
setInterval(() => {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);
