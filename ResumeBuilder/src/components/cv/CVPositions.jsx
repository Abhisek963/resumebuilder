import { Loader2Icon, Plus, ShieldCheck, Sparkles, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../../configs/api'
import toast from 'react-hot-toast'

const CVPositions = ({ data = [], onChange }) => {
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const add = () => onChange([...data, { title: '', organization: '', start_date: '', end_date: '', description: '' }])

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  const update = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  const enhance = async (i) => {
    const item = data[i]
    if (!item.title && !item.organization) return
    setGeneratingIndex(i)
    try {
      const prompt = `Role: "${item.title}" at "${item.organization}". Description: "${item.description}".`
      const { data: res } = await api.post('/api/ai/enhance-cv-section', {
        sectionType: 'position',
        userContent: prompt,
      })
      update(i, 'description', res.enhancedContent)
    } catch (err) {
      toast.error(err?.response?.data?.error || err.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="size-5 text-violet-500" /> Positions of Responsibility
          </h3>
          <p className="text-sm text-gray-500">Leadership roles, clubs, committees, student bodies</p>
        </div>
        <button onClick={add} className="flex items-center gap-2 px-3 py-1 text-sm bg-violet-100 text-violet-800 rounded-2xl hover:bg-violet-200 transition-colors">
          <Plus className="size-4" /> Add Position
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-sm">No positions added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-violet-50/20">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700">Position #{i + 1}</h4>
                <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600">
                  <Trash2Icon className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={item.title || ''}
                  onChange={(e) => update(i, 'title', e.target.value)}
                  placeholder="Role / Position Title"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200"
                />
                <input
                  value={item.organization || ''}
                  onChange={(e) => update(i, 'organization', e.target.value)}
                  placeholder="Organisation / Club / Committee"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200"
                />
                <input
                  value={item.start_date || ''}
                  onChange={(e) => update(i, 'start_date', e.target.value)}
                  type="month"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200"
                />
                <input
                  value={item.end_date || ''}
                  onChange={(e) => update(i, 'end_date', e.target.value)}
                  type="month"
                  placeholder="End date (leave blank if ongoing)"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600">Role Description</label>
                  <button
                    onClick={() => enhance(i)}
                    disabled={generatingIndex === i || (!item.title && !item.organization)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-2xl hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {generatingIndex === i ? <Loader2Icon className="animate-spin size-3" /> : <Sparkles className="size-3" />}
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={item.description || ''}
                  onChange={(e) => update(i, 'description', e.target.value)}
                  placeholder="Describe your responsibilities, leadership scope, and impact..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-violet-200"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CVPositions
