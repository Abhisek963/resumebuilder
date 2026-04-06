import React from 'react'

/**
 * CVProfessionalTemplate — A clean, structured CV layout
 * ────────────────────────────────────────────────────────
 * • Two-column style layout for headers
 * • Bordered sections
 */
const CVProfessionalTemplate = ({ data, accentColor }) => {
  const fmt = (dateStr) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const SectionTitle = ({ title }) => (
    <h2 className="text-[14px] font-bold tracking-wide uppercase border-b-2 pb-1 mb-3" style={{ borderColor: accentColor || '#0ea5e9', color: '#1f2937' }}>
      {title}
    </h2>
  )

  const BulletList = ({ text }) => {
    if (!text) return null
    const lines = text.split('\n').filter(l => l.trim())
    return (
      <ul className="mt-1.5 space-y-1">
        {lines.map((line, idx) => (
          <li key={idx} className="flex gap-2 text-gray-700">
            <span className="shrink-0 mt-[1px]" style={{ color: accentColor || '#0ea5e9' }}>▸</span>
            <span>{line.replace(/^[-•○▸]\s*/, '')}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      id="cv-preview-pro"
      className="max-w-[780px] mx-auto bg-white text-gray-900 px-10 py-8 font-serif"
      style={{ fontSize: '11px', lineHeight: '1.5' }}
    >
      <header className="mb-6 border-b-4 pb-4" style={{ borderColor: accentColor || '#0ea5e9' }}>
        <h1 className="text-[32px] font-bold text-gray-900 leading-none">
          {data.personal_info?.full_name || 'Your Name'}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-[14px] text-gray-600 mt-1">{data.personal_info.profession}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-gray-600">
          {data.personal_info?.email    && <span className="flex items-center gap-1"><span style={{color: accentColor}}>e.</span> {data.personal_info.email}</span>}
          {data.personal_info?.phone    && <span className="flex items-center gap-1"><span style={{color: accentColor}}>p.</span> {data.personal_info.phone}</span>}
          {data.personal_info?.location && <span className="flex items-center gap-1"><span style={{color: accentColor}}>l.</span> {data.personal_info.location}</span>}
          {data.personal_info?.linkedin && <span className="flex items-center gap-1"><span style={{color: accentColor}}>in.</span> {data.personal_info.linkedin}</span>}
          {data.personal_info?.website  && <span className="flex items-center gap-1"><span style={{color: accentColor}}>w.</span> {data.personal_info.website}</span>}
        </div>
      </header>

      {data.professional_summary && (
        <section className="mb-5">
          <SectionTitle title="Executive Summary" />
          <p className="text-gray-700 text-justify">{data.professional_summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-5">
          <SectionTitle title="Professional Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-end mb-1 border-b border-gray-100 pb-1">
                <div>
                  <h3 className="font-bold text-[13px] text-gray-900">{exp.position}</h3>
                  <p className="text-[12px] italic text-gray-600">{exp.company}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold" style={{ color: accentColor || '#0ea5e9' }}>
                  {fmt(exp.start_date)} – {exp.is_current ? 'Present' : fmt(exp.end_date)}
                </p>
              </div>
              <BulletList text={exp.description} />
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-5">
          <SectionTitle title="Education" />
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3 flex justify-between">
              <div>
                <h3 className="font-bold text-[12px]">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <p className="text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-gray-500 text-[10px] mt-1">GPA: {edu.gpa}</p>}
              </div>
              <p className="shrink-0 font-medium text-gray-600">{fmt(edu.graduation_date)}</p>
            </div>
          ))}
        </section>
      )}

      {data.publications?.length > 0 && (
        <section className="mb-5">
          <SectionTitle title="Publications" />
          {data.publications.map((pub, i) => (
            <div key={i} className="mb-3 pl-3 border-l-2" style={{ borderColor: accentColor || '#e5e7eb' }}>
              <p className="font-bold">{pub.title} {pub.year && <span className="font-normal text-gray-500">({pub.year})</span>}</p>
              {pub.authors && <p className="text-gray-700 text-[10px] uppercase tracking-wide mt-1">{pub.authors}</p>}
              {pub.description && <p className="mt-1 text-gray-600">{pub.description}</p>}
              {pub.url && <a href={pub.url} style={{ color: accentColor }} className="text-[10px] underline block mt-1">{pub.url}</a>}
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          {data.projects?.length > 0 && (
            <section className="mb-5">
              <SectionTitle title="Projects" />
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-3">
                  <p className="font-bold">{proj.name}{proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="ml-2 text-blue-600 underline font-normal tracking-normal" style={{ fontSize: "0.85em", textTransform: "none" }}>Link</a>}</p>
                  <BulletList text={proj.description} />
                </div>
              ))}
            </section>
          )}

          {(data.skill_categories || data.skills?.length > 0) && (
            <section className="mb-5">
              <SectionTitle title="Core Competencies" />
              {data.skill_categories ? (
                <ul className="space-y-1">
                  {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                    <li key={i}>
                      <span className="font-bold text-gray-800">{cat}:</span> <span className="text-gray-600">{Array.isArray(skills) ? skills.join(', ') : skills}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{data.skills.join(', ')}</p>
              )}
            </section>
          )}
        </div>

        <div>
           {data.positions?.length > 0 && (
            <section className="mb-5">
              <SectionTitle title="Leadership" />
              {data.positions.map((pos, i) => (
                <div key={i} className="mb-3">
                  <p className="font-bold">{pos.title}</p>
                  {pos.organization && <p className="text-gray-600 italic -mt-0.5">{pos.organization}</p>}
                  {pos.description && <p className="mt-1 text-gray-700 text-justify">{pos.description}</p>}
                </div>
              ))}
            </section>
          )}

          {data.achievements?.length > 0 && (
            <section className="mb-5">
              <SectionTitle title="Awards" />
              <ul className="space-y-2">
                {data.achievements.map((ach, i) => (
                  <li key={i}>
                    <p className="font-bold">{ach.title} {ach.year && <span className="font-normal text-gray-500">({ach.year})</span>}</p>
                    {ach.description && <p className="text-gray-600">{ach.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className="mb-5">
              <SectionTitle title="Certifications" />
              <ul className="space-y-1">
                {data.certifications.map((cert, i) => (
                  <li key={i}>
                    <span className="font-semibold">{cert.name}</span>
                    <span className="text-gray-500"> — {cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      
      {data.coursework?.length > 0 && (
        <section>
          <SectionTitle title="Relevant Coursework" />
          <p className="text-gray-700 leading-relaxed">{data.coursework.join(' • ')}</p>
        </section>
      )}

    </div>
  )
}

export default CVProfessionalTemplate
