import request from 'superagent'
import { CVExtracted, CVInput } from '../../models/cv-extractor.ts'
// const rootURL = new URL(`/api/v1`, document.baseURI)

export async function postCV(
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
