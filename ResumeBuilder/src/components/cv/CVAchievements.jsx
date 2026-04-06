import { Award, Loader2Icon, Plus, Sparkles, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../../configs/api'
import toast from 'react-hot-toast'

const CVAchievements = ({ data = [], onChange }) => {
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const add = () => onChange([...data, { title: '', description: '', year: '' }])

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  const update = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  const enhance = async (i) => {
    const item = data[i]
    if (!item.title && !item.description) return
    setGeneratingIndex(i)
    try {
      const prompt = `Achievement title: "${item.title}". Description: "${item.description}".`
      const { data: res } = await api.post('/api/ai/enhance-cv-section', {
        sectionType: 'achievement',
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
            <Award className="size-5 text-amber-500" /> Achievements
          </h3>
          <p className="text-sm text-gray-500">Awards, honours, recognitions</p>
        </div>
        <button onClick={add} className="flex items-center gap-2 px-3 py-1 text-sm bg-amber-100 text-amber-800 rounded-2xl hover:bg-amber-200 transition-colors">
          <Plus className="size-4" /> Add Achievement
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Award className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-sm">No achievements added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-amber-50/30">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700">Achievement #{i + 1}</h4>
                <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600">
                  <Trash2Icon className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  value={item.title || ''}
                  onChange={(e) => update(i, 'title', e.target.value)}
                  placeholder="Achievement Title"
                  className="md:col-span-2 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-200"
                />
                <input
                  value={item.year || ''}
                  onChange={(e) => update(i, 'year', e.target.value)}
                  placeholder="Year"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600">Description</label>
                  <button
                    onClick={() => enhance(i)}
                    disabled={generatingIndex === i}
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
                  placeholder="Describe the achievement and its significance..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CVAchievements
