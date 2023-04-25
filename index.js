const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const tesseract = require('tesseract.js')
const {OpenAIEmbeddings} = require('langchain/embeddings')
const openaiApiKey = "openaiapikey"

const app = express()

//integration de l'api de openAI dans OpenAIEmbeddings
const embeddings = new OpenAIEmbeddings({openAIApiKey: openaiApiKey})
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin:"*"
}))

const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'image'+path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

//definition du port de l'application
const port = 3200;

app.get('/', async(req,res) => {
    return res.send("welcome")
})

app.post('/upload-file', upload.single('fichier'), async function(req,res){
    if(!req.file){
        return res.json({
            status: false,
            message:"Le fichier n'a pas été uploadé"
        })
    }else{
        await tesseract.recognize(`/Users/assiajeanngoran/Desktop/Tech_Republic/magictext_api/uploads/${req.file.filename}`)
            .then(async(response) => {
                const recuptext = response.data.text
                const removeSpecialCharacter = recuptext.replace(/[^A-Za-z0-9\s]/g, '')
                try {
                    const res = await embeddings.embedQuery(removeSpecialCharacter)
                    console.log("res", res);
                } catch (error) {
                    console.log("erreur", error);
                }
                //console.log(res.data.input);
                return res.json({
                    status: true,
                    text: removeSpecialCharacter
                })
            })
            .catch((error) =>{
                console.log(error);
                return res.json({
                    status: false,
                    message: "Une erreur s'est produite pendant la lecture du document"
                })
            })
    }

})



//lancer l'application

app.listen(port,()=> {
    console.log(`L'application écoute sur le port ${port}`);
})