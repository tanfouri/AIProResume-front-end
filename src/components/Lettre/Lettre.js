// src/Lettre.js
import React, { useState, useEffect ,useRef  } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print'
import './Lettre.css';
const GeneratedLettrePrintable = React.forwardRef(({ generatedLettre }, ref) => (
  <div ref={ref}>
    <p>{`Lettre: ${generatedLettre}`}</p>
  </div>
));

const Lettre = () => {
  const [letters, setLetters] = useState([]);
  const [formData, setFormData] = useState({
    fullname: '',
    company: '',
    skills: '',
    description: '',
    generatedLettre: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  
  const generatedLettreRef = useRef();
  useEffect(() => {
    axios.get('http://localhost:8080/api/lettre/')
      .then(response => {setLetters(response.data)
      console.log(response.data)})
      .catch(error => console.error('Error fetching letters:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateLetter = () => {
    if (editIndex !== null) {
      // If editIndex is not null, update the existing letter
      axios.put(`http://localhost:8080/api/letter/${letters[editIndex]._id}`, formData)
        .then(response => {
          const updatedLetters = [...letters];
          updatedLetters[editIndex] = response.data;
          setLetters(updatedLetters);
          setFormData({ fullname: '', company: '', skills: '', description: '' ,generatedLettre: '',});
          setEditIndex(null);
        })
        .catch(error => console.error('Error updating letter:', error));
    } else {
      // If editIndex is null, create a new letter
      axios.post('http://localhost:8080/api/lettre/', formData)
        .then(response => setLetters([...letters, response.data]))
        .catch(error => console.error('Error creating letter:', error));

      setFormData({ fullname: '', company: '', skills: '', description: '' });
    }
  };

  const handleEditLetter = (index) => {
    const letterToEdit = letters[index];
    setFormData({ ...letterToEdit });
    setEditIndex(index);
  };

  const handleDeleteLetter = (index) => {
    axios.delete(`http://localhost:8080/api/lettre/${index}`)
      .then(response => {
        setLetters(letters.filter((_, idx) => idx !== index));
        setFormData({ fullname: '', company: '', skills: '', description: '' });
        setEditIndex(null);
      })
      .catch(error => console.error('Error deleting letter:', error));
  };
  const handlePrintLetter = useReactToPrint({
    content: () => generatedLettreRef.current,
  });
  const calculateRowCount = (text) => {
    const lineCount = text.split('\n').length;
    return lineCount > 1 ? lineCount : 2; // Set a minimum of 2 rows
  };
  return (
    <div className="motivation-container">
      <h1>Motivation Letters</h1>
      <div className="input-group">

        {/* ... (input fields remain the same) */}
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {editIndex !== null ?   <textarea
          name="generatedLettre"
          placeholder="lettre generated"
          
          value={formData.generatedLettre}
          onChange={handleInputChange}
          rows={calculateRowCount(formData.generatedLettre)}
        />:<></>}
        <button onClick={handleCreateLetter}>
          {editIndex !== null ? 'Update Letter' : 'Create Letter'}
          
        </button>
      </div>
      <ul>
        {letters.map((letter, index) => (
          <li key={index}>
            <p>{`Full Name: ${letter.fullname}`}</p>
            <p>{`Company: ${letter.company}`}</p>
            <p>{`Skills: ${letter.skills}`}</p>
            <p>{`Description: ${letter.description}`}</p>
            <p>lettre:</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', whiteSpace: 'pre-wrap',textAlign: 'left' }}>${letter.generatedLettre}</p>
            <div className="button-group">
              <button onClick={() => handleEditLetter(index)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteLetter(index)}>
                           Delete
              </button>
              <button onClick={handlePrintLetter}>Print Letter</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ display: 'none' }}>
        <GeneratedLettrePrintable
          ref={generatedLettreRef}
          generatedLettre={formData.generatedLettre}
        />
      </div>
    </div>
  );
};

export default Lettre;
