// "use client"

// import { forwardRef } from "react"
// import { getCourseFullName, formatDate } from "@utils/helpers"
// import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Clock, Star, Target } from "lucide-react"

// interface PrintCurriculumProps {
//     curriculum: any
// }

// const EnhancedPrintCurriculum = forwardRef<HTMLDivElement, PrintCurriculumProps>(({ curriculum }, ref) => {
//     if (!curriculum) return null

//     return (
//         <div ref={ref} className="print-container p-8 bg-white text-black font-sans">
//             <div className="print-header relative mb-8 pb-6 border-b-2 border-primary/20">
//                 <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
//                     <div className="text-center md:text-left">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-1">{curriculum.name}</h1>
//                         <p className="text-xl text-primary mb-3">{getCourseFullName(curriculum.course)}</p>
//                         <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start">
//                             <User className="h-4 w-4 mr-2 inline" /> RM: {curriculum.rm}
//                         </p>
//                     </div>
//                     {curriculum.image && (
//                         <div className="print-image">
//                             <img
//                                 src={curriculum.image || "/placeholder.svg"}
//                                 alt={curriculum.name}
//                                 className="w-32 h-32 object-cover rounded-full border-4 border-primary/20 shadow-md"
//                                 crossOrigin="anonymous"
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="print-body grid grid-cols-1 md:grid-cols-3 gap-8">
//                 <div className="print-sidebar space-y-6">
//                     <div className="print-section">
//                         <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                             <Mail className="h-5 w-5 mr-2" /> Contato
//                         </h2>
//                         <ul className="space-y-3">
//                             <li className="flex items-start">
//                                 <Mail className="h-4 w-4 mr-2 mt-1 text-gray-500" />
//                                 <span className="text-sm">{curriculum.email}</span>
//                             </li>
//                             <li className="flex items-start">
//                                 <Phone className="h-4 w-4 mr-2 mt-1 text-gray-500" />
//                                 <span className="text-sm">{curriculum.phone}</span>
//                             </li>
//                             {curriculum.phone2 && (
//                                 <li className="flex items-start">
//                                     <Phone className="h-4 w-4 mr-2 mt-1 text-gray-500" />
//                                     <span className="text-sm">{curriculum.phone2}</span>
//                                 </li>
//                             )}
//                         </ul>
//                     </div>

//                     <div className="print-section">
//                         <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                             <MapPin className="h-5 w-5 mr-2" /> Endereço
//                         </h2>
//                         <ul className="space-y-2">
//                             <li className="text-sm">{curriculum.street}</li>
//                             <li className="text-sm">
//                                 {curriculum.city}, {curriculum.state}
//                             </li>
//                             <li className="text-sm">CEP: {curriculum.zip}</li>
//                         </ul>
//                     </div>

//                     <div className="print-section">
//                         <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                             <Calendar className="h-5 w-5 mr-2" /> Informações Pessoais
//                         </h2>
//                         <ul className="space-y-3">
//                             <li className="flex items-start">
//                                 <Calendar className="h-4 w-4 mr-2 mt-1 text-gray-500" />
//                                 <div>
//                                     <span className="text-xs text-gray-500">Data de Nascimento</span>
//                                     <p className="text-sm">{formatDate(curriculum.birth)}</p>
//                                 </div>
//                             </li>
//                             <li className="flex items-start">
//                                 <User className="h-4 w-4 mr-2 mt-1 text-gray-500" />
//                                 <div>
//                                     <span className="text-xs text-gray-500">Gênero</span>
//                                     <p className="text-sm">{curriculum.genre}</p>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>

