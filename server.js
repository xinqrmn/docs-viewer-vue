import express from 'express'
import * as fs from 'fs'
import path from 'path'

const app = express()
const PORT = 3000

const DOCS_DIR = path.join(__dirname, 'public', 'docs')

const scanDir = (dir, baseUrl = '/docs') => {
    const entries = fs.readdirSync(dir, {withFileTypes: true})

    return entries.map((entry) => {
        const fullPath = path.join(dir, entry.name)
        const relativePath = path.relative(DOCS_DIR, fullPath)
        const urlPath = `${baseUrl}/${relativePath.replace(/\\/g, '/')}`

        if (entry.isDirectory()) {
            return {
                key: entry.name,
                label: entry.name,
                children: scanDir(fullPath, baseUrl)
            }
        } else {
            const ext = path.extname(entry.name).slice(1)
            return {
                key: path.basename(entry.name, path.extname(ext.name)),
                label: entry.name,
                data: {
                    type: ext,
                    path: urlPath
                }
            }
        }
    })
}

app.use(express.static('public'))

app.get('/files', async (req, res) => {
    try {
        const tree = scanDir(DOCS_DIR)
        res.json(tree)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на  http://localhost:${PORT}`)
})