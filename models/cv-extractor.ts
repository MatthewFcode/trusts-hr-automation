export interface EducationEntry {
  institution?: string | null
  degree?: string | null
  field_of_study?: string | null
  start_date?: string | null
  end_date?: string | null
  achievements?: string[] | null
}

export interface ExperienceEntry {
  company?: string | null
  role?: string | null
  location?: string | null
  start_date?: string | null
  end_date?: string | null
  responsibilities?: string[] | null
  technologies?: string[] | null
}

export interface ProjectEntry {
  name?: string | null
  description?: string | null
  technologies?: string[] | null
  link?: string | null
}

export interface CertificateEntry {
  name?: string | null
  issuer?: string | null
  date?: string | null
}

export interface CVExtracted {
  full_name?: string | null
  email?: string | null
  phone?: string | null
  location?: string | null
  website?: string | null
  linkedin?: string | null
  github?: string | null

  summary?: string | null

  skills?: string[] | null

  education?: EducationEntry[] | null

  experience?: ExperienceEntry[] | null

  projects?: ProjectEntry[] | null

  certificates?: CertificateEntry[] | null

  confidence_rating?: number

  llm_overview?: string
}

export interface CVInput {
  text?: string
  file?: File
}
