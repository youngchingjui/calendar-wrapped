import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TopMeetingPartnersProps } from "@/types"

export default function TopMeetingPartners({
  partners,
}: TopMeetingPartnersProps) {
  if (!partners || partners.length === 0) {
    return (
      <div className="w-full text-center p-4">
        <p>No meeting partners data available.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <p className="mb-4">
        These are the people you met with most frequently in 2024:
      </p>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${partner.name}`}
              />
              <AvatarFallback>
                {partner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{partner.name}</p>
              <p className="text-sm text-muted-foreground">
                {partner.count} meetings
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
