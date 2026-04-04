import React from "react";

const ATSTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const SectionHeader = ({ title }) => (
    <div className="mt-4 mb-2">
      <h2 className="text-sm font-bold text-center uppercase tracking-widest">
        {title}
      </h2>
      <div className="border-t border-gray-400 mt-1"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 px-8 py-6 text-sm leading-relaxed font-serif">

      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">
            {data.personal_info?.full_name || "Your Name"}
          </h1>

          {data.personal_info?.linkedin && (
            <p className="text-xs text-blue-700">
              {data.personal_info.linkedin}
            </p>
          )}

          {data.personal_info?.github && (
            <p className="text-xs text-blue-700">
              {data.personal_info.github}
            </p>
          )}
        </div>

        <div className="text-right text-xs space-y-1">
          {data.personal_info?.email && (
            <p>Email: {data.personal_info.email}</p>
          )}
          {data.personal_info?.phone && (
            <p>Mobile: {data.personal_info.phone}</p>
          )}
          {data.personal_info?.location && (
            <p>{data.personal_info.location}</p>
          )}
        </div>
      </header>

      {/* ================= PROFESSIONAL SUMMARY ================= */}
      {data.professional_summary && (
        <section>
          <SectionHeader title="Professional Summary" />
          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {(data.skill_categories || data.skills?.length > 0) && (
        <section>
          <SectionHeader title="Skills" />

          {/* Categorized Skills */}
          {data.skill_categories ? (
            <div className="space-y-1">
              {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                <div key={i} className="flex">
                  <span className="font-semibold w-28 shrink-0">
                    {cat}:
                  </span>
                  <span>
                    {Array.isArray(skills)
                      ? skills.join(", ")
                      : skills}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Flat Skills */
            <p>{data.skills.join(", ")}</p>
          )}
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education?.length > 0 && (
        <section>
          <SectionHeader title="Education" />

          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">{edu.institution}</p>
                <p>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                  {edu.gpa && `; GPA: ${edu.gpa}`}
                </p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p>{edu.location}</p>
                <p>
                  {formatDate(edu.start_date)}{" "}
                  {edu.start_date && "- "}
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section>
          <SectionHeader title="Work Experience" />

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">
                  {exp.position} {exp.company && `| ${exp.company}`}
                </p>
                <p className="shrink-0 ml-4">
                  {formatDate(exp.start_date)} -{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </p>
              </div>

              <ul className="mt-1 space-y-1">
                {exp.description?.split("\n")
                  .filter((l) => l.trim())
                  .map((line, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span>•</span>
                      <span>{line.replace(/^[-•○]\s*/, "")}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section>
          <SectionHeader title="Projects" />

          {data.projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">
                  {proj.name}
                  {proj.link && (
                    <span className="text-blue-700 ml-1">
                      | LINK
                    </span>
                  )}
                </p>
                <p className="shrink-0 ml-4">
                  {formatDate(proj.start_date)} -{" "}
                  {formatDate(proj.end_date)}
                </p>
              </div>

              <ul className="mt-1 space-y-1">
                {proj.description?.split("\n")
                  .filter((l) => l.trim())
                  .map((line, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span>•</span>
                      <span>{line.replace(/^[-•○]\s*/, "")}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ATSTemplate;
