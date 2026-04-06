import Resume from "../models/Resume.js";
import  ai  from "../configs/ai.js";


// Controller for enhancing a resumes professional summary using AI
// POST: /api/ai/enhance-pro-summary

export const enhanceProSummary = async (req, res) => {
    try {
        const {userContent} = req.body;

        if (!userContent) {
            return res.status(400).json({ error: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
        {   role: "system",
            content: `
You are a professional resume editor.

Rewrite the user's professional summary to be:
- 3 to 4 sentences
- Clear and concise
- Impact-driven
- ATS-friendly
- No explanations
- No headings
- No multiple options
- No extra commentary

Return ONLY the improved summary text.
`
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        
        const enhancedSummary = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedSummary });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// controller for enhancing a resumes job description using AI
// POST: /api/ai/enhance-job-description

export const enhanceJobDescription = async (req, res) => {
    try {
        const {userContent} = req.body;

        if (!userContent) {
            return res.status(400).json({ error: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
        {   role: "system",
            content: "You are a helpful assistant that enhances job descriptions for resumes. The user will provide a job description, and you will improve it by making it more concise, impactful, and tailored for job applications. It should be 1-2 sentences long. Focus on highlighting key responsibilities, achievements, and skills relevant to the user's career goals. Make sure to maintain a professional tone and avoid any unnecessary fluff. Your response should be clear, engaging, and optimized for applicant tracking systems (ATS)." 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        
        const enhancedSummary = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedSummary });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



// controller for uploading a resume to the database
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {

        const {resumeText: encodedText,title} = req.body;
        const userId = req.userID;

        if (!encodedText) {
            return res.status(400).json({ error: "Resume text is required" });
        }
        
        const resumeText = decodeURIComponent(encodedText);

        const systemPrompt = "You are a helpful Ai assistant that extracts key information from resumes. The user will provide the text of their resume, and you will extract the information"

        const userPromt =`Extract the following information from the resume: ${resumeText}. Provide me the data in the following exact JSON format with no additional text before or after: 
    {
        "professional_summary": "Extracted professional summary here (string, leave empty if not found)",
        "skills": ["skill1", "skill2"],
        "personal_info": {
            "image": "",
            "full_name": "Applicant's name",
            "profession": "Their profession based on their summary/experience",
            "email": "email@example.com",
            "phone": "their phone number",
            "location": "their location",
            "linkedin": "linkedin URL",
            "website": "portfolio or website URL"
        },
        "experience": [
            {
                "company": "Company Name",
                "position": "Job Title",
                "start_date": "Start Date",
                "end_date": "End Date or Present",
                "description": "Job description and achievements",
                "is_current": false
            }
        ],
        "projects": [
            {
                "name": "Project Name",
                "type": "Project Type",
                "description": "Project Description"
            }
        ],
        "education": [
            {
                "institution": "University or School Name",
                "degree": "Degree earned",
                "field": "Field of Study",
                "graduation_date": "Graduation Date",
                "gpa": "GPA if available"
            }
        ]    
    }`

        let parsedData = {};
        try {
            const response = await ai.chat.completions.create({
                model: process.env.OPENAI_MODEL || "gpt-4o",
                messages: [
            {   role: "system",
                content: systemPrompt 
            },
            {
                role: "user",
                content: userPromt,
            },
        ],
        response_format: {
            type: "json_object",
        }
            })
            
            let extractedData = response.choices[0].message.content.trim();
            if (extractedData.startsWith("```json")) {
                extractedData = extractedData.replace(/^```json/i, "").replace(/```$/, "").trim();
            } else if (extractedData.startsWith("```")) {
                extractedData = extractedData.replace(/^```/, "").replace(/```$/, "").trim();
            }

            parsedData = JSON.parse(extractedData);
        } catch (aiError) {
            console.error("AI Extraction Error:", aiError.message);
            // Fallback: continue creating a blank resume even if AI parsing fails due to Invalid API key.
        }
        const newResume = await Resume.create({
            userId,...parsedData,title
        })
        
        const hasData = Object.keys(parsedData).length > 0;
        res.status(201).json({ 
            resume: newResume, 
            warning: hasData ? null : "AI parsing failed due to your backend API key being invalid. A blank resume was created instead."
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
<<<<<<< HEAD
}


// Controller for enhancing CV-specific sections using AI (verbose / academic style)
// POST: /api/ai/enhance-cv-section

export const enhanceCVSection = async (req, res) => {
    try {
        const { sectionType, userContent } = req.body;

        if (!userContent || !sectionType) {
            return res.status(400).json({ error: "sectionType and userContent are required" });
        }

        const systemPrompts = {
            publication: `You are an academic writing assistant. Rewrite the provided publication description to be:
- 2 to 4 formal, detailed sentences
- Written in the third person
- Highlighting methodology, findings, and significance
- Suitable for an academic CV
Return ONLY the improved description text. No headings, no extra commentary.`,

            achievement: `You are a professional CV writer. Enhance the achievement description to be:
- 2 to 3 sentences
- Specific, impact-driven, and quantified where possible
- Formal and suitable for a CV
Return ONLY the improved text. No headings, no extra commentary.`,

            certification: `You are a CV writing assistant. Write a brief, professional 1-2 sentence description of this certification or training that highlights its relevance and what was learned.
Return ONLY the improved text.`,

            position: `You are a CV writing assistant. Enhance the description of this leadership or responsibility position to be:
- 3 to 4 sentences
- Highlighting leadership, scope, and impact
- Formal and suitable for an academic or professional CV
Return ONLY the improved text. No headings, no extra commentary.`,

            coursework: `You are a CV writing assistant. Given a list of course names, provide a single concise sentence describing the academic focus and relevance of these courses.
Return ONLY the sentence.`,
        };

        const systemPrompt = systemPrompts[sectionType] || systemPrompts.achievement;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user",   content: userContent },
            ],
        });

        const enhancedContent = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
=======
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
}