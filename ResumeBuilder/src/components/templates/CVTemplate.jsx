import React from 'react'

/**
 * CVTemplate — ATS-Friendly Academic CV Layout
 * ─────────────────────────────────────────────
 * • Single-column, black-on-white, serif font
 * • Dense but properly spaced sections
 * • No icons, no colours beyond a subtle header rule
 * • Print-safe: no page-break issues on multi-page CVs
 */
const CVTemplate = ({ data }) => {
  const fmt = (dateStr) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  // ── Reusable section divider ──────────────────────────────────────────────
  const SectionHeader = ({ title }) => (
    <div className="mt-5 mb-2">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-800">{title}</h2>
      <div className="border-t-2 border-gray-900 mt-[3px]" />
    </div>
  )

  // ── Bullet list renderer ──────────────────────────────────────────────────
  const BulletList = ({ text }) => {
    if (!text) return null
    const lines = text.split('\n').filter(l => l.trim())
    return (
      <ul className="mt-1 space-y-[2px]">
        {lines.map((line, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="shrink-0 mt-[1px]">•</span>
            <span>{line.replace(/^[-•○]\s*/, '')}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      id="cv-preview"
      className="max-w-[780px] mx-auto bg-white text-gray-900 px-10 py-8 font-serif"
      style={{ fontSize: '11.5px', lineHeight: '1.55' }}
    >
      {/* ═══ HEADER ═══════════════════════════════════════════════════════════ */}
      <header className="text-center mb-3">
        <h1 className="text-[22px] font-bold tracking-wide">
          {data.personal_info?.full_name || 'Your Name'}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-[12px] text-gray-600 mt-[2px]">{data.personal_info.profession}</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-[2px] mt-2 text-[10.5px] text-gray-700">
          {data.personal_info?.email    && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone    && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && <span>{data.personal_info.linkedin}</span>}
          {data.personal_info?.website  && <span>{data.personal_info.website}</span>}
        </div>

        <div className="border-t-2 border-gray-900 mt-3" />
      </header>

      {/* ═══ PROFESSIONAL SUMMARY ════════════════════════════════════════════ */}
      {data.professional_summary && (
        <section>
          <SectionHeader title="Profile Summary" />
          <p className="text-justify leading-relaxed">{data.professional_summary}</p>
        </section>
      )}

      {/* ═══ EDUCATION ═══════════════════════════════════════════════════════ */}
      {data.education?.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="font-bold">{edu.institution}</p>
                <p>
                  {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  {edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
                </p>
              </div>
              <div className="text-right shrink-0 ml-6">
                {edu.location && <p>{edu.location}</p>}
                <p>{fmt(edu.graduation_date)}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ═══ PUBLICATIONS ════════════════════════════════════════════════════ */}
      {data.publications?.length > 0 && (
        <section>
          <SectionHeader title="Research & Publications" />
          {data.publications.map((pub, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <p className="font-bold leading-snug">{pub.title}</p>
                {pub.year && <span className="shrink-0 ml-4 text-gray-600">{pub.year}</span>}
              </div>
              {pub.authors && <p className="italic text-gray-700">{pub.authors}</p>}
              {pub.venue   && <p className="text-gray-600">{pub.venue}{pub.url ? `. ` : ''}{pub.url && <a href={pub.url} className="text-blue-700 underline">{pub.url}</a>}</p>}
              {pub.description && <p className="mt-1 text-justify">{pub.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ═══ WORK EXPERIENCE ════════════════════════════════════════════════ */}
      {data.experience?.length > 0 && (
        <section>
          <SectionHeader title="Work Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <p className="font-bold">{exp.position}{exp.company ? ` — ${exp.company}` : ''}</p>
                <p className="shrink-0 ml-4 text-gray-600">
                  {fmt(exp.start_date)} – {exp.is_current ? 'Present' : fmt(exp.end_date)}
                </p>
              </div>
              <BulletList text={exp.description} />
            </div>
          ))}
        </section>
      )}

      {/* ═══ PROJECTS ════════════════════════════════════════════════════════ */}
      {data.projects?.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="font-bold">{proj.name}{proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="ml-2 text-blue-600 underline font-normal tracking-normal" style={{ fontSize: "0.85em", textTransform: "none" }}>Link</a>}{proj.type ? ` — ${proj.type}` : ''}</p>
              <BulletList text={proj.description} />
            </div>
          ))}
        </section>
      )}

      {/* ═══ POSITIONS OF RESPONSIBILITY ════════════════════════════════════ */}
      {data.positions?.length > 0 && (
        <section>
          <SectionHeader title="Positions of Responsibility" />
          {data.positions.map((pos, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <p className="font-bold">{pos.title}{pos.organization ? ` — ${pos.organization}` : ''}</p>
                <p className="shrink-0 ml-4 text-gray-600">
                  {fmt(pos.start_date)}{pos.end_date ? ` – ${fmt(pos.end_date)}` : pos.start_date ? ' – Present' : ''}
                </p>
              </div>
              {pos.description && <p className="mt-1 text-justify">{pos.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ═══ ACHIEVEMENTS ════════════════════════════════════════════════════ */}
      {data.achievements?.length > 0 && (
        <section>
          <SectionHeader title="Achievements & Honours" />
          {data.achievements.map((ach, i) => (
            <div key={i} className="flex justify-between mb-1">
              <p>
                <span className="font-semibold">{ach.title}</span>
                {ach.description ? ` — ${ach.description}` : ''}
              </p>
              {ach.year && <span className="shrink-0 ml-4 text-gray-600">{ach.year}</span>}
            </div>
          ))}
        </section>
      )}

      {/* ═══ CERTIFICATIONS ══════════════════════════════════════════════════ */}
      {data.certifications?.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          {data.certifications.map((cert, i) => (
            <div key={i} className="flex justify-between mb-1">
              <p>
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer ? ` — ${cert.issuer}` : ''}
                {cert.url ? <a href={cert.url} className="text-blue-700 ml-1 underline">↗</a> : ''}
              </p>
              {cert.date && <span className="shrink-0 ml-4 text-gray-600">{fmt(cert.date)}</span>}
            </div>
          ))}
        </section>
      )}

      {/* ═══ SKILLS ══════════════════════════════════════════════════════════ */}
      {(data.skill_categories || data.skills?.length > 0) && (
        <section>
          <SectionHeader title="Technical Skills" />
          {data.skill_categories ? (
            <div className="space-y-1">
              {Object.entries(data.skill_categories).map(([cat, skills], i) => (
                <div key={i} className="flex">
                  <span className="font-semibold w-32 shrink-0">{cat}:</span>
                  <span>{Array.isArray(skills) ? skills.join(', ') : skills}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>{data.skills.join(', ')}</p>
          )}
        </section>
      )}

      {/* ═══ RELEVANT COURSEWORK ════════════════════════════════════════════ */}
      {data.coursework?.length > 0 && (
        <section>
          <SectionHeader title="Relevant Coursework" />
          <p>{data.coursework.join(' · ')}</p>
        </section>
      )}
    </div>
  )
}

export default CVTemplate
