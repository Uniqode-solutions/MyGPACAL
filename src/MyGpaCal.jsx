import { useState, useEffect } from "react";
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  Tooltip,
  IconButton,
  Alert,
  Snackbar
} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { defaultCourses } from "./courseData";
import { initialGrades } from "./gradeData";

export default function GPACalculator() {
  // State initialization with localStorage
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('gpaSubjects');
    return saved ? JSON.parse(saved) : defaultCourses;
  });
  
  const [gradeSettings, setGradeSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('gpaGradeSettings');
      return saved ? JSON.parse(saved) : initialGrades;
    } catch (e) {
      console.error("Failed to parse grade settings from localStorage", e);
      return initialGrades;
    }
  });

  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem('gpaGrades');
    return saved ? JSON.parse(saved) : {};
  });

  // Form states
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credit, setCredit] = useState("");
  const [gpa, setGPA] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gpaSubjects', JSON.stringify(subjects));
    localStorage.setItem('gpaGradeSettings', JSON.stringify(gradeSettings));
    localStorage.setItem('gpaGrades', JSON.stringify(grades));
  }, [subjects, gradeSettings, grades]);

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError(null);
  };

  // Input validation
  const validateSubject = () => {
    if (!name.trim()) {
      setError("Subject name is required");
      setOpenSnackbar(true);
      return false;
    }
    if (!code.trim()) {
      setError("Subject code is required");
      setOpenSnackbar(true);
      return false;
    }
    if (isNaN(credit) || credit <= 0) {
      setError("Credit must be a positive number");
      setOpenSnackbar(true);
      return false;
    }
    if (subjects.some(s => s.code === code)) {
      setError("Subject code must be unique");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  // Add new subject
  const addSubject = () => {
    if (!validateSubject()) return;
    
    setSubjects([...subjects, { 
      name: name.trim(), 
      code: code.trim(), 
      credit: parseFloat(credit) 
    }]);
    setName("");
    setCode("");
    setCredit("");
  };

  // Remove subject
  const removeSubject = (subjectCode) => {
    setSubjects(subjects.filter(s => s.code !== subjectCode));
    const newGrades = {...grades};
    delete newGrades[subjectCode];
    setGrades(newGrades);
  };

  // Calculate GPA
  const calculateGPA = () => {
    if (subjects.length === 0) {
      setError("Add at least one subject to calculate GPA");
      setOpenSnackbar(true);
      return;
    }

    const gradeMap = Object.fromEntries(
      gradeSettings.map(item => [item.grade, item.point])
    );

    let totalPoints = 0;
    let totalCredits = 0;
    let hasMissingGrades = false;

    subjects.forEach(subject => {
      const grade = grades[subject.code];
      if (!grade) {
        hasMissingGrades = true;
        return;
      }
      if (gradeMap[grade] !== undefined) {
        totalPoints += gradeMap[grade] * subject.credit;
        totalCredits += subject.credit;
      }
    });

    if (hasMissingGrades) {
      setError("Some subjects are missing grades");
      setOpenSnackbar(true);
      setGPA(null);
      return;
    }

    if (totalCredits === 0) {
      setError("No valid grades found for calculation");
      setOpenSnackbar(true);
      setGPA(null);
      return;
    }

    setGPA((totalPoints / totalCredits).toFixed(2));
  };

  // Reset everything
  const resetAll = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setSubjects(defaultCourses);
      setGrades({});
      setGPA(null);
      setGradeSettings(initialGrades);
    }
  };

  // Help tooltip content
  const helpContent = (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" gutterBottom>How to use:</Typography>
      <ol>
        <li>Add subjects with name, code, and credit hours</li>
        <li>Set your grade scale (default is provided)</li>
        <li>Select grades for each subject</li>
        <li>Click "Calculate GPA"</li>
      </ol>
      <Typography variant="caption">Note: All data is saved automatically</Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      p: { xs: 1, sm: 2, md: 3 },
      gap: { xs: 1, sm: 2, md: 3 },
      flexDirection: { xs: 'column', md: 'row' },
      position: 'relative',
      maxWidth: '1800px',
      margin: '0 auto',
    }}>
      {/* Help button */}
      <Tooltip title={helpContent} arrow placement="left">
        <IconButton sx={{ 
          position: 'fixed', 
          top: 16, 
          right: 16,
          zIndex: 1200,
          backgroundColor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}>
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

      {/* Error snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Left Column - Subject Management */}
      <Paper elevation={3} sx={{ 
        p: { xs: 2, sm: 3 },
        flex: 1,
        minWidth: 0,
        order: { xs: 1, md: 0 }
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Subject Management
          <Tooltip title="Enter all your courses/subjects">
            <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
          </Tooltip>
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, 
          mb: 2 
        }}>
          <TextField
            label="Name"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Code"
            size="small"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            required
            sx={{ minWidth: { xs: '100%', sm: 120 } }}
          />
          <TextField
            label="Credit"
            type="number"
            size="small"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            sx={{ width: { xs: '100%', sm: 100 } }}
            inputProps={{ min: 1, step: 0.5 }}
            required
          />
        </Box>
        <Button variant="contained" onClick={addSubject} fullWidth>
          ADD SUBJECT
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          Added Subjects ({subjects.length})
        </Typography>
        {subjects.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No subjects added yet
          </Typography>
        ) : (
          <Box sx={{ 
            maxHeight: "max-content", 
            overflow: 'auto',
            '& > div': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              mb: 1,
              bgcolor: 'background.default',
              borderRadius: 1,
            }
          }}>
            {subjects.map((subject) => (
              <Box key={subject.code}>
                <Box>
                  <Typography>{subject.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {subject.code} - {subject.credit} credit(s)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    select
                    size="small"
                    value={grades[subject.code] || ""}
                    onChange={(e) => setGrades({...grades, [subject.code]: e.target.value})}
                    sx={{ minWidth: 120 }}
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select Grade</option>
                    {gradeSettings.map((item) => (
                      <option key={item.grade} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </TextField>
                  <IconButton 
                    size="small" 
                    onClick={() => removeSubject(subject.code)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Middle Column - GPA Calculation */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'column' },
        justifyContent: 'center',
        width: { xs: '100%', md: 200 },
        gap: 2,
        order: { xs: 0, md: 0 },
        mb: { xs: 2, md: 0 },
      }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={calculateGPA}
          fullWidth
          size="large"
          sx={{ height: 48 }}
        >
          CALCULATE GPA
        </Button>

        {gpa !== null && (
          <Paper elevation={3} sx={{ 
            p: 2, 
            textAlign: 'center',
            width: '100%',
          }}>
            <Typography variant="h6">Your GPA</Typography>
            <Typography variant="h3" color="primary" sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }}>
              {gpa}
            </Typography>
          </Paper>
        )}

        <Button 
          variant="outlined" 
          color="error"
          onClick={resetAll}
          startIcon={<DeleteIcon />}
          fullWidth
        >
          Reset All
        </Button>
      </Box>

      {/* Right Column - Grade Management */}
      <Paper elevation={3} sx={{ 
        p: { xs: 2, sm: 3 },
        flex: 1,
        minWidth: 0,
        order: { xs: 2, md: 0 }
      }}>
        <Typography variant="h6" gutterBottom>
          GPA Grade Management
          <Tooltip title="Customize your grading scale">
            <HelpOutlineIcon fontSize="small" sx={{ ml: 1 }} />
          </Tooltip>
        </Typography>
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Set your institution's grade point values
        </Typography>

        <Box sx={{ 
          maxHeight: "max-content", 
          overflow: 'auto', 
          mb: 2,
        }}>
          {gradeSettings.map((item, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 2, 
              width: '100%',
              alignItems: 'center'
            }}>
              <TextField
                label="Grade"
                size="small"
                value={item.grade}
                onChange={(e) => {
                  const newSettings = [...gradeSettings];
                  newSettings[index].grade = e.target.value;
                  setGradeSettings(newSettings);
                }}
                sx={{ flex: 1 }}
                required
              />
              <TextField
                label="Point"
                type="number"
                size="small"
                value={item.point}
                onChange={(e) => {
                  const newSettings = [...gradeSettings];
                  newSettings[index].point = Math.max(0, parseFloat(e.target.value)) || 0;
                  setGradeSettings(newSettings);
                }}
                sx={{ width: 100 }}
                inputProps={{ min: 0, step: 0.25 }}
                required
              />
              {gradeSettings.length > 1 && (
                <IconButton 
                  size="small" 
                  onClick={() => setGradeSettings(gradeSettings.filter((_, i) => i !== index))}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={() => setGradeSettings([...gradeSettings, { grade: "", point: 0 }])}
            fullWidth
          >
            Add Grade
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setGradeSettings(initialGrades)}
            fullWidth
          >
            Reset Defaults
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}