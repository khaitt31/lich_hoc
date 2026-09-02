/**
 * TIMETABLE PRO - CORE LOGIC & INTERACTION ENGINE
 */

// Application State
const AppState = {
  currentWeek: 1,
  currentView: 'week',
  filterSubject: 'ALL',
  theme: localStorage.getItem('app_theme') || 'dark',
  simulatedDateTime: new Date('2026-09-03T13:45:00'),
  calYear: 2026,
  calMonth: 8, // 8 = September (0-indexed: 8 is Sept, 9 is Oct)
  activeModalSession: null
};

// DOM Element References
const DOM = {
  // Theme & Actions
  themeToggleBtn: document.getElementById('btnThemeToggle'),
  btnExportIcs: document.getElementById('btnExportIcs'),
  btnPrint: document.getElementById('btnPrint'),
  liveClock: document.getElementById('headerLiveClock'),

  // Hero Status
  liveStatusLabel: document.getElementById('liveStatusLabel'),
  currentSimulatedDateStr: document.getElementById('currentSimulatedDateStr'),
  nextSubjectAvatar: document.getElementById('nextSubjectAvatar'),
  nextSubjectTitle: document.getElementById('nextSubjectTitle'),
  nextSlotBadge: document.getElementById('nextSlotBadge'),
  nextTimeBadge: document.getElementById('nextTimeBadge'),
  nextRoomBadge: document.getElementById('nextRoomBadge'),
  countdownLabel: document.getElementById('countdownLabel'),
  countdownTimer: document.getElementById('countdownTimer'),

  // Controls & Tabs
  tabButtons: document.querySelectorAll('.tab-btn'),
  subjectFilter: document.getElementById('subjectFilterSelect'),
  btnPrevWeek: document.getElementById('btnPrevWeek'),
  btnNextWeek: document.getElementById('btnNextWeek'),
  currentWeekDisplay: document.getElementById('currentWeekDisplay'),
  weekNavGroup: document.getElementById('weekNavGroup'),

  // View Containers
  views: {
    week: document.getElementById('weekGridView'),
    timeline: document.getElementById('timelineView'),
    subjects: document.getElementById('subjectsView'),
    calendar: document.getElementById('calendarView')
  },

  // Grid Elements
  gridWeekHeading: document.getElementById('gridWeekHeading'),
  gridPhasePill: document.getElementById('gridPhasePill'),
  gridHeaderRow: document.getElementById('gridHeaderRow'),
  gridBody: document.getElementById('gridBody'),
  mobileWeekCards: document.getElementById('mobileWeekCards'),
  mobileDaySelector: document.getElementById('mobileDaySelector'),

  // Timeline Container
  timelineContainer: document.getElementById('timelineContainer'),

  // Subjects Container
  subjectsMatrixContainer: document.getElementById('subjectsMatrixContainer'),

  // Calendar Elements
  calMonthTitle: document.getElementById('calMonthTitle'),
  calendarGrid: document.getElementById('calendarGrid'),
  btnCalPrev: document.getElementById('btnCalPrev'),
  btnCalNext: document.getElementById('btnCalNext'),

  // Time Simulator
  timeSimulatorBar: document.getElementById('timeSimulatorBar'),
  btnToggleSimBar: document.getElementById('btnToggleSimBar'),
  simDateInput: document.getElementById('simDateInput'),
  simTimeInput: document.getElementById('simTimeInput'),
  btnResetSimTime: document.getElementById('btnResetSimTime'),

  // Modal Elements
  modal: document.getElementById('sessionModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalBanner: document.getElementById('modalBanner'),
  modalIcon: document.getElementById('modalIcon'),
  modalSubjectName: document.getElementById('modalSubjectName'),
  modalSubjectCode: document.getElementById('modalSubjectCode'),
  modalDateTime: document.getElementById('modalDateTime'),
  modalSlotDetails: document.getElementById('modalSlotDetails'),
  modalRoomDetails: document.getElementById('modalRoomDetails'),
  modalNotes: document.getElementById('modalNotes'),
  btnModalJumpToWeek: document.getElementById('btnModalJumpToWeek'),
  btnModalGoogleCal: document.getElementById('btnModalGoogleCal'),
  btnModalCopyInfo: document.getElementById('btnModalCopyInfo')
};

// Helper format local date YYYY-MM-DD
function getLocalDateString(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Toast notification helper
function showToast(msg) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  // Auto-sync current week to simulated/current date
  updateCurrentWeekFromDate(getLocalDateString(AppState.simulatedDateTime));
  initTimeSimulator();
  initEventListeners();
  renderAllViews();
  startLiveClock();
});

