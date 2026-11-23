
const initialSheets = window.lesearkData || [];

// Standard ukenummer
const defaultWeekMapping = {
  "sheet-rim-1": "Uke 34",
  "sheet-rim-2": "Uke 35",
  "sheet-rim-3": "Uke 36",
  "sheet-1": "Uke 37",
  "sheet-2": "Uke 38",
  "sheet-3": "Uke 39",
  "sheet-4": "Uke 41",
  "sheet-5": "Uke 42",
  "sheet-rep-1": "Uke 43",
  "sheet-6": "Uke 44",
  "sheet-7": "Uke 45",
  "sheet-8": "Uke 46",
  "sheet-9": "Uke 47",
  "sheet-10": "Uke 48",
  "sheet-rep-2": "Uke 49",
  "sheet-11": "Uke 50",
  "sheet-12": "Uke 51",
  "sheet-13": "Uke 2",
  "sheet-14": "Uke 3"
};

// Lagring av tilstand
let sheetVisibility = JSON.parse(localStorage.getItem('leseark_visibility')) || {};
let sheetMode = JSON.parse(localStorage.getItem('leseark_sheetmode')) || {};
let sheetWeeks = JSON.parse(localStorage.getItem('leseark_sheetweeks')) || { ...defaultWeekMapping };
let sheetMathVisibility = JSON.parse(localStorage.getItem('leseark_math_visibility')) || {};

let currentSheetId = initialSheets[0] ? initialSheets[0].id : "sheet-1";
let showPageNumbers = localStorage.getItem('leseark_pagenums') !== "false";
let customZoom = null;


// Hent lagret status for ekstraoppgaver ('none', 'math', 'norsk')
let sheetExtraTask = JSON.parse(localStorage.getItem('leseark_extra_task')) || {};

function getExtraTaskMode(sheetId) {
  return sheetExtraTask[sheetId] || 'none'; // 'none', 'math', eller 'norsk'
}

function setExtraTaskMode(e, sheetId, mode) {
  e.stopPropagation();
  sheetExtraTask[sheetId] = mode;
  localStorage.setItem('leseark_extra_task', JSON.stringify(sheetExtraTask));
  renderSidebar();
  renderSheet();
}

function getActiveSheet() {
  return initialSheets.find(s => s.id === currentSheetId) || initialSheets[0];
}

function getMode(sheetId) {
  const sheet = initialSheets.find(s => s.id === sheetId);
  if (sheet && (!sheet.pages || sheet.pages.length <= 1)) {
    return "page1";
  }
  return sheetMode[sheetId] || "both";
}

function getWeekText(sheetId) {
  return sheetWeeks[sheetId] || defaultWeekMapping[sheetId] || "";
}

function updateHeaderOptions() {
  const pageCheck = document.getElementById('showPageNumbersCheck');
  if (pageCheck) showPageNumbers = pageCheck.checked;
  localStorage.setItem('leseark_pagenums', showPageNumbers);
  renderSheet();
}

