import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv'
import readline from 'readline'

config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

if (!configuration.apiKey) {
  console.log("OpenAI API key not configured");
  process.exit(1);
}

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

userInterface.prompt()
userInterface.on("line", async input => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: input }],
    })
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
})