/* ==========================================================================
   THEME HANDLER
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  DOM.themeToggleBtn.textContent = AppState.theme === 'dark' ? '☀️' : '🌙';
  DOM.themeToggleBtn.title = AppState.theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối';
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('app_theme', AppState.theme);
  initTheme();
}

/* ==========================================================================
   TIME SIMULATOR & LIVE CLOCK
   ========================================================================== */
function initTimeSimulator() {
  const yyyy = AppState.simulatedDateTime.getFullYear();
  const mm = String(AppState.simulatedDateTime.getMonth() + 1).padStart(2, '0');
  const dd = String(AppState.simulatedDateTime.getDate()).padStart(2, '0');
  const hh = String(AppState.simulatedDateTime.getHours()).padStart(2, '0');
  const min = String(AppState.simulatedDateTime.getMinutes()).padStart(2, '0');

  DOM.simDateInput.value = `${yyyy}-${mm}-${dd}`;
  DOM.simTimeInput.value = `${hh}:${min}`;
}

function updateSimulatedTimeFromInputs() {
  const dateVal = DOM.simDateInput.value;
  const timeVal = DOM.simTimeInput.value || '12:00';
  if (dateVal) {
    const [y, m, d] = dateVal.split('-').map(Number);
    const [h, min] = timeVal.split(':').map(Number);
    AppState.simulatedDateTime = new Date(y, m - 1, d, h, min, 0);
    updateCurrentWeekFromDate(dateVal);
    renderAllViews();
    updateLiveHero();
  }
}

function updateCurrentWeekFromDate(dateStr) {
  const weekObj = SCHEDULE_CONFIG.weeks.find(w => dateStr >= w.startDate && dateStr <= w.endDate);
  if (weekObj) {
    AppState.currentWeek = weekObj.weekNumber;
  } else {
    if (dateStr < SCHEDULE_CONFIG.weeks[0].startDate) {
      AppState.currentWeek = 1;
    } else {
      AppState.currentWeek = SCHEDULE_CONFIG.weeks.length;
    }
  }
}

function resetToCurrentTime() {
  AppState.simulatedDateTime = new Date();
  const currentDateStr = getLocalDateString(AppState.simulatedDateTime);
  
  // Set current week according to today's date
  updateCurrentWeekFromDate(currentDateStr);
  
  // Set calendar month according to today's month
  AppState.calYear = AppState.simulatedDateTime.getFullYear();
  AppState.calMonth = AppState.simulatedDateTime.getMonth();

  // Update simulator input boxes
  initTimeSimulator();

  // Re-render all views
  renderAllViews();

  // Highlight today's card on mobile
  setTimeout(() => {
    const mCard = document.getElementById(`mDay_${currentDateStr}`);
    if (mCard) {
      mCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mCard.classList.add('highlight-pulse');
      setTimeout(() => mCard.classList.remove('highlight-pulse'), 1500);
    }
  }, 100);

  // Show toast notification
  showToast('⏰ Đã đồng bộ về ngày & giờ hiện tại!');
}

function startLiveClock() {
  const updateTick = () => {
    // Increment 1 second in simulated time
    AppState.simulatedDateTime = new Date(AppState.simulatedDateTime.getTime() + 1000);
    
    // Format live clock string
    const timeStr = AppState.simulatedDateTime.toLocaleTimeString('vi-VN');
    DOM.liveClock.textContent = timeStr;

    // Update Hero status
    updateLiveHero();
  };

  updateTick();
  setInterval(updateTick, 1000);
}

