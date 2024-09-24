#Use an official Node runtime as a parent image
FROM node:18

#Set the working directory in the container to /app
WORKDIR /app

#install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

#Copy package.json and package-lock.json into the working directory
COPY package*.json ./

#install any needed packages specified in package.json
RUN npm install

# Copy app source inside the docker image
COPY . .

#Make port 3000 available outside this container
EXPOSE 3000

#Define the command to run your app using CMD (only one CMD is allowed)
CMD ["npm", "start"]

