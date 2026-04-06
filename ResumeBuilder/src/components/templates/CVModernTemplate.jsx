import React from 'react'

/**
 * CVModernTemplate — A contemporary CV layout 
 * ─────────────────────────────────────────────
 * • Sans-serif headers, serif body
 * • Uses accent colours
 * • Clean whitespace
 */
const CVModernTemplate = ({ data, accentColor }) => {
  const fmt = (dateStr) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const SectionHeader = ({ title }) => (
    <div className="mt-5 mb-3 flex items-center gap-2">
      <h2 className="text-[12px] font-bold uppercase tracking-wider" style={{ color: accentColor || '#333' }}>
        {title}
      </h2>
      <div className="flex-grow h-[1px] opacity-30" style={{ backgroundColor: accentColor || '#ccc' }} />
    </div>
  )

  const BulletList = ({ text }) => {
    if (!text) return null
    const lines = text.split('\n').filter(l => l.trim())
    return (
      <ul className="mt-1 space-y-[3px]">
        {lines.map((line, idx) => (
          <li key={idx} className="flex gap-2 text-gray-700">
            <span className="shrink-0 mt-[1px]" style={{ color: accentColor || '#333' }}>•</span>
            <span>{line.replace(/^[-•○]\s*/, '')}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      id="cv-preview-modern"
      className="max-w-[780px] mx-auto bg-white text-gray-900 px-10 py-8 font-sans"
      style={{ fontSize: '11px', lineHeight: '1.6' }}
    >
      <header className="mb-6 flex flex-col items-center">
        <h1 className="text-[26px] font-extrabold tracking-tight" style={{ color: accentColor || '#333' }}>
          {data.personal_info?.full_name || 'Your Name'}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-[13px] font-medium tracking-wide mt-1 text-gray-500 uppercase">{data.personal_info.profession}</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-[2px] mt-3 text-[10px] text-gray-600 font-medium">
          {data.personal_info?.email    && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone    && <span className="border-l border-gray-300 pl-3">{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span className="border-l border-gray-300 pl-3">{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && <span className="border-l border-gray-300 pl-3">{data.personal_info.linkedin}</span>}
          {data.personal_info?.website  && <span className="border-l border-gray-300 pl-3">{data.personal_info.website}</span>}
        </div>
      </header>

      <div className="font-serif">
        {data.professional_summary && (
          <section>
            <SectionHeader title="Profile" />
            <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <SectionHeader title="Education" />
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between font-sans">
                  <p className="font-bold text-[12px]">{edu.institution}</p>
                  <p className="shrink-0 text-gray-500">{fmt(edu.graduation_date)}</p>
                </div>
                <div className="flex justify-between items-start text-gray-700 mt-[2px]">
                  <p>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    {edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
                  </p>
                  {edu.location && <p className="shrink-0 ml-6">{edu.location}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {data.experience?.length > 0 && (
          <section>
            <SectionHeader title="Experience" />
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-sans">
                  <p className="font-bold text-[12px]">{exp.position}</p>
                  <p className="shrink-0 font-medium" style={{ color: accentColor || '#666' }}>
                    {fmt(exp.start_date)} – {exp.is_current ? 'Present' : fmt(exp.end_date)}
                  </p>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-sans mb-1">{exp.company}</p>
                <BulletList text={exp.description} />
              </div>
            ))}
          </section>
        )}

        {data.publications?.length > 0 && (
          <section>
            <SectionHeader title="Publications" />
            {data.publications.map((pub, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-baseline gap-2">
                  <p className="font-bold font-sans">{pub.title}</p>
                  {pub.year && <span className="text-gray-500 font-sans">({pub.year})</span>}
                </div>
                {pub.authors && <p className="italic text-gray-700 mt-1">{pub.authors}</p>}
                {pub.venue && (
                  <p className="text-gray-600 mt-[2px]">
                    {pub.venue}{pub.url && <span> · <a href={pub.url} style={{ color: accentColor }} className="underline">{pub.url}</a></span>}
                  </p>
                )}
                {pub.description && <p className="mt-1 text-gray-700">{pub.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.projects?.length > 0 && (
          <section>
            <SectionHeader title="Projects" />
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold font-sans text-[12px]">{proj.name}{proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="ml-2 text-blue-600 underline font-normal tracking-normal" style={{ fontSize: "0.85em", textTransform: "none" }}>Link</a>}{proj.type ? <span className="font-normal text-gray-400"> | {proj.type}</span> : ''}</p>
                <BulletList text={proj.description} />
              </div>
            ))}
          </section>
        )}

        {data.positions?.length > 0 && (
          <section>
            <SectionHeader title="Leadership & Responsibility" />
            {data.positions.map((pos, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between font-sans">
                  <p className="font-bold">{pos.title}{pos.organization ? ` at ${pos.organization}` : ''}</p>
                  <p className="shrink-0 text-gray-500">
                    {fmt(pos.start_date)}{pos.end_date ? ` – ${fmt(pos.end_date)}` : pos.start_date ? ' – Present' : ''}
                  </p>
                </div>
                {pos.description && <p className="mt-1 text-gray-700">{pos.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.achievements?.length > 0 && (
          <section>
            <SectionHeader title="Honours & Awards" />
            <ul className="space-y-1 mt-1">
              {data.achievements.map((ach, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 mt-[1px]" style={{ color: accentColor || '#333' }}>•</span>
                  <div>
                    <span className="font-bold font-sans">{ach.title}</span>
                    {ach.year && <span className="text-gray-500 ml-2">({ach.year})</span>}
                    {ach.description && <span className="text-gray-700 ml-2">— {ach.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.certifications?.length > 0 && (
          <section>
            <SectionHeader title="Certifications" />
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {data.certifications.map((cert, i) => (
                <div key={i}>
                  <p className="font-bold font-sans text-[11px]">{cert.name}</p>
                  <p className="text-gray-600 text-[10px]">
                    {cert.issuer} {cert.date && `· ${fmt(cert.date)}`}
                    {cert.url && <a href={cert.url} style={{ color: accentColor }} className="ml-1 underline">Link</a>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(data.skill_categories || data.skills?.length > 0) && (
          <section>
            <SectionHeader title="Skills" />
            {data.skill_categories ? (
              <div className="space-y-2 font-sans text-[11px]">
                {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-bold uppercase tracking-wider text-gray-500 mb-1">{cat}</span>
                    <span className="text-gray-800">{Array.isArray(skills) ? skills.join('  ·  ') : skills}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-sans text-[11px]">{data.skills.join('  ·  ')}</p>
            )}
          </section>
        )}

        {data.coursework?.length > 0 && (
          <section>
            <SectionHeader title="Coursework" />
            <div className="flex flex-wrap gap-2 text-[10.5px] font-sans">
              {data.coursework.map((course, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-gray-700">{course}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default CVModernTemplate
