/**
 * Dữ liệu Thời khóa biểu FAP - Học kỳ 9
 * Lớp: CQ64.09.01 (01-02) / CQ64.05.04
 * Phòng học: HT A601-HL (Hội trường A601 - Cơ sở Hòa Lạc)
 */

const SCHEDULE_CONFIG = {
  classId: "CQ64.09.01 (01-02) / CQ64.05.04",
  roomDefault: "HT A601-HL",
  roomFullName: "Hội trường A601 - Cơ sở Hòa Lạc",
  semester: "Học kỳ 9 (Năm học 2026)",
  startDate: "2026-08-31",
  endDate: "2026-10-13",
  
  // Định nghĩa khung giờ Slot FAP
  slots: {
    "1-5": {
      name: "Slot 1 – 5",
      type: "morning",
      timeRange: "07:30 – 11:45",
      description: "Tiết sáng (Trống)",
      isAvailable: false
    },
    "6-7": {
      name: "Slot 6 – 7",
      type: "afternoon",
      timeRange: "12:30 – 14:15",
      startTime: "12:30",
      endTime: "14:15",
      slotDetails: "Slot 6: 12:30 – 13:20 | Slot 7: 13:25 – 14:15",
      isAvailable: true
    },
    "8-10": {
      name: "Slot 8 – 10",
      type: "afternoon",
      timeRange: "14:25 – 17:05",
      startTime: "14:25",
      endTime: "17:05",
      slotDetails: "Slot 8: 14:25 – 15:15 | Slot 9: 15:20 – 16:10 | Slot 10: 16:15 – 17:05",
      isAvailable: true
    },
    "11-12": {
      name: "Slot 11 – 12",
      type: "evening",
      timeRange: "17:30 – 19:05",
      description: "Tiết tối (Trống)",
      isAvailable: false
    }
  },

  // Danh mục môn học
  subjects: {
    "TTNT": {
      id: "TTNT",
      name: "Trí tuệ nhân tạo",
      shortName: "AI / TTNT",
      code: "AI_001",
      phase: 1,
      phaseText: "Giai đoạn 1 (31/08 - 23/09)",
      color: "#4f46e5",
      gradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
      lightBg: "rgba(79, 70, 229, 0.12)",
      borderColor: "rgba(79, 70, 229, 0.35)",
      badgeClass: "badge-ai",
      icon: "🤖",
      description: "Môn học chuyên sâu về thuật toán, học máy và hệ thống trí tuệ nhân tạo."
    },
    "TDPB": {
      id: "TDPB",
      name: "Kỹ năng tư duy phản biện và đàm phán",
      shortName: "Tư duy PB & ĐP",
      code: "SKILL_PBDP",
      phase: 1,
      phaseText: "Giai đoạn 1 (31/08 - 23/09)",
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
      lightBg: "rgba(5, 150, 105, 0.12)",
      borderColor: "rgba(5, 150, 105, 0.35)",
      badgeClass: "badge-pb",
      icon: "🧠",
      description: "Kỹ năng phân tích đa chiều, phản biện logic và nghệ thuật đàm phán, thương lượng."
    },
    "NCKH": {
      id: "NCKH",
      name: "Phương pháp nghiên cứu khoa học",
      shortName: "Phương pháp NCKH",
      code: "RES_NCKH",
      phase: 2,
      phaseText: "Giai đoạn 2 (24/09 - 13/10)",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
      lightBg: "rgba(124, 58, 237, 0.12)",
      borderColor: "rgba(124, 58, 237, 0.35)",
      badgeClass: "badge-nckh",
      icon: "🔬",
      description: "Phương pháp luận, thu thập dữ liệu và kỹ năng viết công trình nghiên cứu khoa học."
    },
    "QLCV": {
      id: "QLCV",
      name: "Kỹ năng quản lý và tổ chức công việc",
      shortName: "Kỹ năng QL & TCCV",
      code: "SKILL_QLCV",
      phase: 2,
      phaseText: "Giai đoạn 2 (24/09 - 13/10)",
      color: "#d97706",
      gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
      lightBg: "rgba(217, 119, 6, 0.12)",
      borderColor: "rgba(217, 119, 6, 0.35)",
      badgeClass: "badge-qlcv",
      icon: "📊",
      description: "Kỹ năng lập kế hoạch, quản trị mục tiêu cá nhân và điều phối công việc hiệu quả."
    }
  },

  // Danh sách các tuần học
  weeks: [
    {
      weekNumber: 1,
      name: "Tuần 1",
      dateRange: "31/08 – 06/09/2026",
      startDate: "2026-08-31",
      endDate: "2026-09-06",
      phase: 1,
      phaseName: "Giai đoạn 1"
    },
    {
      weekNumber: 2,
      name: "Tuần 2",
      dateRange: "07/09 – 13/09/2026",
      startDate: "2026-09-07",
      endDate: "2026-09-13",
      phase: 1,
      phaseName: "Giai đoạn 1"
    },
    {
      weekNumber: 3,
      name: "Tuần 3",
      dateRange: "14/09 – 20/09/2026",
      startDate: "2026-09-14",
      endDate: "2026-09-20",
      phase: 1,
      phaseName: "Giai đoạn 1"
    },
    {
      weekNumber: 4,
      name: "Tuần 4",
      dateRange: "21/09 – 27/09/2026",
      startDate: "2026-09-21",
      endDate: "2026-09-27",
      phase: "1 & 2",
      phaseName: "Chuyển giao GĐ1 (21-23/9) ➔ GĐ2 (24-27/9)"
    },
    {
      weekNumber: 5,
      name: "Tuần 5",
      dateRange: "28/09 – 04/10/2026",
      startDate: "2026-09-28",
      endDate: "2026-10-04",
      phase: 2,
      phaseName: "Giai đoạn 2"
    },
    {
      weekNumber: 6,
      name: "Tuần 6",
      dateRange: "05/10 – 11/10/2026",
      startDate: "2026-10-05",
      endDate: "2026-10-11",
      phase: 2,
      phaseName: "Giai đoạn 2"
    },
    {
      weekNumber: 7,
      name: "Tuần 7",
      dateRange: "12/10 – 18/10/2026",
      startDate: "2026-10-12",
      endDate: "2026-10-18",
      phase: 2,
      phaseName: "Giai đoạn 2 (Kết thúc 13/10)"
    }
  ]
};

