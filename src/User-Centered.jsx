import { useEffect, useMemo, useRef, useState } from 'react';

const COURSES = [
    {
      id: 'CS 401',
      department: 'Computer Science',
      title: 'Advanced Algorithms',
      description:
        'In-depth study of algorithm design and analysis, including dynamic programming, graph algorithms, and computational complexity.',
      instructor: 'Prof. Dr. Sarah Chen',
      location: 'Science Hall 204',
      schedule: 'MWF 10:00–11:00 AM',
      enrolled: 28,
      capacity: 30,
      credits: 4,
      prerequisites: ['CS 201', 'CS 301'],
      seatsLeft: 2,
    },
    {
      id: 'CS 260',
      department: 'Computer Science',
      title: 'Data Structures and Software Design',
      description:
        'Arrays, linked structures, stacks, queues, trees, hash tables, and design tradeoffs used in larger software systems.',
      instructor: 'Dr. Priya Shah',
      location: 'Whittemore 120',
      schedule: 'TR 9:30–10:45 AM',
      enrolled: 34,
      capacity: 40,
      credits: 3,
      prerequisites: ['CS 111'],
      seatsLeft: 6,
    },
    {
      id: 'CS 375',
      department: 'Computer Science',
      title: 'Intro to Database Management Systems',
      description:
        'Relational modeling, SQL, normalization, indexing, transactions, and building database-backed applications.',
      instructor: 'Prof. Mateo Alvarez',
      location: 'McBryde 225',
      schedule: 'MW 1:00–2:15 PM',
      enrolled: 39,
      capacity: 40,
      credits: 3,
      prerequisites: ['CS 260'],
      seatsLeft: 1,
    },
    {
      id: 'CS 4624',
      department: 'Computer Science',
      title: 'Multimedia, Hypertext, and Information Access',
      description:
        'Search interfaces, information retrieval, recommender systems, and evaluation of interactive information systems.',
      instructor: 'Dr. Nia Thompson',
      location: 'Torgersen 1100',
      schedule: 'TR 12:30–1:45 PM',
      enrolled: 18,
      capacity: 30,
      credits: 3,
      prerequisites: ['CS 311'],
      seatsLeft: 12,
    },
    {
      id: 'MATH 305',
      department: 'Mathematics',
      title: 'Linear Algebra',
      description:
        'Core study of matrices, vector spaces, linear transformations, eigenvalues, and applications across computing and engineering.',
      instructor: 'Dr. Elena Park',
      location: 'Math Building 101',
      schedule: 'TR 2:00–3:15 PM',
      enrolled: 22,
      capacity: 25,
      credits: 3,
      prerequisites: ['MATH 211'],
      seatsLeft: 3,
    },
    {
      id: 'MATH 3134',
      department: 'Mathematics',
      title: 'Applied Combinatorics and Graph Theory',
      description:
        'Counting methods, recurrence relations, graph traversal, coloring, trees, and network applications.',
      instructor: 'Prof. Hannah Lee',
      location: 'McBryde 328',
      schedule: 'MWF 9:00–9:50 AM',
      enrolled: 19,
      capacity: 32,
      credits: 3,
      prerequisites: ['MATH 1226'],
      seatsLeft: 13,
    },
    {
      id: 'STAT 3615',
      department: 'Statistics',
      title: 'Biological Statistics',
      description:
        'Experimental design, hypothesis testing, confidence intervals, regression, and statistical reasoning in applied contexts.',
      instructor: 'Dr. Omar Bennett',
      location: 'Data & Decision Sciences 145',
      schedule: 'TR 11:00–12:15 PM',
      enrolled: 45,
      capacity: 50,
      credits: 3,
      prerequisites: ['MATH 1025'],
      seatsLeft: 5,
    },
    {
      id: 'HCI 410',
      department: 'Human-Computer Interaction',
      title: 'Human-Computer Interaction',
      description:
        'Principles of user-centered design, interface prototyping, evaluation methods, and usability engineering.',
      instructor: 'Prof. James Rivera',
      location: 'Torgersen 3150',
      schedule: 'MW 2:30–3:45 PM',
      enrolled: 17,
      capacity: 24,
      credits: 3,
      prerequisites: ['CS 210'],
      seatsLeft: 7,
    },
    {
      id: 'HCI 430',
      department: 'Human-Computer Interaction',
      title: 'Usability Engineering Methods',
      description:
        'Structured interviews, surveys, task analysis, heuristic evaluation, cognitive walkthroughs, and usability reporting.',
      instructor: 'Dr. Aisha Coleman',
      location: 'Goodwin 155',
      schedule: 'F 1:00–3:45 PM',
      enrolled: 12,
      capacity: 18,
      credits: 3,
      prerequisites: ['HCI 410'],
      seatsLeft: 6,
    },
    {
      id: 'ENGL 3764',
      department: 'English',
      title: 'Technical Writing',
      description:
        'Audience analysis, professional communication, documentation, usability of instructions, and revision strategies.',
      instructor: 'Prof. Laura Mitchell',
      location: 'Shanks 370',
      schedule: 'MW 11:00–12:15 PM',
      enrolled: 20,
      capacity: 28,
      credits: 3,
      prerequisites: ['ENGL 1106'],
      seatsLeft: 8,
    },
    {
      id: 'ART 2385',
      department: 'Art and Design',
      title: 'Visual Design Studio',
      description:
        'Typography, layout, color, hierarchy, and critique-based visual design for print and digital interfaces.',
      instructor: 'Maya Greene',
      location: 'Armory 203',
      schedule: 'TR 3:30–4:45 PM',
      enrolled: 16,
      capacity: 20,
      credits: 3,
      prerequisites: ['None'],
      seatsLeft: 4,
    },
    {
      id: 'BIT 3444',
      department: 'Business Information Technology',
      title: 'Advanced Business Computing and Applications',
      description:
        'Spreadsheet modeling, data cleaning, dashboards, analytics workflows, and business decision support systems.',
      instructor: 'Dr. Kevin Brooks',
      location: 'Pamplin 32',
      schedule: 'MW 4:00–5:15 PM',
      enrolled: 26,
      capacity: 35,
      credits: 3,
      prerequisites: ['BIT 2405'],
      seatsLeft: 9,
    },
    {
      id: 'UNIV 101',
      department: 'University Studies',
      title: 'First-Year Seminar',
      description:
        'A small seminar focused on academic planning, campus resources, study strategies, and transition to college life.',
      instructor: 'Jordan Wells',
      location: 'Newman Library 207A',
      schedule: 'W 3:00–3:50 PM',
      enrolled: 14,
      capacity: 18,
      credits: 1,
      prerequisites: ['None'],
      seatsLeft: 4,
    },
  ];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_CODE_MAP = {
  M: 'Monday',
  T: 'Tuesday',
  W: 'Wednesday',
  R: 'Thursday',
  F: 'Friday',
};