function updateLiveHero() {
  const sim = AppState.simulatedDateTime;
  const daysOfWeekVi = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const dayVi = daysOfWeekVi[sim.getDay()];
  const dateFormatted = `${dayVi}, ${String(sim.getDate()).padStart(2, '0')}/${String(sim.getMonth() + 1).padStart(2, '0')}/${sim.getFullYear()}`;
  DOM.currentSimulatedDateStr.textContent = dateFormatted;

  const nextInfo = DataUtils.getNextSession(sim);

  if (!nextInfo) {
    DOM.liveStatusLabel.textContent = "Kỳ học đã kết thúc";
    DOM.liveStatusLabel.style.color = "var(--text-muted)";
    DOM.nextSubjectTitle.textContent = "Chúc mừng bạn đã hoàn thành kỳ học!";
    DOM.nextSubjectAvatar.textContent = "🎉";
    DOM.nextSubjectAvatar.style.background = "linear-gradient(135deg, #10b981, #06b6d4)";
    DOM.nextSlotBadge.textContent = "Hoàn tất";
    DOM.nextTimeBadge.textContent = "Học kỳ 1";
    DOM.nextRoomBadge.textContent = "HT A601-HL";
    DOM.countdownLabel.textContent = "Trạng thái:";
    DOM.countdownTimer.textContent = "Đã hoàn thành 35 buổi học";
    return;
  }

  const { session, isToday, isLive } = nextInfo;
  const subInfo = DataUtils.getSubjectInfo(session.subjectId);

  DOM.nextSubjectAvatar.textContent = subInfo.icon;
  DOM.nextSubjectAvatar.style.background = subInfo.gradient;
  DOM.nextSubjectTitle.textContent = subInfo.name;
  DOM.nextSlotBadge.textContent = session.slotName;
  DOM.nextTimeBadge.textContent = `${session.startTime} – ${session.endTime}`;
  DOM.nextRoomBadge.textContent = session.room;

  const [startH, startM] = session.startTime.split(':').map(Number);
  const [endH, endM] = session.endTime.split(':').map(Number);
  const sessionStartDate = new Date(`${session.date}T${session.startTime}:00`);
  const sessionEndDate = new Date(`${session.date}T${session.endTime}:00`);

  if (isLive) {
    DOM.liveStatusLabel.textContent = "Đang diễn ra lớp học";
    DOM.liveStatusLabel.style.color = "#34d399";
    DOM.countdownLabel.textContent = "Thời gian còn lại của tiết:";
    const diffMs = sessionEndDate - sim;
    DOM.countdownTimer.textContent = formatCountdown(diffMs);
  } else if (isToday) {
    DOM.liveStatusLabel.textContent = "Lớp học hôm nay";
    DOM.liveStatusLabel.style.color = "#38bdf8";
    DOM.countdownLabel.textContent = "Đếm ngược vào lớp:";
    const diffMs = sessionStartDate - sim;
    DOM.countdownTimer.textContent = formatCountdown(diffMs);
  } else {
    DOM.liveStatusLabel.textContent = `Buổi học kế tiếp (${session.dayName} ${formatShortDate(session.date)})`;
    DOM.liveStatusLabel.style.color = "#a5b4fc";
    DOM.countdownLabel.textContent = "Thời gian tới buổi học:";
    const diffMs = sessionStartDate - sim;
    DOM.countdownTimer.textContent = formatCountdown(diffMs);
  }
}

function formatCountdown(ms) {
  if (ms <= 0) return "00:00:00";
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  if (days > 0) {
    return `${days} ngày ${hours} giờ ${mins} phút`;
  }
  return `${String(hours).padStart(2, '0')} giờ ${String(mins).padStart(2, '0')} phút ${String(secs).padStart(2, '0')}s`;
}

function formatShortDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}`;
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function initEventListeners() {
  // Theme toggle
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);

  // View switcher tabs
  DOM.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.currentView = btn.getAttribute('data-view');
      switchView(AppState.currentView);
    });
  });

  // Week navigation
  DOM.btnPrevWeek.addEventListener('click', () => {
    if (AppState.currentWeek > 1) {
      AppState.currentWeek--;
      renderWeekGrid();
      updateWeekNavDisplay();
    }
  });

  DOM.btnNextWeek.addEventListener('click', () => {
    if (AppState.currentWeek < SCHEDULE_CONFIG.weeks.length) {
      AppState.currentWeek++;
      renderWeekGrid();
      updateWeekNavDisplay();
    }
  });

  // Subject filter
  DOM.subjectFilter.addEventListener('change', (e) => {
    AppState.filterSubject = e.target.value;
    renderAllViews();
  });

  // Calendar month navigation
  DOM.btnCalPrev.addEventListener('click', () => {
    if (AppState.calMonth > 7) { // Limit between Aug-Oct 2026
      AppState.calMonth--;
      renderCalendar();
    }
  });

  DOM.btnCalNext.addEventListener('click', () => {
    if (AppState.calMonth < 9) {
      AppState.calMonth++;
      renderCalendar();
    }
  });

  // Simulator inputs
  DOM.simDateInput.addEventListener('change', updateSimulatedTimeFromInputs);
  DOM.simTimeInput.addEventListener('change', updateSimulatedTimeFromInputs);
  DOM.btnResetSimTime.addEventListener('click', resetToCurrentTime);

  // Export iCS
  DOM.btnExportIcs.addEventListener('click', exportToIcsFile);

  // Print
  DOM.btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Modal close
  DOM.modalCloseBtn.addEventListener('click', closeModal);
  DOM.modal.addEventListener('click', (e) => {
    if (e.target === DOM.modal) closeModal();
  });

  // Copy modal info
  if (DOM.btnModalCopyInfo) {
    DOM.btnModalCopyInfo.addEventListener('click', copyModalInfoToClipboard);
  }

  // Jump to week from modal
  if (DOM.btnModalJumpToWeek) {
    DOM.btnModalJumpToWeek.addEventListener('click', () => {
      if (AppState.activeModalSession) {
        jumpToWeekSession(AppState.activeModalSession.id);
      }
    });
  }

  // Keyboard shortcut Esc to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Toggle simulator bar on mobile
  if (DOM.btnToggleSimBar) {
    DOM.btnToggleSimBar.addEventListener('click', () => {
      DOM.timeSimulatorBar.classList.toggle('collapsed');
    });
  }
}

function switchView(viewName) {
  Object.keys(DOM.views).forEach(key => {
    DOM.views[key].style.display = key === viewName ? 'block' : 'none';
  });

  // Show/Hide week navigator based on view
  DOM.weekNavGroup.style.display = (viewName === 'week') ? 'flex' : 'none';

  if (viewName === 'week') renderWeekGrid();
  if (viewName === 'timeline') renderTimeline();
  if (viewName === 'subjects') renderSubjectsMatrix();
  if (viewName === 'calendar') renderCalendar();
}

function renderAllViews() {
  updateWeekNavDisplay();
  renderWeekGrid();
  renderTimeline();
  renderSubjectsMatrix();
  renderCalendar();
  updateLiveHero();
}

function updateWeekNavDisplay() {
  const currentWeekObj = SCHEDULE_CONFIG.weeks.find(w => w.weekNumber === AppState.currentWeek);
  if (currentWeekObj) {
    DOM.currentWeekDisplay.textContent = `${currentWeekObj.name} (${currentWeekObj.dateRange})`;
    DOM.gridWeekHeading.textContent = `${currentWeekObj.name}: ${currentWeekObj.dateRange}`;
    DOM.gridPhasePill.textContent = currentWeekObj.phaseName;
  }
  DOM.btnPrevWeek.disabled = AppState.currentWeek <= 1;
  DOM.btnNextWeek.disabled = AppState.currentWeek >= SCHEDULE_CONFIG.weeks.length;
}

/* ==========================================================================
   VIEW 1: WEEK GRID RENDERER (DESKTOP & MOBILE)
   ========================================================================== */
function renderWeekGrid() {
  const currentWeekObj = SCHEDULE_CONFIG.weeks.find(w => w.weekNumber === AppState.currentWeek);
  if (!currentWeekObj) return;

  const [sY, sM, sD] = currentWeekObj.startDate.split('-').map(Number);
  const daysInfo = [];

  // Generate 7 days for the week (Monday to Sunday)
  for (let i = 0; i < 7; i++) {
    const d = new Date(sY, sM - 1, sD + i, 12, 0, 0);
    const dateStr = getLocalDateString(d);
    const dayNames = ['Chủ Nhật (SUN)', 'Thứ Hai (MON)', 'Thứ Ba (TUE)', 'Thứ Tư (WED)', 'Thứ Năm (THU)', 'Thứ Sáu (FRI)', 'Thứ Bảy (SAT)'];
    const dayShortNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayIndex = d.getDay(); // 0 is SUN, 1 is MON...
    daysInfo.push({
      dateStr,
      dayIndex,
      dayTitle: dayNames[dayIndex],
      dayShort: dayShortNames[dayIndex],
      dateShort: formatShortDate(dateStr)
    });
  }

  const simulatedDateStr = getLocalDateString(AppState.simulatedDateTime);

  // 1. Render Desktop Table Header
  let headerHtml = `<th class="col-slot-header">Khung Slot / Tiết</th>`;
  daysInfo.forEach(day => {
    const isToday = day.dateStr === simulatedDateStr;
    headerHtml += `
      <th class="day-header-cell ${isToday ? 'is-today' : ''}">
        <div class="day-title">${day.dayTitle}</div>
        <div class="day-date-sub">${day.dateShort}</div>
      </th>
    `;
  });
  DOM.gridHeaderRow.innerHTML = headerHtml;

  // Retrieve week sessions
  let weekSessions = DataUtils.getSessionsByWeek(AppState.currentWeek);
  if (AppState.filterSubject !== 'ALL') {
    weekSessions = weekSessions.filter(s => s.subjectId === AppState.filterSubject);
  }

  // 2. Render Desktop Slot Rows
  const slotKeys = ['1-5', '6-7', '8-10', '11-12'];
  let bodyHtml = '';

  slotKeys.forEach(slotKey => {
    const slotDef = SCHEDULE_CONFIG.slots[slotKey];
    bodyHtml += `<tr>`;

    // Slot Left Info
    bodyHtml += `
      <td class="slot-info-cell">
        <span class="slot-badge-name">${slotDef.name}</span>
        <span class="slot-time-range">${slotDef.timeRange}</span>
        ${slotDef.slotDetails ? `<div class="slot-sub-breakdown">${slotDef.slotDetails}</div>` : `<div class="slot-sub-breakdown">${slotDef.description}</div>`}
      </td>
    `;

    // 7 Day Cells
    daysInfo.forEach(day => {
      const isToday = day.dateStr === simulatedDateStr;
      const matchedSession = weekSessions.find(s => s.date === day.dateStr && s.slotKey === slotKey);

      if (matchedSession) {
        const sub = DataUtils.getSubjectInfo(matchedSession.subjectId);
        bodyHtml += `
          <td class="slot-cell ${isToday ? 'is-today' : ''}">
            <div class="class-card" data-subject="${sub.id}" data-session-id="${matchedSession.id}" onclick="openSessionModal('${matchedSession.id}')">
              <div class="card-top">
                <span class="card-icon">${sub.icon}</span>
                <span class="card-phase-tag">GĐ ${matchedSession.phase}</span>
              </div>
              <div class="card-subject-name">${sub.name}</div>
              <div class="card-bottom">
                <span class="room-badge">📍 ${matchedSession.room}</span>
                <span class="card-time-badge">⏰ ${matchedSession.startTime}</span>
              </div>
            </div>
          </td>
        `;
      } else {
        bodyHtml += `
          <td class="slot-cell empty-slot ${isToday ? 'is-today' : ''}">
            <div class="empty-placeholder">—</div>
          </td>
        `;
      }
    });

    bodyHtml += `</tr>`;
  });

  DOM.gridBody.innerHTML = bodyHtml;

  // 3. Render Mobile Day Cards
  renderMobileWeekCards(daysInfo, weekSessions, simulatedDateStr);
}

/* ==========================================================================
   MOBILE WEEK CARDS RENDERER
   ========================================================================== */
function renderMobileWeekCards(daysInfo, weekSessions, simulatedDateStr) {
  if (!DOM.mobileWeekCards) return;

  // Render quick day chip selector
  if (DOM.mobileDaySelector) {
    let chipsHtml = '';
    daysInfo.forEach(day => {
      const hasSessions = weekSessions.some(s => s.date === day.dateStr);
      const isToday = day.dateStr === simulatedDateStr;
      chipsHtml += `
        <button class="mobile-day-chip-btn ${isToday ? 'active' : ''}" onclick="scrollToMobileDay('${day.dateStr}')">
          ${day.dayShort} (${day.dateShort}) ${hasSessions ? '•' : ''}
        </button>
      `;
    });
    DOM.mobileDaySelector.innerHTML = chipsHtml;
  }

  // Render day cards
  let cardsHtml = '';

  daysInfo.forEach(day => {
    const isToday = day.dateStr === simulatedDateStr;
    const daySessions = weekSessions.filter(s => s.date === day.dateStr);

    cardsHtml += `
      <div class="mobile-day-card ${isToday ? 'is-today' : ''}" id="mDay_${day.dateStr}">
        <div class="mobile-day-card-header">
          <div class="mobile-day-title-group">
            <span class="mobile-day-name">${day.dayTitle}</span>
            <span class="mobile-day-date">${day.dateShort}/2026</span>
          </div>
          ${isToday ? `<span class="mobile-today-badge">Hôm nay</span>` : ''}
        </div>

        <div class="mobile-sessions-container">
    `;

    if (daySessions.length === 0) {
      cardsHtml += `<div class="mobile-empty-day">Không có tiết học</div>`;
    } else {
      daySessions.forEach(s => {
        const sub = DataUtils.getSubjectInfo(s.subjectId);
        cardsHtml += `
          <div class="mobile-session-item" data-subject="${sub.id}" data-session-id="${s.id}" onclick="openSessionModal('${s.id}')">
            <div class="mobile-session-top">
              <span class="mobile-sub-name">${sub.icon} ${sub.name}</span>
              <span class="tag-badge" style="font-size: 0.7rem;">GĐ ${s.phase}</span>
            </div>
            <div class="mobile-session-meta">
              <span>⏰ <strong>${s.slotName}</strong> (${s.startTime} – ${s.endTime})</span>
              <span>•</span>
              <span class="room-badge">📍 ${s.room}</span>
            </div>
          </div>
        `;
      });
    }

    cardsHtml += `
        </div>
      </div>
    `;
  });

  DOM.mobileWeekCards.innerHTML = cardsHtml;
}

function scrollToMobileDay(dateStr) {
  const el = document.getElementById(`mDay_${dateStr}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    el.classList.add('highlight-pulse');
    setTimeout(() => el.classList.remove('highlight-pulse'), 1500);
  }
}

