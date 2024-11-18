import { Metadata } from "next"
import Link from "next/link"
import { Calendar, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Calendar Wrapped",
  description: "Privacy Policy for Calendar Wrapped application",
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Link href="/" passHref>
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center">
              <Calendar className="mr-2 h-6 w-6" />
              <CardTitle className="text-2xl font-bold">
                Privacy Policy
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to Calendar Wrapped. We respect your privacy and are
              committed to protecting your personal data. This privacy policy
              will inform you about how we look after your personal data when
              you visit our website and tell you about your privacy rights and
              how the law protects you.
            </p>

            <h2>2. Data We Collect</h2>
            <p>
              We collect and process the following data when you use Calendar
              Wrapped:
            </p>
            <ul>
              <li>Personal identification information (Name, email address)</li>
              <li>
                Calendar data (Event titles, dates, times, and categories)
              </li>
              <li>Usage data (How you interact with our application)</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We use your data for the following purposes:</p>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To generate your personalized Calendar Wrapped summary</li>
              <li>To improve our service and develop new features</li>
              <li>To communicate with you about our service</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              ensure a level of security appropriate to the risk, including
              encryption of data in transit and at rest.
            </p>

            <h2>5. Your Data Protection Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2>6. Third-Party Services</h2>
            <p>
              We use Google Calendar API to access your calendar data. Please
              refer to Google's Privacy Policy for information on how they
              handle your data.
            </p>

            <h2>7. Data Sharing and Disclosure</h2>
            <p>
              Your Google Calendar data is used to generate your Calendar
              Wrapped summary. This data is not stored nor shared with anyone
              else, including any third parties. No Google Calendar data or any
              Google data is stored on our databases.
            </p>

            <h2>8. User Data Retention</h2>
            <p>
              We do not store any user data. This application does not have a
              database, and therefore, no data retention occurs.
            </p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
