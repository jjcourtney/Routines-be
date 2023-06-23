type ScheduleQuery = { id?: number; name?: string };
type TaskQuery = { complete?: string; scheduleId?: string; name?: string };

export type RoutineQuery = ScheduleQuery | TaskQuery;

export type Collection = "routines" | "schedules" | "tasks";
