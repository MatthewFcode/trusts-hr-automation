import { CVExtracted } from '../../models/cv-extractor.ts'
function CVResults({ data }: { data: CVExtracted }) {
  return (
    <div className="cv-results">
      <h2>Extracted CV Results</h2>

      {/* Contact */}
      <h3>Contact Information</h3>
      {data.full_name && (
        <div>
          <strong>Name:</strong> {data.full_name}
        </div>
      )}

      {data.email && (
        <div>
          <strong>Email:</strong> {data.email}
        </div>
      )}

      {data.phone && (
        <div>
          <strong>Phone:</strong> {data.phone}
        </div>
      )}

      {data.location && (
        <div>
          <strong>Location:</strong> {data.location}
        </div>
      )}

      {data.linkedin && (
        <div>
          <strong>LinkedIn:</strong>{' '}
          <a href={data.linkedin} target="_blank" rel="noreferrer">
            {data.linkedin}
          </a>
        </div>
      )}

      {data.github && (
        <div>
          <strong>GitHub:</strong>{' '}
          <a href={data.github} target="_blank" rel="noreferrer">
            {data.github}
          </a>
        </div>
      )}

      {data.website && (
        <div>
          <strong>Website:</strong>{' '}
          <a href={data.website} target="_blank" rel="noreferrer">
            {data.website}
          </a>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <>
          <h3>Professional Summary</h3>
          <p>{data.summary}</p>
        </>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <>
          <h3>Skills</h3>
          <ul>
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <>
          <h3>Work Experience</h3>
          {data.experience.map((exp, i) => (
            <div key={i}>
              {exp.role && (
                <div>
                  <strong>Role:</strong> {exp.role}
                </div>
              )}
              {exp.company && (
                <div>
                  <strong>Company:</strong> {exp.company}
                </div>
              )}
              {exp.location && (
                <div>
                  <strong>Location:</strong> {exp.location}
                </div>
              )}
              {(exp.start_date || exp.end_date) && (
                <div>
                  <strong>Dates:</strong> {exp.start_date} – {exp.end_date}
                </div>
              )}

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <>
                  <strong>Responsibilities:</strong>
                  <ul>
                    {exp.responsibilities.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                </>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <>
                  <strong>Tech:</strong>
                  <ul>
                    {exp.technologies.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <>
          <h3>Education</h3>
          {data.education.map((edu, i) => (
            <div key={i}>
              {edu.degree && (
                <div>
                  <strong>Degree:</strong> {edu.degree}
                </div>
              )}
              {edu.institution && (
                <div>
                  <strong>Institution:</strong> {edu.institution}
                </div>
              )}
              {edu.field_of_study && (
                <div>
                  <strong>Field:</strong> {edu.field_of_study}
                </div>
              )}
              {(edu.start_date || edu.end_date) && (
                <div>
                  <strong>Dates:</strong> {edu.start_date} – {edu.end_date}
                </div>
              )}
              {edu.achievements && edu.achievements.length > 0 && (
                <>
                  <strong>Achievements:</strong>
                  <ul>
                    {edu.achievements.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <>
          <h3>Projects</h3>
          {data.projects.map((p, i) => (
            <div key={i}>
              {p.name && (
                <div>
                  <strong>Name:</strong> {p.name}
                </div>
              )}
              {p.description && (
                <div>
                  <strong>Description:</strong> {p.description}
                </div>
              )}
              {p.link && (
                <div>
                  <strong>Link:</strong>{' '}
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.link}
                  </a>
                </div>
              )}

              {p.technologies && p.technologies.length > 0 && (
                <>
                  <strong>Technologies:</strong>
                  <ul>
                    {p.technologies.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {/* Certificates */}
      {data.certificates && data.certificates.length > 0 && (
        <>
          <h3>Certificates</h3>
          {data.certificates.map((c, i) => (
            <div key={i}>
              {c.name && (
                <div>
                  <strong>Name:</strong> {c.name}
                </div>
              )}
              {c.issuer && (
                <div>
                  <strong>Issuer:</strong> {c.issuer}
                </div>
              )}
              {c.date && (
                <div>
                  <strong>Date:</strong> {c.date}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default CVResults
