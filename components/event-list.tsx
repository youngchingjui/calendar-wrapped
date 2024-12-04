"use client"

import { useState, useMemo } from "react"
import { Event } from "@/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.attendees.some((attendee) =>
          attendee.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesDateFilter =
        dateFilter === "all" ||
        (dateFilter === "today" &&
          new Date(event.startDate).toDateString() ===
            new Date().toDateString()) ||
        (dateFilter === "thisWeek" &&
          new Date(event.startDate) >=
            new Date(new Date().setDate(new Date().getDate() - 7)) &&
          new Date(event.startDate) <= new Date())

      const matchesTypeFilter =
        typeFilter === "all" || event.type === typeFilter

      return matchesSearch && matchesDateFilter && matchesTypeFilter
    })
  }, [events, searchTerm, dateFilter, typeFilter])

  const eventTypes = useMemo(() => {
    return Array.from(new Set(events.map((event) => event.type)))
  }, [events])

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="thisWeek">This week</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("")
            setDateFilter("all")
            setTypeFilter("all")
          }}
        >
          Clear filters
        </Button>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No events found. Try adjusting your search or filters.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  {format(new Date(event.startDate), "PPP")}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.attendees.join(", ")}</TableCell>
                <TableCell>{event.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
