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

      {/* ================= CERTIFICATIONS ================= */}
      {data.certifications?.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />

          {data.certifications.map((cert, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">{cert.name}</p>
                <p>{cert.issuer}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p>{formatDate(cert.date)}</p>
              </div>
            </div>
          ))}
        </section>
      )}

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
