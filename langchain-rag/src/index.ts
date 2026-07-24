import fs from 'fs';
import pdf from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// PREPARAÇÃO DOS DADOS

async function loadPdf(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

const filePath = './file.pdf';
const CHUNK_SIZE = 1200; // Tamanho do chunk em caracteres
const CHUNK_OVERLAP = 200; // Sobreposição entre chunks em caracteres

const pdfText = await loadPdf(filePath);
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: CHUNK_SIZE,
  chunkOverlap: CHUNK_OVERLAP,
});
const chunks = await splitter.splitText(pdfText);

console.log(chunks);
// USO DOS DADOS
