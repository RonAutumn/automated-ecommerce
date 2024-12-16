const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

async function setupProject() {
  const projectStructure = {
    'src': {
      'components': {
        'ProductList.js': '',
        'Cart.js': '',
        'Checkout.js': ''
      },
      'pages': {
        'Home.js': '',
        'Admin.js': ''
      },
      'styles': {
        'main.css': ''
      }
    },
    'server': {
      'models': {
        'Product.js': '',
        'User.js': '',
        'Order.js': ''
      },
      'routes': {
        'products.js': '',
        'users.js': '',
        'orders.js': ''
      },
      'index.js': ''
    },
    'public': {
      'index.html': ''
    }
  };

  try {
    // Create project structure
    await createDirectoryStructure(projectStructure);
    
    // Initialize npm project
    await executeCommand('npm init -y');
    
    // Install dependencies
    await executeCommand('npm install express react react-dom mysql2 sequelize');
    await executeCommand('npm install --save-dev nodemon @babel/core @babel/preset-react');
    
    console.log('Project setup completed successfully!');
  } catch (error) {
    console.error('Error setting up project:', error);
  }
}

async function createDirectoryStructure(structure, basePath = '.') {
  for (const [name, content] of Object.entries(structure)) {
    const fullPath = path.join(basePath, name);
    
    if (typeof content === 'object') {
      await fs.mkdir(fullPath, { recursive: true });
      await createDirectoryStructure(content, fullPath);
    } else {
      await fs.writeFile(fullPath, content);
    }
  }
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

setupProject();