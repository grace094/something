const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

function promptUser(){
    return inquirer
    .prompt([
        {
        type: "input",
        name: "name",
        message: "What is your name?"
        },
        {
        type: "input",
        name: "email",
        message: "What is your email?"
        },
        {
        type: "input",
        name: "github",
        message: "What is your github username?"
        },
        {
        type: "input",
        name: "project",
        message: "What is the name of your project?"
        },
        {
        type: "input",
        name: "description",
        message: "Describe your project.",
        },
        {
        type: "input",
        message: "installation",
        name: "What coding was used to install your project?"
        },
        {
        type: "input",
        message: "contribution",
        message:  "What was your role in this project?  Developer? Contributor?"
    }
    ])

    .then(function (response) {
        const queryUrl = `https://api.github.com/users/${response.username}`
        axios
            .get(queryUrl).then(function (res) {



        const readMe = `[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
                        [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
  
# ${response.name}.
#### ${response.email}
#### ${response.github}
  
## What's the project?
${response.project}
  
## Table Of Contents
Input values
  
# Project Description
${response.description}
  
## Coding used to make the project?
${response.installation}

# questions
![${res.data.html_url}](${res.data.avatar_url}&s=50)
  
email: ${res.data.email}.
    
  `
  fs.writeFile("READMEgen.md", readMe, function () {
                });
            })

    });
}
