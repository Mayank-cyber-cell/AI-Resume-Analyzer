import React, { useState, useContext } from 'react'
import styles from './ResumeBuilder.module.css'
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/HOC/axios';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DownloadIcon from '@mui/icons-material/Download';

const emptyExperience = { company: '', role: '', duration: '', description: '' };
const emptyEducation = { institution: '', degree: '', year: '' };

const ResumeBuilder = () => {
  const { userInfo } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState([{ ...emptyExperience }]);
  const [education, setEducation] = useState([{ ...emptyEducation }]);
  const [projects, setProjects] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeText, setResumeText] = useState(null);

  const addExperience = () => setExperience([...experience, { ...emptyExperience }]);
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));
  const updateExperience = (i, field, val) => {
    const copy = [...experience];
    copy[i] = { ...copy[i], [field]: val };
    setExperience(copy);
  };

  const addEducation = () => setEducation([...education, { ...emptyEducation }]);
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));
  const updateEducation = (i, field, val) => {
    const copy = [...education];
    copy[i] = { ...copy[i], [field]: val };
    setEducation(copy);
  };

  const handleBuild = async () => {
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }

    setLoading(true);
    setResumeText(null);
    try {
      const details = {
        name,
        email,
        phone,
        summary,
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        experience: experience.filter((e) => e.company || e.role),
        education: education.filter((e) => e.institution || e.degree),
        projects,
      };

      const response = await axios.post('/api/resume/buildResume', {
        user: userInfo?.email || email,
        details,
      }, { timeout: 60000 });

      setResumeText(response.data.resumeText);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Resume generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resumeText) return;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name || 'resume'}_ATS.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.builder}>
      <main className={styles.formPanel}>
        <header className={styles.header}>
          <div className={styles.headerKicker}>ATS-Friendly Resume Builder</div>
          <h1 className={styles.headerTitle}>Build Your Resume</h1>
          <p className={styles.headerSubtitle}>
            Fill in your details below and the AI will generate a clean, ATS-optimized resume you can download.
          </p>
        </header>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionHeading}>Personal Info</h2>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>
            <div className={styles.field}>
              <label>Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
            </div>
          </div>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionHeading}>Professional Summary</h2>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A brief summary of your professional background and goals..."
          />
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionHeading}>Skills (comma-separated)</h2>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="JavaScript, React, Node.js, Python, SQL"
          />
        </section>

        <section className={styles.sectionCard}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionHeading}>Work Experience</h2>
            <button type="button" className={styles.addBtn} onClick={addExperience}>+ Add</button>
          </div>
          {experience.map((exp, i) => (
            <div className={styles.entryCard} key={i}>
              <div className={styles.entryTop}>
                <span className={styles.entryLabel}>Experience {i + 1}</span>
                {experience.length > 1 && (
                  <button type="button" className={styles.removeBtn} onClick={() => removeExperience(i)}>Remove</button>
                )}
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Company</label>
                  <input type="text" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} placeholder="Acme Inc." />
                </div>
                <div className={styles.field}>
                  <label>Role</label>
                  <input type="text" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)} placeholder="Software Engineer" />
                </div>
                <div className={styles.field}>
                  <label>Duration</label>
                  <input type="text" value={exp.duration} onChange={(e) => updateExperience(i, 'duration', e.target.value)} placeholder="Jan 2023 - Present" />
                </div>
              </div>
              <div className={styles.field}>
                <label>Description</label>
                <textarea rows={2} value={exp.description} onChange={(e) => updateExperience(i, 'description', e.target.value)} placeholder="Key responsibilities and achievements..." />
              </div>
            </div>
          ))}
        </section>

        <section className={styles.sectionCard}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionHeading}>Education</h2>
            <button type="button" className={styles.addBtn} onClick={addEducation}>+ Add</button>
          </div>
          {education.map((edu, i) => (
            <div className={styles.entryCard} key={i}>
              <div className={styles.entryTop}>
                <span className={styles.entryLabel}>Education {i + 1}</span>
                {education.length > 1 && (
                  <button type="button" className={styles.removeBtn} onClick={() => removeEducation(i)}>Remove</button>
                )}
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Institution</label>
                  <input type="text" value={edu.institution} onChange={(e) => updateEducation(i, 'institution', e.target.value)} placeholder="University of XYZ" />
                </div>
                <div className={styles.field}>
                  <label>Degree</label>
                  <input type="text" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
                </div>
                <div className={styles.field}>
                  <label>Year</label>
                  <input type="text" value={edu.year} onChange={(e) => updateEducation(i, 'year', e.target.value)} placeholder="2022" />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionHeading}>Projects (optional)</h2>
          <textarea
            rows={3}
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            placeholder="Describe key projects, tech used, and outcomes..."
          />
        </section>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <button type="button" className={styles.buildBtn} onClick={handleBuild} disabled={loading}>
          <AutoFixHighIcon sx={{ fontSize: 22 }} />
          {loading ? 'Generating...' : 'Generate ATS Resume'}
        </button>
      </main>

      <aside className={styles.previewPanel}>
        <div className={styles.previewHeader}>
          <h2 className={styles.cardHeading}>Preview</h2>
          {resumeText && (
            <button type="button" className={styles.downloadBtn} onClick={handleDownload}>
              <DownloadIcon sx={{ fontSize: 18 }} /> Download
            </button>
          )}
        </div>
        <div className={styles.previewBody}>
          {loading && <div className={styles.loadingText}>Generating your ATS resume...</div>}
          {!loading && !resumeText && (
            <p className={styles.placeholderText}>
              Your generated resume will appear here. Fill in the form and click "Generate ATS Resume".
            </p>
          )}
          {!loading && resumeText && (
            <pre className={styles.resumeOutput}>{resumeText}</pre>
          )}
        </div>
      </aside>
    </div>
  )
}

export default withAUTHHOC(ResumeBuilder)
