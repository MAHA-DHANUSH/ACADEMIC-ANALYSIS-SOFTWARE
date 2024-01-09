import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import "./Staff.css"

function Staff() {
  const [file, setFile] = useState(null);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/staff', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer' // add binary option
      });
  
      if (response && response.data) {
        const updatedWorkbook = XLSX.read(new Uint8Array(response.data), { type: 'array' });
        console.log(updatedWorkbook);
  
        // Process the updated workbook to add the sum of values in each row to column E
        const updatedWorksheet = updatedWorkbook.Sheets[updatedWorkbook.SheetNames[0]];
        console.log(updatedWorksheet)
  
        // Convert the updated workbook back to binary format and save it to the file
        const updatedWorkbookBinary = XLSX.write(updatedWorkbook, { type: 'array', bookType: 'xlsx' });
        const updatedFile = new File([updatedWorkbookBinary], selectedFile.name, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        setFile(updatedFile);
      } else {
        console.log('no valid response received');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Staff'>
      <h1>Select an Excel file to upload</h1>
      <input type="file" name="file" accept=".xlsx,.xls" onChange={handleFileUpload} className='Staff-input'/>
      {file && <p>{file.name} is Sent to the Staff</p>}
    </div>
  );
}

export default Staff;
