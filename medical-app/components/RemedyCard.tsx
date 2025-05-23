import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Remedy {
  id: number
  name: string
  description: string
  instructions: string
}

interface RemedyCardProps {
  remedy: Remedy
}

export function RemedyCard({ remedy }: RemedyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{remedy.name}</CardTitle>
        <CardDescription>{remedy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h4 className="font-medium mb-1">Instructions</h4>
          <p className="text-sm text-muted-foreground">{remedy.instructions}</p>
        </div>
      </CardContent>
    </Card>
  )
}
