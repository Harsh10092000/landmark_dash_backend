import express from "express";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";
import JSZip from "jszip";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import sizeOf from "image-size";

const router = express.Router();

cloudinary.config({
  cloud_name: "dqct40k0n",
  api_key: "224657579922463",
  api_secret: "Yje1I9nL1tF64Fka_MNiV-relZs",
});

const setWatermark = async (inputPath, outputPath) => {
  console.log("inputPath 11111111 : ", inputPath);
  try {
    sharp(inputPath)
      .resize({ width: 300, height: 280 })
      .composite([
        {
          input: "public/propertyImages/logo_2.webp",
          gravity: "southeast",
        },
      ])
      .toFormat('WebP')
      .toFile(outputPath);
  } catch (err) {
    console.error("Error adding watermark:", err);
  }
};

const setWatermarkSmallerSize = async (inputPath, outputPath) => {
  try {
    sharp(inputPath)
      .resize({ width: 1000 })
      .composite([
        {
          input: "public/propertyImages/logo_2.png",
          gravity: "southeast",
        },
      ])
      .toFile(outputPath);
  } catch (err) {
    console.error("Error adding watermark:", err);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
let zipFilePath;

async function makeZip(outputPaths) {
  const zip = new JSZip();
  const folderPath = "public/uploads_output";
  var rd = (Math.random() * 100000) / 10;
  zipFilePath = "./yeah" + rd + ".zip";

  const addFilesToZip = async (zipFile, folderPath, currentPath = "") => {
    const temp = [];
    const files = fs.readdirSync(path.join(folderPath, currentPath));

    for (const file of outputPaths) {
      const filePath = path.join(file);
      var fileContent = fs.readFileSync(filePath);
      var tempFile = {
        one: filePath,
        two: fileContent,
      };
      temp.push(tempFile);
    }

    for (const abc of temp) {
      zipFile.file(abc.one, abc.two);
    }
  };

  addFilesToZip(zip, folderPath);
  zip
    .generateAsync({ type: "nodebuffer" })
    .then((content) => {
      fs.writeFileSync(zipFilePath, content);
    })
    .catch((error) => console.log(error));

  console.log(`Zip file created at: ${zipFilePath}`);
}

var outputPaths = [];
var inputPaths = [];

router.post("/upload", upload.any("files"), async (req, res) => {
//  sizeOf("uploads/logo_2.png", function (err, dimensions) {
//         console.log("maaap   :   ", dimensions.width, dimensions.height)
// })

  console.log("req.files 1111111  :", req.files);
  const arr = req.files;
  // console.log(arr);
  arr.forEach(async (singleFile) => {
    const name = singleFile.originalname;
    const inputPath = `public/uploads/${name}`;
    const path = `public/uploads_output/${name}`;
    outputPaths.push(path);
    inputPaths.push(inputPath);

    sizeOf(inputPath, async (err, dim) => {
      if (dim.height < 120 || dim.width < 320) {
        await setWatermarkSmallerSize(inputPath, path);
      } else {
        await setWatermark(inputPath, path);
      }
    });
  });
});

const uploadVideo = async (name) => {
  console.log("aa gya ", name);
  try {
    cloudinary.uploader.upload_large(
      `public/uploads/${name}`,
      { resource_type: "video", public_id: name },
      function (error, result) {
        if (error) {
          console.error("Error uploading file to Cloudinary:", error);
          return res
            .status(500)
            .json({ error: "Error uploading file to Cloudinary" });
        }

        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Error handling file upload" });
  }
};

router.post("/uploadVideo", upload.any(), async (req, res) => {
  const arr = req.files;
  arr.forEach(async (singleFile) => {
    const name = singleFile.originalname;
    const videoURL = `public/uploads/${name}`;
    const outputFilename = `${name.split(".")[0]}.mp4`;
    const watermarkImageURL = "public/propertyImages/logo_2.png";
    try {
      cloudinary.uploader.upload_large(
        `public/uploads/${name}`,
        { resource_type: "video", public_id: name },
        function (error, result) {
          if (error) {
            console.error("Error uploading file to Cloudinary:", error);
            return res
              .status(500)
              .json({ error: "Error uploading file to Cloudinary" });
          }

          res.json({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      );
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).json({ error: "Error handling file upload" });
    }
  });

  console.log("finished");
});
const deleteIP = (singleFile) => {
  fs.unlinkSync(singleFile, (err) => {
    if (err) console.log("delete me yeah error h ", err);
    else console.log("Deleted hui hui ", singleFile);
  });
};
const deleteOP = (arr) => {
  arr.forEach((singleFile) => {
    fs.unlinkSync(singleFile, (err) => {
      if (err) console.log("delete me yeah error h ", err);
      else console.log("Deleted hui hui ", singleFile);
    });
  });
};
let tempZip;

router.get("/download", (req, res) => {
  if (!tempZip) {
    console.log("Temp zip is NUll");
  } else {
    console.log(tempZip);
    //deleteIP(tempZip)
  }

  makeZip(outputPaths);
  tempZip = zipFilePath;
  //deleteOP(outputPaths);
  //deleteOP(inputPaths)
  inputPaths = [];
  outputPaths = [];
  setTimeout(() => {
    res.download(zipFilePath);
  }, 3000);
});

export default router;
