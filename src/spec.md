# Specification

## Summary
**Goal:** Expand the app’s higher-education course catalog (UG/PG/Doctoral) and ensure the Courses UI correctly displays the expanded list with appropriate icons.

**Planned changes:**
- Expand backend default course seeding (addDefaultCourses) to include a broader set of higher-education programs across Science, Arts, and Commerce for Undergraduate, Postgraduate, and Doctoral levels, ensuring every seeded course has a non-empty title and description and uses existing Category/Level enums.
- Ensure the course listing endpoint (getAllCourses) returns the expanded seeded catalog sorted by id.
- Extend the frontend course title-to-icon mapping to cover newly added course titles, and ensure the Courses grid renders new items with category badges and descriptions without broken icons.
- Add any missing generated icon assets referenced by the updated icon mapping under `frontend/public/assets/generated` with filenames matching the mapping.

**User-visible outcome:** The Courses section shows a much larger, comprehensive higher-education catalog (UG/PG/Doctoral) with category badges and descriptions, and course icons appear where available without broken image placeholders.
