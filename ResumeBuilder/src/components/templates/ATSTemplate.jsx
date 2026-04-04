import React from "react";

const ATSTemplate = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 font-sans">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">
            {data.personal_info?.full_name}
          </h1>
          <p className="text-sm text-blue-600">
            {data.personal_info?.linkedin}
          </p>
          <p className="text-sm text-blue-600">
            {data.personal_info?.github}
          </p>
        </div>

        <div className="text-right text-sm">
          <p>{data.personal_info?.email}</p>
          <p>{data.personal_info?.phone}</p>
        </div>
      </div>

      {/* ================= EDUCATION ================= */}
      <SectionTitle title="EDUCATION" />

      {data.education?.map((edu, i) => (
        <div key={i} className="flex justify-between mt-2">
          <div>
            <p className="font-semibold">{edu.institution}</p>
            <p className="text-sm">
              {edu.degree} ({edu.field}) ; GPA: {edu.gpa}
            </p>
          </div>
          <div className="text-right text-sm">
            <p>{edu.location}</p>
            <p>{edu.start_year} - {edu.end_year}</p>
          </div>
        </div>
      ))}

      {/* ================= SKILLS ================= */}
      <SectionTitle title="SKILLS SUMMARY" />

      <div className="text-sm space-y-1">
        <p><b>Languages:</b> {data.skills?.languages}</p>
        <p><b>Frameworks:</b> {data.skills?.frameworks}</p>
        <p><b>Tools:</b> {data.skills?.tools}</p>
        <p><b>Platforms:</b> {data.skills?.platforms}</p>
        <p><b>Soft Skills:</b> {data.skills?.soft}</p>
      </div>

      {/* ================= EXPERIENCE ================= */}
      <SectionTitle title="WORK EXPERIENCE" />

      {data.experience?.map((exp, i) => (
        <div key={i} className="mt-2">
          <div className="flex justify-between">
            <p className="font-semibold">
              {exp.role} | {exp.company}
            </p>
            <p className="text-sm">{exp.duration}</p>
          </div>

          <ul className="list-disc ml-5 text-sm mt-1">
            {exp.points?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* ================= PROJECTS ================= */}
      <SectionTitle title="PROJECTS" />

      {data.projects?.map((proj, i) => (
        <div key={i} className="mt-2">
          <div className="flex justify-between">
            <p className="font-semibold">
              {proj.name} | LINK
            </p>
            <p className="text-sm">{proj.duration}</p>
          </div>

          <ul className="list-disc ml-5 text-sm mt-1">
            {proj.points?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* ================= CERTIFICATIONS ================= */}
      <SectionTitle title="CERTIFICATES" />

      {data.certificates?.map((cert, i) => (
        <div key={i} className="mt-2">
          <div className="flex justify-between">
            <p className="font-semibold">
              {cert.name} | CERTIFICATE
            </p>
            <p className="text-sm">{cert.date}</p>
          </div>

          <ul className="list-disc ml-5 text-sm mt-1">
            {cert.points?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  );
};

/* ================= REUSABLE TITLE ================= */
const SectionTitle = ({ title }) => (
  <div className="mt-6 mb-2">
    <h2 className="text-center font-bold text-sm tracking-widest">
      {title}
    </h2>
    <div className="border-t mt-1"></div>
  </div>
);

export default ATSTemplate;
