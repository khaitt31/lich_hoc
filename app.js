/**
 * TIMETABLE PRO - CORE LOGIC & INTERACTION ENGINE
 */

// Application State
let savedAppTheme = localStorage.getItem('app_theme');
if (savedAppTheme === 'dark') {
  savedAppTheme = 'pink';
  localStorage.setItem('app_theme', 'pink');
}
const defaultTheme = (savedAppTheme === 'pink' || savedAppTheme === 'dark-pink' || savedAppTheme === 'light')
  ? savedAppTheme
  : 'pink';

const AppState = {
  currentWeek: 1,
  currentView: 'week',
  filterSubject: 'ALL',
  theme: defaultTheme,
  selectedDate: null, // Ngày được chọn để tra cứu (nếu có)
  calSelectedDate: null, // Ngày được chọn trên lịch tháng để hiển thị agenda
  calYear: 2026,
  calMonth: (new Date().getFullYear() === 2026 && new Date().getMonth() >= 8 && new Date().getMonth() <= 11) ? new Date().getMonth() : 8,
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
  calSelectedAgenda: document.getElementById('calSelectedAgenda'),
  btnCalPrev: document.getElementById('btnCalPrev'),
  btnCalNext: document.getElementById('btnCalNext'),

  // Time Simulator / Date Lookup
  timeSimulatorBar: document.getElementById('timeSimulatorBar'),
  btnToggleSimBar: document.getElementById('btnToggleSimBar'),
  simDateInput: document.getElementById('simDateInput'),
  simDateTextInput: document.getElementById('simDateTextInput'),
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
  modalClassDetails: document.getElementById('modalClassDetails'),
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
  // Tự động đồng bộ tuần hiện tại theo ngày hôm nay thực tế
  updateCurrentWeekFromDate(getLocalDateString(new Date()));
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
  if (DOM.themeToggleBtn) {
    if (AppState.theme === 'pink') {
      DOM.themeToggleBtn.textContent = '🌸';
      DOM.themeToggleBtn.title = 'Giao diện: 🌸 Hồng Cute Pastel (Nhấp để đổi)';
    } else if (AppState.theme === 'dark-pink') {
      DOM.themeToggleBtn.textContent = '💖';
      DOM.themeToggleBtn.title = 'Giao diện: 💖 Hồng Tối Cyber (Nhấp để đổi)';
    } else {
      DOM.themeToggleBtn.textContent = '☀️';
      DOM.themeToggleBtn.title = 'Giao diện: ☀️ Sáng Pastel Nhẹ (Nhấp để đổi)';
    }
  }
}

function toggleTheme() {
  const themeCycle = {
    'pink': 'dark-pink',
    'dark-pink': 'light',
    'light': 'pink'
  };
  AppState.theme = themeCycle[AppState.theme] || 'pink';
  localStorage.setItem('app_theme', AppState.theme);
  initTheme();
  const themeNames = {
    'pink': '🌸 Hồng Cute Pastel',
    'dark-pink': '💖 Hồng Tối Cyber',
    'light': '☀️ Sáng Pastel Nhẹ'
  };
  showToast(`✨ Đã chuyển giao diện: ${themeNames[AppState.theme]}`);
}

/* ==========================================================================
   DATE LOOKUP BAR & LIVE CLOCK
   ========================================================================== */
function initTimeSimulator() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  if (DOM.simDateInput) {
    DOM.simDateInput.value = `${yyyy}-${mm}-${dd}`;
  }
  if (DOM.simDateTextInput) {
    DOM.simDateTextInput.value = `${dd}/${mm}/${yyyy}`;
  }
}

