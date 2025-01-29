import React, {ChangeEvent, useState } from 'react'

const FileUploader = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          console.log(e.target.files);
          setFile(e.target.files[0]);
        }
    }
  return (
      <div>
          <h2>Upload your file, a little TypeScript</h2>
      <input type="file" onChange={handleFileChange} />
      {file && (<div>
        <p>File name:{file.name}</p>
        {/* Метод toFixed() форматирует число, используя запись с фиксированной запятой. */}
        <p>Size: {(file.size/1024).toFixed(2)} KB</p>
        <p>Type: {file.type}</p>
      </div>)}
    </div>
  )
}

export default FileUploader