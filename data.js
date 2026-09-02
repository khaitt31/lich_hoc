/**
 * Dữ liệu Thời khóa biểu - Học kỳ 1 (Năm học 2026 - 2027)
 * CHƯƠNG TRÌNH CHUẨN (TOÀN KHÓA: GIAI ĐOẠN 1 & GIAI ĐOẠN 2)
 * Lớp: CQ64.09.01.01+02 (CQ64.05.04) | Sĩ số: 91 sinh viên
 * Địa điểm: HT A601-HL (Giai đoạn 1) & HT A702-HL (Giai đoạn 2)
 */

const SCHEDULE_CONFIG = {
  classId: "CQ64.09.01.01+02",
  classG1: "CQ64.09.01.01+02 ghép CQ64.05.04",
  classG2: "CQ64.09.01.01+02",
  classSubId: "CQ64.09.01 (01-02) / CQ64.05.04",
  roomDefault: "HT A601-HL (GĐ1) / HT A702-HL (GĐ2)",
  roomG1: "HT A601-HL (Hội trường A601 - Hòa Lạc)",
  roomG2: "HT A702-HL (Hội trường A702 - Hòa Lạc)",
  studentsCount: "GĐ1: 134 SV (ghép CQ64.05.04) | GĐ2: 91 SV",
  studentsG1: "134 sinh viên (học ghép cùng CQ64.05.04 tại HT A601-HL)",
  studentsG2: "91 sinh viên (lớp riêng tại HT A702-HL)",
  sessionType: "Chiều (C)",
  semester: "Học kỳ 1 (Năm học 2026 - 2027) - Chương trình chuẩn",
  startDate: "2026-08-31",
  endDate: "2026-12-17",
  
  // Định nghĩa khung giờ Slot / Tiết học
  slots: {
    "1-5": {
      name: "Tiết 1 – 5",
      type: "morning",
      timeRange: "07:30 – 11:45",
      description: "Tiết sáng (Trống / Nghỉ)",
      isAvailable: false
    },
    // Khung giờ Giai đoạn 1
    "6-7": {
      name: "Slot 6 – 7 (GĐ 1)",
      type: "afternoon",
      timeRange: "12:30 – 14:15",
      startTime: "12:30",
      endTime: "14:15",
      slotDetails: "Tiết 6: 12:30–13:20 | Tiết 7: 13:25–14:15",
      isAvailable: true
    },
    "8-10": {
      name: "Slot 8 – 10 (GĐ 1)",
      type: "afternoon",
      timeRange: "14:25 – 17:05",
      startTime: "14:25",
      endTime: "17:05",
      slotDetails: "Tiết 8: 14:25–15:15 | Tiết 9: 15:20–16:10 | Tiết 10: 16:15–17:05",
      isAvailable: true
    },
    // Khung giờ Giai đoạn 2
    "6-8": {
      name: "Ca đầu (Tiết 6 – 8)",
      type: "afternoon",
      timeRange: "12:30 – 15:15",
      startTime: "12:30",
      endTime: "15:15",
      slotDetails: "Tiết 6: 12:30–13:20 | Tiết 7: 13:25–14:15 | Tiết 8: 14:25–15:15",
      isAvailable: true
    },
    "9-10": {
      name: "Ca sau (Tiết 9 – 10)",
      type: "afternoon",
      timeRange: "15:20 – 17:05",
      startTime: "15:20",
      endTime: "17:05",
      slotDetails: "Tiết 9: 15:20–16:10 | Tiết 10: 16:15–17:05",
      isAvailable: true
    },
    "11-12": {
      name: "Tiết 11 – 12",
      type: "evening",
      timeRange: "17:30 – 19:05",
      description: "Tiết tối (Trống / Nghỉ)",
      isAvailable: false
    }
  },

  // Danh mục môn học cả 2 giai đoạn (7 môn)
  subjects: {
    // ==================== GIAI ĐOẠN 1 (31/08 – 13/10/2026) ====================
    "TTNT": {
      id: "TTNT",
      name: "Trí tuệ nhân tạo",
      shortName: "AI / TTNT",
      code: "AI_001",
      phase: 1,
      phaseText: "Giai đoạn 1 (31/08 - 23/09)",
      totalSessionsText: "12 buổi (3 T2, 3 T4, 3 T5, 3 T7)",
      room: "HT A601-HL",
      color: "#4f46e5",
      gradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
      lightBg: "rgba(79, 70, 229, 0.12)",
      borderColor: "rgba(79, 70, 229, 0.35)",
      badgeClass: "badge-ai",
      icon: "🤖",
      description: "Môn học chuyên sâu về thuật toán, học máy và hệ thống trí tuệ nhân tạo (12 buổi: 3 Thứ Hai, 3 Thứ Tư, 3 Thứ Năm, 3 Thứ Bảy tại HT A601-HL)."
    },
    "TDPB": {
      id: "TDPB",
      name: "Kỹ năng tư duy phản biện và đàm phán",
      shortName: "Tư duy PB & ĐP",
      code: "SKILL_PBDP",
      phase: 1,
      phaseText: "Giai đoạn 1 (31/08 - 22/09)",
      totalSessionsText: "06 buổi (3 T3, 3 T6)",
      room: "HT A601-HL",
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
      lightBg: "rgba(5, 150, 105, 0.12)",
      borderColor: "rgba(5, 150, 105, 0.35)",
      badgeClass: "badge-pb",
      icon: "🧠",
      description: "Kỹ năng phân tích đa chiều, phản biện logic và nghệ thuật đàm phán, thương lượng (06 buổi: 3 Thứ Ba, 3 Thứ Sáu tại HT A601-HL)."
    },
    "NCKH": {
      id: "NCKH",
      name: "Phương pháp nghiên cứu khoa học",
      shortName: "Phương pháp NCKH",
      code: "RES_NCKH",
      phase: 1,
      phaseText: "Giai đoạn 1 (24/09 - 12/10)",
      totalSessionsText: "11 buổi (3 T2, 2 T4, 3 T5, 3 T7)",
      room: "HT A601-HL",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
      lightBg: "rgba(139, 92, 246, 0.12)",
      borderColor: "rgba(139, 92, 246, 0.35)",
      badgeClass: "badge-nckh",
      icon: "🔬",
      description: "Phương pháp luận, thu thập dữ liệu và kỹ năng viết công trình nghiên cứu khoa học (11 buổi: 3 Thứ Hai, 2 Thứ Tư, 3 Thứ Năm, 3 Thứ Bảy tại HT A601-HL)."
    },
    "QLCV": {
      id: "QLCV",
      name: "Kỹ năng quản lý và tổ chức công việc",
      shortName: "Kỹ năng QL & TCCV",
      code: "SKILL_QLCV",
      phase: 1,
      phaseText: "Giai đoạn 1 (25/09 - 13/10)",
      totalSessionsText: "06 buổi (3 T3, 3 T6)",
      room: "HT A601-HL",
      color: "#d97706",
      gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
      lightBg: "rgba(217, 119, 6, 0.12)",
      borderColor: "rgba(217, 119, 6, 0.35)",
      badgeClass: "badge-qlcv",
      icon: "📊",
      description: "Kỹ năng lập kế hoạch, quản trị mục tiêu cá nhân và điều phối công việc hiệu quả (06 buổi: 3 Thứ Ba, 3 Thứ Sáu tại HT A601-HL)."
    },

    // ==================== GIAI ĐOẠN 2 (14/10 – 17/12/2026) ====================
    "TCC": {
      id: "TCC",
      name: "Toán cao cấp",
      shortName: "Toán cao cấp",
      code: "MATH_001",
      phase: 2,
      phaseText: "Giai đoạn 2 (14/10 - 16/12)",
      room: "HT A702-HL",
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
      lightBg: "rgba(37, 99, 235, 0.12)",
      borderColor: "rgba(37, 99, 235, 0.35)",
      badgeClass: "badge-tcc",
      icon: "📐",
      description: "Học vào chiều Thứ 2 (Tiết 9–10: 15h20–17h05) và chiều Thứ 4 (Tiết 6–8: 12h30–15h15) tại HT A702-HL."
    },
    "THML": {
      id: "THML",
      name: "Triết học Mác - Lênin",
      shortName: "Triết học Mác-Lênin",
      code: "PHIL_001",
      phase: 2,
      phaseText: "Giai đoạn 2 (16/10 - 15/12)",
      room: "HT A702-HL",
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
      lightBg: "rgba(5, 150, 105, 0.12)",
      borderColor: "rgba(5, 150, 105, 0.35)",
      badgeClass: "badge-thml",
      icon: "📜",
      description: "Học vào chiều Thứ 3 (Tiết 9–10: 15h20–17h05) và chiều Thứ 6 (Tiết 6–8: 12h30–15h15) tại HT A702-HL."
    },
    "THDC": {
      id: "THDC",
      name: "Tin học",
      shortName: "Tin học",
      code: "IT_001",
      phase: 2,
      phaseText: "Giai đoạn 2 (15/10 - 17/12)",
      room: "HT A702-HL",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
      lightBg: "rgba(124, 58, 237, 0.12)",
      borderColor: "rgba(124, 58, 237, 0.35)",
      badgeClass: "badge-thdc",
      icon: "💻",
      description: "Học vào chiều Thứ 5 (Tiết 9–10: 15h20–17h05) và chiều Thứ 7 (Tiết 6–8: 12h30–15h15) tại HT A702-HL."
    }
  },

  // Danh sách toàn bộ 16 tuần học trong Kỳ 1
  weeks: [
    // Giai đoạn 1: Tuần 1 - Tuần 7
    {
      weekNumber: 1,
      name: "Tuần 1",
      dateRange: "31/08 – 06/09/2026",
      startDate: "2026-08-31",
      endDate: "2026-09-06",
      phase: 1,
      phaseName: "GĐ 1: Lớp ghép CQ64.05.04 (134 SV) • HT A601-HL"
    },
    {
      weekNumber: 2,
      name: "Tuần 2",
      dateRange: "07/09 – 13/09/2026",
      startDate: "2026-09-07",
      endDate: "2026-09-13",
      phase: 1,
      phaseName: "GĐ 1: Lớp ghép CQ64.05.04 (134 SV) • HT A601-HL"
    },
    {
      weekNumber: 3,
      name: "Tuần 3",
      dateRange: "14/09 – 20/09/2026",
      startDate: "2026-09-14",
      endDate: "2026-09-20",
      phase: 1,
      phaseName: "GĐ 1: Lớp ghép CQ64.05.04 (134 SV) • HT A601-HL"
    },
    {
      weekNumber: 4,
      name: "Tuần 4",
      dateRange: "21/09 – 27/09/2026",
      startDate: "2026-09-21",
      endDate: "2026-09-27",
      phase: 1,
      phaseName: "GĐ 1: Lớp ghép CQ64.05.04 (134 SV) • Chuyển tiếp môn GĐ1"
    },
    {
      weekNumber: 5,
      name: "Tuần 5",
      dateRange: "28/09 – 04/10/2026",
      startDate: "2026-09-28",
      endDate: "2026-10-04",
      phase: 1,
      phaseName: "GĐ 1: Lớp ghép CQ64.05.04 (134 SV) • HT A601-HL"
    },
    {
      weekNumber: 6,
      name: "Tuần 6",
      dateRange: "05/10 – 11/10/2026",
      startDate: "2026-10-05",
      endDate: "2026-10-11",
      phase: 1,
      phaseName: "GĐ 1: Lớp ghép CQ64.05.04 (134 SV) • HT A601-HL"
    },
    {
      weekNumber: 7,
      name: "Tuần 7",
      dateRange: "12/10 – 18/10/2026",
      startDate: "2026-10-12",
      endDate: "2026-10-18",
      phase: "1 & 2",
      phaseName: "Chuyển giao: 12-13/10 Lớp ghép (A601) ➔ 14-17/10 Lớp riêng (A702)"
    },

    // Giai đoạn 2: Tuần 8 - Tuần 16
    {
      weekNumber: 8,
      name: "Tuần 8",
      dateRange: "19/10 – 25/10/2026",
      startDate: "2026-10-19",
      endDate: "2026-10-25",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 9,
      name: "Tuần 9",
      dateRange: "26/10 – 01/11/2026",
      startDate: "2026-10-26",
      endDate: "2026-11-01",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 10,
      name: "Tuần 10",
      dateRange: "02/11 – 08/11/2026",
      startDate: "2026-11-02",
      endDate: "2026-11-08",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 11,
      name: "Tuần 11",
      dateRange: "09/11 – 15/11/2026",
      startDate: "2026-11-09",
      endDate: "2026-11-15",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 12,
      name: "Tuần 12",
      dateRange: "16/11 – 22/11/2026",
      startDate: "2026-11-16",
      endDate: "2026-11-22",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 13,
      name: "Tuần 13",
      dateRange: "23/11 – 29/11/2026",
      startDate: "2026-11-23",
      endDate: "2026-11-29",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 14,
      name: "Tuần 14",
      dateRange: "30/11 – 06/12/2026",
      startDate: "2026-11-30",
      endDate: "2026-12-06",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 15,
      name: "Tuần 15",
      dateRange: "07/12 – 13/12/2026",
      startDate: "2026-12-07",
      endDate: "2026-12-13",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • HT A702-HL"
    },
    {
      weekNumber: 16,
      name: "Tuần 16",
      dateRange: "14/12 – 20/12/2026",
      startDate: "2026-12-14",
      endDate: "2026-12-20",
      phase: 2,
      phaseName: "GĐ 2: Lớp riêng CQ64.09.01.01+02 (91 SV) • Bế mạc kỳ: 17/12"
    }
  ]
};

