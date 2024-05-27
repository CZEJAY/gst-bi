const fs = require('fs');
const path = require('path');

// Define the file and the content to comment out
const filePath = path.join(__dirname, 'node_modules/@digitalpersona/devices/dist/es5/devices/websdk/channel.js');
const contentToComment = `import 'WebSdk';`;

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
  }

  // Check if the content is already commented out
  if (!data.includes(`// ${contentToComment}`)) {
    // Replace the import statement with a commented version
    const result = data.replace(contentToComment, `// ${contentToComment}`);

    // Write the updated content back to the file
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        process.exit(1);
      } else {
        console.log(`Successfully commented out the import statement in ${filePath}`);
      }
    });
  } else {
    console.log(`The import statement is already commented out in ${filePath}`);
  }
});
