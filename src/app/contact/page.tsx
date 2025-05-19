import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <SectionWrapper 
      title="Get in Touch"
      subtitle="I'm excited to connect! Whether you have a project in mind, a job opportunity, or just want to say hi, feel free to reach out."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <div className="md:col-span-1 space-y-6 p-6 border rounded-lg shadow-sm bg-card">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Contact Information</h3>
            <p className="text-muted-foreground mb-4">
              You can also reach me through the following channels. I&apos;m currently available for new opportunities.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                your.email@example.com {/* Replace with actual email */}
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-muted-foreground">(123) 456-7890</p> {/* Replace with actual phone or remove */}
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-muted-foreground">San Francisco, CA (Open to remote)</p> {/* Replace with actual location */}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
