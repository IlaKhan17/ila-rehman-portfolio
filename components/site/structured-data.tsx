import { profile, siteUrl } from "@/content/profile";
import { projects } from "@/content/projects";
import { education, skills } from "@/content/skills";

/** JSON-LD Person schema, built from the same content files as the page. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: profile.links
      .filter((link) => link.href.startsWith("http"))
      .map((link) => link.href),
    knowsAbout: skills.flatMap((group) => group.items),
    alumniOf: education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
    })),
    subjectOf: projects.map((project) => ({
      "@type": "SoftwareSourceCode",
      name: project.name,
      description: project.blurb,
      url: `${siteUrl}/projects/${project.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored locally, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
