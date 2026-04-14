import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon, Award, BadgeCheck, BookMarked, BookOpen,
  Briefcase, ChevronLeft, ChevronRight, DownloadIcon,
  EyeIcon, EyeOffIcon, FileTextIcon, FolderIcon,
  GraduationCap, Share2Icon, ShieldCheck, Sparkle, Sparkles, User
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummary from '../components/ProfessionalSummary'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

// CV-only components
import CVCoursework from '../components/cv/CVCoursework'
import CVAchievements from '../components/cv/CVAchievements'
import CVCertifications from '../components/cv/CVCertifications'
import CVPublications from '../components/cv/CVPublications'
import CVPositions from '../components/cv/CVPositions'

import * as resumeService from '../services/resumeService'
import { toast } from 'react-hot-toast'
import BuilderSkeleton from '../components/BuilderSkeleton'


const ResumeBuilder = () => {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3A86FF",
    font_family: "Arial",
    font_size: "standard",
    public: false,
    // CV fields
    mode: 'resume',
    coursework: [],
    achievements: [],
    certifications: [],
    publications: [],
    positions: [],
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeSection, setRemoveSection] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  const isCV = resumeData.mode === 'cv'

  // ─── Section lists ────────────────────────────────────────────────────────
  const resumeSections = [
    { id: 'personal',    name: 'Personal Info',        icon: User          },
    { id: 'summary',     name: 'Professional Summary', icon: FileTextIcon  },
    { id: 'experience',  name: 'Work Experience',      icon: Briefcase     },
    { id: 'education',   name: 'Education',            icon: GraduationCap },
    { id: 'projects',    name: 'Projects',             icon: FolderIcon    },
    { id: 'certifications', name: 'Certifications',    icon: BadgeCheck    },
    { id: 'skills',      name: 'Skills',               icon: Sparkles      },
  ]

  const cvSections = [
    ...resumeSections,
    { id: 'publications',   name: 'Research & Publications', icon: BookMarked  },
    { id: 'achievements',   name: 'Achievements',            icon: Award       },
    { id: 'positions',      name: 'Positions',               icon: ShieldCheck },
    { id: 'coursework',     name: 'Coursework',              icon: BookOpen    },
  ]

  const sections = isCV ? cvSections : resumeSections
  const activeSection = sections[activeSectionIndex] || sections[0]

  // ─── Data loading ─────────────────────────────────────────────────────────
  const loadExistingResume = async (id) => {
    setPageLoading(true)
    try {
      const { data } = await resumeService.getResume(id)
      if (data.resume) {
        setResumeData({
          // ensure new CV fields have defaults even on old documents
          coursework: [], achievements: [], certifications: [],
          publications: [], positions: [], mode: 'resume',
          font_family: "Arial", font_size: "standard",
          ...data.resume,
        })
        document.title = data.resume.title
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Could not reach the server. Check your connection and refresh.', { duration: 5000 })
      } else {
        console.error('[ResumeBuilder] loadExistingResume:', error.message)
        toast.error(error?.response?.data?.message || 'Failed to load resume.')
      }
    } finally {
      setPageLoading(false)
    }
  }

  useEffect(() => { loadExistingResume(resumeId) }, [])

  // ─── Mode toggle ──────────────────────────────────────────────────────────
  const toggleMode = (newMode) => {
    if (newMode === resumeData.mode) return
    // Clamp section index so we don't land on a ghost index
    setActiveSectionIndex(0)
    setResumeData(prev => ({ 
      ...prev, 
      mode: newMode,
      template: newMode === 'cv' ? 'cv-academic' : 'classic'
    }))
  }

  // ─── Visibility / share / download / save ────────────────────────────────
  const changeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      await resumeService.updateResume(formData)
      setResumeData(prev => ({ ...prev, public: !prev.public }))
      toast.success("Visibility updated!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update visibility.")
    }
  }

  const shareResume = () => {
    const base = window.location.href.split('/app')[0]
    const url  = base + '/view/' + resumeId
    navigator.share
      ? navigator.share({ url, title: resumeData.title })
      : alert("Copy: " + url)
  }

  const downloadResume = () => window.print()

  const saveResume = async () => {
    try {
      let updated = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updated.personal_info.image
      }
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append("resumeData", JSON.stringify(updated))
      removeSection && formData.append('removeBackground', 'yes')
      typeof resumeData.personal_info.image === 'object' &&
        formData.append('image', resumeData.personal_info.image)

      const { data } = await resumeService.updateResume(formData)
      setResumeData({
        coursework: [], achievements: [], certifications: [],
        publications: [], positions: [], mode: 'resume',
        font_family: "Arial", font_size: "standard",
        ...data.resume,
      })
      toast.success(data.message)
    } catch (error) {
      const msg = !error.response
        ? 'Network error — changes could not be saved.'
        : error?.response?.data?.message || 'Save failed. Please try again.'
      toast.error(msg)
      throw error // re-throw so toast.promise shows 'error' state
    }
  }

  // ── Render guard ──────────────────────────────────────────────────────────
  if (pageLoading) return <BuilderSkeleton />

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='cursor-pointer size-4' />Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* ── Form panel ─────────────────────────────────────────────────── */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-300 p-6 pt-1'>
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
              <hr
                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 border-none transition-all duration-500'
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }}
              />

              {/* ── Top bar: template / color / mode toggle / nav ─────────── */}
              <div className='flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6 border-b border-gray-300 py-3 gap-4'>
                <div className='flex flex-wrap items-center gap-2'>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                    isCV={isCV}
                  />
                  {!isCV && (
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(accent_color) => setResumeData(prev => ({ ...prev, accent_color }))}
                    />
                  )}

                  <select 
                    value={resumeData.font_family || "Arial"} 
                    onChange={(e) => setResumeData(prev => ({ ...prev, font_family: e.target.value }))}
                    className="border border-gray-200 rounded-lg text-xs font-semibold px-2 py-2 text-gray-600 bg-white cursor-pointer outline-none hover:bg-gray-50 transition-colors"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                  </select>

                  <select 
                    value={resumeData.font_size || "standard"} 
                    onChange={(e) => setResumeData(prev => ({ ...prev, font_size: e.target.value }))}
                    className="border border-gray-200 rounded-lg text-xs font-semibold px-2 py-2 text-gray-600 bg-white cursor-pointer outline-none hover:bg-gray-50 transition-colors"
                  >
                    <option value="small">Small</option>
                    <option value="standard">Standard</option>
                    <option value="large">Large</option>
                  </select>

                  {/* ── Resume / CV mode pill toggle ─────────────────────── */}
                  <div
                    id="mode-toggle"
                    className='flex items-center rounded-lg overflow-hidden border border-gray-200 text-xs font-semibold'
                  >
                    <button
                      onClick={() => toggleMode('resume')}
                      className={`px-3 py-2 transition-all ${
                        !isCV
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Resume
                    </button>
                    <button
                      onClick={() => toggleMode('cv')}
                      className={`px-3 py-2 transition-all ${
                        isCV
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      CV
                    </button>
                  </div>
                </div>

                {/* ── Prev / Next nav ───────────────────────────────────── */}
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                    >
                      <ChevronLeft className='size-4'/> Previous
                    </button>
                  )}
                  <button
                    onClick={() => setActiveSectionIndex(i => Math.min(i + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Next <ChevronRight className='size-4'/>
                  </button>
                </div>
              </div>

              {/* ── Section breadcrumb dots ─────────────────────────────────── */}
              <div className='flex gap-1 mb-4 flex-wrap'>
                {sections.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSectionIndex(i)}
                      title={s.name}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                        activeSectionIndex === i
                          ? (isCV ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700')
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className='size-3' />
                      <span className='max-sm:hidden'>{s.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* ── Active form section ─────────────────────────────────────── */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(d) => setResumeData(prev => ({ ...prev, personal_info: d }))}
                    removeBackground={removeSection}
                    setRemoveBackground={setRemoveSection}
                  />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(d) => setResumeData(prev => ({ ...prev, professional_summary: d }))}
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === 'experience' && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(d) => setResumeData(prev => ({ ...prev, experience: d }))}
                  />
                )}
                {activeSection.id === 'education' && (
                  <Education
                    data={resumeData.education}
                    onChange={(d) => setResumeData(prev => ({ ...prev, education: d }))}
                  />
                )}
                {activeSection.id === 'projects' && (
                  <Projects
                    data={resumeData.projects}
                    onChange={(d) => setResumeData(prev => ({ ...prev, projects: d }))}
                  />
                )}
                {activeSection.id === 'skills' && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(d) => setResumeData(prev => ({ ...prev, skills: d }))}
                  />
                )}

                {/* ── CV-only sections ────────────────────────────────────── */}
                {activeSection.id === 'publications' && (
                  <CVPublications
                    data={resumeData.publications}
                    onChange={(d) => setResumeData(prev => ({ ...prev, publications: d }))}
                  />
                )}
                {activeSection.id === 'achievements' && (
                  <CVAchievements
                    data={resumeData.achievements}
                    onChange={(d) => setResumeData(prev => ({ ...prev, achievements: d }))}
                  />
                )}
                {activeSection.id === 'certifications' && (
                  <CVCertifications
                    data={resumeData.certifications}
                    onChange={(d) => setResumeData(prev => ({ ...prev, certifications: d }))}
                  />
                )}
                {activeSection.id === 'positions' && (
                  <CVPositions
                    data={resumeData.positions}
                    onChange={(d) => setResumeData(prev => ({ ...prev, positions: d }))}
                  />
                )}
                {activeSection.id === 'coursework' && (
                  <CVCoursework
                    data={resumeData.coursework}
                    onChange={(d) => setResumeData(prev => ({ ...prev, coursework: d }))}
                  />
                )}
              </div>

              <button
                onClick={() => toast.promise(saveResume(), { loading: 'Saving...', success: 'Saved!', error: 'Save failed.' })}
                className='bg-gradient-to-br from-indigo-100 to-indigo-200 ring-indigo-300 text-blue-700 ring hover:ring-blue-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* ── Preview panel ──────────────────────────────────────────────── */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 z-10'>
                {resumeData.public && (
                  <button onClick={shareResume} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-indigo-100 to-indigo-200 text-blue-600 rounded-lg ring-blue-400 hover:ring transition-colors'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                <button onClick={changeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-300 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button onClick={downloadResume} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-300 text-blue-600 ring-blue-300 rounded-lg hover:ring transition-colors'>
                  <DownloadIcon className='size-4' /> Download
                </button>
              </div>
            </div>
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder