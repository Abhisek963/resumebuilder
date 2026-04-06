import React from "react";

const ATSElegantTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const SectionHeader = ({ title }) => (
    <div className="mt-5 mb-3">
      <h2 
        className="text-[13px] font-bold uppercase tracking-[0.15em] border-b pb-1"
        style={{ color: accentColor, borderBottomColor: `${accentColor}40` }}
      >
        {title}
      </h2>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white text-zinc-800 px-8 py-10 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>

      {/* ================= HEADER ================= */}
      <header className="text-center mb-6 border-b pb-6" style={{ borderBottomColor: `${accentColor}40` }}>
        <h1 className="text-4xl font-normal tracking-wide mb-3" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm font-sans text-zinc-600">
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
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
              <a href={data.personal_info.linkedin} className="hover:underline">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</a>
            </>
          )}
          {data.personal_info?.website && (
            <>
              <span className="opacity-40">•</span>
              <a href={data.personal_info.website} className="hover:underline">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</a>
            </>
          )}
        </div>
      </header>

      {/* ================= PROFESSIONAL SUMMARY ================= */}
      {data.professional_summary && (
        <section>
          <SectionHeader title="Professional Summary" />
          <p className="font-sans text-[13px] leading-relaxed text-zinc-700 text-justify">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section>
          <SectionHeader title="Experience" />

          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-zinc-900">
                    {exp.position} <span className="font-normal italic">at</span> {exp.company}
                  </h3>
                  <div className="font-sans text-[12px] text-zinc-500 font-medium">
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>

                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 font-sans text-[13px] text-zinc-700">
                  {exp.description?.split("\n")
                    .filter((l) => l.trim())
                    .map((line, idx) => (
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

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section>
          <SectionHeader title="Projects" />

          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-zinc-900">
                    {proj.name}
                    {proj.url && (
                      <span className="font-normal font-sans text-[12px] ml-2">
                        (<a href={proj.url} className="hover:underline" style={{ color: accentColor }}>Link</a>)
                      </span>
                    )}
                  </h3>
                  <div className="font-sans text-[12px] text-zinc-500 font-medium whitespace-nowrap ml-4">
                    {formatDate(proj.start_date)} – {formatDate(proj.end_date)}
                  </div>
                </div>

                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 font-sans text-[13px] text-zinc-700">
                  {proj.description?.split("\n")
                    .filter((l) => l.trim())
                    .map((line, idx) => (
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

      {/* ================= EDUCATION ================= */}
      {data.education?.length > 0 && (
        <section>
          <SectionHeader title="Education" />

          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[14px] text-zinc-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <div className="font-sans text-[13px] text-zinc-600 mt-0.5">
                    {edu.institution} {edu.gpa && <span className="italic ml-1">| GPA: {edu.gpa}</span>}
                  </div>
                </div>
                <div className="font-sans text-[12px] text-zinc-500 font-medium whitespace-nowrap ml-4 border rounded px-2 py-0.5">
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {data.certifications?.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />

          <div className="space-y-2">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-baseline font-sans text-[13px]">
                <div>
                  <span className="font-semibold text-zinc-900">{cert.name}</span>
                  <span className="mx-2 text-zinc-400">|</span>
                  <span className="text-zinc-600">{cert.issuer}</span>
                </div>
                <div className="text-[12px] text-zinc-500 font-medium">
                  {formatDate(cert.date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {(data.skill_categories || data.skills?.length > 0) && (
        <section>
          <SectionHeader title="Skills" />

          <div className="font-sans text-[13px] text-zinc-700">
            {data.skill_categories ? (
              <div className="space-y-1.5">
                {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                  <div key={i} className="flex">
                    <span className="font-semibold w-32 shrink-0 text-zinc-900">
                      {cat}:
                    </span>
                    <span>
                      {Array.isArray(skills) ? skills.join(", ") : skills}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="leading-relaxed">
                {data.skills.join("  •  ")}
              </p>
            )}
          </div>
        </section>
      )}

    </div>
  );
};

export default ATSElegantTemplate;
