import { Card, CardContent } from "@/components/ui/card"

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
