# ExoReact-Nasa_Space_Apps
ExoReact-Nasa_Space_Apps

## Setup frontend:

```bash
cd frontend
npm install
npm start
```
## Setup backend:

```bash
cd backend
npm install
nodemon server
```


## Github Repo Collaboratoration:


```bash
git checkout -b branchname  #first create your own branch(once)
git push --set-upstream origin branchname  #push your branch to github(once)
git add .
git commit -m "message"
git push -u origin branchname   
# go to github website repo and create a pull request
    
# when u open project after a long time, first do these commands
git fetch origin main
git pull origin main
```
To Open md files in vscode - `Ctrl + Shift + V`




## For firebase
    
    ```bash
    cd frontend
    npm install -g firebase-tools
    firebase login
    firebase init

    npm run build
    firebase deploy
    ```


```bash
for firebase upload pictures,
first setup firebaseConfig.js and then in firebase console, update the rules section to allow read and write
```
```bash
router.post('/update', upload.single('profilePicture'), async (req, res) => { })
    #here , profilePicture is the name of the file in the frontend formData
    #and upload.single('profilePicture') is the middleware to upload the file
    #and in the frontend, the file is sent as formData
    ```

