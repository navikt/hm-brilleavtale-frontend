import { JSDOM } from 'jsdom'
import mammoth from 'mammoth'
import path from 'path'

describe.skip('avtale', () => {
  test('html', async () => {
    const html = await mammoth.convertToHtml({ path: path.join(__dirname, 'avtale.docx') })
    const dom = new JSDOM(html.value)
    const innhold = Array.from(dom.window.document.querySelectorAll('p')).map((p) => p.textContent?.trim())
    console.log(JSON.stringify(innhold, null, '  '))
  })
})
