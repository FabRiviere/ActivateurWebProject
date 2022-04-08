const token = require("../middleware/token");
const db = require("../models");
const fs = require("fs");

exports.createVideo = async (req,res) => {
    const userId = token.getUserId(req);
    let videoUrl;

    try {
        const user = db.User.findOne({
            attributes: [ 'id', 'pseudo', 'photo'],
            where: { id: userId }
        })
        if (user != null ) {
            if(req.file) {
                videoUrl =  `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`
            } else {
                videoUrl = null;
            }

            
            //     const form = new formidable.IncomingForm();
            //     form.parse(req, function(err, fields, files){
              
            //         var oldPath = files.videoUrl.path;
            //         var newPath = path.join(__dirname, 'videos')
            //                 + '/'+files.videoUrl.name
            //         var rawData = fs.readFileSync(oldPath)
                  
            //         fs.writeFile(newPath, rawData, function(err){
            //             if(err) console.log(err)
            //             return res.send("Successfully uploaded")
            //         })
            //   })
            

            const video = await db.Video.create({
                include: [
                    {
                        model: db.User,
                        attributes: [ "id", "pseudo"]
                    },
                    {
                        model: db.Tutorial,
                        attributes: [ "id", "title"]
                    },
                    {
                        model: db.Portfolio,
                        attributes: [ "id", "projet"]
                    }
                ],
                title: req.body.title,
                poster: req.body.poster,
                duration: req.body.duration,
                videoUrl: videoUrl,
                UserId: userId,
                PortfolioId: req.body.Portfolio_id,
                TutorialId: req.body.Tutorial_id
            })
            res.status(201).send({ video: video, messageRetour: "Votre video est en ligne ! 😉"  })
        }
        else {
            res.status(400).send({ error: "Erreur ! 😩" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur de la part du serveur ! 😩" });
    }
}

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await db.Video.findAll({
            attributes: [ "id", "title", "videoUrl", "duration"],
            include: [
                {
                    model: db.User,
                    attributes: [ "id", "pseudo"]
                }, 
                {
                    model: db.Tutorial,
                    attributes: [ "id", "title"]
                },
                {
                    model: db.Portfolio,
                    attributes: [ "id", "projet"]
                }
            ]
        })
        res.status(200).send(videos)
    } catch (error) {
        return res.status(500).send({
			error: 'Une erreur est survenue lors du chargement des videos '
		});
    }
}

exports.getOneVideo = async (req, res) => {
    try {
        const video = await db.Video.findOne({
            where: { id: req.params.id },
            attributes: [ "id", "title", "videoUrl", "duration"],
            include: [
                {
                    model: db.User,
                    attributes: [ "id", "pseudo"]
                }, 
                {
                    model: db.Tutorial,
                    attributes: [ "id", "title"]
                },
                {
                    model: db.Portfolio,
                    attributes: [ "id", "projet"]
                }
            ],
        })
        // if(videoUrl) {
        //     const videoPath = `upload/${req.params.id}`;
        //     const videoStat = fs.statSync (videoPath);
        //     const fileSize = videoStat.size;
        //     const videoRange = req.headers.range;
        //     if(videoRange) {
        //         const parts = videoRange.replace(/ bytes = /, "").split("-");
        //         const start = parseInt( parts [0],10);
        //         const end = parts [1] ? parseInt( parts [1], 10) : fileSize-1;
        //         const chunksize = (end-start) +1;
        //         videoUrl = fs.createReadStream(videoPath, {start, end});
        //         const head = {
        //             'Content-Range': `octets ${start} - ${end} / ${fileSize}`,
        //             'Accept-Ranges': 'octets',
        //             'Content-Length': chunksize,
        //             'Content-Type': 'video/*'
    
        //         };
        //         res.writeHead (206, head);
        //         videoUrl.pipe(res);
        //     } else {
        //         const head = {
        //             'Content-Length': chunksize,
        //             'Content-Type': 'video/*'
        //         }
        //         res.writeHead(200, head);
        //         fs.createReadStream(videoPath).pipe(res)
        //     }
        // }
        res.status(200).send(video)
    } catch (error) {
        return res.status(500).send({ error: 'Erreur du serveur' });
    }
}