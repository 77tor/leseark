
const initialSheets = window.lesearkData || [];

// Standard ukenummer
const defaultWeekMapping = {
  "sheet-1": "Uke 38",
  "sheet-2": "Uke 39",
  "sheet-3": "Uke 41",
  "sheet-4": "Uke 42",
  "sheet-5": "Uke 43",
  "sheet-6": "Uke 44",
  "sheet-7": "Uke 45",
  "sheet-8": "Uke 46",
  "sheet-9": "Uke 47",
  "sheet-10": "Uke 48",
  "sheet-11": "Uke 49",
  "sheet-12": "Uke 50"
};

// Lagring av tilstand
let sheetVisibility = JSON.parse(localStorage.getItem('leseark_visibility')) || {};
let sheetMode = JSON.parse(localStorage.getItem('leseark_sheetmode')) || {};
let sheetWeeks = JSON.parse(localStorage.getItem('leseark_sheetweeks')) || { ...defaultWeekMapping };

let currentSheetId = initialSheets[0] ? initialSheets[0].id : "sheet-1";
let showPageNumbers = localStorage.getItem('leseark_pagenums') !== "false";
let customZoom = null;

function getActiveSheet() {
  return initialSheets.find(s => s.id === currentSheetId) || initialSheets[0];
}

function getMode(sheetId) {
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

function renderSidebar() {
  const container = document.getElementById('sheetsList');
  if (!container) return;
  container.innerHTML = '';

  initialSheets.forEach(sheet => {
    const isActive = sheet.id === currentSheetId;
    const isHidden = sheetVisibility[sheet.id] === true;
    const currentMode = getMode(sheet.id);
    const weekStr = getWeekText(sheet.id);

    const btn = document.createElement('div');
    btn.className = `group flex flex-col p-2.5 rounded-xl text-sm font-semibold transition ${
      isActive
        ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 border border-transparent'
    } ${isHidden ? 'opacity-50' : ''}`;

    btn.innerHTML = `
      <div class="flex items-center justify-between cursor-pointer" onclick="selectSheet('${sheet.id}')">
        <div class="flex items-center gap-2 overflow-hidden flex-1">
          <i class="fa-solid fa-file-lines ${isActive ? 'text-sky-600' : 'text-slate-400'}"></i>
          <span class="truncate ${isHidden ? 'line-through text-slate-400' : ''}">${sheet.title}</span>
          ${weekStr ? `<span class="text-[10px] font-normal px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">${weekStr}</span>` : ''}
        </div>
        <button onclick="toggleHideSheet(event, '${sheet.id}')" class="text-slate-400 hover:text-sky-600 p-1 text-xs transition" title="${isHidden ? 'Vis ark' : 'Skjul ark'}">
          <i class="fa-solid ${isHidden ? 'fa-eye-slash text-amber-500' : 'fa-eye'}"></i>
        </button>
      </div>

      ${!isHidden ? `
        <div class="flex gap-1.5 mt-2 pl-6 text-xs font-normal">
          <button onclick="setSheetMode(event, '${sheet.id}', 'page1')"
                  class="px-2 py-0.5 rounded border transition ${currentMode === 'page1' ? 'bg-sky-600 text-white border-sky-600 font-medium' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50'}">
            Kun Side 1
          </button>
          <button onclick="setSheetMode(event, '${sheet.id}', 'both')"
                  class="px-2 py-0.5 rounded border transition ${currentMode === 'both' ? 'bg-sky-600 text-white border-sky-600 font-medium' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50'}">
            Side 1 & 2
          </button>
        </div>
      ` : ''}
    `;
    container.appendChild(btn);
  });
}

function selectSheet(id) {
  currentSheetId = id;
  renderSidebar();
  renderSheet();
}

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

    const padding = 20;
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

function renderLetterRow(rawString) {
  if (!rawString) return '';
  const items = rawString.trim().split(/\s+/);
  return items.map(item => `<span>${item}</span>`).join('');
}


// HELPER FOR REN SIDEGENERERING
function renderPageHTML(activeSheet, page, realPageIndex, globalPageNumber, totalCount, mode) {
  const pagesData = activeSheet.pages || [activeSheet];
  const weekTextForSheet = getWeekText(activeSheet.id);

  const hasNextPageOnSheet = (realPageIndex === 0) && (mode === 'both') && (pagesData.length > 1);

let footerNotice = "";

if (realPageIndex === 0 && hasNextPageOnSheet) {

    // Hent først teksten fra siden, deretter fra selve arket.
    if (page.nextPageNotice || activeSheet.nextPageNotice) {

        footerNotice =
            page.nextPageNotice || activeSheet.nextPageNotice;

    } else {

        // Standardtekst dersom ingen egen tekst er angitt.
        const sheetNum = parseInt(
            activeSheet.id.replace('sheet-', ''),
            10
        );

        footerNotice = (sheetNum <= 6)
            ? "Ekstra leselekse på neste side."
            : "Leselekse på neste side.";
    }
}

  const isSpecialPage = page.type === 'cover' || page.type === 'toc';
// Finn siste side i dette leseheftearket.
const lastVisiblePageIndex =
    (mode === 'both' && pagesData.length > 1)
        ? pagesData.length - 1
        : 0;

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
          <span>${weekTextForSheet}</span>
        </div>
      ` : ''}

      <!-- HEADER BILDE -->
      ${page.headerImage && !isSpecialPage ? `
        <div class="flex justify-center mb-2">
          <img src="${page.headerImage}" class="h-36 object-contain">
        </div>
      ` : ''}



      <!-- FORSIDE -->
      ${page.type === 'cover' ? `
        <div class="flex-1 relative flex flex-col items-center text-center overflow-hidden bg-white rounded-2xl border-[3px] border-sky-600 my-1">

          <!-- INDRE RAMME -->
          <div class="absolute inset-1 border border-slate-200 rounded-xl pointer-events-none z-20"></div>

          <!-- BLÅ BØLGER ØVERST -->
          <div class="absolute top-0 left-0 right-0 h-12 overflow-hidden pointer-events-none">
            <div class="absolute -top-10 left-1/4 w-2/3 h-20 bg-sky-100 rounded-full"></div>
            <div class="absolute -top-14 right-0 w-1/2 h-24 bg-sky-200 rounded-full opacity-80"></div>
          </div>



          <!-- OVERSKRIFT -->
          <div class="relative z-10 mt-12 px-5 w-full">

            <h1 class="text-5xl font-bold text-blue-950 leading-tight mt-6">
              ${page.title}
            </h1>

            <!-- DEKORATIV BLÅ STREK -->
            <div class="w-3/4 h-2 mx-auto mt-3 rounded-full bg-sky-400"></div>

            ${page.subtitle ? `
              <p class="text-xl text-slate-500 font-medium mt-4">
                ${page.subtitle}
              </p>
            ` : ''}
          </div>

          <!-- INSTRUKSJONSBOKS -->
          ${page.bulletPoints ? `
            <div class="relative z-10 w-[86%] max-w-lg bg-sky-50 border-2 border-sky-400 rounded-2xl px-6 py-6 mt-9 text-left shadow-sm">
              <ul class="space-y-4 text-slate-800 text-lg font-medium">
                ${page.bulletPoints.map(bp => `
                  <li class="flex items-start gap-3">
                    <span class="inline-block w-3 h-3 rounded-full bg-blue-700 mt-2 shrink-0"></span>
                    <span class="leading-relaxed">${bp}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- BILDE MED LIK HVIT RAMME PÅ ALLE SIDER -->
          ${page.coverImage ? `
            <div class="relative z-10 w-[86%] max-w-lg mt-8 mb-5">
              <div class="bg-white border-[3px] border-sky-500 rounded-[26px] p-5 shadow-lg">
                <div class="w-full aspect-[3/2] flex items-center justify-center">
                  <img
                    src="${page.coverImage}"
                    alt="Barn som leser bøker"
                    class="w-full h-full object-contain rounded-xl"
                  >
                </div>
              </div>
            </div>
          ` : ''}

          <!-- SKOLENAVN -->
          <div class="relative z-10 mt-auto mb-9 flex items-center justify-center gap-4 w-full px-8">

            <div class="h-[2px] flex-1 max-w-20 bg-blue-600"></div>

            <span class="text-blue-900 font-bold text-sm tracking-widest uppercase whitespace-nowrap">
              ${page.schoolName || ''}
            </span>

            <div class="h-[2px] flex-1 max-w-20 bg-blue-600"></div>

          </div>

          <!-- BLÅ BØLGER NEDERST -->
          <div class="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none">
            <div class="absolute -bottom-10 -left-10 w-[120%] h-20 bg-sky-100 rounded-[50%]"></div>
            <div class="absolute -bottom-14 -right-10 w-[120%] h-20 bg-sky-300 rounded-[50%] opacity-80"></div>
          </div>

        </div>
      ` : ''}




      <!-- INNHOLDSFORTEGNELSE -->
      ${page.type === 'toc' ? `
        <div class="flex-1 flex flex-col justify-start py-4 px-6 font-trykkskrift">
          <div class="border-b-2 border-indigo-500 pb-3 mb-5 flex justify-between items-end">
            <h2 class="text-5xl font-bold text-slate-900">${page.title || 'Innholdsfortegnelse'}</h2>
            <span class="text-base font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Oversikt over leseark</span>
          </div>
          <div class="space-y-4 text-slate-800">
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
                    <div class="flex justify-between items-baseline border-b border-slate-100 pb-1.5 whitespace-nowrap">
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
            <div class="mb-4 pl-8">
              <h2 class="text-4xl font-bold text-slate-900 mb-3">${page.learnedLettersTitle || 'Les tre ganger:'}</h2>
              <div class="space-y-2 pl-2 max-w-xl">
                <div class="reading-font text-3xl text-slate-900 flex justify-between items-center">${renderLetterRow(page.learnedLetters)}</div>
                <div class="reading-font text-3xl text-slate-800 flex justify-between items-center">${renderLetterRow(page.learnedLettersSmall)}</div>
              </div>
            </div>
          ` : ''}

          ${page.words && page.words.length > 0 ? `
            <div class="my-4 pl-8">
              <h3 class="text-4xl font-bold text-slate-900 mb-4">${page.wordsTitle || 'Les tre ganger:'}</h3>
              <div class="flex justify-between items-start pr-8">
                <div class="flex flex-wrap gap-x-8 gap-y-3 max-w-[360px]">
                  ${page.words.map(w => `<span class="reading-font text-4xl font-normal text-slate-900">${w.word}</span>`).join('')}
                </div>
                ${page.wordsSideImage ? `<img src="${page.wordsSideImage}" class="h-24 object-contain shrink-0 mt-1 mr-4">` : ''}
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
              <div class="space-y-4 max-w-lg">
                ${page.sentenceTask.map(item => `
                  <div class="flex items-center gap-6">
                    <span class="reading-font text-3xl text-slate-900 min-w-[120px]">${item.text}</span>
                    ${item.image ? `<img src="${item.image}" class="h-10 object-contain">` : ''}
                  </div>
                `).join('')}
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
                ${page.readingSentencesImage ? `<img src="${page.readingSentencesImage}" class="object-contain shrink-0 ${page.readingSentencesImageStyle || ''}" style="max-height: 180px;">` : ''}
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
                  <div class="flex justify-between items-center px-2">
                    ${page.matchTask.row1.map(img => `<div class="w-24 flex justify-center items-center"><img src="${img.src}" class="${img.size || 'h-16'} object-contain"></div>`).join('')}
                  </div>
                  <div class="flex justify-center items-center gap-12 pr-12">
                    ${page.matchTask.row2.map(img => `<div class="w-24 flex justify-center items-center"><img src="${img.src}" class="${img.size || 'h-16'} object-contain"></div>`).join('')}
                  </div>
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
                ${page.topReadingTask.image ? `<img src="${page.topReadingTask.image}" class="${page.topReadingTask.imageSize || 'h-32'} object-contain shrink-0 mt-2 mr-4">` : ''}
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

          ${typeof renderSoundTask === 'function' ? renderSoundTask(page) : ''}

        </div>
      ` : ''}

      <!-- BUNNTEKST OG SIDETALL -->
      ${page.type !== 'cover' ? `
        <div style="transform: translateY(8px);" class="flex justify-between items-center min-h-[36px] text-base leading-none text-slate-500 font-medium">
          <div>
  ${footerNotice ? `
    <span class="inline-block bg-amber-50 text-amber-800 font-bold text-base px-3 py-1 rounded-md border border-amber-200">
      ${footerNotice}
    </span>
  ` : ''}
</div>
          <div>${showPageNumbers ? `Side ${globalPageNumber} av ${totalCount}` : ''}</div>
        </div>
      ` : ''}

    </div>
  `;
}


// HOVED-RENDERING (Skjermvisning)
function renderSheet() {
  const container = document.getElementById('viewportContainer');
  if (!container) return;

  const activeSheet = getActiveSheet();
  const pagesData = activeSheet.pages || [activeSheet];
  const mode = getMode(activeSheet.id);
  const { totalCount, pageMapping } = calculateGlobalPages();

  const visiblePages = pagesData.filter((page, pIdx) =>
    pIdx === 0 || mode === 'both'
  );

  container.innerHTML = visiblePages.map(page => {
    const realPageIndex = pagesData.indexOf(page);
    const globalPageNumber =
      pageMapping[`${activeSheet.id}-${realPageIndex}`] || (realPageIndex + 1);

    return renderPageHTML(
      activeSheet,
      page,
      realPageIndex,
      globalPageNumber,
      totalCount,
      mode
    );
  }).join('');

  if (typeof updatePageScale === 'function') {
    updatePageScale();
  }
}


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
    // Bare arket som vises i hovedvinduet.
    const activeSheet = getActiveSheet();
    if (activeSheet && activeSheet.id !== 'sheet-0') {
      sheetsToPrint = [activeSheet];
    } else if (activeSheet) {
      sheetsToPrint = [activeSheet];
    }

  } else if (scope === 'selected') {
    // Følger synlig/skjult-valgene i venstremenyen.
    sheetsToPrint = regularSheets.filter(
      sheet => sheetVisibility[sheet.id] !== true
    );

  } else {
    // Alle vanlige ark, også de som er skjult i venstremenyen.
    sheetsToPrint = regularSheets;
  }

  const sheetsWithCover = [];

  // Forside og innholdsfortegnelse er et separat valg.
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

    // Gjeldende ark følger sideinnstillingen i venstremenyen.
    const mode = getMode(sheet.id);

    // Hefteformat brukes bare når arkene fra venstremenyen velges.
    if (
      scope === 'selected' &&
      !isCover &&
      nextPageNumber % 2 === 0
    ) {
      plan.push({
        type: 'blank',
        pageNumber: nextPageNumber
      });

      nextPageNumber++;
      blankPages++;
    }

// Bestem hvilke sider som skal skrives ut.
const visiblePages = pagesData.filter((_, pageIndex) => {

  // ALLE ARK: Skriv ut alle sider, uansett valg i venstremenyen.
  if (scope === 'all') {
    return true;
  }

  // Forside og innholdsfortegnelse skal alltid ha begge sider.
  if (isCover) {
    return true;
  }

  // De andre utskriftsvalgene følger sideinnstillingen i venstremenyen.
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


// Lager en helt blank side i hefteutskriften.
function renderBlankPrintPage(pageNumber, totalPages) {
  return `
    <div class="a4-preview print-page text-slate-900 relative flex flex-col justify-between font-trykkskrift size-normal border-none mb-8 print:mb-0">
      <div></div>
      <div style="transform: translateY(8px);" class="flex justify-between items-end h-[25px] border-t border-slate-100 pt-2 text-base leading-none text-slate-500 font-medium">
        <div></div>
        <div>${showPageNumbers ? `Side ${pageNumber} av ${totalPages}` : ''}</div>
      </div>
    </div>
  `;
}

// EKSEKVERE UTSKRIFT

let isPrintInProgress = false;

async function executePrint() {
  if (isPrintInProgress) return;

  isPrintInProgress = true;

  const scopeInput = document.querySelector(
    'input[name="printScope"]:checked'
  );

  const includeCoverInput = document.getElementById(
    'includeCoverCheckbox'
  );

  const scope = scopeInput ? scopeInput.value : 'all';
  const includeCover = includeCoverInput
    ? includeCoverInput.checked
    : true;

  closePrintModal();

  const savedSheetId = currentSheetId;
  const container = document.getElementById('viewportContainer');

  if (!container) {
    isPrintInProgress = false;
    return;
  }

  try {
    // Bygg utskriftsplanen ut fra valgene i utskriftsvinduet.
    const printPlan = buildPrintPlan(scope, includeCover);

    if (printPlan.pages.length === 0) {
      alert('Det er ingen ark å skrive ut.');
      return;
    }

    let printHTML = '';

    printPlan.pages.forEach(item => {
      if (item.type === 'blank') {
        printHTML += renderBlankPrintPage(
          item.pageNumber,
          printPlan.totalPages
        );
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

    // Vis utskriftsinnholdet.
    container.innerHTML = printHTML;

    // Vent til alle bilder og skrifttyper er klare.
    await waitForPrintAssets(container);

    // Ekstra ventetid før utskriftsdialogen åpnes.
    await new Promise(resolve => setTimeout(resolve, 100));

    window.print();

  } catch (error) {
    console.error('Feil før utskrift:', error);
    alert('Utskriften kunne ikke klargjøres. Prøv igjen.');

  } finally {
    // Gjenopprett vanlig skjermvisning.
    currentSheetId = savedSheetId;

    renderSidebar();
    renderSheet();

    isPrintInProgress = false;
  }
}


// UTSKRIFTSMODAL

function openPrintModal() {
  const modal = document.getElementById('printModal');
  if (!modal) return;

  // Velg Alle ark som standard.
  const allInput = document.querySelector(
    'input[name="printScope"][value="all"]'
  );

  if (allInput) {
    allInput.checked = true;
  }

  const coverCheckbox = document.getElementById(
    'includeCoverCheckbox'
  );

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
  const selectedInput = document.querySelector(
    'input[name="printScope"]:checked'
  );

  const scope = selectedInput ? selectedInput.value : 'all';

  const allLabel = document.getElementById('opt-all-label');
  const selectedLabel = document.getElementById('opt-selected-label');
  const currentLabel = document.getElementById('opt-current-label');

  // Fjern aktiv markering fra alle alternativene.
  [allLabel, selectedLabel, currentLabel].forEach(label => {
    if (label) {
      label.classList.remove(
        'border-indigo-600',
        'bg-indigo-50/40'
      );

      label.classList.add('border-slate-200');
    }
  });

  // Finn riktig etikett for valgt alternativ.
  let activeLabel = allLabel;

  if (scope === 'selected') {
    activeLabel = selectedLabel;
  } else if (scope === 'current') {
    activeLabel = currentLabel;
  }

  // Marker valgt alternativ.
  if (activeLabel) {
    activeLabel.classList.remove('border-slate-200');

    activeLabel.classList.add(
      'border-indigo-600',
      'bg-indigo-50/40'
    );
  }

  // Forsidevalget skal alltid være synlig.
  const coverOptionContainer = document.getElementById(
    'coverOptionContainer'
  );

  if (coverOptionContainer) {
    coverOptionContainer.classList.remove('hidden');
  }

  updatePrintSummary();
}


// BEREGNER ANTALL ARK OG SIDER

function updatePrintSummary() {
  const scopeInput = document.querySelector(
    'input[name="printScope"]:checked'
  );

  const includeCoverInput = document.getElementById(
    'includeCoverCheckbox'
  );

  const summaryEl = document.getElementById(
    'printSummaryText'
  );

  if (!summaryEl) return;

  const scope = scopeInput ? scopeInput.value : 'all';

  const includeCover = includeCoverInput
    ? includeCoverInput.checked
    : true;

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
