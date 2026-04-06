import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import CorporateTemplate from './templates/CorporateTemplate'
import TimelineTemplate from './templates/TimelineTemplate'
import ATSTemplate from './templates/ATSTemplate'
import CVTemplate from './templates/CVTemplate'
import CVModernTemplate from './templates/CVModernTemplate'
import CVProfessionalTemplate from './templates/CVProfessionalTemplate'
import ATSElegantTemplate from './templates/ATSElegantTemplate'
import ATSStrictTemplate from './templates/ATSStrictTemplate'
import CVATSElegantTemplate from './templates/CVATSElegantTemplate'

const ResumePreview = ({data,template,accentColor,classes=""}) => {

    const renderTemplate = () => {
        if (data?.mode === 'cv') {
            switch(template) {
                case 'cv-modern':
                    return <CVModernTemplate data={data} accentColor={accentColor} />;
                case 'cv-professional':
                    return <CVProfessionalTemplate data={data} accentColor={accentColor} />;
                case 'cv-ats-elegant':
                    return <CVATSElegantTemplate data={data} accentColor={accentColor} />;
                case 'cv-academic':
                default:
                    return <CVTemplate data={data} />
            }
        }

        switch(template){
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case "corporate":
                return <CorporateTemplate data={data}  accentColor={accentColor} />;
            case "timeline":
                return <TimelineTemplate data={data}  accentColor={accentColor} />
            case "ats":
                return <ATSTemplate data={data} accentColor={accentColor} />
            case "ats-elegant":
                return <ATSElegantTemplate data={data} accentColor={accentColor} />
            case "ats-strict":
                return <ATSStrictTemplate data={data} accentColor={accentColor} />
                
            default:
                    return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }


  return (
    <div className='w-full bg-gray-300'>
        <style>
          {`
            #resume-preview * {
              font-family: ${data.font_family || 'Arial'}, sans-serif, serif !important;
            }
            ${data.font_size === 'small' ? `
              #resume-preview .text-xs { font-size: 0.65rem !important; }
              #resume-preview .text-sm, #resume-preview .text-\\[10\\.5pt\\], #resume-preview .text-\\[11pt\\], #resume-preview .text-\\[10px\\], #resume-preview .text-\\[11px\\], #resume-preview .text-\\[12px\\], #resume-preview .text-\\[13px\\] { font-size: 0.75rem !important; }
              #resume-preview .text-base, #resume-preview .text-\\[14px\\] { font-size: 0.875rem !important; }
              #resume-preview .text-lg { font-size: 1rem !important; }
              #resume-preview .text-xl { font-size: 1.125rem !important; }
              #resume-preview .text-2xl { font-size: 1.25rem !important; }
              #resume-preview .text-3xl { font-size: 1.5rem !important; }
              #resume-preview .text-4xl { font-size: 1.875rem !important; }
              #resume-preview p, #resume-preview span:not([class*="text-"]):not([class*="size-"]), #resume-preview li, #resume-preview div:not([class*="text-"]) { font-size: 0.875em; }
            ` : ''}
            ${data.font_size === 'large' ? `
              #resume-preview .text-xs { font-size: 0.875rem !important; }
              #resume-preview .text-sm, #resume-preview .text-\\[10\\.5pt\\], #resume-preview .text-\\[11pt\\], #resume-preview .text-\\[10px\\], #resume-preview .text-\\[11px\\], #resume-preview .text-\\[12px\\], #resume-preview .text-\\[13px\\] { font-size: 1rem !important; }
              #resume-preview .text-base, #resume-preview .text-\\[14px\\] { font-size: 1.125rem !important; }
              #resume-preview .text-lg { font-size: 1.25rem !important; }
              #resume-preview .text-xl { font-size: 1.5rem !important; }
              #resume-preview .text-2xl { font-size: 1.875rem !important; }
              #resume-preview .text-3xl { font-size: 2.25rem !important; }
              #resume-preview .text-4xl { font-size: 2.5rem !important; }
              #resume-preview p, #resume-preview span:not([class*="text-"]):not([class*="size-"]), #resume-preview li, #resume-preview div:not([class*="text-"]) { font-size: 1.125em; }
            ` : ''}
          `}
        </style>
        <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none " + classes}>
            {renderTemplate() }
        </div>
        <style>
            {`
            @page{
            size: letter;
            margin: 0;
            }
            @media print{
                html, body{
                    width: 8.5in;
                    height: 11in;
                    overflow: hidden;
                }
                body * {
                    visibility: hidden;
                }
                #resume-preview, #resume-preview *{
                    visibility: visible;    
                }
                #resume-preview{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                    box-shadow: none !important;
                    border: none !important;
                }
            }
            `}
        </style>
    </div>
  )
}

export default ResumePreview