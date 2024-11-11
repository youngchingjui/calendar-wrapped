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
  };
}