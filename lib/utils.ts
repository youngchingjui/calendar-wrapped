import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateStats(events: any[]) {

  function isLeapYear(year: number) {
    return new Date(year, 1, 29).getDate() === 29
  }

  function dayOfYear(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  const stats = {
    totalEvents: events.length,
    locations: {} as Record<string, number>,
    eventTypes: {} as Record<string, number>,
    busiestMonth: "",
    busiestDay: "",
    totalMeetingDuration: 0, // in minutes
    months: Array(12).fill(0), // Array to count events per month
    days: Array(365).fill(0), // Array to count events per day
    years: {} as Record<number, number[]>, // Event counts per day for each year
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

    // stats.days is an array of 365 elements, where each element represents a day of the year
    // Count events per day across the whole year
    if (event.start && event.start.dateTime) {
      const eventDate = new Date(event.start.dateTime);
      const year = eventDate.getFullYear();

      // Initialize the array for the year if it doesn't exist
      if (!stats.years[year]) {
        const daysInYear = isLeapYear(year) ? 366 : 365;
        stats.years[year] = Array(daysInYear).fill(0);
      }

      const dayIndex = dayOfYear(eventDate);
      stats.years[year][dayIndex]++;
    }

    // Count events per month
    if (event.start && event.start.dateTime) {
      const eventDate = new Date(event.start.dateTime);
      const monthIndex = eventDate.getMonth(); // 0-indexed
      stats.months[monthIndex]++;
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
  let busiestDayCount = 0
  let busiestDayDate: Date | null = null
  
  for (const [yearStr, daysArray] of Object.entries(stats.years)) {
    const year = parseInt(yearStr)

    daysArray.forEach((count, index) => {
      if (count > busiestDayCount) {
        busiestDayCount = count
        busiestDayDate = new Date(year, 0, index + 1)
      }
    })
  }

  let busiestDay = busiestDayDate?.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })

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