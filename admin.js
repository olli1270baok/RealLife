const ADMIN_PIN = "1234";

function verifyPin() {
  const pin = document.getElementById('pin-field').value;
  if (pin === ADMIN_PIN) {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    loadEditors();
  } else {
    document.getElementById('pin-error').style.display = 'block';
    setTimeout(() => { document.getElementById('pin-error').style.display = 'none'; }, 2000);
  }
}

document.getElementById('pin-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') verifyPin();
});

let currentEditType = null;
let currentEditId = null;

function loadEditors() {
  renderList('TOPICS');
  renderList('CONTACTS');
  renderList('CHECKLIST_GROUPS');
  renderList('GLOSSARY');
  
  document.getElementById('editor-impressum').innerHTML = LEGAL_CONTENT.impressum;
  document.getElementById('editor-datenschutz').innerHTML = LEGAL_CONTENT.datenschutz;

  refreshPremiumUI();
}

function refreshPremiumUI() {
  const isPremium = localStorage.getItem('adultguide_premium') === 'true';
  const label = document.getElementById('premium-status-label');
  if (isPremium) {
    label.textContent = "🥇 VOLLVERSION";
    label.style.color = "#f97316";
  } else {
    label.textContent = "🆓 GRATIS-MODUS";
    label.style.color = "#3b82f6";
  }
}

function togglePremiumStatus() {
  const current = localStorage.getItem('adultguide_premium') === 'true';
  localStorage.setItem('adultguide_premium', (!current).toString());
  refreshPremiumUI();
  // Optional: Kleiner Hinweis
  const label = document.getElementById('premium-status-label');
  label.textContent = "Wird umgeschaltet...";
  setTimeout(() => refreshPremiumUI(), 300);
}

