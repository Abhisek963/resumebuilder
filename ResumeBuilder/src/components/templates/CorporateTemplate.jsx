import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CorporateTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl text-zinc-900 overflow-hidden border">

      <div className="grid grid-cols-3">

        {/* ===== SIDEBAR ===== */}
        <aside className="col-span-1 bg-zinc-900 text-white p-12">

          <h1 className="text-3xl font-bold tracking-tight">
            {data.personal_info?.full_name}
          </h1>

          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-400">
            {data.personal_info?.profession}
          </p>

          {/* Divider */}
          <div className="h-px bg-zinc-700 my-8" />

          {/* Contact */}
          <div className="space-y-4 text-sm">
            {data.personal_info?.email && (
              <div className="flex items-center gap-3">
                <Mail size={14} />
                <span className="break-all">{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-3">
                <Phone size={14} />
                {data.personal_info.phone}
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-3">
                <MapPin size={14} />
                {data.personal_info.location}
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-3 break-all">
                <Linkedin size={14} />
                {data.personal_info.linkedin}
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-3 break-all">
                <Globe size={14} />
                {data.personal_info.website}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-700 my-10" />

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-6">
                Certifications
              </h2>

              <div className="space-y-4 text-sm mb-10">
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    <div className="font-semibold text-white">{cert.name}</div>
                    <div className="text-zinc-400 mt-1">{cert.issuer}</div>
                    <div className="text-zinc-500 text-xs mt-1">{formatDate(cert.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

                    </h3>

                    {proj.type && (
                      <p
                        className="text-sm mt-1 font-medium"
                        style={{ color: accentColor }}
                      >
                        {proj.type}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                      {proj.description}
                    </p>

                    <div className="h-px bg-zinc-200 mt-8" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <section>
              <h2
                className="text-xs uppercase tracking-[0.3em] font-semibold mb-8"
                style={{ color: accentColor }}
              >
                Education
              </h2>

              <div className="space-y-8">
                {data.education.map((edu, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-base">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>

                      <p className="text-sm text-zinc-500 mt-1">
                        {edu.institution}
                      </p>
                    </div>

                    {edu.graduation_date && (
                      <span className="text-xs text-zinc-400">
                        {formatDate(edu.graduation_date)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default CorporateTemplate;