const START_HOUR = 8;
const END_HOUR = 17;
const HOUR_HEIGHT = 72;
const GRID_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
const MIN_LEFT_PCT = 30;
const MAX_LEFT_PCT = 70;

export default function App() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [leftPaneWidth, setLeftPaneWidth] = useState(75);
  const [isDragging, setIsDragging] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [creditFilter, setCreditFilter] = useState('All Credits');

  const splitContainerRef = useRef(null);

  const enrolledCourses = useMemo(
    () => COURSES.filter((course) => enrolledCourseIds.includes(course.id)),
    [enrolledCourseIds]
  );

  const totalCredits = useMemo(
    () => enrolledCourses.reduce((sum, course) => sum + course.credits, 0),
    [enrolledCourses]
  );

  const courseCount = enrolledCourses.length;
  const status = totalCredits >= 12 ? 'Full-time' : totalCredits > 0 ? 'Part-time' : 'Not enrolled';

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const department =
        course.department ??
        (course.id.startsWith('CS')
          ? 'Computer Science'
          : course.id.startsWith('MATH')
          ? 'Mathematics'
          : course.id.startsWith('HCI')
          ? 'Human-Computer Interaction'
          : 'Other');
  
      const query = searchQuery.toLowerCase();
  
      const matchesSearch =
        course.id.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.location.toLowerCase().includes(query);
  
      const matchesDepartment =
        departmentFilter === 'All Departments' || department === departmentFilter;
  
      const matchesCredits =
        creditFilter === 'All Credits' ||
        (creditFilter === '1–2 Credits' && course.credits <= 2) ||
        (creditFilter === '3 Credits' && course.credits === 3) ||
        (creditFilter === '4+ Credits' && course.credits >= 4);
  
      return matchesSearch && matchesDepartment && matchesCredits;
    });
  }, [searchQuery, departmentFilter, creditFilter]);

  const toggleEnrollment = (courseId) => {
    setEnrolledCourseIds((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging || !splitContainerRef.current) return;

      const bounds = splitContainerRef.current.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const nextPercent = (pointerX / bounds.width) * 100;
      const clampedPercent = Math.min(MAX_LEFT_PCT, Math.max(MIN_LEFT_PCT, nextPercent));

      setLeftPaneWidth(clampedPercent);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-[#f5f5f6] text-slate-900">
      <header className="bg-gradient-to-r from-[#6b1028] via-[#8f2d2d] to-[#d97706] px-6 py-8 shadow-sm md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8l10-5 10 5-10 5L2 8Z" />
                <path d="M6 10v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Course Registration
              </h1>
              <p className="mt-1 text-lg text-white/85">Spring 2026 Semester</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8 md:px-10">
        <section className="rounded-2xl bg-gradient-to-r from-[#701a33] via-[#9a3412] to-[#ea580c] p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Enrollment Summary</h2>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <SummaryStat
              label="Total Credits"
              value={String(totalCredits)}
              subtext={
                totalCredits >= 12
                  ? 'Full-time load reached'
                  : `${Math.max(12 - totalCredits, 0)} more for full-time`
              }
            />
            <SummaryStat label="Course Count" value={String(courseCount)} subtext="Currently enrolled" />
            <SummaryStat label="Status" value={status} subtext="" />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-3xl font-semibold tracking-tight text-[#2d1c1f]">
                Find Courses
                </h2>
                <p className="mt-2 text-slate-500">
                Search before browsing or building your schedule.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <Field label="Search Courses">
                <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-[#7a294f]"
                    placeholder="Course code, instructor, location..."
                />
                </Field>

                <Field label="Department">
                <select
                    value={departmentFilter}
                    onChange={(event) => setDepartmentFilter(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#7a294f]"
                >
                    <option>All Departments</option>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Human-Computer Interaction</option>
                </select>
                </Field>

                <Field label="Credits">
                <select
                    value={creditFilter}
                    onChange={(event) => setCreditFilter(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#7a294f]"
                >
                    <option>All Credits</option>
                    <option>1–2 Credits</option>
                    <option>3 Credits</option>
                    <option>4+ Credits</option>
                </select>
                </Field>
            </div>
        </section>

        <section className="mt-8 lg:hidden">
          <div className="space-y-8">
            <BrowseCourses
              courses={filteredCourses}
              enrolledCourseIds={enrolledCourseIds}
              onToggleEnrollment={toggleEnrollment}
            />
            <ScheduleView
              enrolledCourses={enrolledCourses}
              totalCredits={totalCredits}
              courseCount={courseCount}
              status={status}
            />
          </div>
        </section>

        <section className="mt-8 hidden lg:block">
          <div
            ref={splitContainerRef}
            className={`flex min-h-[900px] rounded-2xl border border-slate-200 bg-transparent ${
              isDragging ? 'select-none cursor-col-resize' : ''
            }`}
          >
            <div
              className="min-w-0 pr-6"
              style={{ width: `calc(${leftPaneWidth}% - 6px)` }}
            >
              <BrowseCourses
                courses={filteredCourses}
                enrolledCourseIds={enrolledCourseIds}
                onToggleEnrollment={toggleEnrollment}
              />
            </div>

            <div
              className="relative flex w-3 shrink-0 cursor-col-resize items-stretch justify-center"
              onMouseDown={handleDragStart}
            >
              <div className="absolute inset-y-0 w-px bg-slate-300" />
              <div className="absolute top-1/2 flex h-16 w-3 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
                <div className="flex gap-0.5">
                  <span className="h-6 w-0.5 rounded bg-slate-400" />
                  <span className="h-6 w-0.5 rounded bg-slate-400" />
                </div>
              </div>
            </div>

            <div
              className="min-w-0 pl-6"
              style={{ width: `calc(${100 - leftPaneWidth}% - 6px)` }}
            >
              <ScheduleView
                enrolledCourses={enrolledCourses}
                totalCredits={totalCredits}
                courseCount={courseCount}
                status={status}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function BrowseCourses({ courses, allCoursesCount, enrolledCourseIds, onToggleEnrollment }) {
    return (
      <>
        <div className="mb-5">
          <h2 className="text-4xl font-semibold tracking-tight text-[#2d1c1f]">
            Browse Courses
          </h2>
          <p className="mt-2 text-slate-500">
            Select courses to add them to your weekly schedule
          </p>
        </div>
  
        <section className="mt-7 space-y-5">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              Showing {courses.length} of {allCoursesCount} courses
            </span>
          </div>
  
          {courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">
              No courses match those filters. Try a course code, instructor, department, or location.
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
              {courses.map((course) => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
  
                return (
                  <article
                    key={course.id}
                    className="group relative min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {course.id}
                        </span>
  
                        <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#9a3412]">
                          {course.department}
                        </span>
                      </div>
  
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#9f1f39]">
                          {course.credits}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          Credits
                        </div>
                      </div>
                    </div>
  
                    <h3 className="mt-2 line-clamp-2 break-words text-2xl font-semibold tracking-tight text-[#2d1c1f]">
                        {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-slate-500">
                        {course.description}
                    </p>
  
                    <div className="mt-5 space-y-2 text-sm text-slate-700">
                      <InfoItem>{course.instructor}</InfoItem>
                      <InfoItem>{course.schedule}</InfoItem>
                      <InfoItem>{course.location}</InfoItem>
                    </div>
  
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#c39a57]">
                          {course.seatsLeft} seats left
                        </p>
                        <p className="text-xs text-slate-500">
                          {course.enrolled}/{course.capacity} enrolled
                        </p>
                      </div>
  
                      <button
                        onClick={() => onToggleEnrollment(course.id)}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 ${
                          isEnrolled ? 'bg-emerald-600' : 'bg-[#1d3f73]'
                        }`}
                      >
                        {isEnrolled ? 'Enrolled' : '+ Add'}
                      </button>
                    </div>
  
                    <div className="pointer-events-none absolute left-4 right-4 top-full z-20 mt-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 opacity-0 shadow-xl transition group-hover:opacity-100">
                      <p className="font-semibold text-[#2d1c1f]">Prerequisites</p>
                      <p className="mt-1">
                        {course.prerequisites?.length
                          ? course.prerequisites.join(', ')
                          : 'None'}
                      </p>
  
                      <p className="mt-3 font-semibold text-[#2d1c1f]">Details</p>
                      <p className="mt-1">{course.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </>
    );
  }

function ScheduleView({ enrolledCourses, totalCredits, courseCount, status }) {
  const blocks = useMemo(() => buildScheduleBlocks(enrolledCourses), [enrolledCourses]);

  return (
    <>
      <div className="mb-5">
        <h2 className="text-4xl font-semibold tracking-tight text-[#2d1c1f]">Your Schedule</h2>
        <p className="mt-2 text-slate-500">Weekly calendar for enrolled courses</p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <ScheduleMiniStat label="Total Credits" value={String(totalCredits)} />
        <ScheduleMiniStat label="Course Count" value={String(courseCount)} />
        <ScheduleMiniStat label="Status" value={status} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {enrolledCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-500">
            No courses enrolled yet. Add courses on the left to populate the calendar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[860px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div
                className="grid"
                style={{ gridTemplateColumns: '80px repeat(5, minmax(0, 1fr))' }}
              >
                <div className="border-b border-r border-slate-200 bg-slate-50" />
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="border-b border-r border-slate-200 bg-slate-50 px-4 py-3 text-center font-semibold text-slate-800 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}

                <div className="border-r border-slate-200 bg-slate-50">
                  {Array.from({ length: END_HOUR - START_HOUR }).map((_, index) => {
                    const hour = START_HOUR + index;
                    return (
                      <div
                        key={hour}
                        className="border-b border-slate-200 px-3 py-2 text-sm text-slate-500"
                        style={{ height: `${HOUR_HEIGHT}px` }}
                      >
                        {formatHourLabel(hour)}
                      </div>
                    );
                  })}
                </div>

                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="relative border-r border-slate-200 last:border-r-0"
                    style={{ height: `${GRID_HEIGHT}px` }}
                  >
                    <div className="absolute inset-0">
                      {Array.from({ length: END_HOUR - START_HOUR }).map((_, index) => (
                        <div
                          key={index}
                          className="border-b border-slate-200"
                          style={{ height: `${HOUR_HEIGHT}px` }}
                        />
                      ))}
                    </div>

                    {blocks
                      .filter((block) => block.day === day)
                      .map((block) => (
                        <div
                          key={`${block.course.id}-${day}`}
                          className={`absolute left-1.5 right-1.5 z-10 rounded-md p-3 text-white shadow-md ${
                            block.course.id.startsWith('CS')
                              ? 'bg-[#98243b]'
                              : block.course.id.startsWith('MATH')
                              ? 'bg-[#274675]'
                              : 'bg-[#5f335f]'
                          }`}
                          style={{
                            top: `${block.top}px`,
                            height: `${block.height}px`,
                          }}
                        >
                          <div className="text-sm font-bold">{block.course.id}</div>
                          <div className="mt-1 text-sm">{block.course.title}</div>
                          <div className="mt-1 text-sm opacity-90">{block.course.location}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function ScheduleMiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}

function buildScheduleBlocks(courses) {
  return courses.flatMap((course) => {
    const parsed = parseSchedule(course.schedule);
    if (!parsed) return [];

    return parsed.days.map((day) => {
      const startMinutes = parsed.startHour * 60 + parsed.startMinute;
      const endMinutes = parsed.endHour * 60 + parsed.endMinute;
      const minutesFromStart = startMinutes - START_HOUR * 60;
      const duration = endMinutes - startMinutes;

      return {
        day,
        course,
        top: (minutesFromStart / 60) * HOUR_HEIGHT,
        height: (duration / 60) * HOUR_HEIGHT,
      };
    });
  });
}

function parseSchedule(schedule) {
  const match = schedule.match(/^([MTWRF]+)\s+(\d{1,2}:\d{2})–(\d{1,2}:\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  const [, dayCodes, startRaw, endRaw, meridiem] = match;

  const start = to24Hour(startRaw, meridiem);
  const end = to24Hour(endRaw, meridiem);

  return {
    days: dayCodes.split('').map((code) => DAY_CODE_MAP[code]),
    startHour: start.hour,
    startMinute: start.minute,
    endHour: end.hour,
    endMinute: end.minute,
  };
}

function to24Hour(time, meridiem) {
  let [hour, minute] = time.split(':').map(Number);

  if (meridiem.toUpperCase() === 'AM') {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }

  return { hour, minute };
}

function formatHourLabel(hour24) {
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00 ${suffix}`;
}

function SummaryStat({ label, value, subtext }) {
  return (
    <div>
      <div className="text-sm font-semibold tracking-wide text-white/85">{label}</div>
      <div className="mt-3 text-5xl font-bold">{value}</div>
      {subtext ? <div className="mt-2 text-white/75">{subtext}</div> : null}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-slate-800">{label}</div>
      {children}
    </label>
  );
}

function InfoItem({ children }) {
  return <div className="text-base">{children}</div>;
}