function switchTab(tabId) {
  document.querySelectorAll('.editor-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tabId}`).classList.add('active');
  event.target.classList.add('active');
}

// ============================================
// LIST RENDERING
// ============================================
function renderList(type) {
  let listEl, data;
  if (type === 'TOPICS') { listEl = document.getElementById('list-topics'); data = TOPICS; }
  else if (type === 'CONTACTS') { listEl = document.getElementById('list-contacts'); data = CONTACTS; }
  else if (type === 'CHECKLIST_GROUPS') { listEl = document.getElementById('list-checklists'); data = CHECKLIST_GROUPS; }
  else if (type === 'GLOSSARY') { listEl = document.getElementById('list-glossary'); data = GLOSSARY; }
  
  if(!listEl) return;
  
  listEl.innerHTML = data.map((item, idx) => {
    let name = '';
    let icon = '';
    let identifier = '';
    
    if (type === 'TOPICS') { name = item.title; icon = item.icon || '🏷️'; identifier = item.id; }
    else if (type === 'CONTACTS') { name = item.name; icon = item.icon || '📞'; identifier = item.id; }
    else if (type === 'CHECKLIST_GROUPS') { name = item.group; icon = '✅'; identifier = idx; }
    else if (type === 'GLOSSARY') { name = item.term; icon = '📖'; identifier = idx; }

    return `
      <div class="list-item">
        <div style="display:flex; gap:10px; align-items:center;">
          <span style="font-size:1.5rem">${icon}</span>
          <span style="font-weight:600; color:var(--text-primary)">${name}</span>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn-ghost" onclick="editElement('${type}', '${identifier}')">✏️ Bearbeiten</button>
          <button class="btn-ghost" style="color:#ef4444;" onclick="deleteElement('${type}', '${identifier}')">🗑️ Löschen</button>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================
// CRUD LOGIC
// ============================================
function createNew(type) {
  let newItem;
  if (type === 'TOPICS') newItem = { id: 'neu-' + Date.now(), icon: '❓', color: '#4f8ef7', gradient: 'linear-gradient(...)', title: 'Neues Thema', short: '', tags: [], sections: [{title: 'Sektion 1', content: ''}] };
  else if (type === 'CONTACTS') newItem = { id: 'neu-' + Date.now(), icon: '☎️', color: '#4f8ef7', badge: 'NEU', badgeColor: '#4f8ef7', name: 'Neuer Kontakt', role: '', summary: '', details: [], links: [] };
  else if (type === 'CHECKLIST_GROUPS') newItem = { group: 'Neue Gruppe', items: ['Neue Aufgabe'] };
  else if (type === 'GLOSSARY') newItem = { term: 'Neuer Begriff', def: '' };

  if (type === 'TOPICS') TOPICS.push(newItem);
  else if (type === 'CONTACTS') CONTACTS.push(newItem);
  else if (type === 'CHECKLIST_GROUPS') CHECKLIST_GROUPS.push(newItem);
  else if (type === 'GLOSSARY') GLOSSARY.push(newItem);
  
  saveLocalData();
  renderList(type);
  
  let identifier = (type === 'CHECKLIST_GROUPS' || type === 'GLOSSARY') ? (eval(type).length - 1) : newItem.id;
  editElement(type, identifier);
}

function deleteElement(type, id) {
  if(!confirm('Wirklich löschen?')) return;
  
  if (type === 'TOPICS') TOPICS = TOPICS.filter(t => t.id !== id);
  else if (type === 'CONTACTS') CONTACTS = CONTACTS.filter(t => t.id !== id);
  else if (type === 'CHECKLIST_GROUPS') CHECKLIST_GROUPS.splice(id, 1);
  else if (type === 'GLOSSARY') GLOSSARY.splice(id, 1);
  
  saveLocalData();
  renderList(type);
}

function getItem(type, id) {
  if (type === 'TOPICS') return TOPICS.find(t => t.id === id);
  if (type === 'CONTACTS') return CONTACTS.find(t => t.id === id);
  if (type === 'CHECKLIST_GROUPS') return CHECKLIST_GROUPS[id];
  if (type === 'GLOSSARY') return GLOSSARY[id];
  return null;
}

// ============================================
// MODAL FORMS
// ============================================
function editElement(type, id) {
  currentEditType = type;
  currentEditId = id;
  const item = getItem(type, id);
  if(!item) return;
  
  const container = document.getElementById('edit-form-container');
  let html = '';
  
  if (type === 'TOPICS') {
    html = `
      <div class="form-group"><label>ID (eindeutig, für Link)</label><input type="text" id="f-id" class="form-input" value="${item.id}"></div>
      <div class="form-group"><label>Titel</label><input type="text" id="f-title" class="form-input" value="${item.title}"></div>
      <div class="form-group"><label>Icon (Emoji)</label><input type="text" id="f-icon" class="form-input" value="${item.icon}"></div>
      <div class="form-group"><label>Base Color (Hex)</label><input type="text" id="f-color" class="form-input" value="${item.color}"></div>
      <div class="form-group"><label>Kachel Gradient (CSS)</label><input type="text" id="f-gradient" class="form-input" value="${item.gradient}"></div>
      <div class="form-group"><label>Kurzbeschreibung</label><input type="text" id="f-short" class="form-input" value="${item.short}"></div>
      <div class="form-group"><label>Tags (Kommasepariert)</label><input type="text" id="f-tags" class="form-input" value="${item.tags.join(', ')}"></div>
      
      <h3 style="margin-top:20px; color:var(--text-primary);">Slides / Sektionen <button class="btn-ghost" onclick="addArraySection()">+ Slide</button></h3>
      <div id="f-array-container">
    `;
    item.sections.forEach((sec, i) => {
      html += buildTopicSectionHTML(i, sec);
    });
    html += `</div>`;
  } 
  
  else if (type === 'CONTACTS') {
    html = `
      <div class="form-group"><label>ID</label><input type="text" id="f-id" class="form-input" value="${item.id}"></div>
      <div class="form-group"><label>Icon (Emoji)</label><input type="text" id="f-icon" class="form-input" value="${item.icon}"></div>
      <div class="form-group"><label>Farbe</label><input type="text" id="f-color" class="form-input" value="${item.color}"></div>
      <div class="form-group"><label>Name</label><input type="text" id="f-name" class="form-input" value="${item.name}"></div>
      <div class="form-group"><label>Rolle / Untertitel</label><input type="text" id="f-role" class="form-input" value="${item.role}"></div>
      <div class="form-group"><label>Badge Text (z.B. NEU)</label><input type="text" id="f-badge" class="form-input" value="${item.badge}"></div>
      <div class="form-group"><label>Badge Color</label><input type="text" id="f-badgeColor" class="form-input" value="${item.badgeColor}"></div>
      <div class="form-group"><label>Kurzer Einleitungstext</label><textarea id="f-summary" class="raw-editor" style="height:80px">${item.summary}</textarea></div>
      
      <div class="form-group"><label>Details JSON (Entwickler-Sicht)</label><textarea id="f-details" class="raw-editor" style="height:150px">${JSON.stringify(item.details, null, 2)}</textarea></div>
      <div class="form-group"><label>Links JSON (Entwickler-Sicht)</label><textarea id="f-links" class="raw-editor" style="height:150px">${JSON.stringify(item.links, null, 2)}</textarea></div>
    `;
  }
  
  else if (type === 'CHECKLIST_GROUPS') {
    html = `
      <div class="form-group"><label>Gruppen-Name (z.B. 🏠 Wohnung)</label><input type="text" id="f-group" class="form-input" value="${item.group}"></div>
      <div class="form-group"><label>Aufgaben JSON Array</label><textarea id="f-items" class="raw-editor" style="height:300px">${JSON.stringify(item.items, null, 2)}</textarea></div>
    `;
  }
  
  else if (type === 'GLOSSARY') {
    html = `
      <div class="form-group"><label>Begriff</label><input type="text" id="f-term" class="form-input" value="${item.term}"></div>
      <div class="form-group"><label>Definition</label><textarea id="f-def" class="raw-editor" style="height:150px">${item.def}</textarea></div>
    `;
  }

  container.innerHTML = html;
  document.getElementById('edit-modal-title').textContent = type + ' bearbeiten';
  document.getElementById('edit-overlay').classList.remove('hidden');
  document.getElementById('edit-overlay').style.display = 'flex';
}

function closeEditModal() {
  document.getElementById('edit-overlay').classList.add('hidden');
  document.getElementById('edit-overlay').style.display = 'none';
  currentEditType = null;
  currentEditId = null;
}

// --- Topic Section Builder ---
function buildTopicSectionHTML(i, sec) {
  return `
    <div style="border:1px solid var(--glass-border); padding:15px; margin-bottom:15px; border-radius:8px; background:var(--bg-primary);">
      <div class="form-group">
        <label>Slide ${i+1} - Titel</label>
        <input type="text" id="f-sec-title-${i}" class="form-input" value="${sec.title.replace(/"/g, '&quot;')}">
      </div>
      <div class="form-toolbar">
        <button class="btn-ghost" style="padding:4px 8px; font-size:0.8rem;" onclick="insertCode('f-sec-content-${i}', '<div class=\\'info-card\\'>\\n  <h4>💡 Titel</h4>\\n  <p>Dein Text</p>\\n</div>\\n')">+ Info-Box</button>
        <button class="btn-ghost" style="padding:4px 8px; font-size:0.8rem;" onclick="insertCode('f-sec-content-${i}', '<div class=\\'warning-box\\'>\\n  <div class=\\'warning-box-label\\'>Achtung</div>\\n  <p>Dein Text</p>\\n</div>\\n')">+ Warnung</button>
        <button class="btn-ghost" style="padding:4px 8px; font-size:0.8rem;" onclick="insertCode('f-sec-content-${i}', '<div class=\\'tip-box\\'>\\n  <div class=\\'tip-box-label\\'>💡 Insider</div>\\n  <p>Dein Text</p>\\n</div>\\n')">+ Tipp-Box</button>
        <button class="btn-ghost" style="padding:4px 8px; font-size:0.8rem;" onclick="insertCode('f-sec-content-${i}', '<ul>\\n  <li>Punkt 1</li>\\n  <li>Punkt 2</li>\\n</ul>\\n')">+ Liste</button>
      </div>
      <textarea id="f-sec-content-${i}" class="raw-editor" style="height:250px;">${sec.content}</textarea>
    </div>
  `;
}
function addArraySection() {
  const container = document.getElementById('f-array-container');
  const count = container.children.length;
  container.insertAdjacentHTML('beforeend', buildTopicSectionHTML(count, {title: 'Neue Slide', content: '<p>Text hier</p>'}));
}


// ============================================
// SAVE BACK TO OBJECTS
// ============================================
function saveFormElement() {
  const t = currentEditType;
  const id = currentEditId;
  let item = getItem(t, id);
  if(!item) return;

  try {
    if (t === 'TOPICS') {
      item.id = document.getElementById('f-id').value;
      item.title = document.getElementById('f-title').value;
      item.icon = document.getElementById('f-icon').value;
      item.color = document.getElementById('f-color').value;
      item.gradient = document.getElementById('f-gradient').value;
      item.short = document.getElementById('f-short').value;
      item.tags = document.getElementById('f-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
      
      const secContainer = document.getElementById('f-array-container');
      const count = secContainer.children.length;
      item.sections = [];
      for(let i=0; i<count; i++) {
        const titleEl = document.getElementById(`f-sec-title-${i}`);
        const contentEl = document.getElementById(`f-sec-content-${i}`);
        if(titleEl && contentEl) {
          item.sections.push({ title: titleEl.value, content: contentEl.value });
        }
      }
    }
    else if (t === 'CONTACTS') {
      item.id = document.getElementById('f-id').value;
      item.icon = document.getElementById('f-icon').value;
      item.color = document.getElementById('f-color').value;
      item.name = document.getElementById('f-name').value;
      item.role = document.getElementById('f-role').value;
      item.badge = document.getElementById('f-badge').value;
      item.badgeColor = document.getElementById('f-badgeColor').value;
      item.summary = document.getElementById('f-summary').value;
      item.details = JSON.parse(document.getElementById('f-details').value);
      item.links = JSON.parse(document.getElementById('f-links').value);
    }
    else if (t === 'CHECKLIST_GROUPS') {
      item.group = document.getElementById('f-group').value;
      item.items = JSON.parse(document.getElementById('f-items').value);
    }
    else if (t === 'GLOSSARY') {
      item.term = document.getElementById('f-term').value;
      item.def = document.getElementById('f-def').value;
    }
    
    saveLocalData();
    renderList(t);
    closeEditModal();
    alert('✅ Erfolgreich aktualisiert. (Ist sicher im Browser gespeichert)');
  } catch (e) {
    alert('❌ Fehler beim Speichern (z.B. falsches JSON bei Details): ' + e.message);
  }
}

function saveLegal() {
  LEGAL_CONTENT.impressum = document.getElementById('editor-impressum').innerHTML;
  LEGAL_CONTENT.datenschutz = document.getElementById('editor-datenschutz').innerHTML;
  saveLocalData();
  alert('Rechtstexte gespeichert!');
}

function saveLocalData() {
  const buildData = { TOPICS, CONTACTS, CHECKLIST_GROUPS, GLOSSARY, LEGAL_CONTENT };
  localStorage.setItem('adultguide_custom_data', JSON.stringify(buildData));
}

// ============================================
// HELPERS
// ============================================
function insertCode(elementId, snippet) {
  const el = document.getElementById(elementId);
  if(!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = el.value;
  el.value = text.substring(0, start) + snippet + text.substring(end);
  el.focus();
  el.selectionStart = start + snippet.length;
  el.selectionEnd = start + snippet.length;
}

function resetToFactory() {
  if (confirm('Bist du sicher? Alle lokalen Änderungen werden verworfen und die App lädt wieder den Werkszustand aus dem Code.')) {
    localStorage.removeItem('adultguide_custom_data');
    alert('Zurückgesetzt. Bitte laden.');
    location.reload();
  }
}

function showExport() {
  const buildData = { TOPICS, CONTACTS, CHECKLIST_GROUPS, GLOSSARY, LEGAL_CONTENT };
  document.getElementById('export-output').value = JSON.stringify(buildData, null, 2);
  document.getElementById('export-overlay').style.display = 'flex';
}

function downloadJSON() {
  const str = document.getElementById('export-output').value;
  const blob = new Blob([str], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'adultguide_content_update.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