// Chi tiết toàn bộ 91 buổi học thực tế trong toàn bộ Học kỳ 1
const SCHEDULE_SESSIONS = [
  // =========================================================================
  // GIAI ĐOẠN 1: 35 BUỔI (TỪ 31/08/2026 ĐẾN 13/10/2026) - HT A601-HL
  // =========================================================================

  // --- TUẦN 1 (31/08 – 06/09/2026) ---
  {
    id: "SESS-01",
    date: "2026-09-03",
    dayOfWeek: 4,
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

  // --- TUẦN 2 (07/09 – 13/09/2026) ---
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

  // --- TUẦN 3 (14/09 – 20/09/2026) ---
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

  // --- TUẦN 4 (21/09 – 27/09/2026) ---
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
  {
    id: "SESS-19",
    date: "2026-09-24",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 4,
    phase: 1,
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
    phase: 1,
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
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },

  // --- TUẦN 5 (28/09 – 04/10/2026) ---
  {
    id: "SESS-22",
    date: "2026-09-28",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 5,
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },

  // --- TUẦN 6 (05/10 – 11/10/2026) ---
  {
    id: "SESS-28",
    date: "2026-10-05",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 6,
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "NCKH",
    room: "HT A601-HL"
  },

  // --- TUẦN 7: KẾT THÚC GĐ 1 (12 - 13/10) ---
  {
    id: "SESS-34",
    date: "2026-10-12",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 7,
    phase: 1,
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
    phase: 1,
    slotKey: "6-7",
    slotName: "Slot 6 – 7",
    startTime: "12:30",
    endTime: "14:15",
    subjectId: "QLCV",
    room: "HT A601-HL"
  },

  // =========================================================================
  // GIAI ĐOẠN 2: 56 BUỔI (TỪ 14/10/2026 ĐẾN 17/12/2026) - HT A702-HL
  // =========================================================================

  // --- TUẦN 7: BẮT ĐẦU GĐ 2 (14 - 17/10/2026) ---
  {
    id: "SESS-36",
    date: "2026-10-14",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 7,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-37",
    date: "2026-10-15",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 7,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-38",
    date: "2026-10-16",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 7,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-39",
    date: "2026-10-17",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 7,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 8 (19/10 – 25/10/2026) ---
  {
    id: "SESS-40",
    date: "2026-10-19",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 8,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-41",
    date: "2026-10-20",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 8,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-42",
    date: "2026-10-21",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 8,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-43",
    date: "2026-10-22",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 8,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-44",
    date: "2026-10-23",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 8,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-45",
    date: "2026-10-24",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 8,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 9 (26/10 – 01/11/2026) ---
  {
    id: "SESS-46",
    date: "2026-10-26",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 9,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-47",
    date: "2026-10-27",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 9,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-48",
    date: "2026-10-28",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 9,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-49",
    date: "2026-10-29",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 9,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-50",
    date: "2026-10-30",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 9,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-51",
    date: "2026-10-31",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 9,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 10 (02/11 – 08/11/2026) ---
  {
    id: "SESS-52",
    date: "2026-11-02",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 10,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-53",
    date: "2026-11-03",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 10,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-54",
    date: "2026-11-04",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 10,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-55",
    date: "2026-11-05",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 10,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-56",
    date: "2026-11-06",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 10,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-57",
    date: "2026-11-07",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 10,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 11 (09/11 – 15/11/2026) ---
  {
    id: "SESS-58",
    date: "2026-11-09",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 11,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-59",
    date: "2026-11-10",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 11,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-60",
    date: "2026-11-11",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 11,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-61",
    date: "2026-11-12",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 11,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-62",
    date: "2026-11-13",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 11,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-63",
    date: "2026-11-14",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 11,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 12 (16/11 – 22/11/2026) ---
  {
    id: "SESS-64",
    date: "2026-11-16",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 12,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-65",
    date: "2026-11-17",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 12,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-66",
    date: "2026-11-18",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 12,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-67",
    date: "2026-11-19",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 12,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-68",
    date: "2026-11-20",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 12,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-69",
    date: "2026-11-21",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 12,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 13 (23/11 – 29/11/2026) ---
  {
    id: "SESS-70",
    date: "2026-11-23",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 13,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-71",
    date: "2026-11-24",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 13,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-72",
    date: "2026-11-25",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 13,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-73",
    date: "2026-11-26",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 13,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-74",
    date: "2026-11-27",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 13,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-75",
    date: "2026-11-28",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 13,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 14 (30/11 – 06/12/2026) ---
  {
    id: "SESS-76",
    date: "2026-11-30",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 14,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-77",
    date: "2026-12-01",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 14,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-78",
    date: "2026-12-02",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 14,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-79",
    date: "2026-12-03",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 14,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-80",
    date: "2026-12-04",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 14,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-81",
    date: "2026-12-05",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 14,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 15 (07/12 – 13/12/2026) ---
  {
    id: "SESS-82",
    date: "2026-12-07",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 15,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-83",
    date: "2026-12-08",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 15,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-84",
    date: "2026-12-09",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 15,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-85",
    date: "2026-12-10",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 15,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-86",
    date: "2026-12-11",
    dayOfWeek: 5,
    dayName: "Thứ Sáu",
    dayNameEn: "FRI",
    weekNumber: 15,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-87",
    date: "2026-12-12",
    dayOfWeek: 6,
    dayName: "Thứ Bảy",
    dayNameEn: "SAT",
    weekNumber: 15,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "THDC",
    room: "HT A702-HL"
  },

  // --- TUẦN 16 (14/12 – 17/12/2026: KẾT THÚC KỲ HỌC) ---
  {
    id: "SESS-88",
    date: "2026-12-14",
    dayOfWeek: 1,
    dayName: "Thứ Hai",
    dayNameEn: "MON",
    weekNumber: 16,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-89",
    date: "2026-12-15",
    dayOfWeek: 2,
    dayName: "Thứ Ba",
    dayNameEn: "TUE",
    weekNumber: 16,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THML",
    room: "HT A702-HL"
  },
  {
    id: "SESS-90",
    date: "2026-12-16",
    dayOfWeek: 3,
    dayName: "Thứ Tư",
    dayNameEn: "WED",
    weekNumber: 16,
    phase: 2,
    slotKey: "6-8",
    slotName: "Tiết 6 – 8",
    startTime: "12:30",
    endTime: "15:15",
    subjectId: "TCC",
    room: "HT A702-HL"
  },
  {
    id: "SESS-91",
    date: "2026-12-17",
    dayOfWeek: 4,
    dayName: "Thứ Năm",
    dayNameEn: "THU",
    weekNumber: 16,
    phase: 2,
    slotKey: "9-10",
    slotName: "Tiết 9 – 10",
    startTime: "15:20",
    endTime: "17:05",
    subjectId: "THDC",
    room: "HT A702-HL"
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

  // Lấy thông tin khung giờ (slot)
  getSlotInfo(slotKey) {
    return SCHEDULE_CONFIG.slots[slotKey] || {
      name: `Tiết ${slotKey}`,
      type: "afternoon",
      timeRange: "",
      slotDetails: "",
      isAvailable: true
    };
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