//                     {curriculum.skills && curriculum.skills.length > 0 && (
//                         <div className="print-section">
//                             <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                                 <Star className="h-5 w-5 mr-2" /> Habilidades
//                             </h2>
//                             <div className="flex flex-wrap gap-2">
//                                 {curriculum.skills.map((skill: any, index: number) => (
//                                     <span
//                                         key={skill.id || index}
//                                         className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
//                                     >
//                                         {skill.name}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="print-main-content col-span-2 space-y-6">
//                     <div className="print-section">
//                         <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                             <Target className="h-5 w-5 mr-2" /> Objetivo Profissional
//                         </h2>
//                         <p className="text-sm leading-relaxed">{curriculum.objective}</p>
//                     </div>

//                     {curriculum.experience && curriculum.experience.length > 0 && (
//                         <div className="print-section">
//                             <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                                 <Briefcase className="h-5 w-5 mr-2" /> Experiência Profissional
//                             </h2>
//                             <ul className="space-y-5">
//                                 {curriculum.experience.map((exp: any, index: number) => (
//                                     <li
//                                         key={exp.id || index}
//                                         className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-primary/20 before:rounded-full"
//                                     >
//                                         <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
//                                             <h3 className="font-bold text-gray-800">{exp.company}</h3>
//                                             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1 md:mt-0">
//                                                 {exp.period}
//                                             </span>
//                                         </div>
//                                         <p className="text-sm font-medium text-primary mb-1">{exp.position}</p>
//                                         {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     <div className="print-section">
//                         <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                             <GraduationCap className="h-5 w-5 mr-2" /> Formação Acadêmica
//                         </h2>

//                         <div className="mb-4 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-primary/20 before:rounded-full">
//                             <div className="flex flex-col md:flex-row md:justify-between md:items-start">
//                                 <h3 className="font-bold text-gray-800">ETEC</h3>
//                                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1 md:mt-0">
//                                     Curso Técnico
//                                 </span>
//                             </div>
//                             <p className="text-sm font-medium text-primary">{getCourseFullName(curriculum.course)}</p>
//                         </div>

//                         {curriculum.additionalEducation && curriculum.additionalEducation.length > 0 && (
//                             <ul className="space-y-4">
//                                 {curriculum.additionalEducation
//                                     .filter((edu: any) => edu.name && edu.name.trim() !== "")
//                                     .map((edu: any, index: number) => (
//                                         <li
//                                             key={edu.id || index}
//                                             className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-primary/20 before:rounded-full"
//                                         >
//                                             <div className="flex flex-col md:flex-row md:justify-between md:items-start">
//                                                 <h3 className="font-bold text-gray-800">{edu.name}</h3>
//                                                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1 md:mt-0">
//                                                     {edu.startYear} - {edu.endYear || "Atual"}
//                                                 </span>
//                                             </div>
//                                         </li>
//                                     ))}
//                             </ul>
//                         )}
//                     </div>

//                     {curriculum.extracurricular && curriculum.extracurricular.length > 0 && (
//                         <div className="print-section">
//                             <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center">
//                                 <Award className="h-5 w-5 mr-2" /> Atividades Extracurriculares
//                             </h2>
//                             <ul className="space-y-4">
//                                 {curriculum.extracurricular
//                                     .filter((activity: any) => activity.name && activity.name.trim() !== "")
//                                     .map((activity: any, index: number) => (
//                                         <li
//                                             key={activity.id || index}
//                                             className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-primary/20 before:rounded-full"
//                                         >
//                                             <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
//                                                 <h3 className="font-bold text-gray-800">{activity.name}</h3>
//                                                 <span className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1 md:mt-0">
//                                                     <Clock className="h-3 w-3 mr-1" />
//                                                     {activity.hours} horas
//                                                 </span>
//                                             </div>
//                                             {activity.description && <p className="text-sm text-gray-600">{activity.description}</p>}
//                                         </li>
//                                     ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="print-footer mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 flex justify-between items-center">
//                 <p>Currículo gerado em {new Date().toLocaleDateString()}</p>
//                 <p>Sistema de Currículos ETEC</p>
//             </div>
//         </div>
//     )
// })

// EnhancedPrintCurriculum.displayName = "EnhancedPrintCurriculum"

// export default EnhancedPrintCurriculum
