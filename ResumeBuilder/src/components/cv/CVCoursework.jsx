import { BookOpen, Loader2Icon, PlusCircleIcon, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'
import api from '../../configs/api'
import toast from 'react-hot-toast'

const CVCoursework = ({ data = [], onChange }) => {
  const [newCourse, setNewCourse] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)

  const addCourse = () => {
    if (newCourse.trim() && !data.includes(newCourse.trim())) {
      onChange([...data, newCourse.trim()])
      setNewCourse('')
    }
  }

  const removeCourse = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addCourse() }
  }

  const enhanceWithAI = async () => {
    if (!data.length) return
    setIsEnhancing(true)
    try {
      const { data: res } = await api.post('/api/ai/enhance-cv-section', {
        sectionType: 'coursework',
        userContent: data.join(', '),
      })
      toast.success('AI suggestion: ' + res.enhancedContent, { duration: 8000 })
    } catch (err) {
      toast.error(err?.response?.data?.error || err.message)
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="size-5 text-indigo-500" /> Relevant Coursework
          </h3>
          <p className="text-sm text-gray-500">Add academic courses relevant to your field</p>
        </div>
        <button
          onClick={enhanceWithAI}
          disabled={isEnhancing || !data.length}
          className="flex items-center gap-1 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-2xl hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isEnhancing ? <Loader2Icon className="animate-spin size-3" /> : <Sparkles className="size-3" />}
          AI Insight
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Machine Learning, Algorithms"
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addCourse}
          disabled={!newCourse.trim()}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50"
        >
          <PlusCircleIcon className="size-4" /> Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((course, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-full">
              {course}
              <button onClick={() => removeCourse(i)} className="ml-1 text-indigo-400 hover:text-indigo-700 transition-colors">
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-2 text-gray-200" />
          <p className="text-sm">No courses added yet. Type a course name and press Enter.</p>
        </div>
      )}
    </div>
  )
}

export default CVCoursework
