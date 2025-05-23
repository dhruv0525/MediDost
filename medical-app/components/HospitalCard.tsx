import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Hospital {
  id: number
  name: string
  distance: number
  address: string
  phone: string
  availableSlots: number
  specialties: string[]
}

interface HospitalCardProps {
  hospital: Hospital
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{hospital.name}</CardTitle>
            <CardDescription>{hospital.distance} miles away</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
            {hospital.availableSlots} slots available
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Address</h4>
            <p className="text-sm text-muted-foreground">{hospital.address}</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">Phone</h4>
            <p className="text-sm text-muted-foreground">{hospital.phone}</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((specialty, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                  {specialty}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full">Book Appointment</Button>
      </CardFooter>
    </Card>
  )
}
