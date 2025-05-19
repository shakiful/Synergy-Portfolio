import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ProjectRecommendationForm } from "@/components/forms/ProjectRecommendationForm";

export default function RecommendationsPage() {
  return (
    <SectionWrapper 
      title="AI Project Recommendation Tool"
      subtitle="Get a personalized project idea that combines your web development and AI skills, perfectly aligned with your career aspirations."
    >
      <ProjectRecommendationForm />
    </SectionWrapper>
  );
}
