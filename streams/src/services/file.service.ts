import { readFile } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const fileName = 'largeFile.csv';

async function brokenApp() {
  await readFile(fileName, 'utf-8');
}

function readLargeFile() {
  const readStream = createReadStream(fileName, { encoding: 'utf8' });

  readStream.on('data', (chunk: string) => {
    console.log(chunk);
  });
}

function transformCsvLine(line: string) {
  const parts = line.split(',');
  if (parts.length === 3) {
    parts[0] = parts[0].trim().toUpperCase();
    const alterationDate = new Date().toISOString();
    return [...parts, alterationDate].join(',') + '\n';
  }
  return line + '\n';
}

async function processCsvFile(inputFilePath: string, outputFilePath: string) {
  try {
    const readStream = createReadStream(inputFilePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(outputFilePath, { encoding: 'utf8' });
    const lineReader = createInterface({
      input: readStream,
    });

    const transformStream = new Transform({
      objectMode: true,
      transform(chunk: string, encoding, callback) {
        callback(null, transformCsvLine(chunk));
        // console.log(transformCsvLine(chunk));
      },
    });

    await pipeline(lineReader, transformStream, writeStream);
  } catch (error) {
    console.error('Erro ao processar o CSV', error);
  }
}

// readLargeFile();

processCsvFile(fileName, 'output.csv');
