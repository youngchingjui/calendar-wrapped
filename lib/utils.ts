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
    months: Array(12).fill(0), // Array to count events per month
    days: Array(365).fill(0), // Array to count events per day
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

    // Calculate total meeting duration, excluding all-day events and events with no other invitees
    if (
      event.start &&
      event.end &&
      event.start.dateTime &&
      event.end.dateTime &&
      event.attendees &&
      event.attendees.length > 1
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

  // Find the busiest month
  const busiestMonthIndex = stats.months.indexOf(Math.max(...stats.months));
  const busiestMonth = new Date(2024, busiestMonthIndex).toLocaleString('default', { month: 'long' });

  // Find the busiest day
  const busiestDayIndex = stats.days.indexOf(Math.max(...stats.days));
  const busiestDay = new Date(2024, busiestDayIndex).toLocaleString('default', { day: 'numeric' });

  // Find the most popular online meeting platform
  const mostPopularOnlineMeetingPlatform = Object.entries(stats.locations).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0]
  )[0];


  return {
    totalEvents: stats.totalEvents,
    mostCommonLocation,
    mostCommonEventType,
    busiestMonth,
    busiestDay,
    mostPopularOnlineMeetingPlatform,
    totalMeetingDuration: stats.totalMeetingDuration,
  };
}