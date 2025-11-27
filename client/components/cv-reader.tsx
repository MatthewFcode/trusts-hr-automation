import { usePostCV } from '../hooks/useCV.ts'
import CVResults from './CVResults.tsx'
import { useState, useRef } from 'react'

function CVReader() {
  const postCV = usePostCV()
  const [showResults, setShowResults] = useState(true)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [wallahi, setWallahi] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = wallahi.trim()
    const file = fileRef.current?.files?.[0]
    setShowResults(true)

    if (file) {
      postCV.mutate({ file, text: undefined })
    } else {
      postCV.mutate({ file: undefined, text })
    }
  }

  const handleClose = () => {
    setShowResults(false)
  }

  const clearFile = () => {
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  const copyText = async () => {
    if (!wallahi.trim()) {
      return
    }
    await navigator.clipboard.writeText(wallahi)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 10000)
  }

  const shouldShowResults = postCV.isSuccess && postCV.data && showResults

  return (
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
                ref={fileRef}
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
                value={wallahi}
                onChange={(e) => setWallahi(e.target.value)}
              />
              <p className="helper-text">
                Copy and paste the CV content directly
              </p>
            </div>
          </div>

          <div className="button-row">
            <div className="file-button">
              <button type="button" onClick={clearFile}>
                Clear File
              </button>
            </div>

            <div className="clear-text-button">
              <button type="button" onClick={() => setWallahi('')}>
                Clear Text
              </button>
            </div>

            <div className="copy-text-button">
              <button type="button" onClick={copyText}>
                {isCopied ? 'Text Copied!' : 'Copy Text'}{' '}
                {/*ternary for th copied text*/}
              </button>
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