function applyDateLookup(dateVal) {
  if (!dateVal) return;
  const [y, m, d] = dateVal.split('-').map(Number);
  AppState.selectedDate = dateVal;

  const ddStr = String(d).padStart(2, '0');
  const mmStr = String(m).padStart(2, '0');

  // Luôn cập nhật ô hiển thị dạng ngày/tháng/năm
  if (DOM.simDateInput) {
    DOM.simDateInput.value = dateVal;
  }
  if (DOM.simDateTextInput) {
    DOM.simDateTextInput.value = `${ddStr}/${mmStr}/${y}`;
  }

  // Chuyển tới tuần chứa ngày được chọn
  updateCurrentWeekFromDate(dateVal);

  // Đồng bộ tháng lịch nếu ngày thuộc các tháng kỳ 1 (Tháng 9 đến Tháng 12)
  if (m >= 9 && m <= 12) {
    AppState.calYear = y;
    AppState.calMonth = m - 1;
    AppState.calSelectedDate = dateVal;
  }

  // Làm mới lưới tuần và lịch để xem lịch ngày được chọn
  updateWeekNavDisplay();
  renderWeekGrid();
  renderCalendar();

  // Tự động cuộn & hiệu ứng phát sáng nhẹ ở ngày được chọn
  setTimeout(() => {
    const dayHeader = document.querySelector(`.day-header-cell[data-date="${dateVal}"]`);
    if (dayHeader) {
      dayHeader.classList.add('highlight-pulse');
      setTimeout(() => dayHeader.classList.remove('highlight-pulse'), 1800);
    }
    const mCard = document.getElementById(`mDay_${dateVal}`);
    if (mCard) {
      mCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mCard.classList.add('highlight-pulse');
      setTimeout(() => mCard.classList.remove('highlight-pulse'), 1800);
    }
  }, 120);

  const weekObj = SCHEDULE_CONFIG.weeks.find(w => w.weekNumber === AppState.currentWeek);
  showToast(`📅 Đang xem lịch ngày ${ddStr}/${mmStr}/${y} (${weekObj ? weekObj.name : ''}) ✨`);
}

function updateSimulatedTimeFromInputs() {
  const dateVal = DOM.simDateInput ? DOM.simDateInput.value : '';
  if (dateVal) {
    applyDateLookup(dateVal);
  }
}

