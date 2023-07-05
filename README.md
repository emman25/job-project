# job-project
1. import the collections in the collection directory to your local mongodb

## Installation
#run backend
1. run docker / open docker desktop
2. navigate to backend folder
3. run "npm install"
4. run "docker compose up -d"
5. finally run "npm run dev"

#run frontend
1. npm install
2. npm run dev

## Usage
1. Open your web browser and visit `http://localhost:3000`
2. Follow the instructions on the website to use the application.
3.Below is a Curl to create a job
curl --request POST \
  --url http://localhost:3010/v1/jobs \
  --header 'Content-Type: application/json' \
  --data '{
  "position": "Software Engineer",
  "workType": "Full-time",
  "tags": ["JavaScript", "Node.js", "React"],
  "location": "worldwide",
  "minSalary": 60000,
  "maxSalary": 80000,
  "description": "We are seeking a skilled software engineer with expertise in JavaScript, Node.js, and React to join our team. The ideal candidate should have strong problem-solving skills and a passion for developing high-quality software solutions."
}
'

   


