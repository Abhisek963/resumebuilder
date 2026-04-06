import { BookMarked, ExternalLink, Loader2Icon, Plus, Sparkles, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../../configs/api'
import toast from 'react-hot-toast'

const CVPublications = ({ data = [], onChange }) => {
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const add = () => onChange([...data, { title: '', authors: '', venue: '', year: '', url: '', description: '' }])

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  const update = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  const enhance = async (i) => {
    const item = data[i]
    if (!item.title) return
    setGeneratingIndex(i)
    try {
      const prompt = `Title: "${item.title}". Authors: "${item.authors}". Venue: "${item.venue}" (${item.year}). Description: "${item.description}".`
      const { data: res } = await api.post('/api/ai/enhance-cv-section', {
        sectionType: 'publication',
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
            <BookMarked className="size-5 text-blue-500" /> Research & Publications
          </h3>
          <p className="text-sm text-gray-500">Papers, Preprints, Thesis, Conference Proceedings</p>
        </div>
        <button onClick={add} className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-2xl hover:bg-blue-200 transition-colors">
          <Plus className="size-4" /> Add Publication
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <BookMarked className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-sm">No publications added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-blue-50/20">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700">Publication #{i + 1}</h4>
                <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600">
                  <Trash2Icon className="size-4" />
                </button>
              </div>
              <input
                value={item.title || ''}
                onChange={(e) => update(i, 'title', e.target.value)}
                placeholder="Publication Title"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
              />
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={item.authors || ''}
                  onChange={(e) => update(i, 'authors', e.target.value)}
                  placeholder="Authors (e.g. Smith, J., Doe, A.)"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                />
                <input
                  value={item.venue || ''}
                  onChange={(e) => update(i, 'venue', e.target.value)}
                  placeholder="Journal / Conference Name"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                />
                <input
                  value={item.year || ''}
                  onChange={(e) => update(i, 'year', e.target.value)}
                  placeholder="Year"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                />
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
                  <input
                    value={item.url || ''}
                    onChange={(e) => update(i, 'url', e.target.value)}
                    placeholder="DOI / URL"
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600">Abstract / Description</label>
                  <button
                    onClick={() => enhance(i)}
                    disabled={generatingIndex === i || !item.title}
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
                  placeholder="Brief abstract or description of the publication..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CVPublications
