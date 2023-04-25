// Leer Archivos del sistema
const fs = require('fs');
const path = require('path');

let content = 'Escribiendo en un archivo de texto.\n';
let secondLine = '\nSegunda linea de texto.';

const readFile = async () => {
    try {
        console.log('-- ReadFile()');
        const filePath = path.resolve(`${__dirname}/file.txt`);
        let data = await fs.promises.readFile(filePath, 'utf-8');
        console.log(data);
        console.log('-- WriteFile()');
        await fs.promises.writeFile(filePath, content);
        data = await fs.promises.readFile(filePath, 'utf-8');
        console.log(data);
        console.log('-- AppendFile()');
        await fs.promises.appendFile(filePath, secondLine);
        data = await fs.promises.readFile(filePath, 'utf-8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

readFile();