import inquirer from 'inquirer';
import sillyname from 'sillyname';
import {randomSuperhero} from 'superheroes'; 
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        type: 'input',
        name: 'JAYVEE',
        message: 'What is your name?'
    }
]).then((answers) => {
    const JAYVEE = answers.JAYVEE;  
    const SN = sillyname();  
    const SHN = randomSuperhero();

    console.log(`Hello ${JAYVEE}`);
    console.log(`Your villain name will be ${SN}`);
    console.log(`Your superhero name will be ${SHN}`);
    console.log("QR codes are generated");
    console.log("Text file updated");

    // Generate QR codes
    generateQRCode(JAYVEE, 'jayvee.png');
    generateQRCode(SN, 'sillyname.png');
    generateQRCode(SHN, 'superheroname.png');

    // Save names to a text file
    const textContent = `Name: ${JAYVEE}\nVillain Name: ${SN}\nSuperhero Name: ${SHN}\n`;
    fs.writeFile('myhero.txt', textContent, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Names saved to myhero.txt');
        }
    });
}).catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment.");
    } else {
        console.error("Something went wrong:", error);
    }
});

// Function to generate QR code
function generateQRCode(text, filename) {
    const qr_svg = qr.image(text, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(filename));
}