// MODAL-FUNKSJONER FOR UKENUMMERE
function openWeekModal() {
  const container = document.getElementById('weekModalList');
  if (!container) return;
  container.innerHTML = '';

  initialSheets.forEach((sheet) => {
    const isHidden = sheetVisibility[sheet.id] === true;
    const currentVal = getWeekText(sheet.id);

    const item = document.createElement('div');
    item.className = `flex items-center justify-between p-2.5 rounded-xl border ${isHidden ? 'bg-slate-50 border-slate-200 opacity-50' : 'bg-white border-slate-200'}`;

    item.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-700">${sheet.title}</span>
        ${isHidden ? '<span class="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Skjult</span>' : ''}
      </div>
      <input type="text"
             id="week-input-${sheet.id}"
             value="${currentVal}"
             class="w-28 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-right">
    `;
    container.appendChild(item);
  });

  document.getElementById('weekModal').classList.remove('hidden');
}

function closeWeekModal() {
  document.getElementById('weekModal').classList.add('hidden');
}

function saveWeekSettings() {
  initialSheets.forEach(sheet => {
    const input = document.getElementById(`week-input-${sheet.id}`);
    if (input) {
      sheetWeeks[sheet.id] = input.value;
    }
  });

  localStorage.setItem('leseark_sheetweeks', JSON.stringify(sheetWeeks));
  closeWeekModal();
  renderSheet();
}

function resetDefaultWeeks() {
  sheetWeeks = { ...defaultWeekMapping };
  localStorage.setItem('leseark_sheetweeks', JSON.stringify(sheetWeeks));
  openWeekModal();
  renderSheet();
}

function toggleHideSheet(e, id) {
  e.stopPropagation();
  sheetVisibility[id] = !sheetVisibility[id];
  localStorage.setItem('leseark_visibility', JSON.stringify(sheetVisibility));
  renderSidebar();
  renderSheet();
}

function setSheetMode(e, sheetId, mode) {
  e.stopPropagation();
  sheetMode[sheetId] = mode;
  localStorage.setItem('leseark_sheetmode', JSON.stringify(sheetMode));
  renderSidebar();
  renderSheet();
}

// VIS / SKJUL MATTEOPPGAVE FOR DET AKTUELLE LESEARKET
function toggleMathTask(e, sheetId) {
    e.stopPropagation();

    sheetMathVisibility[sheetId] = !sheetMathVisibility[sheetId];

    localStorage.setItem(
        'leseark_math_visibility',
        JSON.stringify(sheetMathVisibility)
    );

    renderSidebar();
    renderSheet();
}


function renderSidebar() {
  const container = document.getElementById('sheetsList');
  if (!container) return;

  // Ta vare på nåværende rulleposisjon i sidemenyen
  const sidebar = container.closest('.sidebar-panel');
  const savedScrollTop = sidebar ? sidebar.scrollTop : 0;

  container.innerHTML = '';

  initialSheets.forEach(sheet => {
    const isActive = sheet.id === currentSheetId;
    const isHidden = sheetVisibility[sheet.id] === true;
    const currentMode = getMode(sheet.id);
    const weekStr = getWeekText(sheet.id);

// Sjekk om arket har mer enn én side, og om det har matte- eller norsk-oppgave
    const pages = sheet.pages || [sheet];
    const hasTwoPages = pages.length > 1;
    const hasMathTask = pages.some(page => page.mathTask);
    const hasNorskTask = pages.some(page => page.norskTask);

    // Hent gjeldende valg ('none', 'math', eller 'norsk')
    const currentExtraMode = getExtraTaskMode(sheet.id);

    const btn = document.createElement('div');
    btn.dataset.sheetId = sheet.id; // Brukes av selectSheet() for rask markering

    btn.className = `
      sheet-menu-item
      ${isActive ? 'sheet-menu-active' : ''}
      ${isHidden ? 'sheet-menu-hidden' : ''}
    `;

    btn.innerHTML = `
      <!-- RAD 1: ARKNAVN, UKENUMMER OG VIS/SKJUL -->
      <div class="sheet-menu-header">

        <div
          class="sheet-menu-title"
          onclick="selectSheet('${sheet.id}')"
          title="${sheet.title}"
        >
          <i class="fa-solid fa-file-lines sheet-menu-icon"></i>

          <span class="sheet-menu-name ${isHidden ? 'line-through' : ''}">
            ${sheet.title}
          </span>

          ${weekStr ? `
            <span class="sheet-menu-week">
              ${weekStr}
            </span>
          ` : ''}
        </div>

        <button
          onclick="toggleHideSheet(event, '${sheet.id}')"
          class="sheet-menu-eye"
          title="${isHidden ? 'Vis ark' : 'Skjul ark'}"
        >
          <i class="fa-solid ${isHidden ? 'fa-eye-slash' : 'fa-eye'}"></i>
        </button>

      </div>

      ${!isHidden && (hasTwoPages || hasMathTask || hasNorskTask) ? `

        <!-- RAD 2: SIDEVALG OG 3-DELT EKSTRAOPPGAVE-VELGER -->
        <div class="sheet-menu-options flex-wrap">

          ${hasTwoPages ? `
            <button
              onclick="setSheetMode(event, '${sheet.id}', 'page1')"
              class="sheet-mode-button ${currentMode === 'page1' ? 'sheet-mode-active' : ''}"
            >
              Kun side 1
            </button>

            <button
              onclick="setSheetMode(event, '${sheet.id}', 'both')"
              class="sheet-mode-button ${currentMode === 'both' ? 'sheet-mode-active' : ''}"
            >
              Side 1 og 2
            </button>
          ` : ''}

          ${(hasMathTask || hasNorskTask) ? `
            <div class="sheet-extra-toggle ml-auto">
              <button 
                onclick="setExtraTaskMode(event, '${sheet.id}', 'none')" 
                class="sheet-extra-btn ${currentExtraMode === 'none' ? '!bg-slate-700 !text-white font-bold' : ''}"
                title="Ingen ekstraoppgave"
              >
                Ingen
              </button>

              ${hasMathTask ? `
                <button 
                  onclick="setExtraTaskMode(event, '${sheet.id}', 'math')" 
                  class="sheet-extra-btn ${currentExtraMode === 'math' ? 'active-math' : ''}"
                  title="Vis matteoppgave"
                >
                  <i class="fa-solid fa-calculator"></i> Matte
                </button>
              ` : ''}

              ${hasNorskTask ? `
                <button 
                  onclick="setExtraTaskMode(event, '${sheet.id}', 'norsk')" 
                  class="sheet-extra-btn ${currentExtraMode === 'norsk' ? 'active-norsk' : ''}"
                  title="Vis norskoppgave"
                >
                  <i class="fa-solid fa-pen-line"></i> Norsk
                </button>
              ` : ''}
            </div>
          ` : ''}

        </div>

      ` : ''}
    `;

container.appendChild(btn);
  });

  // Gjenopprett rulleposisjonen slik at menyen ikke hopper
  if (sidebar) {
    sidebar.scrollTop = savedScrollTop;
  }
}


let skipScrollSyncUntil = 0;

function selectSheet(id) {
  currentSheetId = id;

  // Vis arket automatisk hvis det er skjult med øye-ikonet
  if (sheetVisibility[id] === true) {
    sheetVisibility[id] = false;
    localStorage.setItem('leseark_visibility', JSON.stringify(sheetVisibility));
    renderSidebar();
    renderSheet();
  } else {
    highlightAndScrollSidebar(id, false);
  }

  // Rull mykt til første side i valgt ark på høyresiden
  const targetPage = document.getElementById(`paperCanvas-${id}-0`);
  if (targetPage) {
    skipScrollSyncUntil = Date.now() + 800;
    targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function highlightAndScrollSidebar(activeId, shouldScrollSidebar = true) {
  const menuItems = document.querySelectorAll('#sheetsList .sheet-menu-item');
  let activeItem = null;

  menuItems.forEach(item => {
    if (item.dataset.sheetId === activeId) {
      item.classList.add('sheet-menu-active');
      activeItem = item;
    } else {
      item.classList.remove('sheet-menu-active');
    }
  });

  if (!shouldScrollSidebar || !activeItem) return;

  // Finn elementet som har rullefeltet i venstremenyen (enten #sheetsList eller .sidebar-panel)
  const listEl = document.getElementById('sheetsList');
  const sidebarEl = document.querySelector('.sidebar-panel');
  const scrollBox = (listEl && listEl.scrollHeight > listEl.clientHeight) ? listEl : sidebarEl;

  if (scrollBox) {
    const boxRect = scrollBox.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const margin = 24;

    if (itemRect.top < boxRect.top + margin) {
      scrollBox.scrollTop += (itemRect.top - boxRect.top) - margin;
    } else if (itemRect.bottom > boxRect.bottom - margin) {
      scrollBox.scrollTop += (itemRect.bottom - boxRect.bottom) + margin;
    }
  }
}


// Synkroniser venstremenyen umiddelbart når brukeren ruller på høyresiden
window.addEventListener('scroll', function(e) {
  // Ignorer rulling som skjer inne i venstremenyen
  if (e.target && e.target.closest && e.target.closest('.sidebar-panel')) return;

  // Ikke overstyr rett etter et klikk i venstremenyen
  if (Date.now() < skipScrollSyncUntil) return;

  const viewport = document.getElementById('viewportContainer');
  if (!viewport) return;

  const pages = viewport.querySelectorAll('.print-page');
  if (!pages.length) return;

  const screenMid = window.innerHeight * 0.5;
  let detectedSheetId = null;
  let closestDistance = Infinity;

  for (let i = 0; i < pages.length; i++) {
    const rect = pages[i].getBoundingClientRect();

    // Hvis et ark krysser midtlinjen på skjermen, velg det med en gang
    if (rect.top <= screenMid && rect.bottom >= screenMid) {
      detectedSheetId = pages[i].dataset.sheetId;
      break;
    }

    // Ellers (når midtlinjen er i det grå mellomrommet): finn arket som er nærmest midten
    const pageMid = (rect.top + rect.bottom) / 2;
    const distance = Math.abs(pageMid - screenMid);
    if (distance < closestDistance) {
      closestDistance = distance;
      detectedSheetId = pages[i].dataset.sheetId;
    }
  }

  if (detectedSheetId && detectedSheetId !== currentSheetId) {
    currentSheetId = detectedSheetId;
    highlightAndScrollSidebar(detectedSheetId, true);
  }
}, true);

// BEREGNING AV GLOBAL SIDETELLING FOR HEFTE
function calculateGlobalPages() {
  let totalCount = 0;
  const pageMapping = {};

  initialSheets.forEach(sheet => {
    if (sheetVisibility[sheet.id] === true) return;

    const mode = getMode(sheet.id);
    const pages = sheet.pages || [sheet];

    pages.forEach((page, pIdx) => {
      if (pIdx === 0 || mode === 'both') {
        totalCount++;
        pageMapping[`${sheet.id}-${pIdx}`] = totalCount;
      }
    });
  });

  return { totalCount, pageMapping };
}

// ZOOM-FUNKSJONER
function updatePageScale() {
    const container = document.getElementById('viewportContainer');
    const pages = Array.from(
        document.querySelectorAll('.print-page')
    );

    if (!container || pages.length === 0) return;

    const firstPage = pages[0];

    const pageW = firstPage.offsetWidth;
    const pageH = firstPage.offsetHeight;

    if (!pageW || !pageH) return;

    const padding = 8;
    const containerW = container.clientWidth - padding;
    const containerH = container.clientHeight - padding;

    let scale;

    if (customZoom !== null) {
        scale = customZoom;
    } else {
        const scaleW = containerW / pageW;
        const scaleH = containerH / pageH;

        scale = Math.min(scaleW, scaleH, 1);
    }

    pages.forEach((page, index) => {

        page.style.marginTop = '0px';
        page.style.transform = `scale(${scale})`;
        page.style.transformOrigin = 'top center';
        // Finn neste side.
        const nextPage = pages[index + 1];

        // Sjekk om neste side tilhører et annet lesehefteark.
        const isLastPageOfSheet =
            !nextPage ||
            nextPage.dataset.sheetId !== page.dataset.sheetId;

        // Avstand mellom sidene.
        const normalSpacing = 10;
        const sheetEndSpacing = 65;

        const spacing = isLastPageOfSheet
            ? normalSpacing + sheetEndSpacing
            : normalSpacing;

        // Kompenser for skaleringen og legg til luft.
        page.style.marginBottom =
            `${(scale - 1) * pageH + spacing * scale}px`;
    });

    const zoomText = document.getElementById('zoomValText');

    if (zoomText) {
        zoomText.innerText = customZoom !== null
            ? `${Math.round(scale * 100)}%`
            : `Auto (${Math.round(scale * 100)}%)`;
    }
}

// Manuell zoom inn og ut.
function changeZoom(delta) {
    const page = document.querySelector('.print-page');
    if (!page) return;

    const currentMatrix = window.getComputedStyle(page).transform;
    let currentScale = 1;

    if (currentMatrix !== 'none') {
        const values = currentMatrix.split('(')[1].split(')')[0].split(',');
        currentScale = parseFloat(values[0]);
    }

    customZoom = Math.min(
        Math.max((customZoom || currentScale) + delta, 0.3),
        2.0
    );

    updatePageScale();
}


// Tilbakestill til automatisk tilpasning.
function resetZoom() {
    customZoom = null;
    updatePageScale();
}


// Tilpass arket når vinduet endrer størrelse.
window.addEventListener('resize', updatePageScale);

// Rendrer gammel lydoppgave
function renderSoundTask(page) {
  if (!page.soundTaskType) return '';

  if (page.soundTaskType === "centerLetters") {
    return `
      <div class="task-spacing sound-task-container relative text-center mt-2">
        <div class="text-center font-bold text-2xl text-slate-900 mb-2">
          ${page.soundTaskQuestion || ''}
        </div>

        <div class="flex items-center justify-center gap-4 my-1">
          <div class="w-48 h-36 flex items-center justify-center">
            ${page.soundTaskImages?.left?.imageSrc ? `<img src="${page.soundTaskImages.left.imageSrc}" class="max-h-full max-w-full object-contain">` : ''}
          </div>

          <div class="flex gap-10 text-8xl font-bold tracking-widest px-6">
            ${page.soundTaskLetters ? page.soundTaskLetters.map(l => `<span class="${l.color}">${l.char}</span>`).join('') : ''}
          </div>

          <div class="w-32 h-40 flex items-center justify-center">
            ${page.soundTaskImages?.right?.imageSrc ? `<img src="${page.soundTaskImages.right.imageSrc}" class="max-h-full max-w-full object-contain">` : ''}
          </div>
        </div>

        <div class="flex justify-center items-center gap-16 mt-1 pl-12">
          <div class="w-36 h-24 flex items-center justify-center">
            ${page.soundTaskImages?.bottomLeft?.imageSrc ? `<img src="${page.soundTaskImages.bottomLeft.imageSrc}" class="max-h-full max-w-full object-contain">` : ''}
          </div>
          <div class="w-28 h-28 flex items-center justify-center">
            ${page.soundTaskImages?.bottomRight?.imageSrc ? `<img src="${page.soundTaskImages.bottomRight.imageSrc}" class="max-h-full max-w-full object-contain">` : ''}
          </div>
        </div>
      </div>
    `;
  }
  return '';
}



function renderRhymeMatchTask(page) {
  if (!page.rhymeMatchTask) return '';
  const task = page.rhymeMatchTask;

  return `
    <div class="mt-2 px-8 flex flex-col">
      <div class="mb-4">
        <h3 class="text-2xl font-bold text-slate-900 leading-tight">
          ${task.title || 'Hvilke ord rimer?'}
        </h3>
        <p class="text-base text-slate-700 mt-0.5">
          ${task.instruction || 'Sett strek mellom ordene som rimer.'}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-x-44 gap-y-4 items-center justify-items-center">
        ${task.rows.map(row => `
          <div class="flex items-center justify-center w-24 h-20">
            <img src="${row.left.image}" alt="${row.left.alt || ''}" class="max-h-full max-w-full object-contain">
          </div>
          <div class="flex items-center justify-center w-24 h-20">
            <img src="${row.right.image}" alt="${row.right.alt || ''}" class="max-h-full max-w-full object-contain">
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSyllableTask(page) {
  if (!page.syllableTask) return '';
  const task = page.syllableTask;

  return `
    <div class="mt-7 pt-5 border-t-2 border-slate-200 px-8 flex flex-col">
      <div class="mb-4">
        <h3 class="text-2xl font-bold text-slate-900 leading-tight">
          ${task.title || 'Hvor mange stavelser?'}
        </h3>
        <p class="text-base text-slate-700 mt-0.5">
          ${task.instruction || 'Marker hvor mange stavelser du hører i ordet.'}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-x-20 gap-y-5 items-center justify-items-center">
        ${task.items.map(item => `
          <div class="flex flex-col items-center">
            <div class="flex items-center justify-center w-28 h-24 mb-2">
              <img src="${item.image}" alt="${item.alt || ''}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="flex items-center gap-2.5">
              ${[1, 2, 3, 4].map(num => `
                <span class="w-8 h-8 rounded-full bg-amber-300 border-2 border-amber-400 text-slate-900 font-bold text-lg flex items-center justify-center shadow-xs">
                  ${num}
                </span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


function renderLetterRow(rawString) {
  if (!rawString) return '';
  const items = rawString.trim().split(/\s+/);
  return items.map(item => `<span>${item}</span>`).join('');
}




function renderLetterBanner(lettersInput, useUppercase = false) {
  let cleanStr = Array.isArray(lettersInput)
    ? lettersInput.join('')
    : String(lettersInput || '').trim();

  const isAlphabetSheet =
    cleanStr.toLowerCase().includes('gratulerer') ||
    cleanStr.toLowerCase().includes('alfabet');

  if (isAlphabetSheet) {
    cleanStr = 'AÅ';
  } else if (cleanStr.toLowerCase().includes('repetisjon')) {
    const parenMatch = cleanStr.match(/\(([^)]+)\)/);
    cleanStr = parenMatch ? parenMatch[1] : cleanStr.replace(/repetisjon/i, '');
  } else if (/[-–—]/.test(cleanStr)) {
    cleanStr = cleanStr.split(/[-–—]/).pop().trim();
  }

  // Henter ut kun rene bokstaver (uten komma og mellomrom)
  let rawLetters = cleanStr.split('').filter(c => /[a-zæøåA-ZÆØÅ]/.test(c));
  const isManyLetters = !isAlphabetSheet && rawLetters.length > 3;

  // Fjerner duplikater på repetisjonsark slik at hver bokstav bare vises én gang
  if (isManyLetters) {
    rawLetters = [...new Set(rawLetters.map(c => c.toLowerCase()))];
  }

  const displayChars = isAlphabetSheet
    ? ['a', 'til', 'å']
    : rawLetters.map(c =>
        isManyLetters ? c : (useUppercase ? c.toUpperCase() : c.toLowerCase())
      );

  const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'æ', 'ø', 'å'];

  // Bokstaver som bruker loft (øvre sone) og kjeller (nedre sone)
  const ascenders = ['b', 'd', 'f', 'h', 'i', 'j', 'k', 'l', 't', 'å'];
  const descenders = ['g', 'j', 'p', 'q', 'y'];

  const hasTop = displayChars.some(c => c === c.toUpperCase() || ascenders.includes(c));
  const hasBottom = displayChars.some(c => c === c.toLowerCase() && descenders.includes(c));

  // Utsnitt som sentrerer bokstavene inni den faste boksen
  let viewY = 28;
  let viewH = 56;
  let svgHeight = 58;

  if (hasTop && hasBottom) {
    viewY = 6;
    viewH = 102;
    svgHeight = 76;
  } else if (hasTop) {
    viewY = 6;
    viewH = 78;
    svgHeight = 74;
  } else if (hasBottom) {
    viewY = 28;
    viewH = 78;
    svgHeight = 74;
  }

  // Mindre bokstaver når det er repetisjonsboks
  if (isManyLetters) {
    svgHeight = Math.round(svgHeight * 0.42); // ca. 31px høyde per bokstav
  }

  const svgWidth = isManyLetters ? 44 : 82;
  const strokeW = isManyLetters ? '3.5' : '4.5';

  const makeLetterSvg = (displayChar, idx) => {
    if (displayChar === 'til') {
      return `
        <svg viewBox="0 ${viewY} 115 ${viewH}" style="height: ${svgHeight}px;" class="w-auto overflow-visible select-none">
          <text
            x="57.5"
            y="78"
            text-anchor="middle"
            class="font-trykkskrift"
            font-size="76"
            font-weight="700"
            fill="#ffffff"
          >til</text>
        </svg>
      `;
    }

    const isVowel = vowels.includes(displayChar.toLowerCase());
    const fillColor = isVowel ? '#f00000' : '#0084ff';

    return `
      <svg viewBox="0 ${viewY} ${svgWidth} ${viewH}" style="height: ${svgHeight}px;" class="w-auto overflow-visible select-none">
        <text
          x="${svgWidth / 2}"
          y="78"
          text-anchor="middle"
          class="font-trykkskrift"
          font-size="92"
          font-weight="700"
          fill="${fillColor}"
          stroke="#ffffff"
          stroke-width="${strokeW}"
          paint-order="stroke fill"
          stroke-linejoin="round"
        >${displayChar}</text>
      </svg>
    `;
  };

  // Fordeler på 2 linjer hvis det er mange bokstaver (f.eks. 5 på linje 1 og 5 på linje 2)
  let letterContent = '';
  if (isManyLetters) {
    const mid = Math.ceil(displayChars.length / 2);
    const row1 = displayChars.slice(0, mid).map((ch, idx) => makeLetterSvg(ch, idx)).join('');
    const row2 = displayChars.slice(mid).map((ch, idx) => makeLetterSvg(ch, idx + mid)).join('');
    letterContent = `
      <div class="flex-1 flex flex-col items-center justify-center gap-1.5 mt-0.5">
        <div class="flex items-center justify-center gap-2">${row1}</div>
        <div class="flex items-center justify-center gap-2">${row2}</div>
      </div>
    `;
  } else {
    const row = displayChars.map((ch, idx) => makeLetterSvg(ch, idx)).join('');
    letterContent = `
      <div class="flex-1 flex items-center justify-center ${isAlphabetSheet ? 'gap-1' : 'gap-4'}">
        ${row}
      </div>
    `;
  }

  const headerText = isAlphabetSheet
    ? 'Hele alfabetet:'
    : (isManyLetters ? 'Repetisjon av bokstavene:' : 'Ukens bokstaver:');

  const headerSpans = headerText.split('').map((ch, idx) => {
    const startSize = isManyLetters ? 23.5 : 29.5;
    const endSize = isManyLetters ? 18.5 : 22.5;
    const size = (startSize - (idx * ((startSize - endSize) / Math.max(1, headerText.length - 1)))).toFixed(1);
    return `<tspan font-size="${size}">${ch}</tspan>`;
  }).join('');

  const svgHeaderWidth = isManyLetters ? 'w-[228px]' : 'w-[232px]';
  const boxPaddingX = isManyLetters ? 'px-3.5' : 'px-5';

  return `
    <div class="inline-flex flex-col items-center h-[144px] bg-white rounded-xl p-[4px] shadow-md border-[1.5px] border-slate-400">
      <div class="w-full h-full bg-black rounded-[8px] ${boxPaddingX} pt-1.5 pb-2.5 flex flex-col items-center justify-between">
        
        <!-- Buet overskrift + lys blå bue -->
        <div class="flex flex-col items-center shrink-0">
          <svg viewBox="0 0 245 42" class="${svgHeaderWidth} h-[38px] overflow-visible select-none">
            <defs>
              <path id="ukensBue" d="M 8 33 Q 122.5 19 237 33" />
            </defs>
            <text
              fill="#ffffff"
              text-anchor="middle"
              class="font-trykkskrift"
              font-weight="700"
            >
              <textPath href="#ukensBue" startOffset="50%">${headerSpans}</textPath>
            </text>
            <path
              d="M 6 37 Q 122.5 22.5 239 37 Q 122.5 29 6 37 Z"
              fill="#38bdf8"
            />
          </svg>
        </div>

        <!-- Sentrert bokstavfelt inni det resterende svarte arealet -->
        ${letterContent}

      </div>
    </div>
  `;
}


// HELPER FOR REN SIDEGENERERING
function renderPageHTML(activeSheet, page, realPageIndex, globalPageNumber, totalCount, mode) {
  const pagesData = activeSheet.pages || [activeSheet];
  const weekTextForSheet = getWeekText(activeSheet.id);

  const hasNextPageOnSheet = (realPageIndex === 0) && (mode === 'both') && (pagesData.length > 1);

  let footerNotice = "";

  if (realPageIndex === 0 && hasNextPageOnSheet) {
    if (page.nextPageNotice || activeSheet.nextPageNotice) {
      footerNotice = page.nextPageNotice || activeSheet.nextPageNotice;
    } else {
      const sheetNum = parseInt(activeSheet.id.replace('sheet-', ''), 10);
      footerNotice = (sheetNum <= 6)
        ? "Ekstra leselekse på neste side."
        : "Leselekse på neste side.";
    }
  }

  const isSpecialPage = page.type === 'cover' || page.type === 'toc';
  const lastVisiblePageIndex = (mode === 'both' && pagesData.length > 1) ? pagesData.length - 1 : 0;
  const isLastPageOfSheet = realPageIndex === lastVisiblePageIndex;

  return `
    <div
      id="paperCanvas-${activeSheet.id}-${realPageIndex}"
      data-sheet-id="${activeSheet.id}"
      data-sheet-end="${isLastPageOfSheet}"
      class="a4-preview print-page text-slate-900 relative flex flex-col justify-between font-trykkskrift size-normal border-none mb-0 print:mb-0">

<!-- TOPPTEKST -->
      ${!isSpecialPage ? `
        <div style="transform: translateY(-12px);" class="flex justify-between items-end h-[25px] text-lg leading-none font-bold text-slate-700 mb-2 pb-2 border-b-2 border-slate-300 relative">
          <span>${activeSheet.title || ''}</span>
          <span>Hånes skole${weekTextForSheet ? ` – ${weekTextForSheet}` : ''}</span>
        </div>
      ` : ''}

<!-- HEADER BOKSTAVER (3-delt svart felt) -->
      ${(page.letters || activeSheet.letters || page.headerImage) && !isSpecialPage ? `
        <div class="flex justify-center mb-2">
          ${renderLetterBanner(
            page.letters || activeSheet.letters || activeSheet.title,
            page.uppercaseLetters ?? activeSheet.uppercaseLetters ?? false
          )}
        </div>
      ` : ''}

<!-- FORSIDE -->
      ${page.type === 'cover' ? `
        <div style="position: absolute; top: 14mm; left: 14mm; right: 14mm; bottom: 14mm;" class="flex flex-col items-center text-center overflow-hidden bg-white rounded-2xl border-[3px] border-sky-700">
          <div class="absolute inset-1 border border-slate-200 rounded-xl pointer-events-none z-20"></div>
          <div class="absolute top-0 left-0 right-0 h-10 overflow-hidden pointer-events-none">
            <div class="absolute -top-9 left-1/4 w-2/3 h-16 bg-sky-100 rounded-full"></div>
            <div class="absolute -top-12 right-0 w-1/2 h-20 bg-sky-200 rounded-full opacity-80"></div>
          </div>

          <div class="relative z-10 mt-10 px-5 w-full">
            <h1 class="text-[44px] font-bold text-slate-900 leading-tight mt-3">
              ${page.title}
            </h1>
            <div class="w-[74%] h-[6px] mx-auto mt-2.5 rounded-full bg-sky-400"></div>

            ${page.subtitle ? `
              <p class="text-[22px] text-slate-500 font-medium mt-3">
                ${page.subtitle}
              </p>
            ` : ''}
          </div>

${page.bulletPoints ? `
            <div class="relative z-10 w-[65%] mt-6 bg-sky-100/80 border-[2px] border-sky-300 rounded-2xl px-6 py-4 text-left">
              <ul class="space-y-1.5 text-slate-800 text-[16px] font-medium">
                ${page.bulletPoints.map(bp => `
                  <li class="flex items-start gap-3">
                    <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-600 mt-1.5 shrink-0"></span>
                    <span class="leading-snug">${bp}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

${page.coverImage ? `
            <div class="relative z-10 w-[83%] mt-5">
              <div class="bg-sky-100/80 border-[3.5px] border-sky-600 rounded-3xl px-3 py-5">
                <div class="w-full h-[305px] flex items-center justify-center">
                  <img src="${page.coverImage}" alt="Barn som leser bøker" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          ` : ''}

<!-- Navneboks (samme bredde som forklaringsboksen) -->
          <div class="relative z-10 w-[65%] my-auto bg-white border-[1.5px] border-sky-300 rounded-2xl px-6 pt-8 pb-3 text-left">
            <div class="flex items-end gap-2.5 text-slate-600 text-[18px] font-medium">
              <span>Navn:</span>
              <div class="flex-1 border-[1.5px] border-sky-700 mb-2"></div>
            </div>
          </div>

          <div class="relative z-10 mb-7 flex items-center justify-center gap-4 w-full px-10">
            <div class="h-[2px] flex-1 max-w-28 bg-sky-400"></div>
            <span class="text-slate-700 font-extrabold text-sm tracking-widest uppercase whitespace-nowrap">
              ${page.schoolName || ''}
            </span>
            <div class="h-[2px] flex-1 max-w-28 bg-sky-400"></div>
          </div>

          <div class="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none">
            <div class="absolute -bottom-9 -left-10 w-[120%] h-16 bg-sky-100 rounded-[50%]"></div>
            <div class="absolute -bottom-12 -right-10 w-[120%] h-16 bg-sky-300 rounded-[50%] opacity-80"></div>
          </div>
        </div>
      ` : ''}


<!-- INNHOLDSFORTEGNELSE -->
      ${page.type === 'toc' ? `
        <div class="flex-1 flex flex-col justify-start py-2 px-6 font-trykkskrift">
          <div class="border-b-2 border-indigo-500 pb-2 mb-3 flex justify-between items-end">
            <h2 class="text-4xl font-bold text-slate-900">${page.title || 'Innholdsfortegnelse'}</h2>
            <span class="text-base font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Hånes skole</span>
          </div>
          <div class="space-y-2 text-slate-800">
            ${(() => {
              let currentPageCounter = 3;
              return (window.lesearkData || [])
                .filter(sheet => sheet.id !== 'sheet-0' && sheetVisibility[sheet.id] !== true)
                .map(sheet => {
                  const modeForSheet = getMode(sheet.id);
                  const weekText = getWeekText(sheet.id);
                  const sheetTitle = sheet.title || '';
                  const subtitle = sheet.subtitle ? `(${sheet.subtitle.toLowerCase()})` : '';
                  const pageCount = modeForSheet === 'both' ? 2 : 1;
                  const pageRange = pageCount === 2
                    ? `s. ${currentPageCounter}–${currentPageCounter + 1}`
                    : `s. ${currentPageCounter}`;
                  currentPageCounter += pageCount;

                  return `
                    <div class="flex justify-between items-baseline border-b border-slate-100 pb-1 whitespace-nowrap">
                      <div class="flex items-baseline gap-2 min-w-0">
                        <span class="font-bold text-indigo-600 text-base shrink-0 w-16">${weekText}</span>
                        <span class="font-semibold text-slate-900 text-base shrink-0">${sheetTitle}</span>
                        <span class="text-slate-400 text-sm font-normal">${subtitle}</span>
                      </div>
                      <div class="flex-1 border-b border-dotted border-slate-300 mx-2 min-w-[10px]"></div>
                      <span class="font-medium text-slate-600 font-trykkskrift text-base shrink-0">${pageRange}</span>
                    </div>
                  `;
                }).join('');
            })()}
          </div>
        </div>
      ` : ''}

      <!-- HOVEDINNHOLD LESEARK -->
      ${!isSpecialPage ? `
        <div class="flex flex-col justify-between flex-1 my-1">

          ${page.learnedLetters ? `
            <div class="mb-4 pl-8 pr-8">
              <h2 class="text-4xl font-bold text-slate-900 mb-3">${page.learnedLettersTitle || 'Les tre ganger:'}</h2>
              <div class="space-y-2 pl-2 ${activeSheet.id === 'sheet-diplom' ? 'w-full' : 'max-w-xl'}">
                <div class="reading-font ${activeSheet.id === 'sheet-diplom' ? 'text-xl tracking-tight' : 'text-3xl'} text-slate-900 flex justify-between items-center">${renderLetterRow(page.learnedLetters)}</div>
                <div class="reading-font ${activeSheet.id === 'sheet-diplom' ? 'text-xl tracking-tight' : 'text-3xl'} text-slate-800 flex justify-between items-center">${renderLetterRow(page.learnedLettersSmall)}</div>
              </div>
            </div>
          ` : ''}

${page.words && page.words.length > 0 ? `
            <div class="my-4 pl-8">
              <h3 class="text-4xl font-bold text-slate-900 mb-4">${page.wordsTitle || 'Les tre ganger:'}</h3>
              <div class="flex justify-between items-start pr-8">
                <div class="${['sheet-13', 'sheet-14'].includes(activeSheet.id) ? 'flex flex-nowrap justify-between items-center gap-x-3 w-full' : `flex flex-wrap gap-y-3 ${page.wordsSideImage ? 'gap-x-5 max-w-[435px]' : 'gap-x-8 max-w-xl w-full'}`}">
                  ${page.words.map(w => w.lineBreak
                    ? `<div class="basis-full h-0"></div>`
                    : `<span class="reading-font ${['sheet-13', 'sheet-14'].includes(activeSheet.id) ? 'text-3xl whitespace-nowrap' : 'text-4xl'} font-normal text-slate-900">${w.word}</span>`
                  ).join('')}
                </div>
                ${page.wordsSideImage ? `<img src="${page.wordsSideImage}" class="h-24 object-contain shrink-0 mt-1 mr-2">` : ''}
              </div>
            </div>
          ` : ''}

          ${page.dayTasks ? `
            <div class="flex-1 flex flex-col justify-start gap-16 mt-4 mb-auto">
              ${page.dayTasks.map(task => `
                <div class="pl-8">
                  <h3 class="text-4xl font-bold text-slate-900 mb-3">${task.title}</h3>
                  ${task.words ? `<div class="reading-font text-3xl text-slate-900 mb-10 tracking-wide">${task.words}</div>` : ''}
                  <div class="flex justify-between items-center pr-12">
                    <div class="space-y-2 reading-font text-3xl text-slate-900 w-fit">
                      ${task.sentences ? task.sentences.map(s => `<p class="leading-normal whitespace-nowrap">${s}</p>`).join('') : ''}
                    </div>
                    ${task.image ? `<img src="${task.image}" class="${task.imageSize || 'h-32'} object-contain shrink-0 mr-4">` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

${page.sentenceTask ? `
            <div class="my-6 pl-8">
              <h3 class="text-4xl font-bold text-slate-900 mb-4">${page.sentenceTaskTitle || 'Les tre ganger:'}</h3>
              <div class="flex justify-between items-center w-full pr-12">
                <div class="space-y-4 max-w-lg">
                  ${page.sentenceTask.map(item => `
                    <div class="flex items-center gap-6">
                      <span class="reading-font text-3xl text-slate-900 min-w-[120px]">${item.text}</span>
                      ${item.image ? `<img src="${item.image}" class="h-10 object-contain">` : ''}
                    </div>
                  `).join('')}
                </div>
                ${page.sentenceTaskImage ? `
                  <img
                    src="${page.sentenceTaskImage}"
                    class="object-contain shrink-0 ${page.sentenceTaskImageSize || 'h-32'} ${page.sentenceTaskImageStyle || ''}"
                    style="${page.sentenceTaskImageCustomStyle || ''}"
                  >
                ` : ''}
              </div>
            </div>
          ` : ''}

${page.readingSentences ? `
            <div class="my-4 pl-8">
              <h3 class="text-4xl font-bold text-slate-900 mb-3">${page.readingSentencesTitle || 'Les tre ganger:'}</h3>
              <div class="flex justify-between items-start w-full pr-8">
                <div class="space-y-2 reading-font text-3xl text-slate-900 w-fit">
                  ${page.readingSentences.map(s => `<p class="leading-normal whitespace-nowrap">${s}</p>`).join('')}
                </div>
                ${page.readingSentencesImage ? `<img src="${page.readingSentencesImage}" class="object-contain shrink-0 ${page.readingSentencesImageStyle || ''}" style="max-height: 180px; ${page.readingSentencesImageCustomStyle || ''}">` : ''}
              </div>
            </div>
          ` : ''}

          ${page.matchTask ? `
            <div class="my-4 pl-8">
              <h3 class="text-4xl font-bold text-slate-900 mb-4">${page.matchTaskTitle || 'Les og sett strek til riktig bilde:'}</h3>
              <div class="space-y-4 max-w-xl">
                <div class="flex justify-between items-center reading-font text-3xl text-slate-900 px-2">
                  ${page.matchTask.words.map(w => `<span class="${page.matchTask.boxed ? 'border-2 border-slate-900 px-3 py-0.5 rounded-sm' : ''}">${w}</span>`).join('')}
                </div>
                <div class="space-y-4 pt-2">
                  ${['sheet-13', 'sheet-14'].includes(activeSheet.id) ? `
                    <div class="grid grid-cols-3 gap-4 items-center w-full px-2">
                      ${page.matchTask.row1.map(img => `
                        <div class="flex justify-center items-center">
                          <img src="${img.src}" class="${img.size || 'h-16'} object-contain">
                        </div>
                      `).join('')}
                    </div>
                    <div class="grid grid-cols-2 gap-4 items-center w-full px-12">
                      ${page.matchTask.row2.map(img => `
                        <div class="flex justify-center items-center">
                          <img src="${img.src}" class="${img.size || 'h-16'} object-contain">
                        </div>
                      `).join('')}
                    </div>
                  ` : `
                    <div class="flex justify-between items-center px-2">
                      ${page.matchTask.row1.map(img => `<div class="w-24 flex justify-center items-center"><img src="${img.src}" class="${img.size || 'h-16'} object-contain"></div>`).join('')}
                    </div>
                    <div class="flex justify-center items-center gap-12 pr-12">
                      ${page.matchTask.row2.map(img => `<div class="w-24 flex justify-center items-center"><img src="${img.src}" class="${img.size || 'h-16'} object-contain"></div>`).join('')}
                    </div>
                  `}
                </div>
              </div>
            </div>
          ` : ''}

          ${page.topReadingTask ? `
            <div class="my-2 pl-8">
              <h2 class="text-4xl font-bold text-slate-900 mb-3">${page.topReadingTask.title || 'Les teksten tre ganger:'}</h2>
              <div class="flex justify-between items-start pr-12">
                <div class="space-y-1 reading-font text-3xl text-slate-900 w-fit">
                  ${page.topReadingTask.sentences.map(s => `<p class="leading-snug whitespace-nowrap">${s}</p>`).join('')}
                </div>
                ${page.topReadingTask.image ? `
                  <img
                    src="${page.topReadingTask.image}"
                    class="${page.topReadingTask.imageSize || 'h-32'} object-contain shrink-0 ${['sheet-13', 'sheet-14'].includes(activeSheet.id) ? (page.topReadingTask.imageMargin || 'mt-6') : 'mt-2'} mr-4 ${['sheet-13', 'sheet-14'].includes(activeSheet.id) ? 'photo-frame' : ''}"
                  >
                ` : ''}
              </div>
            </div>
          ` : ''}

          ${page.extraSentences ? `
            <div class="${page.extraMargin || 'mt-16'} mb-2 pl-8 flex-1 flex flex-col justify-start">
              <h2 class="text-4xl font-bold text-slate-900 mb-4">${page.extraTitle || 'Ekstra lekse:'}</h2>
              ${page.imagePosition === 'bottom' ? `
                <div class="space-y-2 pl-2 reading-font text-3xl text-slate-900 w-fit mb-4">
                  ${page.extraSentences.map(s => `<p class="leading-normal whitespace-nowrap">${s}</p>`).join('')}
                </div>
                ${page.mouseImage ? `<div class="flex justify-center mt-6"><img src="${page.mouseImage}" class="object-contain shrink-0 ${page.imageSize || 'max-h-64 max-w-[260px]'} ${page.imageMargin || ''} ${page.imageStyle || ''}"></div>` : ''}
              ` : `
                <div class="flex justify-between items-start pr-4">
                  <div class="space-y-1 reading-font text-3xl text-slate-900 w-fit">
                    ${page.extraSentences.map(s => `<p class="leading-snug whitespace-nowrap">${s}</p>`).join('')}
                  </div>
                  ${page.mouseImage ? `<img src="${page.mouseImage}" class="object-contain shrink-0 ${page.imageSize || 'max-h-64 max-w-[260px]'} ${page.imageMargin || 'ml-6'} ${page.imageStyle || ''}">` : ''}
                </div>
              `}
              ${page.bottomImages ? `
                <div class="flex justify-center items-center gap-16 mt-6 max-w-xl">
                  ${page.bottomImages.map(img => `<img src="${img.src}" class="${img.size || 'h-24'} object-contain">`).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${page.extraWords && page.extraWords.length > 0 ? `
            <div class="mt-4 mb-auto pl-8 pr-8">
              ${page.extraWordsTitle ? `<h2 class="text-4xl font-bold text-slate-900 mb-4">${page.extraWordsTitle}</h2>` : ''}
              <div class="grid ${activeSheet.id === 'sheet-diplom' ? 'grid-cols-5' : 'grid-cols-7'} gap-x-4 gap-y-2.5 reading-font text-3xl text-slate-900">
                ${page.extraWords.map(w => w.lineBreak
                  ? `<div class="col-span-7 h-3"></div>`
                  : `<div>${w.word}</div>`
                ).join('')}
              </div>
            </div>
          ` : ''}

          ${typeof renderSoundTask === 'function' ? renderSoundTask(page) : ''}
          ${typeof renderRhymeMatchTask === 'function' ? renderRhymeMatchTask(page) : ''}
          ${typeof renderSyllableTask === 'function' ? renderSyllableTask(page) : ''}

          <!-- EKSTRAOPPGAVE PÅ SIDE 2 (MATTE ELLER NORSK) -->
          ${(() => {
            if (realPageIndex === 0) return '';
            const extraMode = getExtraTaskMode(activeSheet.id);

            // VIS MATTEOPPGAVE
            if (extraMode === 'math' && page.mathTask) {
              return `
                <div class="math-task-block mt-4 mx-8 p-3 rounded-xl border-2 border-emerald-300 bg-emerald-50">
                  <h2 class="text-3xl font-bold text-slate-900 mb-1">${page.mathTask.title || 'Matteoppgave:'}</h2>
                  ${page.mathTask.instruction ? `<p class="text-xl text-slate-700 mb-1 text-center whitespace-pre-line font-bold">${page.mathTask.instruction}</p>` : ''}
                  <div class="flex flex-col text-slate-900" style="gap: ${page.mathTask.taskGap ?? 16}px;">
                    ${(page.mathTask.tasks || []).map(task => {
                      const item = typeof task === 'string' ? { text: task } : task;
                      return `
                        <div class="math-task-item flex flex-col items-center justify-center gap-2 min-w-0">
                          ${item.instruction ? `<div class="reading-font math-task-instruction text-center whitespace-pre-line font-bold">${item.instruction}</div>` : ''}
                          ${item.image ? `<img src="${item.image}" alt="${item.alt || ''}" class="math-task-image object-contain ${item.imageSize || ''}">` : ''}
                          ${item.text ? `<div class="reading-font text-2xl text-center whitespace-pre-line font-bold">${item.text}</div>` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }

            // VIS NORSKOPPGAVE / SKRIVEOPPGAVE
            if (extraMode === 'norsk' && page.norskTask) {
              return `
                <div class="norsk-task-block mt-4 mx-8 p-3 rounded-xl border-2 border-sky-300 bg-sky-50">
                  <h2 class="text-3xl font-bold text-slate-900 mb-1">${page.norskTask.title || 'Skriveoppgave:'}</h2>
                  ${page.norskTask.instruction ? `<p class="text-xl text-slate-700 mb-1 text-center whitespace-pre-line font-bold">${page.norskTask.instruction}</p>` : ''}
                  <div class="flex flex-col text-slate-900" style="gap: ${page.norskTask.taskGap ?? 16}px;">
                    ${(page.norskTask.tasks || []).map(task => {
                      const item = typeof task === 'string' ? { text: task } : task;
                      return `
                        <div class="math-task-item flex flex-col items-center justify-center gap-2 min-w-0">
                          ${item.instruction ? `<div class="reading-font math-task-instruction text-center whitespace-pre-line font-bold">${item.instruction}</div>` : ''}
                          ${item.image ? `<img src="${item.image}" alt="${item.alt || ''}" class="norsk-task-image object-contain ${item.imageSize || ''}">` : ''}
                          ${item.text ? `<div class="reading-font text-2xl text-center whitespace-pre-line font-bold">${item.text}</div>` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }

            return '';
          })()}

        </div>
      ` : ''}

<!-- BUNNTEKST OG SIDETALL -->
      ${page.type !== 'cover' ? `
        <div
          style="position: absolute; left: 12mm; right: 12mm; bottom: 7mm;"
          class="px-2"
        >
          <div class="border-t-2 border-slate-300 pt-3 flex justify-between items-center gap-3 min-h-[48px]">

            <div class="flex items-center gap-2 flex-wrap">

              ${(() => {
                const isEvenPage = globalPageNumber % 2 === 0;
                const displayFooterNotice = footerNotice
                  ? (isEvenPage ? footerNotice.replace(/baksiden/gi, 'neste side') : footerNotice)
                  : '';

                return displayFooterNotice ? `
                  <span class="inline-block bg-amber-50 text-amber-800 font-bold text-base px-3 py-1 rounded-md border border-amber-200">
                    ${displayFooterNotice}
                  </span>
                ` : '';
              })()}

              ${realPageIndex === 0 && hasNextPageOnSheet ? `
                ${getExtraTaskMode(activeSheet.id) === 'math' && pagesData.slice(1).some(p => p.mathTask) ? `
                  <span class="inline-block bg-emerald-50 text-emerald-800 font-bold text-base px-3 py-1 rounded-md border border-emerald-200">
                    ${globalPageNumber % 2 === 0 ? 'Matteoppgaver på neste side!' : 'Matteoppgaver på baksiden!'}
                  </span>
                ` : ''}

                ${getExtraTaskMode(activeSheet.id) === 'norsk' && pagesData.slice(1).some(p => p.norskTask) ? `
                  <span class="inline-block bg-sky-50 text-sky-800 font-bold text-base px-3 py-1 rounded-md border border-sky-200">
                    ${globalPageNumber % 2 === 0 ? 'Skriveoppgave på neste side!' : 'Skriveoppgave på baksiden!'}
                  </span>
                ` : ''}
              ` : ''}

            </div>

            <div class="text-sm text-slate-500 font-bold whitespace-nowrap">
              ${showPageNumbers ? `Side ${globalPageNumber} av ${totalCount}` : ''}
            </div>

          </div>
        </div>
      ` : ''}

    </div>
  `;
}



// HOVED-RENDERING (Skjermvisning – viser alle synlige ark fra venstremenyen etter hverandre)
function renderSheet() {
  const container = document.getElementById('viewportContainer');
  if (!container) return;

  const { totalCount, pageMapping } = calculateGlobalPages();

  // Filtrer ut alle ark som ikke er skjult i venstremenyen
  const visibleSheets = initialSheets.filter(sheet => sheetVisibility[sheet.id] !== true);

  if (visibleSheets.length === 0) {
    container.innerHTML = `
      <div class="my-auto text-center text-slate-500 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <i class="fa-solid fa-eye-slash text-3xl text-slate-300 mb-2"></i>
        <p class="font-bold text-slate-700">Ingen ark er synlige</p>
        <p class="text-xs mt-1">Klikk på øye-ikonet i venstremenyen for å vise ark.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = visibleSheets.map(sheet => {
    const pagesData = sheet.pages || [sheet];
    const mode = getMode(sheet.id);

    const visiblePages = pagesData.filter((page, pIdx) =>
      pIdx === 0 || mode === 'both'
    );

    return visiblePages.map(page => {
      const realPageIndex = pagesData.indexOf(page);
      const globalPageNumber =
        pageMapping[`${sheet.id}-${realPageIndex}`] || (realPageIndex + 1);

      return renderPageHTML(
        sheet,
        page,
        realPageIndex,
        globalPageNumber,
        totalCount,
        mode
      );
    }).join('');
  }).join('');

  if (typeof updatePageScale === 'function') {
    updatePageScale();
  }
}


// Fanger opp all rulling på siden og synkroniserer + ruller venstremenyen nøyaktig til arket som vises
(function setupUniversalScrollSync() {
  let scrollTicking = false;

  function findScrollableParent(el) {
    let parent = el ? el.parentElement : null;
    while (parent && parent !== document.body) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }

  function syncSidebarToVisiblePage() {
    const viewport = document.getElementById('viewportContainer');
    if (!viewport) return;

    // Ikke overstyr mens en klikk-rulling fra venstremenyen pågår
    if (typeof isManualScrolling !== 'undefined' && isManualScrolling) return;

    const pages = Array.from(viewport.querySelectorAll('.print-page'));
    if (pages.length === 0) return;

    const rectContainer = viewport.getBoundingClientRect();
    const visibleTop = Math.max(0, rectContainer.top);
    const visibleBottom = Math.min(window.innerHeight, rectContainer.bottom);

    // Regn ut hvor mange piksler hvert ark dekker i det synlige vinduet
    const sheetVisibilityScore = {};
    let bestSheetId = null;
    let maxVisiblePixels = 0;

    for (const page of pages) {
      const rect = page.getBoundingClientRect();
      const overlapTop = Math.max(visibleTop, rect.top);
      const overlapBottom = Math.min(visibleBottom, rect.bottom);
      const visibleHeight = Math.max(0, overlapBottom - overlapTop);

      if (visibleHeight > 0) {
        const sId = page.dataset.sheetId;
        sheetVisibilityScore[sId] = (sheetVisibilityScore[sId] || 0) + visibleHeight;

        if (sheetVisibilityScore[sId] > maxVisiblePixels) {
          maxVisiblePixels = sheetVisibilityScore[sId];
          bestSheetId = sId;
        }
      }
    }

    if (bestSheetId && bestSheetId !== currentSheetId) {
      currentSheetId = bestSheetId;

      const menuItems = document.querySelectorAll('#sheetsList .sheet-menu-item');
      let activeItem = null;

      menuItems.forEach(item => {
        if (item.dataset.sheetId === bestSheetId) {
          item.classList.add('sheet-menu-active');
          activeItem = item;
        } else {
          item.classList.remove('sheet-menu-active');
        }
      });

      // Rull venstremenyen slik at det aktive kortet alltid holder seg synlig
      if (activeItem) {
        const scrollContainer = findScrollableParent(activeItem);
        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const itemRect = activeItem.getBoundingClientRect();
          const margin = 20;

          if (itemRect.top < containerRect.top + margin) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollTop + (itemRect.top - containerRect.top) - margin,
              behavior: 'smooth'
            });
          } else if (itemRect.bottom > containerRect.bottom - margin) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollTop + (itemRect.bottom - containerRect.bottom) + margin,
              behavior: 'smooth'
            });
          }
        }
      }
    }
  }

  document.addEventListener('scroll', function(e) {
    if (e.target && e.target.closest && e.target.closest('.sidebar-panel')) return;

    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      syncSidebarToVisiblePage();
      scrollTicking = false;
    });
  }, true);
})();


// VENTER TIL ALLE BILDER OG SKRIFTTYPER ER KLARE

async function waitForPrintAssets(container) {
  // Vent på skrifttyper
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {
      console.warn("Kunne ikke vente på skrifttyper:", error);
    }
  }

  // Finn alle bildene
  const images = Array.from(container.querySelectorAll("img"));

  // Vent til alle bilder er lastet
  await Promise.all(images.map(img => {
    if (img.complete && img.naturalWidth > 0) {
      return img.decode
        ? img.decode().catch(() => {})
        : Promise.resolve();
    }

    return new Promise(resolve => {
      const finish = () => {
        img.removeEventListener("load", finish);
        img.removeEventListener("error", finish);

        if (img.naturalWidth > 0 && img.decode) {
          img.decode().catch(() => {}).finally(resolve);
        } else {
          resolve();
        }
      };

      img.addEventListener("load", finish, { once: true });
      img.addEventListener("error", finish, { once: true });

      if (img.complete) finish();
    });
  }));

  // Vent på at nettleseren oppdaterer visningen
  await new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}


// UTSKRIFTSPLAN
// Beregner nøyaktig hvilke sider som skal skrives ut.
function buildPrintPlan(scope, includeCover) {
  const coverSheet = initialSheets.find(sheet => sheet.id === 'sheet-0');
  const regularSheets = initialSheets.filter(sheet => sheet.id !== 'sheet-0');

  let sheetsToPrint = [];

  if (scope === 'current') {
    const activeSheet = getActiveSheet();
    if (activeSheet) {
      sheetsToPrint = [activeSheet];
    }
  } else {
    // 'selected': Følger synlig/skjult-valgene i venstremenyen
    sheetsToPrint = regularSheets.filter(
      sheet => sheetVisibility[sheet.id] !== true
    );
  }

  const sheetsWithCover = [];

  if (includeCover && coverSheet) {
    sheetsWithCover.push(coverSheet);
  }

  sheetsWithCover.push(...sheetsToPrint);

  const plan = [];
  let nextPageNumber = 1;
  let blankPages = 0;

  sheetsWithCover.forEach(sheet => {
    const pagesData = sheet.pages || [sheet];
    const isCover = sheet.id === 'sheet-0';
    const mode = getMode(sheet.id);


    // Bestem hvilke sider som skal skrives ut
    const visiblePages = pagesData.filter((_, pageIndex) => {
      if (isCover) return true;
      return pageIndex === 0 || mode === 'both';
    });

    visiblePages.forEach(page => {
      plan.push({
        type: 'content',
        sheet,
        page,
        realPageIndex: pagesData.indexOf(page),
        mode,
        pageNumber: nextPageNumber
      });

      nextPageNumber++;
    });
  });

  return {
    sheets: sheetsWithCover,
    pages: plan,
    totalPages: plan.length,
    blankPages
  };
}


// Lager en helt blank side i hefteutskriften (uten ytre marginer som påvirker A4-høyden)
function renderBlankPrintPage(pageNumber, totalPages) {
  return `
    <div class="a4-preview print-page text-slate-900 relative flex flex-col justify-between font-trykkskrift size-normal border-none m-0 print:m-0">
      <div></div>
      <div style="transform: translateY(8px);" class="flex justify-between items-end h-[25px] border-t border-slate-100 pt-2 text-base leading-none text-slate-500 font-medium">
        <div></div>
        <div>${showPageNumbers ? `Side ${pageNumber} av ${totalPages}` : ''}</div>
      </div>
    </div>
  `;
}

// FORSTØRRE BILDER I MODAL (LIGHTBOX)
function zoomImage(src, title) {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');

  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.innerText = title || '';
    lightbox.classList.remove('hidden');
  }
}

function closeImageZoom() {
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
  }
}

function closeBookletModal() {
  const bookletModal = document.getElementById('bookletInfoModal');
  if (bookletModal) {
    bookletModal.classList.add('hidden');
  }
  isPrintInProgress = false;
  window.pendingPrintConfig = null;
}

// EKSEKVERE UTSKRIFT
let isPrintInProgress = false;

function executePrint(printMode = 'normal') {
    const scopeInput = document.querySelector('input[name="printScope"]:checked');
    const includeCoverInput = document.getElementById('includeCoverCheckbox');

    const scope = scopeInput ? scopeInput.value : 'selected';
    const includeCover = includeCoverInput ? includeCoverInput.checked : true;

    window.pendingPrintConfig = { scope, includeCover, printMode };

    closePrintModal();

    if (printMode === 'booklet') {
        const bookletModal = document.getElementById('bookletInfoModal');
        if (bookletModal) {
            bookletModal.classList.remove('hidden');
            return;
        }
    }

    confirmBookletPrint();
}

// Kalles når brukeren klikker "Fortsett og lagre PDF" i hefteveiledningen
async function confirmBookletPrint() {
    const bookletModal = document.getElementById('bookletInfoModal');
    if (bookletModal) {
        bookletModal.classList.add('hidden');
    }

    if (window.pendingPrintConfig) {
        const { scope, includeCover, printMode } = window.pendingPrintConfig;
        window.pendingPrintConfig = null;
        await startPrintProcess(scope, includeCover, printMode);
    }
}

// Klargjøring og åpning av utskriftsdialog


// UTSKRIFTSMODAL
// Klargjøring og åpning av utskriftsdialog
async function startPrintProcess(scope, includeCover, printMode) {
    if (isPrintInProgress) return;
    isPrintInProgress = true;

    const savedSheetId = currentSheetId;
    const originalTitle = document.title;
    const container = document.getElementById('viewportContainer');

    if (!container) {
        isPrintInProgress = false;
        return;
    }

    let cleanedUp = false;
    const printMediaQuery = window.matchMedia('print');

    const finishPrintAndShowGuide = () => {
        if (cleanedUp) return;
        cleanedUp = true;

        window.onafterprint = null;
        window.removeEventListener('focus', onReturn);
        window.removeEventListener('mousemove', onReturn);
        if (printMediaQuery.removeEventListener) {
            printMediaQuery.removeEventListener('change', onMediaChange);
        }

        document.title = originalTitle;
        currentSheetId = savedSheetId;

        renderSidebar();
        renderSheet();

        isPrintInProgress = false;

        if (printMode === 'booklet') {
            // Lukk eventuelle andre modaler først for sikkerhets skyld
            closePrintModal();
            closeBookletModal();

            const afterPdfModal = document.getElementById('afterPdfModal');
            if (afterPdfModal) {
                afterPdfModal.classList.remove('hidden');
            }
        }
    };

    const onReturn = () => {
        setTimeout(finishPrintAndShowGuide, 100);
    };

    const onMediaChange = (e) => {
        if (!e.matches) {
            setTimeout(finishPrintAndShowGuide, 100);
        }
    };

    try {
        const printPlan = buildPrintPlan(scope, includeCover);

        if (printPlan.pages.length === 0) {
            alert('Det er ingen ark å skrive ut.');
            isPrintInProgress = false;
            return;
        }

        let printHTML = '';

        printPlan.pages.forEach(item => {
            if (item.type === 'blank') {
                printHTML += renderBlankPrintPage(item.pageNumber, printPlan.totalPages);
                return;
            }

            printHTML += renderPageHTML(
                item.sheet,
                item.page,
                item.realPageIndex,
                item.pageNumber,
                printPlan.totalPages,
                item.mode
            );
        });

        container.innerHTML = printHTML;

        await waitForPrintAssets(container);
        await new Promise(resolve => setTimeout(resolve, 100));

        if (printMode === 'booklet') {
            document.title = 'Lesehefte 1. klasse - PDF for hefte';
        }

        // Lytt på alle måter nettleseren kan signalisere at utskriften er ferdig
        window.onafterprint = finishPrintAndShowGuide;
        if (printMediaQuery.addEventListener) {
            printMediaQuery.addEventListener('change', onMediaChange);
        }

        window.print();

        // Når window.print() er ferdig (eller ikke-blokkerende), lytt etter retur til siden
        setTimeout(() => {
            window.addEventListener('focus', onReturn, { once: true });
            window.addEventListener('mousemove', onReturn, { once: true });
        }, 400);

    } catch (error) {
        console.error('Feil før utskrift:', error);
        alert('Utskriften kunne ikke klargjøres. Prøv igjen.');
        finishPrintAndShowGuide();
    }
}


function closeAfterPdfModal() {
    const modal = document.getElementById('afterPdfModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openSelectedPdfFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    event.target.value = '';

    // Vent til filvelgeren er helt lukket før fanen åpnes, så Chrome ikke blokkerer den
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = fileURL;
        link.target = '_blank';
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 150);
}

function openPrintModal() {
  const modal = document.getElementById('printModal');
  if (!modal) return;

  isPrintInProgress = false;

  // Velg "Ark valgt i venstremenyen" som standard
  const selectedInput = document.querySelector('input[name="printScope"][value="selected"]');
  if (selectedInput) {
    selectedInput.checked = true;
  }

  const coverCheckbox = document.getElementById('includeCoverCheckbox');
  if (coverCheckbox) {
    coverCheckbox.checked = true;
  }

  modal.classList.remove('hidden');

  updatePrintScopeOptions();
  updatePrintSummary();
}


function closePrintModal() {
  const modal = document.getElementById('printModal');

  if (modal) {
    modal.classList.add('hidden');
  }
}


// OPPDATERER MARKERINGEN AV UTSKRIFTSVALG
function updatePrintScopeOptions() {
  const selectedInput = document.querySelector('input[name="printScope"]:checked');
  const scope = selectedInput ? selectedInput.value : 'selected';

  const selectedLabel = document.getElementById('opt-selected-label');
  const currentLabel = document.getElementById('opt-current-label');

  // Fjern aktiv markering fra alle alternativene
  [selectedLabel, currentLabel].forEach(label => {
    if (label) {
      label.classList.remove('border-indigo-600', 'bg-indigo-50/40');
      label.classList.add('border-slate-200');
    }
  });

  // Finn og marker valgt alternativ
  const activeLabel = (scope === 'current') ? currentLabel : selectedLabel;

  if (activeLabel) {
    activeLabel.classList.remove('border-slate-200');
    activeLabel.classList.add('border-indigo-600', 'bg-indigo-50/40');
  }

  updatePrintSummary();
}



// Bytter mellom nettleser- og Adobe Reader-veiledning i utskriftsmodalene
function switchGuideTab(modalPrefix, target) {
    const browserTab = document.getElementById(`${modalPrefix}-tab-browser`);
    const adobeTab = document.getElementById(`${modalPrefix}-tab-adobe`);
    const browserContent = document.getElementById(`${modalPrefix}-content-browser`);
    const adobeContent = document.getElementById(`${modalPrefix}-content-adobe`);

    if (!browserTab || !adobeTab || !browserContent || !adobeContent) return;

    const activeTextColor = modalPrefix === 'booklet' ? 'text-emerald-700' : 'text-sky-700';

    if (target === 'browser') {
        browserTab.className = `px-3 py-1 rounded-md bg-white ${activeTextColor} shadow-sm transition`;
        adobeTab.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition';
        browserContent.classList.remove('hidden');
        adobeContent.classList.add('hidden');
    } else {
        adobeTab.className = `px-3 py-1 rounded-md bg-white ${activeTextColor} shadow-sm transition`;
        browserTab.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition';
        adobeContent.classList.remove('hidden');
        browserContent.classList.add('hidden');
    }
}


// BEREGNER ANTALL ARK OG SIDER
function updatePrintSummary() {
  const scopeInput = document.querySelector('input[name="printScope"]:checked');
  const includeCoverInput = document.getElementById('includeCoverCheckbox');
  const summaryEl = document.getElementById('printSummaryText');

  if (!summaryEl) return;

  const scope = scopeInput ? scopeInput.value : 'selected';
  const includeCover = includeCoverInput ? includeCoverInput.checked : true;

  const plan = buildPrintPlan(scope, includeCover);

  const numberOfSheets = plan.sheets.length;
  const numberOfPages = plan.totalPages;

  let summary = `${numberOfSheets} ark (${numberOfPages} ${numberOfPages === 1 ? 'side' : 'sider'})`;

  if (plan.blankPages > 0) {
    summary += `, hvorav ${plan.blankPages} blanke`;
  }

  summaryEl.textContent = summary;
}



// LYTTER PÅ ENDRINGER I UTSKRIFTSVINDUET

document.addEventListener('change', function(event) {
  if (
    event.target.name === 'printScope' ||
    event.target.id === 'includeCoverCheckbox'
  ) {
    updatePrintScopeOptions();
    updatePrintSummary();
  }
});


// STARTER APPEN NÅR SIDEN ER LASTET

window.onload = function() {
  const pageCheck = document.getElementById(
    'showPageNumbersCheck'
  );

  if (pageCheck) {
    pageCheck.checked = showPageNumbers;
  }

  renderSidebar();
  renderSheet();
};


// ==========================================
// INNLOGGING OG VANNMERKE FOR HÅNES SKOLE
// ==========================================
const HAANES_AUTH = {
  user: 'Haanes',
  pass: 'Hest1234',
  storageKey: 'haanes_leseark_auth'
};

function updateAuthButtons(isLoggedIn) {
  const loginBtn = document.getElementById('sidebarLoginBtn');
  const logoutBtn = document.getElementById('sidebarLogoutBtn');

  if (isLoggedIn) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
  }
}

function initAuthWatermark() {
  const savedState = sessionStorage.getItem(HAANES_AUTH.storageKey);
  const modal = document.getElementById('loginModal');

  if (savedState === 'logged_in') {
    document.body.classList.remove('show-watermark');
    if (modal) modal.classList.add('hidden');
    updateAuthButtons(true);
  } else if (savedState === 'guest') {
    document.body.classList.add('show-watermark');
    if (modal) modal.classList.add('hidden');
    updateAuthButtons(false);
  } else {
    document.body.classList.add('show-watermark');
    if (modal) modal.classList.remove('hidden');
    updateAuthButtons(false);
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('loginUsername').value.trim();
  const passwordInput = document.getElementById('loginPassword').value;
  const errorMsg = document.getElementById('loginErrorMsg');

  if (usernameInput.toLowerCase() === HAANES_AUTH.user.toLowerCase() && passwordInput === HAANES_AUTH.pass) {
    sessionStorage.setItem(HAANES_AUTH.storageKey, 'logged_in');
    document.body.classList.remove('show-watermark');
    document.getElementById('loginModal').classList.add('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');
    updateAuthButtons(true);
  } else {
    if (errorMsg) errorMsg.classList.remove('hidden');
  }
}

function continueWithWatermark() {
  sessionStorage.setItem(HAANES_AUTH.storageKey, 'guest');
  document.body.classList.add('show-watermark');
  document.getElementById('loginModal').classList.add('hidden');
  updateAuthButtons(false);
}

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  const errorMsg = document.getElementById('loginErrorMsg');
  if (errorMsg) errorMsg.classList.add('hidden');
  if (modal) modal.classList.remove('hidden');
}

function logoutUser() {
  sessionStorage.removeItem(HAANES_AUTH.storageKey);
  document.body.classList.add('show-watermark');
  updateAuthButtons(false);
  openLoginModal();
}

function openAppSwitchModal() {
  const modal = document.getElementById('appSwitchModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAppSwitchModal() {
  const modal = document.getElementById('appSwitchModal');
  if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', initAuthWatermark);


// =========================================================
// DIPLOM-MODAL OG MASSEUTSKRIFT FOR KLASSEN
// =========================================================

function openDiplomModal() {
  const modal = document.getElementById('diplomModal');
  const dateInput = document.getElementById('diplomDateInput');
  if (dateInput && !dateInput.value) {
    const today = new Date();
    dateInput.value = today.toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  modal.classList.remove('hidden');
  renderDiplomPreview();
}

function closeDiplomModal() {
  document.getElementById('diplomModal').classList.add('hidden');
}


function buildSingleDiplomaHTML(studentName, classText, dateText, teacherText) {
  const upperAlphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z Æ Ø Å".split(" ");
  const lowerAlphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z æ ø å".split(" ");
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'æ', 'ø', 'å'];

  const formatLetters = (letters) => letters.map(letter => {
    const isVowel = vowels.includes(letter.toLowerCase());
    return `<span class="${isVowel ? 'text-rose-600' : 'text-sky-600'} font-bold">${letter}</span>`;
  }).join(' ');

  const coloredUpperAlphabet = formatLetters(upperAlphabet);
  const coloredLowerAlphabet = formatLetters(lowerAlphabet);

  return `
    <div class="diploma-sheet bg-white text-slate-900 relative overflow-hidden shadow-xl font-trykkskrift flex flex-col justify-between"
         style="width: 210mm; height: 297mm; padding: 12mm;">
      
      <!-- Ytre dobbel gull- og himmelblå diplomramme -->
      <div class="w-full h-full rounded-3xl border-[5px] border-amber-400 p-2 relative flex flex-col justify-between bg-gradient-to-b from-amber-50/50 via-white to-sky-50/50">
        <div class="w-full h-full rounded-2xl border-[2px] border-sky-400/80 px-10 py-8 flex flex-col items-center justify-between text-center relative">

          <!-- Hjørnestjerner -->
          <div class="absolute top-4 left-5 text-3xl select-none">⭐</div>
          <div class="absolute top-4 right-5 text-3xl select-none">⭐</div>
          <div class="absolute bottom-4 left-5 text-3xl select-none">🌟</div>
          <div class="absolute bottom-4 right-5 text-3xl select-none">🌟</div>

          <!-- Toppbanner -->
          <div class="w-full flex flex-col items-center mt-1">
            <div class="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-800 px-5 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-3">
              <span>✨</span>
              <span>Bokstavmester i 1. klasse</span>
              <span>✨</span>
            </div>

            <h1 class="text-[64px] font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 leading-none drop-shadow-sm">
              DIPLOM
            </h1>

            <div class="flex items-center justify-center gap-3 w-2/3 mt-3">
              <div class="h-[3px] flex-1 rounded-full bg-gradient-to-r from-transparent to-amber-400"></div>
              <span class="text-amber-500 text-xl">🏆</span>
              <div class="h-[3px] flex-1 rounded-full bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>

          <!-- Elevens navn -->
          <div class="w-full my-2">
            <p class="text-xl text-slate-600 font-medium mb-2">Dette diplomet tildeles</p>
            <div class="mx-auto max-w-lg bg-white border-2 border-amber-300 rounded-2xl px-8 py-4 shadow-sm">
              <p class="diploma-custom-font text-[44px] font-bold text-slate-900 leading-tight break-words">
                ${studentName}
              </p>
            </div>
          </div>

          <!-- Rosende tekst -->
          <div class="max-w-2xl px-2">
            <p class="text-[25px] font-semibold text-slate-800 leading-relaxed">
              Du har jobbet så godt med bokstaver, lyder og lesing.<br>
              Vi er kjempe-stolte av deg!
            </p>
          </div>

          <!-- Pokal / illustrasjon -->
          <div class="my-1 flex flex-col items-center">
            <img src="Bilder/pokal.png" alt="Pokal" class="h-44 object-contain drop-shadow-md" />
          </div>

          <!-- Fargerik alfabet-bord (store og små bokstaver) -->
          <div class="w-full bg-white/90 border-2 border-sky-200 rounded-2xl px-4 py-3 shadow-inner space-y-1.5">
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Alle bokstavene du nå kan:</p>
            <p class="text-[19px] tracking-wider leading-snug">
              ${coloredUpperAlphabet}
            </p>
            <p class="text-[24px] tracking-wider leading-snug">
              ${coloredLowerAlphabet}
            </p>
          </div>

          <!-- Dato og underskrift -->
          <div class="w-full grid grid-cols-2 gap-10 pt-3 px-4 text-slate-700">
            <div class="flex flex-col items-center">
              <p class="diploma-custom-font text-xl font-bold text-slate-800 min-h-[28px]">${dateText}</p>
              <div class="w-full border-t-2 border-slate-400 mt-1 pt-1 text-xs uppercase tracking-wider text-slate-500 font-bold">
                Dato
              </div>
            </div>
            <div class="flex flex-col items-center">
              <p class="diploma-custom-font text-xl font-bold text-slate-800 min-h-[28px]">${teacherText}</p>
              <div class="diploma-custom-font w-full border-t-2 border-slate-400 mt-1 pt-1 text-sm tracking-wider text-slate-600 font-bold">
                ${classText || 'Skole / Lærer'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getDiplomaNamesList() {
  const raw = document.getElementById('diplomStudentNames')?.value || '';
  return raw
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0);
}

function renderDiplomPreview() {
  const container = document.getElementById('diplomPreviewContainer');
  const countInfo = document.getElementById('diplomCountInfo');
  if (!container) return;

  const names = getDiplomaNamesList();
  const classText = document.getElementById('diplomClassInput')?.value || '';
  const dateText = document.getElementById('diplomDateInput')?.value || '';
  const teacherText = document.getElementById('diplomTeacherInput')?.value || '';

  if (countInfo) {
    countInfo.textContent = names.length === 1
      ? '1 diplom klart til utskrift'
      : `${names.length} diplomer klare til utskrift`;
  }

  const displayList = names.length > 0 ? names : ['Elevens navn'];

  container.innerHTML = displayList.map(name => `
    <div style="transform: scale(0.68); transform-origin: top center; margin-bottom: -95mm;">
      ${buildSingleDiplomaHTML(name, classText, dateText, teacherText)}
    </div>
  `).join('');
}

function updateDiplomFont() {
  const select = document.getElementById('diplomFontSelect');
  if (!select) return;
  document.documentElement.style.setProperty('--diplom-user-font', select.value);
}

function printClassDiplomas() {
  const names = getDiplomaNamesList();
  if (names.length === 0) {
    alert('Skriv inn minst ett elevnavn før du skriver ut diplomene!');
    return;
  }

  const classText = document.getElementById('diplomClassInput')?.value || '';
  const dateText = document.getElementById('diplomDateInput')?.value || '';
  const teacherText = document.getElementById('diplomTeacherInput')?.value || '';
  const printRoot = document.getElementById('diplomPrintRoot');

  printRoot.innerHTML = names
    .map(name => buildSingleDiplomaHTML(name, classText, dateText, teacherText))
    .join('');

  document.body.classList.add('printing-diplomas');
  window.print();

  setTimeout(() => {
    document.body.classList.remove('printing-diplomas');
    printRoot.innerHTML = '';
  }, 500);
}