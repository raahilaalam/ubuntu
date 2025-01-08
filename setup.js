const { execSync } = require('child_process');
const fs = require('fs');

// Function to execute shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

// Update package index and install prerequisites
runCommand('sudo apt update');
runCommand('sudo apt install -y nodejs npm');

// Install npx globally
runCommand('sudo npm install -g npx');

// Create a new React application
runCommand('npx create-react-app my-app');
process.chdir('my-app');

// Initialize a Git repository
runCommand('git init');

// Create README.md and .gitignore files
fs.writeFileSync('README.md', '# My React App');
fs.writeFileSync('.gitignore', 'node_modules\n');

// Add all files to the staging area
runCommand('git add .');

// Commit the files
runCommand('git commit -m "Initial commit"');

// Create a new GitHub repository (replace <TOKEN> with your GitHub token and <USERNAME> with your GitHub username)
const githubToken = '<TOKEN>';
const githubUsername = '<USERNAME>';
const repoName = 'my-app';

runCommand(`curl -H "Authorization: token ${githubToken}" https://api.github.com/user/repos -d '{"name":"${repoName}"}'`);

// Add the remote repository
runCommand(`git remote add origin https://github.com/${githubUsername}/${repoName}.git`);

// Push to GitHub
runCommand('git push -u origin master');

// Install Firefox
runCommand('sudo apt install -y firefox');

// Start the React application
runCommand('npm start');