/* ==========================================================================
   VIEW 2: TIMELINE / AGENDA RENDERER
   ========================================================================== */
function renderTimeline() {
  let sessions = [...SCHEDULE_SESSIONS];
  if (AppState.filterSubject !== 'ALL') {
    sessions = sessions.filter(s => s.subjectId === AppState.filterSubject);
  }

  if (sessions.length === 0) {
    DOM.timelineContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
        Không tìm thấy buổi học nào phù hợp với bộ lọc.
      </div>
    `;
    return;
  }

  // Group sessions by week
  const groupedByWeek = {};
  sessions.forEach(s => {
    if (!groupedByWeek[s.weekNumber]) groupedByWeek[s.weekNumber] = [];
    groupedByWeek[s.weekNumber].push(s);
  });

  let html = '';
  Object.keys(groupedByWeek).forEach(weekNum => {
    const weekObj = SCHEDULE_CONFIG.weeks.find(w => w.weekNumber === Number(weekNum));
    const weekList = groupedByWeek[weekNum];

    html += `
      <div class="timeline-group">
        <div class="timeline-group-header">
          <div class="timeline-group-title">
            <span>📅 ${weekObj.name} (${weekObj.dateRange})</span>
          </div>
          <span class="phase-pill">${weekObj.phaseName}</span>
        </div>

        <div class="timeline-items-list">
    `;

    weekList.forEach(s => {
      const sub = DataUtils.getSubjectInfo(s.subjectId);
      const isToday = s.date === getLocalDateString(AppState.simulatedDateTime);

      html += `
        <div class="timeline-item" style="${isToday ? 'border-left: 4px solid var(--accent-primary); background: rgba(99, 102, 241, 0.08);' : ''}" onclick="openSessionModal('${s.id}')">
          <div class="timeline-time-col">
            <span class="timeline-day-str">${s.dayName}</span>
            <span class="timeline-date-str">${formatShortDate(s.date)}/2026</span>
          </div>

          <div class="timeline-main-col">
            <div class="timeline-icon" style="background: ${sub.lightBg}; border: 1px solid ${sub.borderColor};">
              ${sub.icon}
            </div>
            <div>
              <div class="timeline-subject-title" style="color: ${sub.color};">${sub.name}</div>
              <div class="timeline-meta-tags">
                <span>⏰ <strong>${s.slotName}</strong> (${s.startTime} – ${s.endTime})</span>
                <span>•</span>
                <span class="room-badge">📍 ${s.room}</span>
                <span>•</span>
                <span style="opacity: 0.8;">Giai đoạn ${s.phase}</span>
              </div>
            </div>
          </div>

          <div class="timeline-action-col">
            <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.775rem;" onclick="event.stopPropagation(); openSessionModal('${s.id}')">
              Chi tiết ➔
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  DOM.timelineContainer.innerHTML = html;
}

/* ==========================================================================
   VIEW 3: SUBJECTS MATRIX RENDERER
   ========================================================================== */
function renderSubjectsMatrix() {
  const subjectsKeys = Object.keys(SCHEDULE_CONFIG.subjects);
  let html = '';

  subjectsKeys.forEach(key => {
    const sub = SCHEDULE_CONFIG.subjects[key];
    const sessions = DataUtils.getSessionsBySubject(sub.id);
    const simulatedDateStr = getLocalDateString(AppState.simulatedDateTime);

    const completedCount = sessions.filter(s => s.date < simulatedDateStr).length;
    const totalCount = sessions.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    html += `
      <div class="subject-overview-card" style="border-top: 4px solid ${sub.color};">
        <div>
          <div class="subject-card-header">
            <div>
              <span class="phase-pill" style="font-size: 0.7rem; margin-bottom: 0.4rem; display: inline-block;">${sub.phaseText}</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: ${sub.color};">${sub.name}</h3>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Mã: ${sub.code} | Phòng: ${SCHEDULE_CONFIG.roomDefault}</div>
            </div>
            <div class="subject-avatar-badge" style="background: ${sub.gradient}; box-shadow: 0 4px 14px ${sub.lightBg};">
              ${sub.icon}
            </div>
          </div>

          <p class="subject-desc" style="margin-top: 0.75rem;">
            ${sub.description}
          </p>
        </div>

        <div>
          <div class="subject-stats-grid">
            <div>
              <div class="sub-stat-num">${totalCount}</div>
              <div class="sub-stat-lbl">Tổng số buổi</div>
            </div>
            <div>
              <div class="sub-stat-num">${completedCount}</div>
              <div class="sub-stat-lbl">Đã hoàn thành</div>
            </div>
            <div>
              <div class="sub-stat-num">${progressPercent}%</div>
              <div class="sub-stat-lbl">Tiến độ</div>
            </div>
          </div>

          <div style="margin-top: 0.85rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem; text-transform: uppercase;">
              Danh sách ngày học (${totalCount} buổi):
            </div>
            <div class="subject-dates-list">
              ${sessions.map(s => {
                const isPassed = s.date < simulatedDateStr;
                return `
                  <span class="date-chip" style="${isPassed ? 'text-decoration: line-through; opacity: 0.6;' : 'font-weight: 600;'}" onclick="openSessionModal('${s.id}')" title="${s.dayName} (${s.slotName})">
                    ${formatShortDate(s.date)} (${s.dayNameEn})
                  </span>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  DOM.subjectsMatrixContainer.innerHTML = html;
}

/* ==========================================================================
   VIEW 4: CALENDAR RENDERER
   ========================================================================== */
function renderCalendar() {
  const year = AppState.calYear;
  const month = AppState.calMonth; // 8 for Sept, 9 for Oct

  const monthNamesVi = [
    'Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06',
    'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  DOM.calMonthTitle.textContent = `${monthNamesVi[month]} / ${year}`;

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Monday-based index: 0 = Mon, ..., 6 = Sun
  let startDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  const totalDays = lastDayOfMonth.getDate();

  let html = `
    <div class="cal-weekday">T2 (MON)</div>
    <div class="cal-weekday">T3 (TUE)</div>
    <div class="cal-weekday">T4 (WED)</div>
    <div class="cal-weekday">T5 (THU)</div>
    <div class="cal-weekday">T6 (FRI)</div>
    <div class="cal-weekday">T7 (SAT)</div>
    <div class="cal-weekday">CN (SUN)</div>
  `;

  // Previous month trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    html += `
      <div class="cal-day-cell other-month">
        <span class="cal-day-num">${d}</span>
      </div>
    `;
  }

  const simulatedDateStr = getLocalDateString(AppState.simulatedDateTime);

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const daySessions = DataUtils.getSessionsByDate(dStr);
    const isToday = dStr === simulatedDateStr;
    const hasClass = daySessions.length > 0;

    html += `
      <div class="cal-day-cell ${hasClass ? 'has-class' : ''} ${isToday ? 'is-today' : ''}">
        <span class="cal-day-num">${day}</span>
        <div class="cal-dots-container">
          ${daySessions.map(s => {
            const sub = DataUtils.getSubjectInfo(s.subjectId);
            return `
              <div class="cal-session-pill" style="background: ${sub.color};" onclick="openSessionModal('${s.id}')" title="${sub.name} - ${s.slotName}">
                ${sub.shortName} (${s.slotKey})
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  DOM.calendarGrid.innerHTML = html;
}

/* ==========================================================================
   MODAL HANDLER
   ========================================================================== */
function openSessionModal(sessionId) {
  const session = SCHEDULE_SESSIONS.find(s => s.id === sessionId);
  if (!session) return;

  AppState.activeModalSession = session;
  const sub = DataUtils.getSubjectInfo(session.subjectId) || {
    name: session.subjectId,
    code: '---',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
    icon: '📚',
    description: ''
  };
  const slot = DataUtils.getSlotInfo(session.slotKey);

  DOM.modalBanner.style.background = sub.gradient;
  DOM.modalIcon.textContent = sub.icon;
  DOM.modalSubjectName.textContent = sub.name;
  DOM.modalSubjectCode.textContent = `Mã môn: ${sub.code} | Giai đoạn ${session.phase}`;

  DOM.modalDateTime.textContent = `${session.dayName}, ${formatShortDate(session.date)}/2026 (${session.startTime} – ${session.endTime})`;
  DOM.modalSlotDetails.textContent = `${session.slotName} (${(slot && (slot.slotDetails || slot.timeRange)) || ''})`;
  DOM.modalRoomDetails.textContent = `${session.room} (${SCHEDULE_CONFIG.roomFullName})`;
  DOM.modalNotes.textContent = sub.description;

  if (DOM.btnModalJumpToWeek) {
    DOM.btnModalJumpToWeek.textContent = `🔍 Xem trên Lưới (Tuần ${session.weekNumber})`;
  }

  // Google Calendar link
  const gCalUrl = generateGoogleCalendarUrl(session, sub);
  DOM.btnModalGoogleCal.href = gCalUrl;

  DOM.modal.classList.add('active');
}

function jumpToWeekSession(sessionId) {
  const session = SCHEDULE_SESSIONS.find(s => s.id === (sessionId || (AppState.activeModalSession && AppState.activeModalSession.id)));
  if (!session) return;

  closeModal();

  // Chuyển sang chế độ xem Tuần
  AppState.currentView = 'week';
  DOM.tabButtons.forEach(btn => {
    if (btn.getAttribute('data-view') === 'week') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Chuyển tới tuần chứa buổi học
  AppState.currentWeek = session.weekNumber;
  switchView('week');
  updateWeekNavDisplay();

  // Highlight buổi học trên lưới
  setTimeout(() => {
    const card = document.querySelector(`.class-card[data-session-id="${session.id}"]`) || document.querySelector(`.mobile-session-item[data-session-id="${session.id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('card-highlight-pulse');
      setTimeout(() => card.classList.remove('card-highlight-pulse'), 3000);
    }
  }, 120);
}

function closeModal() {
  DOM.modal.classList.remove('active');
  AppState.activeModalSession = null;
}

function copyModalInfoToClipboard() {
  if (!AppState.activeModalSession) return;
  const s = AppState.activeModalSession;
  const sub = DataUtils.getSubjectInfo(s.subjectId);

  const text = `🎓 [LỊCH HỌC]\n` +
    `📖 Môn: ${sub.name}\n` +
    `📅 Ngày: ${s.dayName}, ${s.date}\n` +
    `⏰ Khung giờ: ${s.slotName} (${s.startTime} - ${s.endTime})\n` +
    `📍 Phòng: ${s.room} (Hội trường A601 - Cơ sở Hòa Lạc)\n` +
    `🏫 Lớp: ${SCHEDULE_CONFIG.classId}`;

  navigator.clipboard.writeText(text).then(() => {
    DOM.btnModalCopyInfo.textContent = '✅ Đã sao chép!';
    setTimeout(() => {
      DOM.btnModalCopyInfo.textContent = '📋 Sao chép';
    }, 2000);
  });
}

function generateGoogleCalendarUrl(session, subject) {
  const title = encodeURIComponent(`${subject.name} - ${session.slotName}`);
  const location = encodeURIComponent(`${session.room} (${SCHEDULE_CONFIG.roomFullName})`);
  const details = encodeURIComponent(`Lịch học - Học kỳ 1\nLớp: ${SCHEDULE_CONFIG.classId}\nKhung slot: ${session.slotName} (${session.startTime} - ${session.endTime})\nMôn: ${subject.name}`);

  // Format UTC dates (Vietnam is UTC+7 -> subtract 7 hours for UTC)
  const [y, m, d] = session.date.split('-').map(Number);
  const [startH, startM] = session.startTime.split(':').map(Number);
  const [endH, endM] = session.endTime.split(':').map(Number);

  const startUtc = new Date(Date.UTC(y, m - 1, d, startH - 7, startM));
  const endUtc = new Date(Date.UTC(y, m - 1, d, endH - 7, endM));

  const formatUtcIso = (dObj) => {
    return dObj.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const datesParam = `${formatUtcIso(startUtc)}/${formatUtcIso(endUtc)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${details}&location=${location}`;
}

/* ==========================================================================
   EXPORT TO ICALENDAR (.ICS)
   ========================================================================== */
function exportToIcsFile() {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Timetable Pro//VN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Lich_Hoc_Ky1',
    'X-WR-TIMEZONE:Asia/Ho_Chi_Minh'
  ];

  SCHEDULE_SESSIONS.forEach(session => {
    const sub = DataUtils.getSubjectInfo(session.subjectId);
    const [y, m, d] = session.date.split('-').map(Number);
    const [startH, startM] = session.startTime.split(':').map(Number);
    const [endH, endM] = session.endTime.split(':').map(Number);

    const startUtc = new Date(Date.UTC(y, m - 1, d, startH - 7, startM));
    const endUtc = new Date(Date.UTC(y, m - 1, d, endH - 7, endM));

    const formatUtcIso = (dObj) => dObj.toISOString().replace(/-|:|\.\d+/g, '');

    const uid = `${session.id}_${session.date.replace(/-/g, '')}@timetable.local`;

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatUtcIso(new Date())}`,
      `DTSTART:${formatUtcIso(startUtc)}`,
      `DTEND:${formatUtcIso(endUtc)}`,
      `SUMMARY:${sub.name} (${session.slotName})`,
      `DESCRIPTION:Môn: ${sub.name}\\nKhung giờ: ${session.slotName} (${session.startTime} - ${session.endTime})\\nLớp: ${SCHEDULE_CONFIG.classId}\\nPhòng: ${session.room}`,
      `LOCATION:${session.room} - ${SCHEDULE_CONFIG.roomFullName}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Nhắc nhở: Sắp đến giờ học môn ${sub.name}`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'Lich_Hoc_Ky1_CQ64.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Gán toàn cục cho các trình xử lý sự kiện HTML
window.openSessionModal = openSessionModal;
window.closeModal = closeModal;
window.jumpToWeekSession = jumpToWeekSession;
window.copyModalInfoToClipboard = copyModalInfoToClipboard;

