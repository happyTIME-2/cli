const { prompt } = require('inquirer');

async function main() {
  const { features } = await prompt([
    {
      name: "features",
      type: "checkbox",
      message: "Check the features needed for your project",
      choices: [
        { name: "Eslint", value: "Eslint" },
        { name: "Prettier", value: "Prettier" },
        { name: "CZ", value: "CZ" },
      ],
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }

        return true;
      },
    },
  ]);

  console.log(`features:${features}`);

  return features;
}

main();