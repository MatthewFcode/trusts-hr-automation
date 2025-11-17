import request from 'superagent'
import { CVExtracted, CVInput } from '../../models/cv-extractor.ts'
// const rootURL = new URL(`/api/v1`, document.baseURI)

export async function postCV( // function for posting a file or a piece of text to the FastAPI endpoint
  CVInit: CVInput,
): Promise<CVExtracted | undefined> {
  try {
    const req = request
      .post('http://localhost:8000/jobs/extract')
      .set('Accept', 'application/json')

    if (CVInit.file) {
      req.attach('file', CVInit.file)
    }

    if (CVInit.text) {
      req.field('text', CVInit.text)
    }
    const result = await req
    return result.body
  } catch (err) {
    console.log(err)
  }
}
