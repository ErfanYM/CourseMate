# Sprint 1 - Planning Document

## Sprint Goal
The goal of Sprint 1 is to implement the foundational components of the CourseMate project. In this sprint, we aim to provide students with core functionality that allows them to:
- Add, remove, and edit courses with associated notes.
- Manage tasks and deadlines through a calendar-based to-do list.
- Customize course syllabuses, with weights for assignments, quizzes, and tests, all visible on a user-friendly interface.

## Participants
- **Project Manager**: Adil Guluzade
- **Developers**: Erfan YousefMoumji, Navid Golshan, Adil Guluzade
- **UI/UX Designer**: Erfan YousefMoumji, Navid Golshan, Adil Guluzade
- **QA Tester**: Erfan YousefMoumji, Navid Golshan, Adil Guluzade

## Sprint Capacity
- Estimated sprint capacity: **30 hours per participant**
- Each team member has allocated time to focus on their respective areas: development, design, and testing.

## User Stories for Sprint 1
The following user stories are prioritized for Sprint 1:

1. **As a student, I want to add, edit, and remove courses in my dashboard so that I can manage my classes each semester.**
   - **Acceptance Criteria**:
     - User can add a new course with notes.
     - User can edit or remove an existing course.
   - **Priority**: High

2. **As a student, I want to manage my to-do list with a calendar, so I can keep track of deadlines and weekly tasks.**
   - **Acceptance Criteria**:
     - User can add tasks and deadlines for each course and general weekly tasks.
     - Calendar view shows all scheduled tasks for each week.
   - **Priority**: High

3. **As a student, I want to customize my syllabus for each course, adding tasks and weights, so I know what’s expected and when.**
   - **Acceptance Criteria**:
     - User can add syllabus items with weights (e.g., quizzes, tests, projects).
     - Syllabus items appear in the calendar when deadlines are set.
   - **Priority**: Medium

## Task Breakdown

### Task 1: Implement Course Management
- **Design buttons** for adding/removing/editing courses on the dashboard.
- **Backend logic** to support CRUD operations for course data.
- **Frontend integration** to display course data on the dashboard.

### Task 2: Develop Calendar and To-Do List
- **Calendar UI**: Design and integrate a calendar view on the main dashboard.
- **Deadline Management**: Allow users to set and manage deadlines for both course-specific tasks and personal tasks.
- **Testing**: Ensure tasks added to the calendar are displayed accurately.

### Task 3: Course Syllabus Customization
- **Syllabus Setup UI**: Add a section within each course page for users to input syllabus items (e.g., quizzes, assignments).
- **Weight and Deadline Management**: Enable users to assign weights to syllabus items and link them to specific dates.
- **Calendar Integration**: Automatically sync syllabus deadlines with the main calendar.

## Decisions Made
- The calendar and to-do list are prioritized as they are core to the app’s functionality.
- The syllabus customization feature will be linked to the course management function, allowing users to view weighted tasks in the calendar for better time management.


## Expected Outcomes
- A functional course management system that allows students to add, remove, and edit courses.
- A working to-do list with a calendar view that shows task deadlines.
- A syllabus customization feature linked to courses, allowing users to track syllabus components by weight and due dates.

