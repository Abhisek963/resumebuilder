import { BadgeCheck, ExternalLink, Plus, Trash2Icon } from 'lucide-react'
import React from 'react'

const CVCertifications = ({ data = [], onChange }) => {
  const add = () => onChange([...data, { name: '', issuer: '', date: '', url: '' }])

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  const update = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BadgeCheck className="size-5 text-emerald-500" /> Certifications
          </h3>
          <p className="text-sm text-gray-500">Professional certificates, online courses, licences</p>
        </div>
        <button onClick={add} className="flex items-center gap-2 px-3 py-1 text-sm bg-emerald-100 text-emerald-800 rounded-2xl hover:bg-emerald-200 transition-colors">
          <Plus className="size-4" /> Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <BadgeCheck className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-sm">No certifications added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-emerald-50/30">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700">Certification #{i + 1}</h4>
                <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600">
                  <Trash2Icon className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={item.name || ''}
                  onChange={(e) => update(i, 'name', e.target.value)}
                  placeholder="Certification Name"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <input
                  value={item.issuer || ''}
                  onChange={(e) => update(i, 'issuer', e.target.value)}
                  placeholder="Issuing Organisation"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <input
                  value={item.date || ''}
                  onChange={(e) => update(i, 'date', e.target.value)}
                  type="month"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
                  <input
                    value={item.url || ''}
                    onChange={(e) => update(i, 'url', e.target.value)}
                    placeholder="Certificate URL (optional)"
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CVCertifications
