import React from "react";

const CVATSElegantTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const SectionHeader = ({ title }) => (
    <div className="mt-6 mb-3">
      <h2 
        className="text-[13px] font-bold uppercase tracking-[0.15em] border-b pb-1"
        style={{ color: accentColor, borderBottomColor: `${accentColor}40` }}
      >
        {title}
      </h2>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white text-zinc-900 px-8 py-10 leading-relaxed text-[11pt]" style={{ fontFamily: "Georgia, serif" }}>

      {/* HEADER */}
      <header className="text-center mb-6 border-b pb-6" style={{ borderBottomColor: `${accentColor}40` }}>
        <h1 className="text-3xl font-bold tracking-wide mb-3" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "YOUR NAME"}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-zinc-500 mb-4">
            {data.personal_info.profession}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10pt] font-sans text-zinc-700">
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.email && (
            <>
              <span className="opacity-40">•</span>
              <span>{data.personal_info.email}</span>
            </>
          )}
          {data.personal_info?.phone && (
            <>
              <span className="opacity-40">•</span>
              <span>{data.personal_info.phone}</span>
            </>
          )}
          {data.personal_info?.linkedin && (
            <>
              <span className="opacity-40">•</span>
              <a href={data.personal_info.linkedin} className="hover:underline">{data.personal_info.linkedin.split("https://www.")[1] || data.personal_info.linkedin}</a>
            </>
          )}
        </div>
      </header>

      {/* PROFESSIONAL SUMMARY */}
      {data.professional_summary && (
        <section>
          <SectionHeader title="Professional Summary" />
          <p className="font-sans text-[10.5pt] leading-relaxed text-justify text-zinc-800">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-4 font-sans text-[10.5pt]">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[11pt]">
                    {exp.position} <span className="font-medium text-zinc-600">at {exp.company}</span>
                  </h3>
                  <div className="text-zinc-600 font-medium">
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700">
                  {exp.description?.split("\n").filter((l) => l.trim()).map((line, idx) => (
                    <li key={idx} className="pl-1">
                      {line.replace(/^[-•○]\s*/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* POSITIONS OF RESPONSIBILITY (CV) */}
      {data.positions?.length > 0 && (
        <section>
          <SectionHeader title="Positions of Responsibility" />
          <div className="space-y-3 font-sans text-[10.5pt]">
            {data.positions.map((pos, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div className="font-bold">
                  {pos.role} <span className="font-normal text-zinc-600">at {pos.organization}</span>
                </div>
                <span className="text-zinc-600 font-medium">{pos.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PUBLICATIONS (CV) */}
      {data.publications?.length > 0 && (
        <section>
          <SectionHeader title="Publications & Research" />
          <div className="space-y-3 font-sans text-[10.5pt]">
            {data.publications.map((pub, i) => (
              <div key={i}>
                <div className="font-bold">{pub.title}</div>
                <div className="text-zinc-700 mt-0.5">
                  <span className="italic">{pub.authors}</span> — {pub.venue} ({pub.year})
                  {pub.link && <a href={pub.link} className="ml-2 hover:underline" style={{ color: accentColor }}>[Link]</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-4 font-sans text-[10.5pt]">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[11pt]">
                    {proj.name}
                    {proj.url && <a href={proj.url} className="ml-2 font-normal hover:underline" style={{ color: accentColor }}>[Link]</a>}
                  </h3>
                  <div className="text-zinc-600 font-medium">
                    {formatDate(proj.start_date)} – {formatDate(proj.end_date)}
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700">
                  {proj.description?.split("\n").filter((l) => l.trim()).map((line, idx) => (
                    <li key={idx} className="pl-1">
                      {line.replace(/^[-•○]\s*/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-4 font-sans text-[10.5pt]">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[11pt]">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <div className="text-zinc-700 mt-0.5">
                    {edu.institution}
                    {edu.gpa && <span className="ml-2 font-medium">| GPA: {edu.gpa}</span>}
                  </div>
                </div>
                <div className="text-zinc-600 font-medium">
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COURSEWORK (CV) */}
      {data.coursework?.length > 0 && (
        <section>
          <SectionHeader title="Relevant Coursework" />
          <p className="font-sans text-[10.5pt] leading-relaxed text-zinc-800">
            {data.coursework.map(c => c.course).join(", ")}
          </p>
        </section>
      )}

      {/* SKILLS */}
      {(data.skill_categories || data.skills?.length > 0) && (
        <section>
          <SectionHeader title="Skills" />
          <div className="font-sans text-[10.5pt] text-zinc-800">
            {data.skill_categories ? (
              <div className="space-y-1.5">
                {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                  <div key={i} className="flex">
                    <strong className="w-32 shrink-0">{cat}:</strong>
                    <span>{Array.isArray(skills) ? skills.join(", ") : skills}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="leading-relaxed">{data.skills.join("  •  ")}</p>
            )}
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS (CV) */}
      {data.achievements?.length > 0 && (
        <section>
          <SectionHeader title="Honors & Awards" />
          <ul className="list-disc list-outside ml-4 mt-1 space-y-1.5 font-sans text-[10.5pt] text-zinc-800">
            {data.achievements.map((ach, i) => (
              <li key={i} className="pl-1">
                <strong>{ach.title}</strong> — {ach.issuer} <span className="text-zinc-600">({formatDate(ach.date)})</span>
                {ach.description && <div className="mt-0.5 text-zinc-600">{ach.description}</div>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-2 font-sans text-[10.5pt]">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <strong className="text-zinc-900">{cert.name}</strong>
                  <span className="mx-2 text-zinc-400">|</span>
                  <span className="text-zinc-700">{cert.issuer}</span>
                </div>
                <div className="text-zinc-600 font-medium">
                  {formatDate(cert.date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default CVATSElegantTemplate;
