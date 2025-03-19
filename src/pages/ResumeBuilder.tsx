
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { X, Plus, Save, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const ResumeBuilder: React.FC = () => {
  const { profile, updateProfile, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'personal' | 'education' | 'skills' | 'experience' | 'projects' | 'achievements' | 'preview'>('personal');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Form schema for personal information
  const personalFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    phone: z.string().optional(),
  });

  // Form schema for education
  const educationFormSchema = z.object({
    education: z.string().min(5, { message: "Please provide your education details." }),
    hscPercentage: z.string().optional(),
    sslcPercentage: z.string().optional(),
  });

  // Form for personal information
  const personalForm = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
    },
  });

  // Form for education
  const educationForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      education: profile.education || '',
      hscPercentage: profile.hscPercentage || '',
      sslcPercentage: profile.sslcPercentage || '',
    },
  });

  // State for skills
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(profile.skills || []);

  // State for certifications
  const [certificationInput, setCertificationInput] = useState('');
  const [certifications, setCertifications] = useState<string[]>(profile.certifications || []);

  // State for projects
  const [projects, setProjects] = useState<{ title: string; description: string; technologies?: string[] }[]>(
    profile.projects || []
  );
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTechnologies, setProjectTechnologies] = useState('');

  // State for achievements
  const [achievementInput, setAchievementInput] = useState('');
  const [achievements, setAchievements] = useState<string[]>(profile.achievements || []);
  
  // State for academic achievements
  const [academicAchievementInput, setAcademicAchievementInput] = useState('');
  const [academicAchievements, setAcademicAchievements] = useState<string[]>(profile.academicAchievements || []);

  // Handlers for personal information form
  const onPersonalSubmit = async (data: z.infer<typeof personalFormSchema>) => {
    await updateProfile(data);
    setStep('education');
    toast({
      title: "Personal information saved",
      description: "Your personal information has been updated.",
    });
  };

  // Handlers for education form
  const onEducationSubmit = async (data: z.infer<typeof educationFormSchema>) => {
    await updateProfile(data);
    setStep('skills');
    toast({
      title: "Education information saved",
      description: "Your education information has been updated.",
    });
  };

  // Handler for adding a skill
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const updatedSkills = [...skills, skillInput.trim()];
      setSkills(updatedSkills);
      setSkillInput('');
      updateProfile({ skills: updatedSkills });
    }
  };

  // Handler for removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    updateProfile({ skills: updatedSkills });
  };

  // Handler for adding a certification
  const handleAddCertification = () => {
    if (certificationInput.trim() && !certifications.includes(certificationInput.trim())) {
      const updatedCertifications = [...certifications, certificationInput.trim()];
      setCertifications(updatedCertifications);
      setCertificationInput('');
      updateProfile({ certifications: updatedCertifications });
    }
  };

  // Handler for removing a certification
  const handleRemoveCertification = (certToRemove: string) => {
    const updatedCertifications = certifications.filter(cert => cert !== certToRemove);
    setCertifications(updatedCertifications);
    updateProfile({ certifications: updatedCertifications });
  };

  // Handler for adding a project
  const handleAddProject = () => {
    if (projectTitle.trim() && projectDescription.trim()) {
      const technologies = projectTechnologies.split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '');
      
      const newProject = {
        title: projectTitle.trim(),
        description: projectDescription.trim(),
        technologies: technologies.length > 0 ? technologies : undefined
      };
      
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      setProjectTitle('');
      setProjectDescription('');
      setProjectTechnologies('');
      updateProfile({ projects: updatedProjects });
    }
  };

  // Handler for removing a project
  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    updateProfile({ projects: updatedProjects });
  };

  // Handler for adding an achievement
  const handleAddAchievement = () => {
    if (achievementInput.trim() && !achievements.includes(achievementInput.trim())) {
      const updatedAchievements = [...achievements, achievementInput.trim()];
      setAchievements(updatedAchievements);
      setAchievementInput('');
      updateProfile({ achievements: updatedAchievements });
    }
  };

  // Handler for removing an achievement
  const handleRemoveAchievement = (achievementToRemove: string) => {
    const updatedAchievements = achievements.filter(achievement => achievement !== achievementToRemove);
    setAchievements(updatedAchievements);
    updateProfile({ achievements: updatedAchievements });
  };

  // Handler for adding an academic achievement
  const handleAddAcademicAchievement = () => {
    if (academicAchievementInput.trim() && !academicAchievements.includes(academicAchievementInput.trim())) {
      const updatedAcademicAchievements = [...academicAchievements, academicAchievementInput.trim()];
      setAcademicAchievements(updatedAcademicAchievements);
      setAcademicAchievementInput('');
      updateProfile({ academicAchievements: updatedAcademicAchievements });
    }
  };

  // Handler for removing an academic achievement
  const handleRemoveAcademicAchievement = (achievementToRemove: string) => {
    const updatedAcademicAchievements = academicAchievements.filter(achievement => achievement !== achievementToRemove);
    setAcademicAchievements(updatedAcademicAchievements);
    updateProfile({ academicAchievements: updatedAcademicAchievements });
  };

  // Handler to save all details and move to preview
  const handleSaveAll = async () => {
    toast({
      title: "Resume information saved",
      description: "All your resume information has been saved successfully.",
    });
    setStep('preview');
  };

  // Fake handler for PDF generation - in a real app, this would generate a PDF
  const handleGeneratePdf = () => {
    toast({
      title: "Resume PDF",
      description: "Your resume PDF would be generated and downloaded in a real application.",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  // Function to render the current step
  const renderStep = () => {
    switch (step) {
      case 'personal':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter your basic contact information for your resume.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...personalForm}>
                <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-4">
                  <FormField
                    control={personalForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={personalForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={personalForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Continue to Education
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
        
      case 'education':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Enter your educational background and qualifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...educationForm}>
                <form onSubmit={educationForm.handleSubmit(onEducationSubmit)} className="space-y-4">
                  <FormField
                    control={educationForm.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Educational Background</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="B.Tech in Computer Science, XYZ University (2018-2022)" 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include your degrees, institutions, and years of graduation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={educationForm.control}
                    name="hscPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>12th (HSC) Percentage</FormLabel>
                        <FormControl>
                          <Input placeholder="92.5%" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={educationForm.control}
                    name="sslcPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>10th (SSLC) Percentage</FormLabel>
                        <FormControl>
                          <Input placeholder="95.2%" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep('personal')}>
                      Back to Personal Info
                    </Button>
                    <Button type="submit">
                      Continue to Skills
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
        
      case 'skills':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Skills & Certifications</CardTitle>
              <CardDescription>
                Add your professional skills and certifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Skills</h3>
                  <div className="flex mb-2">
                    <Input 
                      placeholder="Add a skill (e.g. React, Python, Project Management)" 
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} className="flex items-center gap-1 px-2 py-1">
                        {skill}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => handleRemoveSkill(skill)}
                        />
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-gray-500">No skills added yet</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Certifications</h3>
                  <div className="flex mb-2">
                    <Input 
                      placeholder="Add a certification (e.g. AWS Solutions Architect)" 
                      value={certificationInput}
                      onChange={(e) => setCertificationInput(e.target.value)}
                      className="flex-1 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCertification();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddCertification}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <span>{cert}</span>
                        <X 
                          className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500" 
                          onClick={() => handleRemoveCertification(cert)}
                        />
                      </div>
                    ))}
                    {certifications.length === 0 && (
                      <p className="text-sm text-gray-500">No certifications added yet</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep('education')}>
                    Back to Education
                  </Button>
                  <Button type="button" onClick={() => setStep('experience')}>
                    Continue to Experience
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'experience':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Professional Experience</CardTitle>
              <CardDescription>
                Add your work experience and internships.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Work Experience</h3>
                  <Textarea
                    placeholder="Software Engineer, ABC Company (Jan 2022 - Present)
- Developed and maintained web applications using React and Node.js
- Collaborated with cross-functional teams to deliver projects on time

Junior Developer, XYZ Corp (June 2020 - Dec 2021)
- Assisted in frontend development using HTML, CSS, and JavaScript
- Participated in code reviews and testing"
                    value={profile.experience?.join('\n')}
                    onChange={(e) => {
                      const experience = e.target.value.split('\n').filter(exp => exp.trim() !== '');
                      updateProfile({ experience });
                    }}
                    className="min-h-40"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter each role on a new line, including company, position, dates, and responsibilities
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep('skills')}>
                    Back to Skills
                  </Button>
                  <Button type="button" onClick={() => setStep('projects')}>
                    Continue to Projects
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'projects':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Add your personal or academic projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Add a Project</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Project Title</label>
                      <Input
                        placeholder="E-commerce Web Application"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Project Description</label>
                      <Textarea
                        placeholder="Developed a full-stack e-commerce platform with user authentication, product catalog, and checkout system."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="min-h-20"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Technologies Used</label>
                      <Input
                        placeholder="React, Node.js, MongoDB, Express (separate with commas)"
                        value={projectTechnologies}
                        onChange={(e) => setProjectTechnologies(e.target.value)}
                      />
                    </div>
                    
                    <Button type="button" onClick={handleAddProject} className="w-full">
                      <Plus className="h-4 w-4 mr-1" /> Add Project
                    </Button>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-base font-medium">Your Projects</h3>
                    {projects.map((project, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <X
                          className="absolute top-3 right-3 h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveProject(index)}
                        />
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm mt-1">{project.description}</p>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-sm text-gray-500">No projects added yet</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep('experience')}>
                    Back to Experience
                  </Button>
                  <Button type="button" onClick={() => setStep('achievements')}>
                    Continue to Achievements
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'achievements':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Add your personal and academic achievements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Personal Achievements</h3>
                  <div className="flex mb-2">
                    <Input 
                      placeholder="Add an achievement (e.g. Won first place in hackathon)" 
                      value={achievementInput}
                      onChange={(e) => setAchievementInput(e.target.value)}
                      className="flex-1 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddAchievement();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddAchievement}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <span>{achievement}</span>
                        <X 
                          className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500" 
                          onClick={() => handleRemoveAchievement(achievement)}
                        />
                      </div>
                    ))}
                    {achievements.length === 0 && (
                      <p className="text-sm text-gray-500">No personal achievements added yet</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Academic Achievements</h3>
                  <div className="flex mb-2">
                    <Input 
                      placeholder="Add an academic achievement (e.g. Dean's List 2021)" 
                      value={academicAchievementInput}
                      onChange={(e) => setAcademicAchievementInput(e.target.value)}
                      className="flex-1 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddAcademicAchievement();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddAcademicAchievement}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    {academicAchievements.map((achievement, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <span>{achievement}</span>
                        <X 
                          className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500" 
                          onClick={() => handleRemoveAcademicAchievement(achievement)}
                        />
                      </div>
                    ))}
                    {academicAchievements.length === 0 && (
                      <p className="text-sm text-gray-500">No academic achievements added yet</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep('projects')}>
                    Back to Projects
                  </Button>
                  <Button type="button" onClick={handleSaveAll}>
                    <Save className="h-4 w-4 mr-1" /> Save & Preview Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'preview':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>
                Preview your resume and download it as a PDF.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 bg-white p-6 border rounded-lg shadow-sm">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <div className="flex justify-center items-center gap-3 text-sm text-gray-600 mt-1">
                    <span>{profile.email}</span>
                    {profile.phone && (
                      <>
                        <span>•</span>
                        <span>{profile.phone}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold border-b pb-1 mb-2">Education</h3>
                  <div className="space-y-2">
                    <p>{profile.education}</p>
                    {profile.hscPercentage && (
                      <p><strong>12th (HSC):</strong> {profile.hscPercentage}</p>
                    )}
                    {profile.sslcPercentage && (
                      <p><strong>10th (SSLC):</strong> {profile.sslcPercentage}</p>
                    )}
                  </div>
                </div>
                
                {skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.experience && profile.experience.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Professional Experience</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {profile.experience.map((exp, index) => (
                        <li key={index}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {projects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Projects</h3>
                    <div className="space-y-3">
                      {projects.map((project, index) => (
                        <div key={index} className="space-y-1">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm">{project.description}</p>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {certifications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Certifications</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(achievements.length > 0 || academicAchievements.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Achievements</h3>
                    {achievements.length > 0 && (
                      <div className="mb-2">
                        <h4 className="font-medium">Personal</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {academicAchievements.length > 0 && (
                      <div>
                        <h4 className="font-medium">Academic</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {academicAchievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button type="button" variant="outline" onClick={() => setStep('achievements')}>
                  Back to Edit
                </Button>
                <Button type="button" onClick={handleGeneratePdf}>
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
            <p className="text-lg text-gray-600">
              Create a professional resume with our step-by-step builder
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <Badge 
                variant={step === 'personal' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('personal')}
              >
                Personal Info
              </Badge>
              <Badge 
                variant={step === 'education' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('education')}
              >
                Education
              </Badge>
              <Badge 
                variant={step === 'skills' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('skills')}
              >
                Skills
              </Badge>
              <Badge 
                variant={step === 'experience' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('experience')}
              >
                Experience
              </Badge>
              <Badge 
                variant={step === 'projects' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('projects')}
              >
                Projects
              </Badge>
              <Badge 
                variant={step === 'achievements' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('achievements')}
              >
                Achievements
              </Badge>
              <Badge 
                variant={step === 'preview' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStep('preview')}
              >
                Preview
              </Badge>
            </div>
          </div>
          
          {renderStep()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
