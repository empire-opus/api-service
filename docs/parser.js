const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { Readable } = require('stream');
const { promisify } = require('util');

const parseLogFile = async (filePath, streamOptions = {}) => {
  const readableStream = createReadStream(filePath);
  const writableStream = new Readable();

  readableStream.pipe(writableStream);

  const parsedData = [];
  let currentLine = '';

  const onData = (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        currentLine += trimmedLine;
        parsedData.push(currentLine);
      }
      currentLine = '';
    });
    if (currentLine) {
      parsedData.push(currentLine);
    }
  };

  const onEnd = () => {
    console.log(parsedData);
  };

  writableStream.on('data', onData);
  writableStream.on('end', onEnd);

  await promisify(pipeline)(readableStream, writableStream);
};

parseLogFile('path/to/log/file.log');