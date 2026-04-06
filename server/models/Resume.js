import mongoose from "mongoose";


const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    title :{
        type: String,
        default: "Untitled Resume"
    },
    public : {
        type: Boolean,
        default: false
    },
    template : {
        type: String,
        default: "classic"
    },
    accent_color : {
        type: String,
        default: "#3B82F6"
    },
    professional_summary : {
        type: String,
        default: ""
    },
    skills : [{
        type: String
    }],
    personal_info : {
        image :{type: String, default: ""},
        full_name : {type: String, default: ""},
        profession : {type: String, default: ""},
        email : {type: String, default: ""},
        phone : {type: String, default: ""},
        location : {type: String, default: ""},
        linkedin : {type: String, default: ""},
        website : {type: String, default: ""},
    },
    experience : [
        {
            company :{type: String},
            position : {type: String},
            start_date : {type: String},
            end_date : {type: String},
            description : {type: String},
            is_current : {type: Boolean},
        }
    ],
    projects: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
<<<<<<< HEAD
            url: { type: String },
=======
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
        }
    ],
    education : [{
        institution : {type: String},
        degree : {type: String},
        field: {type: String},
        graduation_date : {type: String},
        gpa : {type: String},
<<<<<<< HEAD
    }],

    // ── CV-specific fields ──────────────────────────────────────────────────
    mode: {
        type: String,
        enum: ['resume', 'cv'],
        default: 'resume',
    },
    coursework: [{ type: String }],
    achievements: [{
        title:       { type: String },
        description: { type: String },
        year:        { type: String },
    }],
    certifications: [{
        name:   { type: String },
        issuer: { type: String },
        date:   { type: String },
        url:    { type: String },
    }],
    publications: [{
        title:       { type: String },
        authors:     { type: String },
        venue:       { type: String },
        year:        { type: String },
        url:         { type: String },
        description: { type: String },
    }],
    positions: [{
        title:        { type: String },
        organization: { type: String },
        start_date:   { type: String },
        end_date:     { type: String },
        description:  { type: String },
    }],

=======
    }]
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
}, { timestamps: true, minimize: false })

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;