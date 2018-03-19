# Weather App

See the weather in real time with this awesome app!

Link to instant acess to App:
[Weather App by Marlon Fauser](https://weathernow-zyqjlzisrb.now.sh/)

## Preview

![alt text](https://image.ibb.co/hCAq0H/Weather_Now.png)


## Getting Started

To initiate the project we need to get the files and put in our local machine.

### Prerequisites
 
 To build and run this app for development or production mode we need to be certain that we have three
 components installed: Chocolatey, React DOM. NPM or Yarn.
 
### Installing

#### Step by step of how to install them

Open Power Shell with Administrator

```
-Set-ExecutionPolicy AllSigned
-Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
-choco upgrade chocolatey
-choco install nodejs.install
-choco upgrade nodejs.install
-choco install yarn
```
Choco will ask us (two times) to run the script (after yarn installed), press Y to run and install definetly
```
-cd weathernow
-npm install --save-dev
```
After that you can run:
```
-npm start
```

or

```
-yarn start
```

After the last command line the terminal will send a command to open our browser in our localhost with default port 3000, running the app.

## Running the tests

The tests for this app is in production yet, but we know the great importance that tests are for the development of this app.

## Deployment

This app was made in a few hours, so it can contain inconsistencys.

## Built With

* [ReactJs](https://reactjs.org/) - The library used
* [NPM](https://www.npmjs.com/) - Package Manager
* [Open Weather Map](https://openweathermap.org/api) - API used to get weather informations.
oject/tags). 

## Authors

* **Marlon Fauser** - *Full work* - [MarlonFauser](https://github.com/MarlonFauser)

## Acknowledgments

* The future are in our hands.
