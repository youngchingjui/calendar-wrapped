import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateStats(events: any[]) {
  const stats = {
    totalEvents: events.length,
    locations: {} as Record<string, number>,
    eventTypes: {} as Record<string, number>,
    busiestMonth: "",
    busiestDay: "",
    totalMeetingDuration: 0, // in minutes
  };

  events.forEach(event => {
    // Count locations
    if (event.location) {
      stats.locations[event.location] = (stats.locations[event.location] || 0) + 1;
    }

    // Count event types
    if (event.eventType) {
      stats.eventTypes[event.eventType] = (stats.eventTypes[event.eventType] || 0) + 1;
    }

    // Calculate total meeting duration, excluding all-day events
    if (
      event.start &&
      event.end &&
      event.start.dateTime &&
      event.end.dateTime
    ) {
      const startTime = new Date(event.start.dateTime);
      const endTime = new Date(event.end.dateTime);
      const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // duration in minutes
      stats.totalMeetingDuration += duration;
    }
  });

  // Find the most common location
  const mostCommonLocation = Object.entries(stats.locations).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0]
  )[0];

  // Find the most common event type
  const mostCommonEventType = Object.entries(stats.eventTypes).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0]
  )[0];

  return {
    totalEvents: stats.totalEvents,
    mostCommonLocation,
    mostCommonEventType,
    busiestMonth: stats.busiestMonth,
    busiestDay: stats.busiestDay,
    totalMeetingDuration: stats.totalMeetingDuration,
  };
}