// Chi tiết 32 buổi học thực tế trong toàn bộ kỳ học
const SCHEDULE_SESSIONS = [
  // ===================== TUẦN 1 =====================
  {
    id: "SESS-01",
    date: "2026-09-03",
    dayOfWeek: 4, // Thứ 5 (0: CN, 1: T2, ..., 4: T5)
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 1,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-02",
    date: "2026-09-04",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 1,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TDPB",
    room: "HT A601-HL"
  },
  {
    id: "SESS-03",
    date: "2026-09-05",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 1,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },

  // ===================== TUẦN 2 =====================
  {
    id: "SESS-04",
    date: "2026-09-07",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 2,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-05",
    date: "2026-09-08",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 2,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TDPB",
    room: "HT A601-HL"
  },
  {
    id: "SESS-06",
    date: "2026-09-09",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 2,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-07",
    date: "2026-09-10",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 2,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-08",
    date: "2026-09-11",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 2,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TDPB",
    room: "HT A601-HL"
  },
  {
    id: "SESS-09",
    date: "2026-09-12",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 2,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },

  // ===================== TUẦN 3 =====================
  {
    id: "SESS-10",
    date: "2026-09-14",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 3,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-11",
    date: "2026-09-15",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 3,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TDPB",
    room: "HT A601-HL"
  },
  {
    id: "SESS-12",
    date: "2026-09-16",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 3,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-13",
    date: "2026-09-17",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 3,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-14",
    date: "2026-09-18",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 3,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TDPB",
    room: "HT A601-HL"
  },
  {
    id: "SESS-15",
    date: "2026-09-19",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 3,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },

  // ===================== TUẦN 4 =====================
  // GĐ 1 kết thúc
  {
    id: "SESS-16",
    date: "2026-09-21",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 4,
    phase: 1,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  {
    id: "SESS-17",
    date: "2026-09-22",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 4,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TDPB",
    room: "HT A601-HL"
  },
  {
    id: "SESS-18",
    date: "2026-09-23",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 4,
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "TTNT",
    room: "HT A601-HL"
  },
  // GĐ 2 bắt đầu từ 24/09
  {
    id: "SESS-19",
    date: "2026-09-24",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 4,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-20",
    date: "2026-09-25",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 4,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "QLCV",
    room: "HT A601-HL"
  },
  {
    id: "SESS-21",
    date: "2026-09-26",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 4,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },

  // ===================== TUẦN 5 =====================
  {
    id: "SESS-22",
    date: "2026-09-28",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 5,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-23",
    date: "2026-09-29",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 5,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "QLCV",
    room: "HT A601-HL"
  },
  {
    id: "SESS-24",
    date: "2026-09-30",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 5,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-25",
    date: "2026-10-01",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 5,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-26",
    date: "2026-10-02",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 5,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "QLCV",
    room: "HT A601-HL"
  },
  {
    id: "SESS-27",
    date: "2026-10-03",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 5,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },

  // ===================== TUẦN 6 =====================
  {
    id: "SESS-28",
    date: "2026-10-05",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 6,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-29",
    date: "2026-10-06",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 6,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "QLCV",
    room: "HT A601-HL"
  },
  {
    id: "SESS-30",
    date: "2026-10-07",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 6,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-31",
    date: "2026-10-08",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 6,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-32",
    date: "2026-10-09",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 6,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "QLCV",
    room: "HT A601-HL"
  },
  {
    id: "SESS-33",
    date: "2026-10-10",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 6,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },

  // ===================== TUẦN 7 =====================
  {
    id: "SESS-34",
    date: "2026-10-12",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 7,
    phase: 2,
    slotKey: "8-10",
    slotName: "Slot 8 – 10",
    startTime: "14:25",
    endTime: "17:05",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },
  {
    id: "SESS-35",
    date: "2026-10-13",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 7,
    phase: 2,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "QLCV",
    room: "HT A601-HL"
  }
];

// Xuất các hàm tiện ích
const DataUtils = {
  // Lấy các buổi học của một tuần
  getSessionsByWeek(weekNumber) {
    return SCHEDULE_SESSIONS.filter(s => s.weekNumber === Number(weekNumber));
  },

  // Lấy buổi học theo ngày cụ thể (YYYY-MM-DD)
  getSessionsByDate(dateStr) {
    return SCHEDULE_SESSIONS.filter(s => s.date === dateStr);
  },

  // Lấy danh sách buổi học của một môn
  getSessionsBySubject(subjectId) {
    return SCHEDULE_SESSIONS.filter(s => s.subjectId === subjectId);
  },

  // Lấy thông tin môn học
  getSubjectInfo(subjectId) {
    return SCHEDULE_CONFIG.subjects[subjectId] || null;
  },

  // Helper lấy chuỗi YYYY-MM-DD theo giờ địa phương
  formatLocalDate(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  },

  // Tìm buổi học tiếp theo tính từ một mốc thời gian
  getNextSession(currentDateObj = new Date()) {
    const currentDateStr = this.formatLocalDate(currentDateObj);
    const currentHours = currentDateObj.getHours();
    const currentMinutes = currentDateObj.getMinutes();
    const currentTimeMinutes = currentHours * 60 + currentMinutes;

    for (const session of SCHEDULE_SESSIONS) {
      if (session.date > currentDateStr) {
        return { session, isToday: false, isLive: false };
      }
      if (session.date === currentDateStr) {
        const [startH, startM] = session.startTime.split(':').map(Number);
        const [endH, endM] = session.endTime.split(':').map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;

        if (currentTimeMinutes <= endTotal) {
          const isLive = currentTimeMinutes >= startTotal;
          return { session, isToday: true, isLive };
        }
      }
    }
    return null; // Đã học xong toàn bộ kỳ học
  }
};
