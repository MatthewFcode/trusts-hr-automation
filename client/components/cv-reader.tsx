// import { usePostCV } from '../hooks/useCV.ts'
// import CVResults from './CVResults.tsx'

// function CVReader() {
//   const postCV = usePostCV()

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()

//     const form = event.currentTarget

//     const fileInput = form.fileInput as HTMLInputElement
//     const textInput = form.cvText as HTMLTextAreaElement

//     const file = fileInput.files?.[0]
//     const text = textInput.value.trim()

//     if (!file && !text) {
//       alert('Please provide either a file or paste text')
//       return
//     }
//     // send the file first if it exists
//     if (file) {
//       postCV.mutate({ file, text: undefined })
//     } else {
//       postCV.mutate({ file: undefined, text }) // send the text if the file doesn't exist
//     }
//   }

//   return (
//     <>
//       <div className="cv-reader-container">
//         <h1>Drop the CV and get AI powered overviews of your candidate 🧑‍💼</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="form-sections-wrapper">
//             <div className="form-section">
//               <label htmlFor="fileInput">Upload CV Document</label>
//               <input
//                 type="file"
//                 name="fileInput"
//                 id="fileInput"
//                 accept=".pdf,.doc,.docx,.txt"
//               />
//               <p className="helper-text">
//                 Accepted formats: PDF, DOC, DOCX, TXT
//               </p>
//             </div>

//             <div className="divider">OR</div>

//             <div className="form-section">
//               <label htmlFor="cvText">Paste CV Text</label>
//               <textarea
//                 name="cvText"
//                 id="cvText"
//                 placeholder="Paste the CV text here..."
//               />
//               <p className="helper-text">
//                 Copy and paste the CV content directly
//               </p>
//             </div>
//           </div>

//           <button type="submit" disabled={postCV.isPending}>
//             {postCV.isPending ? 'Processing...' : 'Analyze CV'}
//           </button>

//           {postCV.isSuccess && (
//             <div className="success-message">✓ CV processed successfully!</div>
//           )}

//           {postCV.isError && (
//             <div className="error-message">
//               ✕ Error processing CV. Please try again.
//             </div>
//           )}
//         </form>
//       </div>

//       {postCV.isSuccess && postCV.data && <CVResults data={postCV.data} />}
//     </>
//   )
// }

// export default CVReader

import { usePostCV } from '../hooks/useCV.ts'
import CVResults from './CVResults.tsx'
import { useState } from 'react'

function CVReader() {
  const postCV = usePostCV()
  const [showResults, setShowResults] = useState(true)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const fileInput = form.fileInput as HTMLInputElement
    const textInput = form.cvText as HTMLTextAreaElement

    const file = fileInput.files?.[0]
    const text = textInput.value.trim()

    if (!file && !text) {
      alert('Please provide either a file or paste text')
      return
    }
    setShowResults(true)
    // send the file first if it exists
    if (file) {
      postCV.mutate({ file, text: undefined })
    } else {
      postCV.mutate({ file: undefined, text }) // send the text if the file doesn't exist
    }
  }

  const handleClose = () => {
    setShowResults(false)
  }

  const shouldShowResults = postCV.isSuccess && postCV.data && showResults

  return (
    // <div
    //   className={`cv-reader-container ${postCV.isSuccess && postCV.data ? 'has-results' : ''}`}
    // >
    <div
      className={`cv-reader-container ${shouldShowResults ? 'has-results' : ''}`}
    >
      <div className="cv-reader-form-wrapper">
        <h1>Drop the CV and get AI powered overviews of your candidate 🧑‍💼</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-sections-wrapper">
            <div className="form-section">
              <label htmlFor="fileInput">Upload CV Document</label>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                accept=".pdf,.doc,.docx,.txt"
              />
              <p className="helper-text">
                Accepted formats: PDF, DOC, DOCX, TXT
              </p>
            </div>

            <div className="divider">OR</div>

            <div className="form-section">
              <label htmlFor="cvText">Paste CV Text</label>
              <textarea
                name="cvText"
                id="cvText"
                placeholder="Paste the CV text here..."
              />
              <p className="helper-text">
                Copy and paste the CV content directly
              </p>
            </div>
          </div>

          <button type="submit" disabled={postCV.isPending}>
            {postCV.isPending ? 'Processing...' : 'Analyze CV'}
          </button>

          {postCV.isSuccess && (
            <div className="success-message">✓ CV processed successfully!</div>
          )}

          {postCV.isError && (
            <div className="error-message">
              ✕ Error processing CV. Please try again.
            </div>
          )}
        </form>
      </div>

      {shouldShowResults && (
        <CVResults data={postCV.data} onClose={handleClose} />
      )}
    </div>
  )
}

export default CVReader
