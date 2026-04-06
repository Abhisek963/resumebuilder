import React from "react";

const ATSStrictTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const m = parseInt(month, 10);
    return `${m}/${year}`;
  };

  const SectionHeader = ({ title }) => (
    <h2 className="text-sm font-bold uppercase mt-6 mb-2 border-b border-black pb-1 text-black">
      {title}
    </h2>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white text-black px-8 py-10 text-[11pt] font-sans">
      
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-2 text-black">
          {data.personal_info?.full_name || "YOUR NAME"}
        </h1>
        <div className="text-[10pt]">
          {data.personal_info?.location && (
            <span>{data.personal_info.location} | </span>
          )}
          {data.personal_info?.email && (
            <span>{data.personal_info.email} | </span>
          )}
          {data.personal_info?.phone && (
            <span>{data.personal_info.phone}</span>
          )}
        </div>
        <div className="text-[10pt] mt-1">
          {data.personal_info?.linkedin && (
            <span>{data.personal_info.linkedin} </span>
          )}
          {data.personal_info?.website && (
            <span>| {data.personal_info.website}</span>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      {data.professional_summary && (
        <div>
          <SectionHeader title="Professional Summary" />
          <p className="text-justify leading-snug">
            {data.professional_summary}
          </p>
        </div>
      )}

      {/* SKILLS */}
      {(data.skill_categories || data.skills?.length > 0) && (
        <div>
          <SectionHeader title="Skills" />
          {data.skill_categories ? (
            <div className="space-y-1">
              {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                <div key={i}>
                  <strong className="text-black">{cat}: </strong>
                  <span>{Array.isArray(skills) ? skills.join(", ") : skills}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="leading-snug">
              {data.skills.join(", ")}
            </p>
          )}
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <div>
          <SectionHeader title="Professional Experience" />
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline font-bold text-black">
                  <span>{exp.company}</span>
                  <span>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                </div>
                <div className="italic mb-1 text-black">{exp.position}</div>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description?.split("\n")
                    .filter((l) => l.trim())
                    .map((line, idx) => (
                      <li key={idx}>
                        {line.replace(/^[-•○]\s*/, "")}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <div>
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline font-bold text-black">
                  <span>
                    {proj.name} {proj.url && <span className="font-normal">({proj.url})</span>}
                  </span>
                  <span>{formatDate(proj.start_date)} - {formatDate(proj.end_date)}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  {proj.description?.split("\n")
                    .filter((l) => l.trim())
                    .map((line, idx) => (
                      <li key={idx}>
                        {line.replace(/^[-•○]\s*/, "")}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <div>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <strong className="text-black">{edu.institution}</strong>
                  <div>{edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `- GPA: ${edu.gpa}`}</div>
                </div>
                <div>
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <div>
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <strong className="text-black">{cert.name}</strong>, {cert.issuer}
                </div>
                <div>{formatDate(cert.date)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ATSStrictTemplate;