function parseAndApplyTextDate(text) {
  if (!text) return;
  const cleaned = text.trim();
  // Hỗ trợ dấu gạch chéo (/), gạch ngang (-), dấu chấm (.)
  const parts = cleaned.split(/[\/\-\.]/);
  if (parts.length === 3) {
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    let y = parseInt(parts[2], 10);
    if (y < 100) y += 2000;

    if (!isNaN(d) && !isNaN(m) && !isNaN(y) && m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 2026 && y <= 2027) {
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      applyDateLookup(dateStr);
      return;
    }
  }

  showToast('⚠️ Vui lòng nhập ngày theo dạng ngày/tháng/năm (ví dụ: 03/09/2026)');
  // Trả về ngày hợp lệ gần nhất
  if (AppState.selectedDate) {
    const [y, m, d] = AppState.selectedDate.split('-');
    DOM.simDateTextInput.value = `${d}/${m}/${y}`;
  } else {
    initTimeSimulator();
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
  AppState.selectedDate = null;
  const now = new Date();
  const currentDateStr = getLocalDateString(now);

  // Chuyển về tuần hiện tại
  updateCurrentWeekFromDate(currentDateStr);

  // Chuyển về tháng hiện tại
  AppState.calYear = now.getFullYear();
  AppState.calMonth = (now.getMonth() >= 8 && now.getMonth() <= 11) ? now.getMonth() : 8;
  AppState.calSelectedDate = currentDateStr;

  // Đặt lại ô chọn ngày dạng ngày/tháng/năm
  initTimeSimulator();

  // Làm mới giao diện
  updateWeekNavDisplay();
  renderWeekGrid();
  renderCalendar();
  updateLiveHero();

  // Cuộn tới ngày hôm nay
  setTimeout(() => {
    const mCard = document.getElementById(`mDay_${currentDateStr}`);
    if (mCard) {
      mCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mCard.classList.add('highlight-pulse');
      setTimeout(() => mCard.classList.remove('highlight-pulse'), 1500);
    }
  }, 100);

  showToast('⏰ Đã quay về ngày hôm nay!');
}

let lastCheckedMinute = -1;

function renderActiveView() {
  if (AppState.currentView === 'week') renderWeekGrid();
  else if (AppState.currentView === 'timeline') renderTimeline();
  else if (AppState.currentView === 'subjects') renderSubjectsMatrix();
  else if (AppState.currentView === 'calendar') renderCalendar();
}

function startLiveClock() {
  const updateTick = () => {
    const now = new Date();

    // Format live clock string
    const timeStr = now.toLocaleTimeString('vi-VN');
    DOM.liveClock.textContent = timeStr;

    // Update Hero status theo thời gian thực
    updateLiveHero(now);

    // Tự động làm mới view đang mở mỗi khi đồng hồ chuyển phút (để cập nhật ngay khi lớp học bắt đầu hoặc kết thúc)
    const currentMin = now.getMinutes();
    if (currentMin !== lastCheckedMinute) {
      lastCheckedMinute = currentMin;
      renderActiveView();
    }
  };

  updateTick();
  setInterval(updateTick, 1000);
}

function updateLiveHero(currentDateObj = new Date()) {
  const now = currentDateObj instanceof Date ? currentDateObj : new Date();
  const daysOfWeekVi = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const dayVi = daysOfWeekVi[now.getDay()];
  const dateFormatted = `${dayVi}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  DOM.currentSimulatedDateStr.textContent = dateFormatted;

  // Cập nhật thống kê tiến độ nhanh toàn kỳ (luôn dựa trên thời gian thực tế)
  const totalCompleted = DataUtils.getCompletedSessionsCount(null, now);
  const totalAllSessions = SCHEDULE_SESSIONS.length;
  const totalProgressPct = totalAllSessions > 0 ? Math.round((totalCompleted / totalAllSessions) * 100) : 0;
  const quickStatSub = document.getElementById('quickStatCompletedSub');
  if (quickStatSub) {
    quickStatSub.innerHTML = `Đã học: <strong style="color: var(--accent-primary);">${totalCompleted}/${totalAllSessions}</strong> buổi (${totalProgressPct}%)`;
  }

  const nextInfo = DataUtils.getNextSession(now);

  if (!nextInfo) {
    DOM.liveStatusLabel.textContent = "Kỳ học đã kết thúc";
    DOM.liveStatusLabel.style.color = "var(--text-muted)";
    DOM.nextSubjectTitle.textContent = "Chúc mừng bạn đã hoàn thành kỳ học!";
    DOM.nextSubjectAvatar.textContent = "🎉";
    DOM.nextSubjectAvatar.style.background = "linear-gradient(135deg, #ff758c, #ff7eb3)";
    DOM.nextSlotBadge.textContent = "Hoàn tất";
    DOM.nextTimeBadge.textContent = "Học kỳ 1";
    DOM.nextRoomBadge.textContent = "Hòa Lạc";
    DOM.countdownLabel.textContent = "Trạng thái:";
    DOM.countdownTimer.textContent = "Đã hoàn thành toàn bộ 91 buổi học";
    return;
  }

  const { session, isToday, isLive } = nextInfo;
  const subInfo = DataUtils.getSubjectInfo(session.subjectId);

  DOM.nextSubjectAvatar.textContent = subInfo.icon;
  DOM.nextSubjectAvatar.style.background = subInfo.gradient;
  DOM.nextSubjectTitle.textContent = subInfo.name;
  DOM.nextSlotBadge.textContent = session.slotName;
  DOM.nextTimeBadge.textContent = `${session.startTime} – ${session.endTime}`;
  const classPill = session.phase === 1 ? "Ghép CQ64.05.04 (134 SV)" : "CQ64.09.01.01+02 (91 SV)";
  DOM.nextRoomBadge.textContent = `${session.room} • ${classPill}`;

  const sessionStartDate = new Date(`${session.date}T${session.startTime}:00`);
  const sessionEndDate = new Date(`${session.date}T${session.endTime}:00`);

  if (isLive) {
    DOM.liveStatusLabel.textContent = "Đang diễn ra lớp học";
    DOM.liveStatusLabel.style.color = "#34d399";
    DOM.countdownLabel.textContent = "Thời gian còn lại của tiết:";
    const diffMs = sessionEndDate - now;
    DOM.countdownTimer.textContent = formatCountdown(diffMs);
  } else if (isToday) {
    DOM.liveStatusLabel.textContent = "Lớp học hôm nay";
    DOM.liveStatusLabel.style.color = "#38bdf8";
    DOM.countdownLabel.textContent = "Đếm ngược vào lớp:";
    const diffMs = sessionStartDate - now;
    DOM.countdownTimer.textContent = formatCountdown(diffMs);
  } else {
    DOM.liveStatusLabel.textContent = `Buổi học kế tiếp (${session.dayName} ${formatShortDate(session.date)})`;
    DOM.liveStatusLabel.style.color = "#a5b4fc";
    DOM.countdownLabel.textContent = "Thời gian tới buổi học:";
    const diffMs = sessionStartDate - now;
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
    if (AppState.calMonth > 8) { // Limit between Sept-Dec 2026 (8=Sept, 9=Oct, 10=Nov, 11=Dec)
      AppState.calMonth--;
      renderCalendar();
    }
  });

  DOM.btnCalNext.addEventListener('click', () => {
    if (AppState.calMonth < 11) {
      AppState.calMonth++;
      renderCalendar();
    }
  });

  // Date lookup inputs
  if (DOM.simDateInput) {
    DOM.simDateInput.addEventListener('change', updateSimulatedTimeFromInputs);
  }
  if (DOM.simDateTextInput) {
    DOM.simDateTextInput.addEventListener('change', () => {
      parseAndApplyTextDate(DOM.simDateTextInput.value);
    });
    DOM.simDateTextInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        parseAndApplyTextDate(DOM.simDateTextInput.value);
        DOM.simDateTextInput.blur();
      }
    });
  }
  if (DOM.btnResetSimTime) {
    DOM.btnResetSimTime.addEventListener('click', resetToCurrentTime);
  }

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

  const realNow = new Date();
  const realDateStr = getLocalDateString(realNow);
  const selectedDateStr = AppState.selectedDate;

  // 1. Render Desktop Table Header
  let headerHtml = `<th class="col-slot-header">Khung Slot / Tiết</th>`;
  daysInfo.forEach(day => {
    const isToday = day.dateStr === realDateStr;
    const isSelected = day.dateStr === selectedDateStr && !isToday;
    headerHtml += `
      <th class="day-header-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected-day' : ''}" data-date="${day.dateStr}">
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

  // 2. Render Desktop Slot Rows: Linh hoạt và cân đối theo từng tuần
  let slotRows = [];
  if (AppState.currentWeek <= 6) {
    // Giai đoạn 1 (Tuần 1 - 6)
    slotRows = [
      {
        name: "Tiết 1 – 5",
        timeRange: "07:30 – 11:45",
        details: "Tiết sáng (Trống / Nghỉ)",
        matcher: s => s.slotKey === '1-5'
      },
      {
        name: "Ca đầu: Slot 6 – 7",
        timeRange: "12:30 – 14:15",
        details: "Tiết 6: 12:30–13:20 | Tiết 7: 13:25–14:15",
        matcher: s => s.slotKey === '6-7'
      },
      {
        name: "Ca sau: Slot 8 – 10",
        timeRange: "14:25 – 17:05",
        details: "Tiết 8: 14:25–15:15 | Tiết 9: 15:20–16:10 | Tiết 10: 16:15–17:05",
        matcher: s => s.slotKey === '8-10'
      },
      {
        name: "Tiết 11 – 12",
        timeRange: "17:30 – 19:05",
        details: "Tiết tối (Trống / Nghỉ)",
        matcher: s => s.slotKey === '11-12'
      }
    ];
  } else if (AppState.currentWeek === 7) {
    // Tuần 7: Chuyển giao GĐ1 ➔ GĐ2 (Gộp 2 ca chiều gọn gàng, đẹp mắt)
    slotRows = [
      {
        name: "Tiết 1 – 5",
        timeRange: "07:30 – 11:45",
        details: "Tiết sáng (Trống / Nghỉ)",
        matcher: s => s.slotKey === '1-5'
      },
      {
        name: "Ca đầu: Tiết 6–7 / 6–8",
        timeRange: "12:30 – 14:15 / 15:15",
        details: "GĐ1: Slot 6–7 (12:30–14:15) | GĐ2: Tiết 6–8 (12:30–15:15)",
        matcher: s => s.slotKey === '6-7' || s.slotKey === '6-8'
      },
      {
        name: "Ca sau: Tiết 8–10 / 9–10",
        timeRange: "14:25 / 15:20 – 17:05",
        details: "GĐ1: Slot 8–10 (14:25–17:05) | GĐ2: Tiết 9–10 (15:20–17:05)",
        matcher: s => s.slotKey === '8-10' || s.slotKey === '9-10'
      },
      {
        name: "Tiết 11 – 12",
        timeRange: "17:30 – 19:05",
        details: "Tiết tối (Trống / Nghỉ)",
        matcher: s => s.slotKey === '11-12'
      }
    ];
  } else {
    // Giai đoạn 2 (Tuần 8 - 16)
    slotRows = [
      {
        name: "Tiết 1 – 5",
        timeRange: "07:30 – 11:45",
        details: "Tiết sáng (Trống / Nghỉ)",
        matcher: s => s.slotKey === '1-5'
      },
      {
        name: "Ca đầu: Tiết 6 – 8",
        timeRange: "12:30 – 15:15",
        details: "Tiết 6: 12:30–13:20 | Tiết 7: 13:25–14:15 | Tiết 8: 14:25–15:15",
        matcher: s => s.slotKey === '6-8'
      },
      {
        name: "Ca sau: Tiết 9 – 10",
        timeRange: "15:20 – 17:05",
        details: "Tiết 9: 15:20–16:10 | Tiết 10: 16:15–17:05",
        matcher: s => s.slotKey === '9-10'
      },
      {
        name: "Tiết 11 – 12",
        timeRange: "17:30 – 19:05",
        details: "Tiết tối (Trống / Nghỉ)",
        matcher: s => s.slotKey === '11-12'
      }
    ];
  }

  let bodyHtml = '';

  slotRows.forEach(rowDef => {
    bodyHtml += `<tr>`;

    // Slot Left Info
    bodyHtml += `
      <td class="slot-info-cell">
        <span class="slot-badge-name">${rowDef.name}</span>
        <span class="slot-time-range">${rowDef.timeRange}</span>
        <div class="slot-sub-breakdown">${rowDef.details}</div>
      </td>
    `;

    // 7 Day Cells
    daysInfo.forEach(day => {
      const isToday = day.dateStr === realDateStr;
      const isSelected = day.dateStr === selectedDateStr && !isToday;
      const matchedSession = weekSessions.find(s => s.date === day.dateStr && rowDef.matcher(s));

      if (matchedSession) {
        const sub = DataUtils.getSubjectInfo(matchedSession.subjectId);
        const sessionStatus = DataUtils.getSessionStatus(matchedSession, realNow);
        const isCompleted = sessionStatus === 'completed';
        const isOngoing = sessionStatus === 'ongoing';

        let statusBadgeHtml = '';
        if (isCompleted) {
          statusBadgeHtml = `<span class="session-badge-status completed">✓ Đã học</span>`;
        } else if (isOngoing) {
          statusBadgeHtml = `<span class="session-badge-status ongoing"><span class="pulse-dot-sm"></span> Đang học</span>`;
        }

        bodyHtml += `
          <td class="slot-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected-day' : ''}">
            <div class="class-card phase-${matchedSession.phase} status-${sessionStatus} ${isCompleted ? 'is-completed' : ''} ${isOngoing ? 'is-ongoing' : ''}" 
                 data-subject="${sub.id}" 
                 data-session-id="${matchedSession.id}" 
                 onclick="openSessionModal('${matchedSession.id}')">
              <div>
                <div class="card-top">
                  <div class="card-icon-box" style="background: ${sub.lightBg}; border: 1px solid ${sub.borderColor};">
                    ${sub.icon}
                  </div>
                  <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
                    ${statusBadgeHtml}
                    <span class="card-phase-tag phase-${matchedSession.phase}">GĐ ${matchedSession.phase}</span>
                  </div>
                </div>
                <div class="card-subject-name" title="${sub.name}">${sub.name}</div>
                <div class="card-slot-pill">${matchedSession.slotName}</div>
              </div>
              <div class="card-bottom">
                <span class="room-badge">📍 ${matchedSession.room}</span>
                <span class="card-time-badge">⏰ ${matchedSession.startTime} – ${matchedSession.endTime}</span>
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
  renderMobileWeekCards(daysInfo, weekSessions, realDateStr);
}

/* ==========================================================================
   MOBILE WEEK CARDS RENDERER
   ========================================================================== */
function renderMobileWeekCards(daysInfo, weekSessions, realDateStr) {
  if (!DOM.mobileWeekCards) return;
  const realNow = new Date();

  // Render quick day chip selector
  if (DOM.mobileDaySelector) {
    let chipsHtml = '';
    daysInfo.forEach(day => {
      const hasSessions = weekSessions.some(s => s.date === day.dateStr);
      const isToday = day.dateStr === realDateStr;
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
    const isToday = day.dateStr === realDateStr;
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
        const sessionStatus = DataUtils.getSessionStatus(s, realNow);
        const isCompleted = sessionStatus === 'completed';
        const isOngoing = sessionStatus === 'ongoing';

        let mobileStatusBadge = '';
        if (isCompleted) {
          mobileStatusBadge = `<span class="session-badge-status completed">✓ Đã học</span>`;
        } else if (isOngoing) {
          mobileStatusBadge = `<span class="session-badge-status ongoing"><span class="pulse-dot-sm"></span> Đang học</span>`;
        }

        cardsHtml += `
          <div class="mobile-session-item status-${sessionStatus} ${isCompleted ? 'is-completed' : ''}" data-subject="${sub.id}" data-session-id="${s.id}" onclick="openSessionModal('${s.id}')">
            <div class="mobile-session-top">
              <span class="mobile-sub-name">${sub.icon} ${sub.name}</span>
              <div style="display: flex; gap: 0.35rem; align-items: center;">
                ${mobileStatusBadge}
                <span class="tag-badge" style="font-size: 0.7rem;">GĐ ${s.phase}</span>
              </div>
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
  const realNow = new Date();
  const realDateStr = getLocalDateString(realNow);

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

    const nextInfo = DataUtils.getNextSession(realNow);
    const nextSessionId = nextInfo && nextInfo.session ? nextInfo.session.id : null;

    weekList.forEach(s => {
      const sub = DataUtils.getSubjectInfo(s.subjectId);
      const isToday = s.date === realDateStr;
      const sessionStatus = DataUtils.getSessionStatus(s, realNow);
      const isNext = s.id === nextSessionId;

      let statusBadgeHtml = '';
      if (sessionStatus === 'completed') {
        statusBadgeHtml = `<span class="timeline-status-tag completed">✓ Đã hoàn thành</span>`;
      } else if (sessionStatus === 'ongoing') {
        statusBadgeHtml = `<span class="timeline-status-tag ongoing">🔴 Đang diễn ra</span>`;
      } else if (isNext) {
        statusBadgeHtml = `<span class="timeline-status-tag next">⚡ Buổi tiếp theo</span>`;
      }

      html += `
        <div class="timeline-item ${isToday ? 'is-today' : ''} status-${sessionStatus}" onclick="openSessionModal('${s.id}')">
          <div class="timeline-time-col">
            <span class="timeline-day-str">${s.dayName}</span>
            <span class="timeline-date-str">${formatShortDate(s.date)}/2026</span>
          </div>

          <div class="timeline-main-col">
            <div class="timeline-icon" style="background: ${sub.lightBg}; border: 1px solid ${sub.borderColor};">
              ${sub.icon}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <div class="timeline-subject-title" style="color: ${sub.color}; margin-bottom: 0;">${sub.name}</div>
                ${statusBadgeHtml}
              </div>
              <div class="timeline-meta-tags" style="margin-top: 0.25rem;">
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
  const realNow = new Date();
  const subjectsKeys = Object.keys(SCHEDULE_CONFIG.subjects);
  let html = '';

  subjectsKeys.forEach(key => {
    const sub = SCHEDULE_CONFIG.subjects[key];
    const sessions = DataUtils.getSessionsBySubject(sub.id);

    // Tiến độ và số buổi hoàn thành LUÔN LUÔN tính theo thời gian thực tế
    const completedCount = sessions.filter(s => DataUtils.isSessionCompleted(s, realNow)).length;
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
              <div class="sub-stat-num" style="${completedCount > 0 ? `color: ${sub.color}; font-weight: 800;` : ''}">${completedCount}</div>
              <div class="sub-stat-lbl">Đã hoàn thành</div>
            </div>
            <div>
              <div class="sub-stat-num" style="${completedCount > 0 ? `color: ${sub.color}; font-weight: 800;` : ''}">${progressPercent}%</div>
              <div class="sub-stat-lbl">Tiến độ</div>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="subject-progress-container" title="Tiến độ môn học: ${completedCount}/${totalCount} buổi (${progressPercent}%)">
            <div class="subject-progress-bar" style="width: ${progressPercent}%; background: ${sub.gradient};"></div>
          </div>

          <div style="margin-top: 0.85rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem; text-transform: uppercase;">
              Danh sách ngày học (${totalCount} buổi):
            </div>
            <div class="subject-dates-list">
              ${sessions.map(s => {
                const status = DataUtils.getSessionStatus(s, realNow);
                const isPassed = status === 'completed';
                const isOngoing = status === 'ongoing';
                return `
                  <span class="date-chip ${status}" onclick="openSessionModal('${s.id}')" title="${s.dayName} (${s.slotName}) - ${isPassed ? 'Đã hoàn thành' : isOngoing ? 'Đang diễn ra' : 'Chưa diễn ra'}">
                    ${isPassed ? '✓ ' : isOngoing ? '🔴 ' : ''}${formatShortDate(s.date)} (${s.dayNameEn})
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

  const realNow = new Date();
  const realDateStr = getLocalDateString(realNow);
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

  // Default selected date for Agenda
  if (!AppState.calSelectedDate || !AppState.calSelectedDate.startsWith(monthPrefix)) {
    if (realDateStr.startsWith(monthPrefix)) {
      AppState.calSelectedDate = realDateStr;
    } else {
      const firstClassDate = SCHEDULE_SESSIONS.find(s => s.date.startsWith(monthPrefix));
      AppState.calSelectedDate = firstClassDate ? firstClassDate.date : `${monthPrefix}-01`;
    }
  }

  let html = `
    <div class="cal-weekday"><span class="cal-weekday-full">T2 (MON)</span><span class="cal-weekday-short">T2</span></div>
    <div class="cal-weekday"><span class="cal-weekday-full">T3 (TUE)</span><span class="cal-weekday-short">T3</span></div>
    <div class="cal-weekday"><span class="cal-weekday-full">T4 (WED)</span><span class="cal-weekday-short">T4</span></div>
    <div class="cal-weekday"><span class="cal-weekday-full">T5 (THU)</span><span class="cal-weekday-short">T5</span></div>
    <div class="cal-weekday"><span class="cal-weekday-full">T6 (FRI)</span><span class="cal-weekday-short">T6</span></div>
    <div class="cal-weekday"><span class="cal-weekday-full">T7 (SAT)</span><span class="cal-weekday-short">T7</span></div>
    <div class="cal-weekday"><span class="cal-weekday-full">CN (SUN)</span><span class="cal-weekday-short">CN</span></div>
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

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const daySessions = DataUtils.getSessionsByDate(dStr);
    const isToday = dStr === realDateStr;
    const isSelected = dStr === AppState.calSelectedDate;
    const hasClass = daySessions.length > 0;

    html += `
      <div class="cal-day-cell ${hasClass ? 'has-class' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'selected' : ''}" 
           onclick="selectCalendarDay('${dStr}')" 
           data-date="${dStr}"
           title="Nhấp để xem chi tiết ngày ${day}/${month + 1}">
        <span class="cal-day-num">${day}</span>
        <div class="cal-dots-container">
          ${daySessions.map(s => {
            const sub = DataUtils.getSubjectInfo(s.subjectId);
            const sessionStatus = DataUtils.getSessionStatus(s, realNow);
            const prefix = sessionStatus === 'completed' ? '✓ ' : sessionStatus === 'ongoing' ? '🔴 ' : '';
            return `
              <div class="cal-session-pill ${sessionStatus}" style="background: ${sub.color};" onclick="event.stopPropagation(); openSessionModal('${s.id}')" title="${sub.name} - ${s.slotName} (${sessionStatus === 'completed' ? 'Đã hoàn thành' : sessionStatus === 'ongoing' ? 'Đang diễn ra' : 'Chưa diễn ra'})">
                <span class="pill-full">${prefix}${sub.shortName} (${s.slotKey})</span>
                <span class="pill-short">${prefix}${sub.id}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  DOM.calendarGrid.innerHTML = html;
  renderCalendarAgenda(AppState.calSelectedDate);
}

function selectCalendarDay(dateStr) {
  AppState.calSelectedDate = dateStr;

  const cells = DOM.calendarGrid.querySelectorAll('.cal-day-cell');
  cells.forEach(cell => {
    if (cell.getAttribute('data-date') === dateStr) {
      cell.classList.add('selected');
    } else {
      cell.classList.remove('selected');
    }
  });

  renderCalendarAgenda(dateStr);
}

function renderCalendarAgenda(dateStr) {
  if (!DOM.calSelectedAgenda) return;
  const realNow = new Date();
  const daySessions = DataUtils.getSessionsByDate(dateStr);
  const [y, m, d] = dateStr.split('-');
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const daysOfWeekVi = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const dayTitle = daysOfWeekVi[dateObj.getDay()];
  const isToday = dateStr === getLocalDateString(realNow);

  let html = `
    <div class="agenda-card">
      <div class="agenda-header">
        <div class="agenda-date-info">
          <span class="agenda-day-name">📅 ${dayTitle}, ${d}/${m}/${y}</span>
          ${isToday ? '<span class="agenda-today-tag">Hôm nay</span>' : ''}
        </div>
        <span class="agenda-count-badge">${daySessions.length} tiết học</span>
      </div>
  `;

  if (daySessions.length === 0) {
    html += `
      <div class="agenda-empty">
        <span>🌸 Ngày này không có tiết học (nghỉ ngơi hoặc tự học)</span>
      </div>
    `;
  } else {
    html += `<div class="agenda-sessions-list">`;
    daySessions.forEach(s => {
      const sub = DataUtils.getSubjectInfo(s.subjectId);
      const sessionStatus = DataUtils.getSessionStatus(s, realNow);
      const isCompleted = sessionStatus === 'completed';
      const isOngoing = sessionStatus === 'ongoing';
      const classPill = s.phase === 1 ? "Ghép CQ64.05.04 (134 SV)" : "CQ64.09.01.01+02 (91 SV)";

      let statusBadge = '';
      if (isCompleted) {
        statusBadge = `<span class="agenda-status-badge completed">✓ Đã học</span>`;
      } else if (isOngoing) {
        statusBadge = `<span class="agenda-status-badge ongoing">🔴 Đang học</span>`;
      } else {
        statusBadge = `<span class="agenda-status-badge upcoming">Sắp diễn ra</span>`;
      }

      html += `
        <div class="agenda-session-item status-${sessionStatus}" onclick="openSessionModal('${s.id}')">
          <div class="agenda-item-left">
            <span class="agenda-item-icon" style="background: ${sub.gradient};">${sub.icon}</span>
            <div class="agenda-item-text">
              <div class="agenda-item-title">${sub.name}</div>
              <div class="agenda-item-meta">
                <span>⏰ ${s.slotName} (${s.startTime} – ${s.endTime})</span>
                <span>📍 ${s.room} • ${classPill}</span>
              </div>
            </div>
          </div>
          <div class="agenda-item-right">
            ${statusBadge}
            <span class="agenda-arrow">➔</span>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  html += `</div>`;
  DOM.calSelectedAgenda.innerHTML = html;
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

  // Hiển thị trạng thái và thứ tự buổi học theo thời gian thực tế
  const realNow = new Date();
  const orderInfo = DataUtils.getSessionOrderInfo(session.id);
  const sessionStatus = DataUtils.getSessionStatus(session, realNow);
  let statusText = '';
  if (sessionStatus === 'completed') {
    statusText = `✅ <strong style="color: #059669;">Đã hoàn thành</strong> • Buổi ${orderInfo.indexInSub}/${orderInfo.totalInSub} môn ${sub.name} (Buổi ${orderInfo.indexInAll}/${orderInfo.totalInAll} toàn kỳ)`;
  } else if (sessionStatus === 'ongoing') {
    statusText = `🔴 <strong style="color: #e11d48;">Đang diễn ra lớp học</strong> • Buổi ${orderInfo.indexInSub}/${orderInfo.totalInSub} môn ${sub.name}`;
  } else {
    statusText = `⏳ <strong style="color: #6366f1;">Chưa diễn ra</strong> • Buổi ${orderInfo.indexInSub}/${orderInfo.totalInSub} môn ${sub.name} (Buổi ${orderInfo.indexInAll}/${orderInfo.totalInAll} toàn kỳ)`;
  }
  const modalStatusEl = document.getElementById('modalStatusDetails');
  if (modalStatusEl) {
    modalStatusEl.innerHTML = statusText;
  }
  if (DOM.modalClassDetails) {
    DOM.modalClassDetails.textContent = session.phase === 1
      ? "CQ64.09.01.01+02 ghép CQ64.05.04 (Sĩ số: 134 sinh viên)"
      : "CQ64.09.01.01+02 (Sĩ số: 91 sinh viên - Lớp độc lập)";
  }
  DOM.modalRoomDetails.textContent = `${session.room} (${session.phase === 1 ? SCHEDULE_CONFIG.roomG1 : SCHEDULE_CONFIG.roomG2})`;
  DOM.modalNotes.textContent = sub.description;

  if (DOM.btnModalJumpToWeek) {
    DOM.btnModalJumpToWeek.textContent = `🔍 Xem Lưới (Tuần ${session.weekNumber})`;
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

  const classText = s.phase === 1
    ? "CQ64.09.01.01+02 ghép CQ64.05.04 (134 SV)"
    : "CQ64.09.01.01+02 (91 SV)";

  const text = `🎓 [LỊCH HỌC]\n` +
    `📖 Môn: ${sub.name}\n` +
    `📅 Ngày: ${s.dayName}, ${s.date}\n` +
    `⏰ Khung giờ: ${s.slotName} (${s.startTime} - ${s.endTime})\n` +
    `📍 Phòng: ${s.room}\n` +
    `🏫 Lớp: ${classText}`;

  navigator.clipboard.writeText(text).then(() => {
    DOM.btnModalCopyInfo.textContent = '✅ Đã sao chép! 💖';
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

